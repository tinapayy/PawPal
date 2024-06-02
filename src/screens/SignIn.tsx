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
import constants from '../styles/constants';
import {useNavigateTo} from '../components/navigation';
import CustomAlert from '../components/CustomAlert';

const SignIn = () => {
  type Nav = {
    reset: (value: any) => void;
  };
  const {reset} = useNavigation<Nav>();
  const NavSignUp = useNavigateTo('SignUp');

  const auth = FIREBASE_AUTH;
  const db = FIREBASE_DB;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedUserType, setSelectedUserType] = useState('petOwner');
  const [isSecureEntry, setIsSecureEntry] = useState(true);
  const [showAlert, setShowAlert] = useState({
    visible: false,
    title: '',
    message: '',
  });

  const signIn = async () => {
    if (email === 'admin@pawpal.com' && password === 'pawpal') {
      signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          reset({
            index: 0,
            routes: [{name: 'ApprovalPage'}],
          });
        })
        .catch(error => {
          setShowAlert({
            visible: true,
            title: 'Action Incomplete',
            message: 'Error signing in.',
          });
          //console.error(error);
          //Alert.alert('Error signing in');
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
                reset({
                  index: 0,
                  routes: [{name: 'HomePage'}],
                });
              })
              .catch(error => {
                setShowAlert({
                  visible: true,
                  title: 'Action Incomplete',
                  message: 'Error signing in.',
                });
                //console.error(error);
                //Alert.alert('Error signing in');
              });
          }
        });
        if (!userFound) {
          setShowAlert({
            visible: true,
            title: 'Action Incomplete',
            message: 'Please enter correct details.',
          });
        }
      } catch (error) {
        setShowAlert({
          visible: true,
          title: 'Action Incomplete',
          message: 'Error fetching user data.',
        });
        //console.error(error);
        //Alert.alert('Error fetching user data');
      }
    }
  };

  return (
    <SafeAreaView style={styles.bigContainer}>
      <View style={{padding: 0, flex: 1}}>
        <View style={styles.catBgContainer}>
          <Image source={require('../images/catBg.png')} style={styles.image} />
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.switchButtonContainer}>
          <SwitchButton
            selectedUserType={selectedUserType}
            setSelectedUserType={setSelectedUserType}
          />
          <View style={styles.signInForm}>
            <Text style={styles.header}>Sign In</Text>
            <View style={styles.inputsGroup}>
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

                {/* //password starts here  */}
                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  value={password}
                  // secureTextEntry={true}
                  secureTextEntry={isSecureEntry}
                  onChangeText={text => setPassword(text)}
                  underlineColorAndroid="orange"
                />
                {/* toggle show and hide */}
                <TouchableOpacity
                  onPress={() => {
                    setIsSecureEntry(prev => !prev);
                  }}
                  style={styles.showButton}>
                  {/* icon eye open and slash */}
                  <FontAwesomeIcon
                    icon={isSecureEntry ? icons.faEye : icons.faEyeSlash}
                    style={styles.eyeicon}
                    size={18}
                  />
                </TouchableOpacity>
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
            <TouchableOpacity onPress={NavSignUp}>
              <Text style={styles.signupText}>
                Do not have an account yet?
                <Text style={styles.signupLink}> Sign Up</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <CustomAlert
        visible={showAlert.visible} // Pass the state to control visibility
        title={showAlert.title} // Pass the title from showAlert
        message={showAlert.message} // Pass the message from showAlert
        onClose={() => setShowAlert({visible: false, title: '', message: ''})} // Close the alert on button press
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  bigContainer: {
    flex: 1,
    backgroundColor: constants.$primaryColor,
  },
  signupText: {
    alignSelf: 'center',
    fontSize: constants.$fontSizeSmall,
    bottom: 530,
    fontFamily: constants.$fontFamily,
  },
  signupLink: {
    fontSize: constants.$fontSizeSmall,
    color: constants.$primaryColor,
    fontFamily: constants.$fontFamilySemiBold,
  },
  catBgContainer: {
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

  switchButtonContainer: {
    backgroundColor: constants.$backgroundColor,
    borderTopStartRadius: 50,
    borderTopEndRadius: 50,
    top: 285,
    height: 1000,
    elevation: 20,
  },
  btnContainer: {
    button: -60,
    alignSelf: 'center',
  },
  signInText: {
    fontSize: constants.$fontSizeLarge,
    marginBottom: 10,
  },
  inputsGroup: {
    flex: 1,
    alignItems: 'center',
    alignSelf: 'center',
    width: '80%',
    bottom: '40%',
  },
  input: {
    paddingLeft: 40,
    width: '100%',
    height: 40,
    borderRadius: 5,
    marginBottom: 30,
    paddingHorizontal: 25,
    paddingBottom: 15,
    borderColor: 'transparent',
    borderBottomColor: constants.$primaryColor,
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
    top: '65%',
    marginRight: 10,
    paddingHorizontal: 12,
    color: constants.$primaryColor,
  },
  text: {
    fontSize: constants.$fontSizeRegular,
    letterSpacing: constants.$spacingLetter,
    color: constants.$textColor2,
    alignSelf: 'center',
    fontFamily: constants.$fontFamilySemiBold,
  },
  button: {
    alignSelf: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 25,
    elevation: 3,
    backgroundColor: constants.$primaryColor,
    width: 340,
    bottom: 550,
  },
  header: {
    bottom: '53%',
    zIndex: 1,
    fontSize: 50,
    fontFamily: constants.$fontFamilySemiBold,
    color: constants.$secondaryColor,
    left: 40,
  },
  // button for password toggle
  showButton: {
    // backgroundColor: 'black',
    // padding:'5%',
    width: '5%',
    left: '89%',
    position: 'relative',
    alignItems: 'flex-end',
    zIndex: 5,
    top: '-165%',
  },
  eyeicon: {
    color: constants.$primaryColor,
  },
});

export default SignIn;
