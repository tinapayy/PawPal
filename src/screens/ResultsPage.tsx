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

const clinics = [
  {
    id: '1',
    name: 'Rebadulla Animal Care',
    address: 'Commission, Civil St., Jaro, Iloilo City',
    isOpen: true,
    openingHours: '8:00 AM - 5:00 PM',
    imageUrl: require('../images/test.png'), // Replace with actual image URL or import from your assets
  },
];

const ClinicCard = ({clinicInfo}) => {
  const navigation = useNavigation();
  const handleClinicPress = () => {
    navigation.navigate('ClinicProfileforCards', {
      clinicId: clinicInfo.clinicId,
    });
  };

  return (
    <TouchableOpacity onPress={handleClinicPress}>
      <View style={styles.card}>
        <Image
          source={
            clinicInfo.clinicPicture
              ? {uri: clinicInfo.clinicPicture}
              : require('../images/placeholder.png')
          }
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{clinicInfo.name}</Text>
          <Text style={styles.address}>{clinicInfo.address}</Text>
          <Text style={styles.hours}>
            {clinicInfo.isOpen ? (
              <Text style={styles.open}>Open</Text>
            ) : (
              <Text style={styles.closed}>Closed</Text>
            )}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

type Clinic = {
  id: number;
  clinicId: string;
  name: string;
  address: string;
  isOpen: boolean;
  storeHours: any;
  clinicPicture: any;
};

const ResultsPage = ({route}) => {
  const navigation = useNavigation();

  const auth = FIREBASE_AUTH;
  const db = FIREBASE_DB;

  const [profilePicture, setProfilePicture] = useState(null);
  const [userType, setUserType] = useState('');
  const [clinics, setClinics] = useState<Clinic[]>([]);

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
      const clinicsData: Clinic[] = [];
      for (const clinicDoc of querySnapshot.docs) {
        if (clinicDoc.data().userType === 'clinic') {
          clinicsData.push({
            id: clinicsData.length + 1,
            clinicId: clinicDoc.data().userId,
            name: clinicDoc.data().name,
            address: clinicDoc.data().address,
            isOpen: clinicDoc.data().storeHours
              ? isClinicOpen(clinicDoc.data().storeHours)
              : false,
            storeHours: clinicDoc.data().storeHours,
            clinicPicture: clinicDoc.data().clinicPicture,
          });
        }
      }
      setClinics(clinicsData);
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

  const initialsearchstate = route.params ? route.params.searchboxQuery : '';
  const [searchQuery, setSearchQuery] = useState(initialsearchstate); // Replace with actual search query from the search bar
  const [filteredClinics, setFilteredClinics] = useState(''); // Replace with actual filtered clinics from the search bar]

  const handleSearch = text => {
    console.log(text);
    setSearchQuery(text);
    console.log(searchQuery);
    console.log('++++++');

    const filtered = clinics.filter(clinic =>
      clinic.name.toLowerCase().includes(text.toLowerCase()),
    );

    console.log(filtered);
    console.log('------');

    fetchData();
    setFilteredClinics(filtered);
  };

  if (route.params) {
    useEffect(() => {
      handleSearch(route.params.searchboxQuery);
    }, []);
  }

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
            <Text style={styles.headerText}>Explore Clinics</Text>
            <Image
              source={require('../images/doggy.png')}
              style={styles.doggo}
            />
            <TextInput
              style={styles.input}
              placeholder="Search Clinics..."
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
          data={filteredClinics ? filteredClinics : clinics}
          renderItem={({item}) => <ClinicCard clinicInfo={item} />}
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

export default ResultsPage;
