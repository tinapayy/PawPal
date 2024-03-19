import React from 'react';
import { View, Image, StyleSheet, Pressable, Text, ImageBackground, } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const GettingStarted2 = () => {
  const navigation = useNavigation();
  return (
    <View>
    <View style={styles.container1}>
    <ImageBackground
        source={require('../images/onboarding_bg1.png')} 
        style={styles.bgImage} >

    </ImageBackground>
    </View>
    
    <View style={styles.SignInView}>
    <Pressable 
      style={({ pressed }) => [
        styles.SignInBtn,
        {
          backgroundColor: pressed ? 'lightgray' : 'white', 
          borderColor: pressed ? '#FFAC4E' : '#FFAC4E',
          borderWidth: 3
        },
      ]}
      onPress={() => {
        navigation.navigate('SignIn');
      }}>
      <Text style={styles.text1}>SIGN IN</Text>
    </Pressable>
    </View>

    <View style={styles.SignUpView}>
    <Pressable 
      style={({ pressed }) => [
        styles.SignUpBtn,
        {
          backgroundColor: pressed ? '#FF6464' : '#FFAC4E', 
        },
      ]}
      onPress={() => {
        navigation.navigate('SignUp');
      }}>
      <Text style={styles.text2}>SIGN UP</Text>
    </Pressable>
    </View>
    <View style={styles.taglineView}>
        <Text style={styles.tagline}>Because your pal is our pal!</Text>
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container1: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  bgImage: {
    flex:1,
    resizeMode: 'cover',
    width: '100%',
    height: 500,
  },
  SignInView: {
    alignItems:'center',
    justifyContent: 'center',
    top: "390%",
    borderRadius: 20, 
    paddingHorizontal: 90,
  },
  SignUpView: {
    alignItems:'center',
    justifyContent: 'center',
    borderRadius: 20, 
    paddingHorizontal: "50%",
    top: "400%",

  },
  SignInBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderColor: 'orange',
    borderRadius: 25,
    backgroundColor:"white",
    width:200
  },
  SignUpBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 25,
    backgroundColor:"#FFAC4E",
    width:200,
  },
  text1: {
    fontSize: 18,
    letterSpacing: 0.25,
    color: 'orange',
    fontFamily: 'Poppins-Bold'
  },
  text2: {
    fontSize: 18,
    letterSpacing: 0.25,
    color: 'white',
    fontFamily: 'Poppins-SemiBold'
  },
  tagline: {
    fontFamily: 'Poppins-Medium',
    textAlign: 'center',
    color: '#894848',
  },
  taglineView: {
    alignItems: 'center',
    justifyContent:'center',
    bottom: "-440%",
    
  }
});

export default GettingStarted2;