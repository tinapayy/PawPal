import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  TextInput,
  ViewStyle,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {FIREBASE_AUTH, FIREBASE_DB} from '../../firebase.config';
import {getDocs, collection} from 'firebase/firestore';
import {Avatar} from 'react-native-paper';
import * as icons from '../imports/icons/icons';
import constants from '../styles/constants';
import {buttonMixin} from '../components/buttonMixin';
import {alignmentMixin} from '../components/alignmentMixin';

const screenWidth = Dimensions.get('window').width;

const UserCard = ({userInfo}) => {
  const navigation = useNavigation();

  const handleDataPress = () => {
    if (userInfo.userType === 'petOwner') {
      navigation.navigate('VisitedProfileDetails', {
        userId: userInfo.userId,
      });
    } else if (userInfo.userType === 'clinic') {
      navigation.navigate('ClinicProfile', {
        userId: userInfo.userId,
      });
    }
  };

  return (
    <TouchableOpacity onPress={handleDataPress}>
      <View style={styles.card}>
        <Image
          source={userInfo.userPicture}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{userInfo.name}</Text>
          <Text style={styles.address}>{userInfo.address}</Text>
          <Text style={styles.hours}>
            {userInfo.isOpen === true ? (
              <Text style={styles.open}>Open</Text>
            ) : userInfo.isOpen === false ? (
              <Text style={styles.closed}>Closed</Text>
            ) : null}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

type SearchData = {
  id: number;
  userId: string;
  userType: string;
  name: string;
  address?: string;
  isOpen?: boolean;
  storeHours?: any;
  userPicture: any;
};

const ResultsPageAll = ({route}) => {
  const navigation = useNavigation();

  const auth = FIREBASE_AUTH;
  const db = FIREBASE_DB;

  const [userType, setUserType] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const initialSearchQuery = route.params ? route.params.searchboxQuery : '';
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [searchdata, setSearchData] = useState<SearchData[]>([]);
  const [filtereddata, setfilteredData] = useState<SearchData[]>(searchdata);

  const fetchUser = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'user'));
      for (const userDoc of querySnapshot.docs) {
        if (userDoc.data().userId === auth.currentUser.uid) {
          setUserType(userDoc.data().userType);
          if (userDoc.data().userType === 'petOwner') {
            setProfilePicture(userDoc.data().profilePicture);
          } else {
            setProfilePicture(userDoc.data().clinicPicture);
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'user'));
      const userData: SearchData[] = [];
      for (const userDoc of querySnapshot.docs) {
        if (userDoc.data().userType === 'clinic') {
          userData.push({
            id: userData.length + 1,
            userId: userDoc.data().userId,
            name: userDoc.data().name,
            address: userDoc.data().address,
            isOpen: userDoc.data().storeHours
              ? isClinicOpen(userDoc.data().storeHours)
              : false,
            storeHours: userDoc.data().storeHours,
            userPicture: userDoc.data().clinicPicture
              ? {uri: userDoc.data().clinicPicture}
              : require('../images/placeholder.png'),
            userType: userDoc.data().userType,
          });
        }
        if (userDoc.data().userType === 'petOwner') {
          userData.push({
            id: userData.length + 1,
            userId: userDoc.data().userId,
            name: userDoc.data().name,
            address: 'Pet Owner',
            userPicture: userDoc.data().profilePicture
              ? {uri: userDoc.data().profilePicture}
              : require('../images/defaultIcon.png'),
            userType: userDoc.data().userType,
          });
        }
      }
      setSearchData(userData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUser();
    fetchData();
  }, []);

  useEffect(() => {
    if (searchdata.length > 0) {
      handleSearch(searchQuery);
    }
  }, [searchdata]);

  const isClinicOpen = storeHours => {
    const currentDay = Date.now();

    // Add 8 hours to current day
    const currentDayPlus8 = new Date(currentDay).setHours(
      new Date(currentDay).getHours() + 8,
    );

    // Get UTC day
    const utcDay = new Date(currentDayPlus8).getUTCDay();

    const dayNames = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];

    const currentDayName = dayNames[utcDay];

    const currentTime = new Date().toLocaleString('en-US', {
      timeZone: 'Asia/Manila',
      hour12: false,
    });

    const formattedTime = currentTime.split(',')[1].trim().slice(0, -3);

    for (let i = 0; i < storeHours.length; i++) {
      if (currentDayName === storeHours[i].day) {
        const openingTime = convertTo24HourFormat(storeHours[i].open);

        const closingTime = convertTo24HourFormat(storeHours[i].close);

        if (formattedTime >= openingTime && formattedTime <= closingTime) {
          return true;
        }
      }
    }
    return false;
  };

  const convertTo24HourFormat = timeString => {
    let [time, period] = timeString.split(' ');
    let [hours, minutes] = time.split(':');

    if (period === 'AM' && hours === '12') {
      hours = '00';
    } else if (period === 'PM' && hours !== '12') {
      hours = String(parseInt(hours) + 12);
    }

    if (parseInt(hours) < 10) {
      hours = '0' + hours;
    }

    return `${hours}:${minutes}`;
  };

  const handleSearch = text => {
    setSearchQuery(text);
    const filtered = searchdata.filter(item => {
      return (
        item.name.toLowerCase().includes(text.toLowerCase()) ||
        item.address.toLowerCase().includes(text.toLowerCase())
      );
    });
    setfilteredData(filtered);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headercontainer}>
        <View style={styles.headercontent}>
          <View style={styles.headertextandicon}>
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
              <icons.BackIcon
                size="25"
                color="#ff8d4d"
                strokeWidth={20}
                style={{left: '-28%', top: '-50%'}}
              />
            </TouchableOpacity>
            <Text style={styles.headerText}>Explore</Text>
            <Image
              source={require('../images/doggy.png')}
              style={styles.doggo}
            />
            <TextInput
              style={styles.input}
              placeholder="Search Users and Clinics"
              onChangeText={handleSearch}
              value={searchQuery}
              placeholderTextColor="white"
            />
          </View>
          <View style={styles.userheadercontent}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Profile Details');
              }}>
              <Avatar.Image
                source={
                  profilePicture
                    ? {uri: profilePicture}
                    : require('../images/defaultIcon.png')
                }
                size={40}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.scrollcontainer}>
        <FlatList
          data={filtereddata ? filtereddata : searchdata}
          renderItem={({item}) => <UserCard userInfo={item} />}
          keyExtractor={item => item.id}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: constants.$backgroundColor,
  },
  headercontainer: {
    ...alignmentMixin.alignment1,
    height: '20%',
    backgroundColor: constants.$backgroundColor,
  } as ViewStyle,
  headercontent: {
    backgroundColor: constants.$backgroundColor,
    flexDirection: 'row',
  },
  userheadercontent: {
    marginRight: '6%',
    zIndex: 1,
    bottom: '5%',
    left: '45%',
  },
  doggo: {
    height: '135%',
    width: '70%',
    left: '90%',
    position: 'absolute',
    top: '20%',
    zIndex: -1,
  },
  headericon: {
    marginRight: '15%',
    bottom: '8%',
    right: '5%',
  },
  headerText: {
    paddingLeft: '5%',
    fontSize: 30,
    fontWeight: 'bold',
    right: '10%',
    top: '-17%',
    color: constants.$senaryColor,
  },
  input: {
    width: Dimensions.get('window').width * 0.5,
    height: Dimensions.get('window').height * 0.05,
    top: '-10%',
    right: '10%',
    backgroundColor: constants.$primaryColor,
    color: constants.$backgroundColor,
    borderRadius: 25,
    paddingLeft: '4%',
  },
  scrollcontainer: {
    borderTopRightRadius: 40,
    backgroundColor: constants.$quaternaryColor,
    paddingTop: '5%',
    marginTop: '5%',
    paddingBottom: '15%',
    height: '100%',
  },
  card: {
    ...buttonMixin.button,
    height: undefined,
    width: Dimensions.get('window').width * 0.93,
    alignItems: 'center',
    backgroundColor: constants.$backgroundColor,
    margin: 10,
    marginTop: 7,
    borderRadius: 15,
    flexDirection: 'row',
  },
  image: {
    marginLeft: '2%',
    width: '25%',
    height: '90%',
    borderRadius: 15,
  },
  infoContainer: {
    padding: '5%',
    flex: 1,
  },
  name: {
    fontSize: constants.$fontSizeSmall,
    fontWeight: 'bold',
    color: constants.$secondaryColor,
  },
  address: {
    fontSize: 12,
    color: 'gray',
  },
  hours: {
    fontSize: 12,
    color: 'gray',
  },
  open: {
    fontSize: 13,
    color: 'green',
  },
  closed: {
    fontSize: 13,
    color: 'red',
  },
});

export default ResultsPageAll;
