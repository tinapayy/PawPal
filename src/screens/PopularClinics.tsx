import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import * as icons from '../imports/icons/icons';
import {FIREBASE_AUTH, FIREBASE_DB} from '../../firebase.config';
import {getDocs, collection} from 'firebase/firestore';
import {useNavigation} from '@react-navigation/native';
import constants from '../styles/constants';
import {buttonMixin} from '../components/buttonMixin';
import { alignmentMixin } from '../components/alignmentMixin';

const screenWidth = Dimensions.get('window').width;

const clinics = [
  {
    id: '1',
    name: 'Rebadulla Animal Hospital',
    address: '123 Main St, City, Country',
    isOpen: true,
    openingHours: '8:00 AM - 5:00 PM',
    imageUrl: require('../images/rebadulla.jpg'), 
  },
  {
    id: '2',
    name: 'Cornerstone Animal Hospital',
    address: '456 Elm St, City, Country,',
    isOpen: false,
    openingHours: '9:00 AM - 6:00 PM',
    imageUrl: require('../images/cornerstone.jpg'), 
  },
  {
    id: '3',
    name: 'Bantayan Veterinary Clinic',
    address: '123 Main St, City, Country',
    isOpen: true,
    openingHours: '8:00 AM - 5:00 PM',
    imageUrl: require('../images/rebadulla.jpg'), 
  },
  {
    id: '2',
    name: 'Sample Clinic 2',
    address: '456 Elm St, City, Country',
    isOpen: false,
    openingHours: '9:00 AM - 6:00 PM',
    imageUrl: require('../images/cornerstone.jpg'), 
  },
  {
    id: '1',
    name: 'Sample Clinic 1',
    address: '123 Main St, City, Country',
    isOpen: true,
    openingHours: '8:00 AM - 5:00 PM',
    imageUrl: require('../images/rebadulla.jpg'), 
  },
  {
    id: '2',
    name: 'Sample Clinic 2',
    address: '456 Elm St, City, Country',
    isOpen: false,
    openingHours: '9:00 AM - 6:00 PM',
    imageUrl: require('../images/cornerstone.jpg'), 
  },
  {
    id: '1',
    name: 'Sample Clinic 1',
    address: '123 Main St, City, Country',
    isOpen: true,
    openingHours: '8:00 AM - 5:00 PM',
    imageUrl: require('../images/rebadulla.jpg'), 
  },
  {
    id: '2',
    name: 'Sample Clinic 2',
    address: '456 Elm St, City, Country',
    isOpen: false,
    openingHours: '9:00 AM - 6:00 PM',
    imageUrl: require('../images/cornerstone.jpg'), 
  },
  {
    id: '1',
    name: 'Sample Clinic 1',
    address: '123 Main St, City, Country',
    isOpen: true,
    openingHours: '8:00 AM - 5:00 PM',
    imageUrl: require('../images/rebadulla.jpg'), 
  },
  {
    id: '2',
    name: 'Sample Clinic 2',
    address: '456 Elm St, City, Country',
    isOpen: false,
    openingHours: '9:00 AM - 6:00 PM',
    imageUrl: require('../images/cornerstone.jpg'), 
  },
];

const ClinicCard = ({clinicInfo}) => {
  const navigation = useNavigation();

  const handleProfileClick = () => {
    navigation.navigate('ClinicProfile', {clinicInfo});
  };
  return (
    <TouchableOpacity onPress={handleProfileClick}>
      <View style={styles.card}>
        <Image source={clinicInfo.imageUrl} style={styles.image} />
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{clinicInfo.name}</Text>
          <View style={{flexDirection: 'row'}}>
            <FontAwesomeIcon
              icon={icons.faLocationDot}
              size={11}
              style={{color: '#ff8d4d'}}
            />
            <Text style={styles.address}>{clinicInfo.address}</Text>
          </View>
          <Text style={styles.hours}>{clinicInfo.openingHours}</Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={clinicInfo.isOpen ? styles.open : styles.closed}>
              {clinicInfo.isOpen ? 'Open' : 'Closed'}
            </Text>
            <FontAwesomeIcon
              icon={icons.faArrowRight}
              style={{color: '#ff8d4d', right: -4}}
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const Apps = () => {
  const navigation = useNavigation();

  const auth = FIREBASE_AUTH;
  const db = FIREBASE_DB;

  const [profilePicture, setProfilePicture] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'user'));
        querySnapshot.forEach(doc => {
          if (doc.data().userId === auth.currentUser?.uid) {
            setProfilePicture(doc.data().profilePicture);
          }
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleClinicPress = clinic => {
  };

  const backgroundImage = require('../images/PopularClinicsBg.png');

  return (
    <ImageBackground source={backgroundImage} style={{flex: 1}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          margin: 15,
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesomeIcon
            icon={icons.faArrowLeft}
            size={27}
            style={{color: '#ff8d4d', left: 15}}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('ProfileDetails');
          }}>
          <Image
            source={
              profilePicture
                ? {uri: profilePicture}
                : require('../images/userIcon.png')
            }
            style={{width: 50, height: 50, borderRadius: 50}}
          />
        </TouchableOpacity>
      </View>
      <View>
        <Text
          style={{
            color: '#ff8d4d',
            fontFamily: 'Poppins-Bold',
            fontSize: 25,
            left: 20,
            bottom: 30,
          }}>
          Popular Clinics
        </Text>
      </View>
      <FlatList
        data={clinics}
        keyExtractor={item => item.id}
        numColumns={2} 
        renderItem={({item}) => (
          <ClinicCard
            clinicInfo={item}
            onPress={() => handleClinicPress(item)}
          />
        )}
      />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  card: {
    ...buttonMixin.button,
    height: undefined,
    width: (screenWidth - 32) / 2, 
    aspectRatio: 1, 
    alignItems: 'center',
    backgroundColor: constants.$backgroundColor,
    margin: 8,
    borderRadius: 8,
    flexDirection: 'column',
    top: '15%',
  },
  image: {
    width: '100%',
    height: '50%',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
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
    color: constants.$senaryColor,
  },
  hours: {
    fontSize: 12,
    color: constants.$secondaryColor,
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

export default Apps;