import React from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

const clinics = [
  {
    id: '1',
    name: 'Rebadulla Animal Hospital',
    address: '123 Main St, City, Country',
    isOpen: true,
    openingHours: '8:00 AM - 5:00 PM',
    imageUrl: require('../images/Rebadulla.jpg'), // Replace with actual image URL or import from your assets
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
    imageUrl: require('../images/Rebadulla.jpg'), // Replace with actual image URL or import from your assets
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
    imageUrl: require('../images/Rebadulla.jpg'), // Replace with actual image URL or import from your assets
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
    imageUrl: require('../images/Rebadulla.jpg'), // Replace with actual image URL or import from your assets
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
    imageUrl: require('../images/Rebadulla.jpg'), // Replace with actual image URL or import from your assets
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
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.card}>
        <Image source={clinicInfo.imageUrl} style={styles.image} />
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{clinicInfo.name}</Text>
          <Text style={styles.address}>{clinicInfo.address}</Text>
          <Text style={styles.hours}>{clinicInfo.openingHours}</Text>
          <Text style={clinicInfo.isOpen ? styles.open : styles.closed}>
            {clinicInfo.isOpen ? 'Open' : 'Closed'}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const App = () => {
  const handleClinicPress = (clinic) => {
    // Handle what happens when a clinic card is pressed, e.g., open a detail screen.
  };

  return (
    <FlatList
      data={clinics}
      keyExtractor={(item) => item.id}
      numColumns={2} // Set the number of columns to 2
      renderItem={({ item }) => (
        <ClinicCard clinicInfo={item} onPress={() => handleClinicPress(item)} />
      )}
    />
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

export default App;
