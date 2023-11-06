import React from 'react';
import { View, Image, StyleSheet, Pressable, Text } from 'react-native';

const GettingStarted: React.FC = () => {
  return (
    <View>
    <View style={styles.container1}>
    {/* <SvgXml xml={logo} width="100%" height="100%"/> */}
      <Image
        source={require('../images/corgiCat.png')}
        style={styles.welcomeImage}
        resizeMode='contain'
      />
    </View>
  
    <View style={styles.buttonView}>
    <Pressable 
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor: pressed ? '#FF6464' : '#FFAC4E', // Change color when pressed
        },
      ]}
      onPress={() => {
      }}>
      <Text style={styles.text}>Getting Started</Text>
    </Pressable>
    <Text style={styles.tagline}>Your pet’s health is our priority because you care and we care.</Text>
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container1: {
    flex: 1,
    top: 350,
    alignItems:'center',
    justifyContent: 'center',

  },
  welcomeImage: {
    width: 400, // Set the width of the image

  },
  container2: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 190
  },
  petImage: {
    width: 1000 // Set the width of the image
  },
  buttonView: {
    alignItems:'center',
    justifyContent: 'center',
    borderRadius: 20, // Add rounded corners
    paddingHorizontal: 90,
    top: 700
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 25,
    elevation: 3,
    backgroundColor:"#FFAC4E",
    width:200
  },
  text: {
    fontSize: 18,
    letterSpacing: 0.25,
    color: 'white',
    fontFamily: 'Poppins-SemiBold'
  },
  tagline: {
    fontFamily: 'Poppins-Medium',
    textAlign: 'center',
    position: 'absolute',
    color: '#894848',
    bottom: 80
  },
  taglineView: {
    flex: 1,
    width: 300,
  }
});

export default GettingStarted;