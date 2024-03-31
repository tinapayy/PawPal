import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  Pressable,
  Text,
  useWindowDimensions,
} from 'react-native';
import constants from '../styles/constants';
import { buttonMixin } from '../components/buttonMixin';
import { alignmentMixin } from '../components/alignmentMixin';
import {useNavigateTo} from '../components/navigation';

const GettingStarted: React.FC = () => {
  const NavGettingStarted2 = useNavigateTo('GettingStarted2');

  return (
    <View style={styles.bigContainer}>
      <View style={styles.corgiCatContainer}>
        <Image
          source={require('../images/corgiCat.png')}
          style={styles.petImage}
          resizeMode="contain"
        />
      </View>

      <View style={styles.buttonView}>
        <View style={styles.taglineView}>
          <Text style={styles.tagline}>
            Your pet’s health is our priority because you care and we care.
          </Text>
        </View>
        <Pressable
          style={({pressed}) => [
            styles.button,
            {
              backgroundColor: pressed ? '#FF6464' : '#FFAC4E',
            },
          ]}
          onPress={NavGettingStarted2}>
          <Text style={styles.buttonText}>Getting Started</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bigContainer: {
    ...alignmentMixin.align,
    flex: 1,
  },
  corgiCatContainer: {
    ...alignmentMixin.align,
    flex: 1,
    width: '100%',
  },
  petImage: {
    backgroundColor: constants.$backgroundColor,
    height: '90%',
    width: '100%',
  },
  taglineView: {
    marginBottom: 30,
  },
  tagline: {
    paddingHorizontal: 70,
    marginVertical: 0,
    textAlign: 'center',
    backgroundColor: constants.$backgroundColor,
    fontSize: constants.$fontSizeSmall,
    fontFamily: constants.$fontFamilyMedium,
    color: constants.$accentColor1,
  },
  buttonView: {
    alignItems: 'center',
    marginBottom: 90,
  },
  button: {
    ...alignmentMixin.align,
    paddingVertical: 12, // Adjust as needed
    paddingHorizontal: 24, // Adjust as needed
    borderRadius: 30,
    elevation: 2,
    backgroundColor: constants.$primaryColor,
    width: '80%', // Adjust as needed
    maxWidth: 200, // Limit maximum width
  },
  buttonText: {
    fontSize: constants.$fontSizeRegular,
    letterSpacing: 0.25,
    color: constants.$textColor2,
    fontFamily: constants.$fontFamilySemiBold,
  },
});

export default GettingStarted;
