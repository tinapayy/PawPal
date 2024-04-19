import React from 'react';
import {View, StyleSheet, Pressable, Text, ImageBackground, ViewStyle} from 'react-native';
import {useNavigateTo} from '../components/navigation';
import constants from '../styles/constants';
import {alignmentMixin} from '../components/alignmentMixin';

const GettingStarted2 = () => {
  const NavSignIn = useNavigateTo('SignIn');
  const NavSignUp = useNavigateTo('SignUp');

  return (
    <View style={styles.bigContainer}>
      <View style={styles.bigContainer}>
        <ImageBackground
          source={require('../images/onboarding_bg1.png')}
          style={styles.bgImage}></ImageBackground>
      </View>

      <View style={styles.signInView}>
        <Pressable
          style={({pressed}) => [
            styles.signInButton,
            {
              backgroundColor: pressed ? 'lightgray' : 'white',
              borderColor: pressed ? '#FFAC4E' : '#FFAC4E',
              borderWidth: 3,
            },
          ]}
          onPress={NavSignIn}>
          <Text style={styles.signInText}>SIGN IN</Text>
        </Pressable>
      </View>

      <View style={styles.signUpView}>
        <Pressable
          style={({pressed}) => [
            styles.signUpButton,
            {
              backgroundColor: pressed ? '#FF6464' : '#FFAC4E',
            },
          ]}
          onPress={NavSignUp}>
          <Text style={styles.signUpText}>SIGN UP</Text>
        </Pressable>
      </View>
      <View style={styles.taglineView}>
        <Text style={styles.tagline}>Because your pal is our pal!</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bigContainer: {
    flex: 1,
  },
  bgImage: {
    flex: 1,
    resizeMode: 'cover',
    width: '100%',
    height: 500,
  },
  signInView: {
    ...alignmentMixin.align,
    borderRadius: 20,
    paddingHorizontal: '50%',
    bottom: '28%',
  } as ViewStyle,
  signUpView: {
    ...alignmentMixin.align,
    borderRadius: 20,
    bottom: '25%',
  } as ViewStyle,
  signInButton: {
    ...alignmentMixin.align,
    paddingVertical: 8,
    borderColor: constants.$primaryColor,
    borderRadius: 25,
    backgroundColor: constants.$tertiaryColor,
    width: 200,
    elevation: 2,
  } as ViewStyle,
  signUpButton: {
    ...alignmentMixin.align,
    paddingVertical: 8,
    borderRadius: 25,
    backgroundColor: constants.$primaryColor,
    width: 200,
    elevation: 2,
  } as ViewStyle,

  // APPLY DRY to repetitive text styles
  signInText: {
    fontSize: 18,
    letterSpacing: constants.$spacingLetter,
    color: constants.$primaryColor,
    fontFamily: constants.$fontFamilyBold,
  },
  signUpText: {
    fontSize: constants.$fontSizeRegular,
    letterSpacing: constants.$spacingLetter,
    color: constants.$textColor2,
    fontFamily: constants.$fontFamilyBold,
  },
  tagline: {
    fontFamily: constants.$fontFamilyMedium,
    textAlign: 'center',
    color: constants.$accentColor1,
  },
  taglineView: {
    ...alignmentMixin.align,
    bottom: '17%',
  } as ViewStyle,
});

export default GettingStarted2;