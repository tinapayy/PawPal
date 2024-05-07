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
import * as icons from '../imports/icons/icons';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {collection, addDoc} from 'firebase/firestore';
import {FIREBASE_AUTH, FIREBASE_DB} from '../../firebase.config';
import SwitchButton from '../components/SwitchButton';
import {useNavigation} from '@react-navigation/native';
import constants from '../styles/constants';
import {useNavigateTo} from '../components/navigation';
import CustomAlert from '../components/CustomAlert';


const SignIn = () => {
  type Nav = {
    reset: (value: any) => void;
  };
  const {reset} = useNavigation<Nav>();
  const NavSignIn = useNavigateTo('SignIn');
  const AddUser = useNavigateTo('AddUserProfile');
  const AddClinic = useNavigateTo('AddClinicDetails');

  const auth = FIREBASE_AUTH;
  const db = FIREBASE_DB;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [selectedUserType, setSelectedUserType] = useState('petOwner');
  const [showAlert, setShowAlert] = useState({
    visible: false,
    title: '',
    message: '',
  });
  const [showAlert1, setShowAlert1] = useState({
    visible: false,
    title: '',
    message: '',
  });
  const [showAlert2, setShowAlert2] = useState({
    visible: false,
    title: '',
    message: '',
  });

  const signUp = async () => {
    try {
      if (password !== confirmPassword) {
        setShowAlert({
          visible: true,
          title: 'Action Incomplete',
          message: 'Password do not match.'
      });
        return;
      }
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      console.log(response);
      const userDoc: {
        userId: string;
        name: string;
        email: string;
        password: string;
        userType: string;
        bio?: string;
        pet?: any[];
        clinicPicture?: any;
        services?: string;
        contactInfo?: string;
        about?: string;
        storeHours?: string;
      } = {
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
      // still not showing //
      setShowAlert({
        visible: true,
        title: 'Action Completed',
        message: 'User created successfully.'
    });
     //  Alert.alert('User created successfully');
      console.log('Document written with ID: ', docRef.id);
      if (response) {
        if (selectedUserType === 'petOwner') {
          setShowAlert1({
            visible: true,
            title: 'Action Completed',
            message: 'User created successfully.',
        });
          // reset({
          //   index: 0,
          //   routes: [{name: 'AddUserProfile'}],
          // });
        } else if (selectedUserType === 'clinic') {
          setShowAlert2({
            visible: true,
            title: 'Action Completed',
            message: 'User created successfully.',
        });
          // reset({
          //   index: 0,
          //   routes: [{name: 'AddClinicDetails'}],
          // });
        }
      }
    } catch (error: any) {
      //console.error(error);
      setShowAlert({
        visible: true,
        title: 'Action Incomplete',
        message: (error.message),
    });
      //Alert.alert(error.message);
    }
  };

  return (
    <SafeAreaView style={styles.bigContainer}>
      <View style={{padding: 0, flex: 1}}>
        <Image source={require('../images/catBg.png')} style={styles.image} />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.whiteContainer}>

          <SwitchButton
            selectedUserType={selectedUserType}
            setSelectedUserType={setSelectedUserType}
          />
          <View style={styles.signInForm}>
            <Text style={styles.header}>Sign Up</Text>
            <View style={styles.inputsGroup}>
              <View style={styles.iconInputRow}>
                <FontAwesomeIcon icon={icons.faUser} style={styles.icon} />
                <TextInput
                  style={styles.input}
                  placeholder="Name"
                  value={name}
                  underlineColorAndroid="orange"
                  onChangeText={text => setName(text)}
                />
              </View>
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
              <View style={styles.iconInputRow}>
                <FontAwesomeIcon icon={icons.faLock} style={styles.icon} />
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
                  styles.signUpButton,
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
        <TouchableOpacity onPress={NavSignIn}>
          <Text style={styles.loginText}>
            Already have an account?{' '}
            <Text style={styles.loginLink}>Log In</Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>
      <CustomAlert
            visible={showAlert.visible} // Pass the state to control visibility
            title={showAlert.title} // Pass the title from showAlert
            message={showAlert.message} // Pass the message from showAlert
            onClose={() => setShowAlert({visible: false, title: '', message: ''})} // Close the alert on button press
          />
      <CustomAlert
            visible={showAlert1.visible} // Pass the state to control visibility
            title={showAlert1.title} // Pass the title from showAlert
            message={showAlert1.message} // Pass the message from showAlert
            onClose={() => {
              setShowAlert1({ visible: false, title: '', message: '' });
              {AddUser}; // Navigate to a different page
          }}
          />
      <CustomAlert
            visible={showAlert2.visible} // Pass the state to control visibility
            title={showAlert2.title} // Pass the title from showAlert
            message={showAlert2.message} // Pass the message from showAlert
            onClose={() => {
              setShowAlert2({ visible: false, title: '', message: '' });
              {AddClinic}; // Navigate to a different page
          }}
          />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  bigContainer: {
    flex: 1,
    backgroundColor: constants.$primaryColor,
  },
  whiteContainer: {
    backgroundColor: constants.$tertiaryColor,
    borderTopStartRadius: 50,
    borderTopEndRadius: 50,
    top: '28%',
    height: 1000,
  },
  loginText: {
    alignSelf: 'center',
    fontSize: constants.$fontSizeSmall,
    bottom: 200,
    fontFamily: constants.$fontFamily,
  },
  loginLink: {
    fontSize: 14,
    color: constants.$primaryColor,
    fontFamily: constants.$fontFamilySemiBold,
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
  inputsGroup: {
    flex: 1,
    alignItems: 'center',
    alignSelf: 'center',
    width: '80%',
    bottom: '40%',
  },
  iconInputRow: {
    width: '100%',
    height: 40,
    borderWidth: 2,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderColor: 'transparent',
    borderBottomColor: constants.$primaryColor,
    justifyContent: 'space-between',
  },
  icon: {
    top: '63%',
    marginRight: 10,
    paddingHorizontal: 12,
    color: constants.$primaryColor,
  },
  btnContainer: {
    bottom: '333%',
    alignSelf: 'center',
  },
  input: {
    width: '100%',
    height: 40,
    borderRadius: 5,
    marginBottom: 30,
    paddingHorizontal: 25,
    paddingBottom: 15,
    borderColor: 'transparent',
    borderBottomColor: constants.$primaryColor,
  },
  text: {
    fontSize: constants.$fontSizeRegular,
    letterSpacing: 0.25,
    color: constants.$textColor2,
    alignSelf: 'center',
    fontFamily: constants.$fontFamilySemiBold,
  },
  signUpButton: {
    alignSelf: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 25,
    elevation: 3,
    backgroundColor: constants.$primaryColor,
    width: 340,
    top: 1550,
    zIndex: 5,
  },
  header: {
    bottom: '53%',
    zIndex: 1,
    fontSize: 50,
    fontFamily: constants.$fontFamilySemiBold,
    color: constants.$secondaryColor,
    left: 40,
  },
});

export default SignIn;
