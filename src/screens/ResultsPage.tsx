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
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import {FIREBASE_AUTH, FIREBASE_DB} from '../../firebase.config';
import {getDocs, collection} from 'firebase/firestore';
import {Avatar} from 'react-native-paper';
import * as icons from '../imports/icons/icons';
import constants from '../styles/constants';
import {buttonMixin} from '../components/buttonMixin';
import {alignmentMixin} from '../components/alignmentMixin';
import {useNavigateTo} from '../components/navigation';

type ClinicInfo = {
  clinicId: string;
  clinicPicture: string;
  name: string;
  address: string;
  isOpen: boolean;
};

const ClinicCard = ({clinicInfo}: {clinicInfo: ClinicInfo}) => {
  const navigation = useNavigation<StackNavigationProp<any>>();
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

const ResultsPage = () => {
  const NavHome = useNavigateTo('Home');
  const NavClinicProfile = useNavigateTo('ClinicProfile');
  const NavProfileDetails = useNavigateTo('ProfileDetails');
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
        if (
          auth.currentUser &&
          userDoc.data().userId === auth.currentUser.uid
        ) {
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

  const isClinicOpen = (storeHours: string | any[]) => {
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

  const convertTo24HourFormat = (timeString: {
    split: (arg0: string) => [any, any];
  }) => {
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

  const [searchQuery, setSearchQuery] = useState(''); // Replace with actual search query from the search bar
  const [filteredClinics, setFilteredClinics] = useState<Clinic[]>([]); // Replace with actual filtered clinics from the search bar]

  const handleSearch = (text: string) => {
    setSearchQuery(text);

    const filtered = clinics.filter(clinic =>
      clinic.name.toLowerCase().includes(text.toLowerCase()),
    );

    fetchData();
    setFilteredClinics(filtered);
  };

  const handleProfileClick = () => {
    if (userType === 'petOwner') {
      NavProfileDetails;
    } else {
      NavClinicProfile;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headercontainer}>
        <View style={styles.headercontent}>
          <View style={styles.headericon}>
            <TouchableOpacity onPress={NavHome}>
              <icons.BackIcon size="25" color="#ff8d4d" strokeWidth={10} />
            </TouchableOpacity>
          </View>
          <View style={styles.header}>
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
                  size={40}
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
    backgroundColor: constants.$backgroundColor,
  },
  headercontainer: {
    ...alignmentMixin.alignment1,
    height: '20%',
    backgroundColor: constants.$backgroundColor,
  },
  headercontent: {
    backgroundColor: constants.$backgroundColor,
    flexDirection: 'row',
  },
  userheadercontent: {
    marginRight: '6%',
    zIndex: 1,
    bottom: '2%',
    left: '15%',
  },
  doggo: {
    height: '150%',
    width: '70%',
    left: '70%',
    position: 'absolute',
    top: '20%',
    zIndex: -1,
  },
  headericon: {
    marginRight: '15%',
    bottom: '2%',
  },
  headerText: {
    paddingLeft: '5%',
    fontSize: 30,
    fontWeight: 'bold',
    right: '30%',
    top: '5%',
    color: constants.$senaryColor,
  },

  input: {
    width: Dimensions.get('window').width * 0.53,
    height: Dimensions.get('window').height * 0.05,
    top: '10%',
    right: '25%',
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
    fontWeight: 'bold', // replace with one of the valid values: "200", "400", "500", "700", "normal", "bold", "100", "300", "600", "800", "900"
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

export default ResultsPage;
