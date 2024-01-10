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
import {
  faUser,
  faLock,
  faEnvelope,
} from '@fortawesome/free-solid-svg-icons';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {collection, addDoc} from 'firebase/firestore';
import {FIREBASE_AUTH, FIREBASE_DB} from '../../firebase.config';
import SwitchButton from '../components/SwitchButton';
import {useNavigation} from '@react-navigation/native';

const SignIn = () => {
  const navigation = useNavigation();

  const auth = FIREBASE_AUTH;
  const db = FIREBASE_DB;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [selectedUserType, setSelectedUserType] = useState('petOwner');

  const signUp = async () => {
    try {
      if (password !== confirmPassword) {
        Alert.alert('Password do not match');
        return;
      }
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      console.log(response);
      const userDoc = {
        userId: response.user.uid,
        name: name,
        email: email,
        password: password,
        userType: selectedUserType,
      };

      if (selectedUserType === 'petOwner') {
        // Adds bio empty field to userDoc when user type is pet owner
        userDoc.bio = '';
        userDoc.pet = [];
      } else if (selectedUserType === 'clinic') {
        // Adds contact# and about fields to userDoc  when user type is clinic
        userDoc.clinicPicture = null;
        userDoc.services = '';
        userDoc.contactInfo = '';
        userDoc.about = '';
        userDoc.storeHours = '';
      }

      const docRef = await addDoc(collection(db, 'user'), userDoc);
      Alert.alert('User created successfully');
      console.log('Document written with ID: ', docRef.id);
      if (response) {
        if (selectedUserType === 'petOwner') {
          navigation.reset({
            index: 0,
            routes: [{name: 'AddUserProfile'}],
          });
        } else if (selectedUserType === 'clinic') {
          navigation.reset({
            index: 0,
            routes: [{name: 'AddClinicDetails'}],
          });
        }
      }
    } catch (error: any) {
      console.error(error);
      Alert.alert(error.message);
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
            <Text style={styles.header}>Sign Up</Text>
            <View style={styles.inputs}>
              <View style={styles.iconInputRow}>
                <FontAwesomeIcon icon={faUser} style={styles.icon} />
                <TextInput
                  style={styles.input}
                  placeholder="Name"
                  value={name}
                  underlineColorAndroid="orange"
                  onChangeText={text => setName(text)}
                />
              </View>
              <View style={styles.iconInputRow}>
                <FontAwesomeIcon icon={faEnvelope} style={styles.icon} />
                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  value={email}
                  underlineColorAndroid="orange"
                  onChangeText={text => setEmail(text)}
                />
              </View>
              <View style={styles.iconInputRow}>
                <FontAwesomeIcon icon={faLock} style={styles.icon} />
                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  value={password}
                  secureTextEntry={true}
                  underlineColorAndroid="orange"
                  onChangeText={text => setPassword(text)}
                />
              </View>
              <View style={styles.iconInputRow}>
                <FontAwesomeIcon icon={faLock} style={styles.icon} />
                <TextInput
                  style={styles.input}
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  secureTextEntry={true}
                  underlineColorAndroid="orange"
                  onChangeText={text => setConfirmPassword(text)}
                />
              </View>
            </View>
            <View style={styles.btnContainer}>
              <Pressable
                style={({pressed}) => [
                  styles.button,
                  {
                    backgroundColor: pressed ? '#FF6464' : '#FFAC4E', // Change color when pressed
                  },
                ]}
                onPress={signUp}>
                <Text style={styles.text}>Create account</Text>
              </Pressable>
            </View>
          </View>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
          <Text style={styles.loginText}>
            Already have an account?{' '}
            <Text style={styles.loginLink}>Log In</Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  loginText: {
    alignSelf: 'center',
    fontSize: 14,
    top: -200,
    fontFamily: 'Poppins-Regular',
  },
  loginLink: {
    fontSize: 14,
    color: '#FFAC4E',
    fontFamily: 'Poppins-SemiBold',
  },
  container: {
    flex: 1,
    backgroundColor: 'orange',
  },
  container1: {
    backgroundColor: 'orange',
  },
  container2: {
    height: 1000,
    bottom: 330,
    backgroundColor: 'white',
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
    paddingVertical: 50,
    paddingHorizontal: 30,
    elevation: 15,
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
    width: '80%',
    top: '-93%',
    alignItems: 'center',
    height: 100,
    alignSelf: 'center',
  },
  iconInputRow: {
    width: '100%',
    top: 200,
    height: 40,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderColor: 'transparent',
    borderBottomColor: 'orange',
    justifyContent: 'space-between',
  },
  icon: {
    top: '630%',
    marginRight: 10,
    paddingHorizontal: 12,
    color: 'orange',
  },
  btnContainer: {
    bottom: '-24%',
    alignSelf: 'center',
  },
  signInText: {
    fontSize: 20,
    marginBottom: 10,
  },
  input: {
    width: '100%',
    top: 200,
    height: 40,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderRadius: 5,
    marginBottom: 30,
    paddingHorizontal: 25,
    borderColor: 'transparent',
    borderBottomColor: 'orange',
  },
  text: {
    fontSize: 18,
    letterSpacing: 0.25,
    color: 'white',
    alignSelf: 'center',
    fontFamily: 'Poppins-SemiBold',
  },
  button: {
    alignSelf: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 25,
    elevation: 3,
    backgroundColor: '#FFAC4E',
    width: 340,
    top: -140,
  },
  header: {
    position: 'absolute',
    alignContent: 'flex-end',
    zIndex: 1,
    fontSize: 50,
    fontFamily: 'Poppins-SemiBold',
    color: '#5A2828',
    top: -323,
    left: 40,
  },
});

export default SignIn;