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
  faArrowLeft,
  faCirclePlus,
  faCheckCircle,
  faEnvelope,
  faAddressCard,
} from '@fortawesome/free-solid-svg-icons';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {collection, addDoc} from 'firebase/firestore';
import {FIREBASE_AUTH, FIREBASE_DB} from '../../firebase.config';
import MyComponent from '../components/SegmentedButton';
import SwitchButton, {getUserType} from '../components/SwitchButton';
import {useNavigation} from '@react-navigation/native';

const SignIn = () => {
  const navigation = useNavigation();

  const auth = FIREBASE_AUTH;
  const db = FIREBASE_DB;

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const signUp = async () => {
    try {
      setLoading(true);
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
      const userDoc= {
        userId: response.user.uid,
        username: username,
        email: email,
        password: password,
        userType: getUserType(),
      };
      
      if (getUserType() === 'petOwner') {         // Adds bio empty field to userDoc when user type is pet owner
        userDoc.name = '';
        userDoc.bio = ''; 
      } else if (getUserType() === 'clinic') {    // Adds contact# and about fields to userDoc  when user type is clinic
        userDoc.picture = null;
        userDoc.services = '';
        userDoc.phoneInfo = ''; 
        userDoc.about = ''; 
        userDoc.storeHours = '';
      }
      
      const docRef = await addDoc(collection(db, 'user'), userDoc);
      Alert.alert('User created successfully');
      console.log('Document written with ID: ', docRef.id);
      if (response) {
        if (getUserType() === 'petOwner') {
          navigation.reset({
            index: 0,
            routes: [{name: 'UserProfile'}],
          });
        } else if (getUserType() === 'clinic') {
          navigation.reset({
            index: 0,
            routes: [{name: 'ClinicDetails'}],
          });
        }
      }
    } catch (error: any) {
      console.error(error);
      Alert.alert(error.message);
    }
    setLoading(false);
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
            top: 305,
            height: 1000,
            elevation: 20,
          }}>
          <SwitchButton />
          <View style={styles.signInForm}>
            <Text style={styles.header}>Sign Up</Text>
            <View style={styles.inputs}>
              <View style={styles.iconInputRow}>
                <FontAwesomeIcon icon={faUser} style={styles.icon} />
                <TextInput
                  style={styles.input}
                  placeholder="Username"
                  value={username}
                  underlineColorAndroid="orange"
                  onChangeText={text => setUsername(text)}
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
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
    // top: -300,
    // width: '80%',
    alignSelf: 'center',
  },
  iconInputRow: {
    // flexDirection: 'row',
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
    // top:"-40%",
    top: '630%',
    marginRight: 10,
    paddingHorizontal: 12,
    color: 'orange',
  },
  btnContainer: {
    // top: "200%",
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
