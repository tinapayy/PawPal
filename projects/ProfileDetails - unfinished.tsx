import React from 'react';
import {View, Image, StyleSheet, TouchableOpacity, Text} from 'react-native';
import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

// Format (Structure) of the Component
const Profile = () => {
  return (
    <View style={styles.container}>
      <Image source={require('./assets/profile.png')} style={styles.image} />
      <View style={styles.rectangle} />
      <TouchableOpacity style={styles.backButtonContainer}>
        <View style={styles.backButton}>
          <Image
            source={require('./assets/backButton.png')}
            style={styles.backButtonIcon}
          />
          <Text style={styles.backButtonText}>Back</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.boxRectangle}>
        {/* <Text style={styles.placeholderText}>Goldie</Text> */}
      </View>
      <View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Age: </Text>
          <Text style={styles.infoLabel}>Sex: </Text>
          <Text style={styles.infoLabel}>Weight: </Text>
        </View>
      </View>

      <View style={styles.boxRectangleBottom} />
      <View style={styles.horizontalLine} />
      {/* <Text style={styles.placeholderText}>Goldie</Text> */}
    </View>
  );
};

// Styles (Design) of the Component
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    height: height / 2,
    width: width,
    resizeMode: 'cover',
  },
  backButtonContainer: {
    position: 'absolute',
    top: 20,
    left: 10,
    padding: 10,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButtonIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
    marginRight: 5,
  },
  backButtonText: {
    fontSize: 18,
    fontFamily: 'Poppins-Regular',
    fontWeight: 'bold',
    color: 'orange',
  },
  rectangle: {
    backgroundColor: '#ffffff',
    borderRadius: 30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    height: 480,
    position: 'absolute',
    top: height / 2 - 20,
    left: 0,
    width: width,
  },
  boxRectangle: {
    height: 80,
    width: 280,
    backgroundColor: '#FFA500',
    borderRadius: 30,
    position: 'absolute',
    top: height / 2 - 70,
    left: width / 2 - 140,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },
  boxRectangleBottom: {
    height: 80,
    width: 280,
    backgroundColor: '#FFA500',
    borderRadius: 30,
    position: 'absolute',
    top: height / 2 + 70,
    left: width / 2 - 140,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },
  horizontalLine: {
    height: 2,
    color: 'orange',
    borderWidth: 0.1,
    alignItems: 'center',
    alignSelf: 'center',
    width: '90%',
    backgroundColor: 'orange',
    position: 'absolute',
    top: (height * 3.01) / 5,
  },
  placeholderText: {
    fontSize: 24,
    fontFamily: 'Poppins-Regular',
    fontWeight: 'bold',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: 20,
  },
  infoLabel: {
    top: 425,
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Poppins-Regular',
  },
});

export default Profile;
