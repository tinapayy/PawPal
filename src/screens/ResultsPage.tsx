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
  GestureResponderEvent,
  Alert,
} from 'react-native';

import {
  ArrowLeftIcon as BackIcon,
  UserCircleIcon as User,
} from 'react-native-heroicons/solid';
import {useNavigation} from '@react-navigation/native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCirclePlus, faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import {FIREBASE_AUTH, FIREBASE_DB} from '../../firebase.config';
import {getDocs, collection} from 'firebase/firestore';

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
  {
    id: '2',
    name: 'Cornerstone Animal Hospital',
    address: 'Jalandoni St., Jaro, Iloilo City',
    isOpen: true,
    openingHours: '8:00 AM - 5:00 PM',
    imageUrl: require('../images/test.png'), // Replace with actual image URL or import from your assets
  },
  {
    id: '3',
    name: 'Dr. Paws Veterinary Clinic',
    address: 'Jaro, Iloilo City',
    isOpen: true,
    openingHours: '8:00 AM - 5:00 PM',
    imageUrl: require('../images/test.png'), // Replace with actual image URL or import from your assets
  },
  {
    id: '4',
    name: 'Rebadulla Animal Hospital',
    address: '123 Main St, City, Country',
    isOpen: true,
    openingHours: '8:00 AM - 5:00 PM',
    imageUrl: require('../images/test.png'), // Replace with actual image URL or import from your assets
  },
  {
    id: '5',
    name: 'Rebadulla Animal Hospital',
    address: '123 Main St, City, Country',
    isOpen: false,
    openingHours: '8:00 AM - 5:00 PM',
    imageUrl: require('../images/test.png'), // Replace with actual image URL or import from your assets
  },
  {
    id: '6',
    name: 'Rebadulla Animal Hospital',
    address: '123 Main St, City, Country',
    isOpen: true,
    openingHours: '8:00 AM - 5:00 PM',
    imageUrl: require('../images/test.png'), // Replace with actual image URL or import from your assets
  },
  {
    id: '7',
    name: 'Rebadulla Animal Hospital',
    address: '123 Main St, City, Country',
    isOpen: false,
    openingHours: '8:00 AM - 5:00 PM',
    imageUrl: require('../images/test.png'), // Replace with actual image URL or import from your assets
  },
  {
    id: '8',
    name: 'Rebadulla Animal Hospital',
    address: '123 Main St, City, Country',
    isOpen: true,
    openingHours: '8:00 AM - 5:00 PM',
    imageUrl: require('../images/test.png'), // Replace with actual image URL or import from your assets
  },

  // Add more clinic data here
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
            {clinicInfo.isOpen ? 'Open' : 'Closed'}
          </Text>
          <Text style={styles.hours}>
            {/* format: '8:00 AM - 5:00 PM' */}
            {clinicInfo.storeHours[0].open} - {clinicInfo.storeHours[0].close}
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
  const navigation = useNavigation();

  const db = FIREBASE_DB;

  const [searchQuery, setSearchQuery] = useState(''); // Replace with actual search query from the search bar
  const [filteredClinics, setFilteredClinics] = useState(clinics); // Replace with actual filtered clinics from the search bar]

  const handleSearch = text => {
    setSearchQuery(text);

    // Filter clinics based on search query
    const filtered = clinics.filter(
      clinic =>
        clinic.name.toLowerCase().includes(text.toLowerCase()) ||
        clinic.address.toLowerCase().includes(text.toLowerCase()),
    );
    setFilteredClinics(filtered);
  };

  const [profilePicture, setProfilePicture] = useState(null);
  const [userType, setUserType] = useState('');
  const [clinics, setClinics] = useState<Clinic[]>([]);

  useEffect(() => {
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
    fetchData();
  }, []);

  const isClinicOpen = storeHours => {
    for (let i = 0; i < storeHours.length; i++) {
      const currentDay = new Date().getDay();
      if (currentDay === storeHours[i].day) {
        const currentTime = new Date().getTime();
        const openingTime = storeHours[i].open.toDate().getTime();
        const closingTime = storeHours[i].close.toDate().getTime();
        if (currentTime >= openingTime && currentTime <= closingTime) {
          return true;
        }
      }
    }
    return false;
  };

  const handleProfileClick = () => {
    if (userType === 'petOwner') {
      navigation.navigate('ProfileDetails');
    } else {
      // navigation.navigate('ClinicProfile');
      Alert.alert(clinics[12].name);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headercontainer}>
        <View style={styles.headercontent}>
          <View style={styles.headertextandicon}>
            <TouchableOpacity onPress={() => navigation.navigate('HomePage')}>
              <BackIcon size="35" color="#ff8d4d" strokeWidth={10} />
            </TouchableOpacity>
            <Text style={styles.headerText}>Explore Clinics</Text>
            <Image
              source={require('../images/doggy.png')}
              style={{
                height: 130,
                width: 130,
                left: '100%',
                position: 'absolute',
                top: '5%',
              }}
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
                <Image
                  source={
                    profilePicture
                      ? {uri: profilePicture}
                      : require('../images/userIcon.png')
                  }
                  style={{width: 50, height: 50, borderRadius: 50}}
                />
              </TouchableOpacity>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.scrollcontainer}>
        <FlatList
          data={clinics}
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
    height: 150,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomRightRadius: 40,
  },
  headercontent: {
    backgroundColor: 'white',
    flexDirection: 'row',
  },
  userheadercontent: {
    backgroundColor: 'white',
    marginRight: 30,
  },
  headertextandicon: {
    marginLeft: 30,
    paddingRight: 30,
    marginRight: 50,
    flexDirection: 'column',
  },
  headerText: {
    paddingLeft: 10,
    fontSize: 30,
    fontWeight: 'bold',
    color: '#FF8D4D',
  },

  input: {
    height: 40,
    width: 250,
    backgroundColor: '#FFAC4E',
    borderColor: '#FF8D4D',
    color: 'white',
    borderRadius: 20,
    borderWidth: 1,
    paddingLeft: 10,
    elevation: -5,
  },

  scrollcontainer: {
    borderTopRightRadius: 40,
    backgroundColor: '#FFBA69',
    paddingTop: 20,
  },
  card: {
    width: screenWidth - 32,
    alignItems: 'center',
    backgroundColor: 'white',
    margin: 10,
    borderRadius: 15,
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
    flexDirection: 'row',
  },
  image: {
    marginLeft: 15,
    width: 90,
    height: 90,
    borderRadius: 15,
  },
  infoContainer: {
    padding: 15,
    flex: 1,
  },
  name: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#5A2828',
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
