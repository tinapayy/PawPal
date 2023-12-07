import React from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, Dimensions, TextInput} from 'react-native';

import { ArrowLeftIcon as BackIcon,
         UserCircleIcon as User } from 'react-native-heroicons/solid';
import { useNavigation } from "@react-navigation/native";

const screenWidth = Dimensions.get('window').width;

const clinics = [
  {
    id: '1',
    name: 'Rebadulla Animal Hospital',
    address: '123 Main St, City, Country',
    isOpen: true,
    openingHours: '8:00 AM - 5:00 PM',
    imageUrl: require('../images/test.png'), // Replace with actual image URL or import from your assets
  },
  {
    id: '2',
    name: 'Rebadulla Animal Hospital',
    address: '123 Main St, City, Country',
    isOpen: true,
    openingHours: '8:00 AM - 5:00 PM',
    imageUrl: require('../images/test.png'), // Replace with actual image URL or import from your assets
  },
  {
    id: '3',
    name: 'Rebadulla Animal Hospital',
    address: '123 Main St, City, Country',
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
    isOpen: true,
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
    isOpen: true,
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

const ClinicCard = ({ clinicInfo, onPress }) => {
  const navigation = useNavigation();
  const handleClinicPress = (clinic) => {
    // Navigate to the clinic profile screen, replace 'ClinicProfile' with the actual screen name
    navigation.navigate('ClinicProfile', { clinicId: clinic.id });
  };
  return (
    <TouchableOpacity onPress={handleClinicPress}>
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

const ResultsPage = () => {
  const navigation = useNavigation();
  const handleClinicPress = (clinic) => {
    navigation.navigate('ClinicProfile', { clinicId: clinicInfo.id });
  };
    // Handle what happens when a clinic card is pressed, e.g., open a detail screen.
  const handleSearchIconClick = () => {
    navigation.navigate('ResultsPage'); // Replace 'ResultsPage' with the actual name of your results page component
  };
  const _goBack = () => console.log('Went back');
  return (
    <View style={styles.container}>
        <View style={styles.headercontainer}>
            <View style={styles.headercontent}>
                <View style={styles.headertextandicon}>
                      <TouchableOpacity onPress={_goBack}>
                          <BackIcon size="35" color="#ff8d4d" strokeWidth={10}/>           
                      </TouchableOpacity>
                    <Text style={styles.headerText}>Results Found</Text>
                    <TextInput style={styles.input}    
                    placeholder="Enter text here"
                    placeholderTextColor="white"
                    />
                </View>
          <View style={styles.userheadercontent}>
            <TouchableOpacity onPress={() => navigation.navigate('ProfileDetails')}>
              <User size="50" color="orange" strokeWidth={10} />
            </TouchableOpacity>
          </View>
            </View>
        </View>
    <View style={styles.scrollcontainer}>
    <FlatList
      data={clinics}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <ClinicCard clinicInfo={item} onPress={() => handleClinicPress(item)} />
      )}
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
        width: (screenWidth - 32),
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