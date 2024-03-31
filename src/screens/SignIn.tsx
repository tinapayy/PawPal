import React, {useState} from 'react';
import {
  Alert,
  TouchableOpacity,
  Pressable,
  View,
  StyleSheet,
  Image,
  Text,
  TextInput,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {signInWithEmailAndPassword} from 'firebase/auth';
import {collection, getDocs} from 'firebase/firestore';
import {FIREBASE_AUTH} from '../../firebase.config';
import {FIREBASE_DB} from '../../firebase.config';
import SwitchButton from '../components/SwitchButton';
import {useNavigation} from '@react-navigation/native';
import * as icons from '../imports/icons/icons';
import { buttonMixin } from '../components/buttonMixin';
import { alignmentMixin } from '../components/alignmentMixin';
import constants from '../styles/constants';

const SignIn = () => {
  const navigation = useNavigation();

  const auth = FIREBASE_AUTH;
  const db = FIREBASE_DB;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedUserType, setSelectedUserType] = useState('petOwner');

  const signIn = async () => {
    if (email === 'admin@pawpal.com' && password === 'pawpal') {
      signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          navigation.reset({
            index: 0,
            routes: [{name: 'ApprovalPage'}],
          });
        })
        .catch(error => {
          console.error(error);
          Alert.alert('Error signing in');
        });
    } else {
      try {
        const querySnapshot = await getDocs(collection(db, 'user'));
        let userFound = false;
        querySnapshot.forEach(doc => {
          if (
            doc.data().userType === selectedUserType &&
            doc.data().email === email &&
            doc.data().password === password
          ) {
            userFound = true;
            signInWithEmailAndPassword(auth, email, password)
              .then(() => {
                navigation.reset({
                  index: 0,
                  routes: [{name: 'HomePage'}],
                });
              })
              .catch(error => {
                console.error(error);
                Alert.alert('Error signing in');
              });
          }
        });
        if (!userFound) {
          Alert.alert('User not found');
        }
      } catch (error) {
        console.error(error);
        Alert.alert('Error fetching user data');
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{padding: 0, flex: 1}}>
        <View style={styles.container1}>
          <Image source={require('../images/catBg.png')} style={styles.image} />
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            backgroundColor: 'white',
            borderTopStartRadius: 50,
            borderTopEndRadius: 50,
            top: 285,
            height: 1000,
            elevation: 20,
          }}>
          <SwitchButton
            selectedUserType={selectedUserType}
            setSelectedUserType={setSelectedUserType}
          />
          <View style={styles.signInForm}>
            <Text style={styles.header}>Sign In</Text>
            <View style={styles.inputs}>
              <View style={styles.iconInputRow}>
                <FontAwesomeIcon icon={icons.faEnvelope} style={styles.icon} />
                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  value={email}
                  underlineColorAndroid="orange"
                  onChangeText={text => setEmail(text)}
                />
              </View>
              <View style={styles.iconInputRow}>
                <FontAwesomeIcon icon={icons.faLock} style={styles.icon} />
                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  value={password}
                  secureTextEntry={true}
                  underlineColorAndroid="orange"
                  onChangeText={text => setPassword(text)}
                />
              </View>
            </View>
            <View style={styles.btnContainer}>
              <Pressable
                style={({pressed}) => [
                  styles.button,
                  {
                    backgroundColor: pressed ? '#FF6464' : '#FFAC4E', 
                  },
                ]}
                onPress={signIn}>
                <Text style={styles.text}>Login</Text>
              </Pressable>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
              <Text style={styles.signupText}>
                Do not have an account yet?
                <Text style={styles.signupLink}> Sign Up</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  signupText: {
    alignSelf: 'center',
    fontSize: 14,
    top: '-250%',
    fontFamily: constants.$fontFamily,
  },
  signupLink: {
    fontSize: 14,
    color: constants.$primaryColor,
    fontFamily: constants.$fontFamilySemiBold,
  },
  container: {
    flex: 1,
    backgroundColor: 'orange',
  },
  container1: {
    backgroundColor: constants.$primaryColor,
  },
  signInForm: {
    height: 600,
    top: -55,
  },
  image: {
    width: '100%',
    resizeMode: 'contain',
    bottom: 130,
    zIndex: -1,
  },
  inputs: {
    ...alignmentMixin.alignment,
    justifyContent: undefined,
    height: 100,
    top: '-55%',
    width: '80%',
  },
  btnContainer: {
    top: '10%',
    alignSelf: 'center',
  },
  input: {
    paddingLeft: 40,
    width: '100%',
    top: '-80%',
    height: 40,
    backgroundColor: 'transparent',
    borderWidth: 10,
    marginBottom: 40,
    paddingHorizontal: 25,
    borderColor: 'transparent',
    borderBottomColor: constants.$primaryColor,
  },
  iconInputRow: {
    width: '100%',
    top: '200%',
    height: 40,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderRadius: 5,
    marginBottom: '13%',
    paddingHorizontal: '5%',
    borderColor: 'transparent',
    borderBottomColor: constants.$primaryColor,
    justifyContent: 'space-between',
  },
  icon: {
    left: '2%',
    color: constants.$primaryColor,
  },
  text: {
    fontSize: 18,
    letterSpacing: 0.25,
    color: constants.$textColor2,
    alignSelf: 'center',
    fontFamily: constants.$fontFamilySemiBold,
  },
  button: {
    ...alignmentMixin.alignment,
    ...buttonMixin.button,
    paddingVertical: '2%',
    width: 340,
    top: '-290%',
  },
  header: {
    position: 'absolute',
    alignContent: 'flex-end',
    zIndex: 1,
    fontSize: 50,
    fontFamily: constants.$fontFamilySemiBold,
    color: constants.$secondaryColor,
    top:'-55%',
    left: '7%',
  },
});

export default SignIn;