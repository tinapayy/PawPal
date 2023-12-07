import React from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, Dimensions, ImageBackground } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

//changes made - gliez
import { useNavigation } from '@react-navigation/native';


const screenWidth = Dimensions.get('window').width;

const clinics = [
  {
    id: '1',
    name: 'Rebadulla Animal Hospital',
    address: '123 Main St, City, Country',
    isOpen: true,
    openingHours: '8:00 AM - 5:00 PM',
    imageUrl: require('../images/rebadulla.jpg'), // Replace with actual image URL or import from your assets
  },
  {
    id: '2',
    name: 'Cornerstone Animal Hospital',
    address: '456 Elm St, City, Country,',
    isOpen: false,
    openingHours: '9:00 AM - 6:00 PM',
    imageUrl: require('../images/cornerstone.jpg'), // Replace with actual image URL or import from your assets
  },
  {
    id: '3',
    name: 'Bantayan Veterinary Clinic',
    address: '123 Main St, City, Country',
    isOpen: true,
    openingHours: '8:00 AM - 5:00 PM',
    imageUrl: require('../images/rebadulla.jpg'), // Replace with actual image URL or import from your assets
  },
  {
    id: '2',
    name: 'Sample Clinic 2',
    address: '456 Elm St, City, Country',
    isOpen: false,
    openingHours: '9:00 AM - 6:00 PM',
    imageUrl: require('../images/cornerstone.jpg'), // Replace with actual image URL or import from your assets
  },
  {
    id: '1',
    name: 'Sample Clinic 1',
    address: '123 Main St, City, Country',
    isOpen: true,
    openingHours: '8:00 AM - 5:00 PM',
    imageUrl: require('../images/rebadulla.jpg'), // Replace with actual image URL or import from your assets
  },
  {
    id: '2',
    name: 'Sample Clinic 2',
    address: '456 Elm St, City, Country',
    isOpen: false,
    openingHours: '9:00 AM - 6:00 PM',
    imageUrl: require('../images/cornerstone.jpg'), // Replace with actual image URL or import from your assets
  },
  {
    id: '1',
    name: 'Sample Clinic 1',
    address: '123 Main St, City, Country',
    isOpen: true,
    openingHours: '8:00 AM - 5:00 PM',
    imageUrl: require('../images/rebadulla.jpg'), // Replace with actual image URL or import from your assets
  },
  {
    id: '2',
    name: 'Sample Clinic 2',
    address: '456 Elm St, City, Country',
    isOpen: false,
    openingHours: '9:00 AM - 6:00 PM',
    imageUrl: require('../images/cornerstone.jpg'), // Replace with actual image URL or import from your assets
  },
  {
    id: '1',
    name: 'Sample Clinic 1',
    address: '123 Main St, City, Country',
    isOpen: true,
    openingHours: '8:00 AM - 5:00 PM',
    imageUrl: require('../images/rebadulla.jpg'), // Replace with actual image URL or import from your assets
  },
  {
    id: '2',
    name: 'Sample Clinic 2',
    address: '456 Elm St, City, Country',
    isOpen: false,
    openingHours: '9:00 AM - 6:00 PM',
    imageUrl: require('../images/cornerstone.jpg'), // Replace with actual image URL or import from your assets
  },
  // Add more clinic data here
];


const ClinicCard = ({ clinicInfo, onPress }) => {
  const navigation = useNavigation();
  const handleProfileClick = () => {
    // Navigate to the profile details screen
    navigation.navigate('ProfileDetails');
  };
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.card}>
        <Image source={clinicInfo.imageUrl} style={styles.image} />
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{clinicInfo.name}</Text>
          <View style = {{flexDirection: 'row'}}>
          <FontAwesomeIcon icon={faLocationDot} size = {11} style = {{ color : '#ff8d4d'}}/>
          <Text style={styles.address}>{clinicInfo.address}</Text>
          </View>
          <Text style={styles.hours}>{clinicInfo.openingHours}</Text>
          <View style = {{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={clinicInfo.isOpen ? styles.open : styles.closed}>

            {clinicInfo.isOpen ? 'Open' : 'Closed'}
          </Text>
          {/* <TouchableOpacity onPress = {() => {}}> */}
          <FontAwesomeIcon icon={faArrowRight} style = {{ color: '#ff8d4d', right: -4}}/>
          {/* </TouchableOpacity> */}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const Apps = () => {
  const navigation = useNavigation();
  const handleClinicPress = (clinic) => {
    navigation.navigate('ClinicProfile', { clinicId: clinic.id });
    // Handle what happens when a clinic card is pressed, e.g., open a detail screen.
  };
  const goBack = () => {
    // Navigate back
    navigation.goBack();
  };
  

  const backgroundImage = require('../images/PopularClinicsBg.png');

  return (

    <ImageBackground source={backgroundImage} style = {{flex: 1}}>
        <View style = {{flexDirection: 'row', justifyContent: 'space-between', margin: 15}}>
        <TouchableOpacity onPress = {() => {}}>
        <FontAwesomeIcon icon={faArrowLeft} size = {27} style = {{color: '#ff8d4d', left: 15}}/>
        </TouchableOpacity>
        <TouchableOpacity onPress = {() => {}}>
        <Image source = {require('../images/idPic.png')} style = {{width: 50, height: 50}}/>
        </TouchableOpacity>
        </View>
        <View>
            <Text style = {{color: '#ff8d4d', fontFamily: 'Poppins-Bold', fontSize: 25, left: 20, bottom: 30}}>
                Popular Clinics
            </Text>
        </View>
    <FlatList
      data={clinics}
      keyExtractor={(item) => item.id}
      numColumns={2} // Set the number of columns to 2
      renderItem={({ item }) => (
        <ClinicCard clinicInfo={item} onPress={() => handleClinicPress(item)} />
      )}
    />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  card: {
    width: (screenWidth - 32) / 2, // Two columns with spacing
    aspectRatio: 1, // To make it square
    alignItems: 'center',
    backgroundColor: 'white',
    margin: 8,
    borderRadius: 8,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
    flexDirection: 'column',
    top: 50
  },
  image: {
    width: '100%',
    height: '50%',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  infoContainer: {
    padding: 8,
    flex: 1,
  },
  name: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#5a2828'
  },
  address: {
    fontSize: 12,
    color: '#ff8700',
  },
  hours: {
    fontSize: 12,
    color: '#5a2828',
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
