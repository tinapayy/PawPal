import React from 'react';
import {View, StyleSheet} from 'react-native';
import LottieView from 'lottie-react-native';
import {
  Text,
} from 'react-native';
import constants from '../styles/constants';

const LoadingScreen = () => {
  return (
    <View style={styles.container}>
      <LottieView
        source={require('../styles/pawpalLoading.json')} // Replace with your animation file
        autoPlay
        loop
        style={{width: 100, height: 100, resizemode: 'contain'}}
      />
      <Text style={styles.loadtext}>Loading...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  loadtext:
  {
    fontSize: 20,
    fontWeight: 'bold',
    color: constants.$senaryColor
  }
});

export default LoadingScreen;
