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
  ScrollView,
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

const DataCard = ({dataInfo}) => {
  const navigation = useNavigation();
  const handleDataPress = () => {
    if (dataInfo.userType === 'clinic') {
      navigation.navigate('ClinicProfileforCards', {
        clinicId: dataInfo.clinicId,
      });
    } else if (dataInfo.userType === 'petOwner') {
      navigation.navigate('ProfileDetailsforCards', {
        petOwnerId: dataInfo.userId,
      });
    }
  };

  return (
    <TouchableOpacity onPress={handleDataPress}>
      <View style={styles.card}>
        <Image
          source={
            dataInfo.dataPicture
              ? {uri: dataInfo.dataPicture}
              : require('../images/placeholder.png')
          }
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{dataInfo.name}</Text>
          <Text style={styles.address}>{dataInfo.address}</Text>
          <Text style={styles.hours}>
            {dataInfo.isOpen === true ? (
              <Text style={styles.open}>Open</Text>
            ) : dataInfo.isOpen === false ? (
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
  dataId: string;
  name: string;
  address?: string;
  isOpen?: boolean;
  storeHours?: any;
  dataPicture: any;
  userType: string;
};

const ResultsPageAll = ({route}) => {
  const navigation = useNavigation();

  const auth = FIREBASE_AUTH;
  const db = FIREBASE_DB;

  const [profilePicture, setProfilePicture] = useState(null);
  const [userType, setUserType] = useState('');
  const [searchdata, setSearchData] = useState<SearchData[]>([]);

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
      const allData: SearchData[] = [];
      for (const allDoc of querySnapshot.docs) {
        if (allDoc.data().userType === 'clinic') {
          allData.push({
            id: allData.length + 1,
            dataId: allDoc.data().userId,
            name: allDoc.data().name,
            address: allDoc.data().address,
            isOpen: allDoc.data().storeHours
              ? isClinicOpen(allDoc.data().storeHours)
              : false,
            storeHours: allDoc.data().storeHours,
            dataPicture: allDoc.data().clinicPicture,
            userType: allDoc.data().userType,
          });
        }
        if (allDoc.data().userType === 'petOwner') {
          allData.push({
            id: allData.length + 1,
            dataId: allDoc.data().userId,
            name: allDoc.data().name,
            address: 'Pet Owner',
            dataPicture: allDoc.data().profilePicture,
            userType: allDoc.data().userType,
          });
        }
      }
      setSearchData(allData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUser();
    fetchData();
  }, []);

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

  // SEARCH FUNCTIONALITY
  const initialsearchstate = route.params ? route.params.searchboxQuery : '';
  const [searchQuery, setSearchQuery] = useState(initialsearchstate); // Replace with actual search query from the search bar
  const [filtereddata, setfilteredData] = useState(''); // Replace with actual filtered searchdata from the search bar]

  const handleSearch = text => {
    console.log(text);
    setSearchQuery(text);
    console.log(searchQuery);
    console.log('++++++');

    const filtered = searchdata.filter(data => {
      const includesText = data.name.toLowerCase().includes(text.toLowerCase());
      console.log(`Checking ${data.name} - includesText: ${includesText}`);
      return includesText;
    });
    console.log(filtered);
    console.log(text);
    console.log('------');

    fetchData();
    setfilteredData(filtered);
  };

  useEffect(() => {
    if (route.params && route.params.searchboxQuery) {
      handleSearch(route.params.searchboxQuery);
    }
  }, [route.params?.searchboxQuery]);

  const handleProfileClick = () => {
    if (userType === 'petOwner') {
      navigation.navigate('ProfileDetails');
    } else {
      navigation.navigate('ClinicProfile');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headercontainer}>
        <View style={styles.headercontent}>
          <View style={styles.headertextandicon}>
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
              <icons.BackIcon size="35" color="#ff8d4d" strokeWidth={10} />
            </TouchableOpacity>
            <Text style={styles.headerText}>Explore Data</Text>
            <Image
              source={require('../images/doggy.png')}
              style={styles.doggo}
            />
            <TextInput
              style={styles.input}
              placeholder="Search Users and Clinics..."
              onChangeText={handleSearch}
              value={searchQuery}
              placeholderTextColor="white"
            />
          </View>
          <View style={styles.userheadercontent}>
            <TouchableOpacity onPress={navigation.goBack}>
              <TouchableOpacity onPress={handleProfileClick}>
                <Avatar.Image
                  source={
                    profilePicture
                      ? {uri: profilePicture}
                      : require('../images/defaultIcon.png')
                  }
                  size={50}
                />
              </TouchableOpacity>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.scrollcontainer}>
        <FlatList
          data={filtereddata ? filtereddata : searchdata}
          renderItem={({item}) => <DataCard dataInfo={item} />}
          keyExtractor={item => item.id.toString()}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headercontainer: {
    ...alignmentMixin.alignment1,
    height: '18%',
    backgroundColor: constants.$backgroundColor,
    borderBottomRightRadius: 40,
  },
  headercontent: {
    backgroundColor: constants.$backgroundColor,
    flexDirection: 'row',
  },
  userheadercontent: {
    backgroundColor: constants.$backgroundColor,
    marginRight: '6%',
    zIndex: 1,
    height: '15%',
  },
  doggo: {
    height: '130%',
    width: '70%',
    left: '100%',
    position: 'absolute',
    top: '5%',
    zIndex: -1,
  },
  headertextandicon: {
    marginLeft: '6%',
    paddingRight: '7%',
    marginRight: '13%',
    flexDirection: 'column',
  },
  headerText: {
    paddingLeft: '5%',
    fontSize: 30,
    fontWeight: constants.$fontWeightBold,
    color: constants.$senaryColor,
  },

  input: {
    height: '31%',
    width: '100%',
    backgroundColor: constants.$primaryColor,
    borderColor: constants.$senaryColor,
    color: constants.$backgroundColor,
    borderRadius: 15,
    paddingLeft: '4%',
  },
  scrollcontainer: {
    borderTopRightRadius: 40,
    backgroundColor: constants.$quaternaryColor,
    paddingTop: '5%',
  },
  card: {
    ...buttonMixin.button,
    height: undefined,
    width: Dimensions.get('window').width * 0.93,
    alignItems: 'center',
    backgroundColor: constants.$backgroundColor,
    margin: 10,
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
    fontSize: 14,
    fontWeight: constants.$fontWeightBold,
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
    fontSize: 14,
    color: 'green',
  },
  closed: {
    fontSize: 14,
    color: 'red',
  },
});

export default ResultsPageAll;
