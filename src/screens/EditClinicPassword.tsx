import React, {useEffect, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {
  View,
  TextInput,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  ImageBackground,
  Alert,
  Dimensions,
  ViewStyle,
  TextStyle,
} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import * as icons from '../imports/icons/icons';
import {useNavigation} from '@react-navigation/native';
import {
  FIREBASE_AUTH,
  FIREBASE_DB,
  FIREBASE_STORAGE,
} from '../../firebase.config';
import {
  reauthenticateWithCredential,
  EmailAuthProvider,
  updatePassword,
} from 'firebase/auth';
import {getDocs, collection, updateDoc, doc} from 'firebase/firestore';
import {ref, uploadBytes, getDownloadURL} from 'firebase/storage';
import {launchImageLibrary} from 'react-native-image-picker';
import constants from '../styles/constants';
import {alignmentMixin} from '../components/alignmentMixin';
import {buttonMixin} from '../components/buttonMixin';
import {addPetMixins} from '../styles/mixins/addPetMixins';
import LoadingScreen from '../components/loading';
import CustomAlert from '../components/CustomAlert';

const EditClinicPassword = () => {
  const navigation = useNavigation();

  const auth = FIREBASE_AUTH;
  const db = FIREBASE_DB;
  const [loading, setLoading] = useState(true);
  const [isSecureEntry, setIsSecureEntry] = useState(true);

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

  const [currentName, setCurrentName] = useState('');
  const [currentBio, setCurrentBio] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);


  const uploadProfilePicture = async () => {
    try {
      if (profilePicture) {
        const metadata = {
          contentType: 'image/jpeg', // Adjust the content type based on your image type
        };

        const storage = FIREBASE_STORAGE;
        const storageRef = ref(
          storage,
          `profilePicture/${auth.currentUser?.uid}.jpeg`,
        );

        // Convert image URI to Blob
        const response = await fetch(profilePicture);
        const blob = await response.blob();

        // Upload the image to Firebase Storage
        await uploadBytes(storageRef, blob, metadata);

        // Get the download URL of the uploaded image
        const imageUrl = await getDownloadURL(storageRef);

        // Update the user profile in Firestore with the new image URL
        const userQuery = await getDocs(collection(db, 'user'));
        userQuery.forEach(async currentDoc => {
          if (currentDoc.data().userId === auth.currentUser?.uid) {
            const userRef = doc(collection(db, 'user'), currentDoc.id);
            const updateData = {
              name: currentDoc.data().name,
              bio: currentDoc.data().bio,
              password: currentDoc.data().password,
              profilePicture: imageUrl, // Add the profile image URL to the user data
            };

            try {
              await updateDoc(userRef, updateData);
            } catch (updateError) {
              setShowAlert({
                visible: true,
                title: 'Action Incomplete',
                message: 'Error updating profile. Please try again.',
              });
              //console.error('Error updating profile:', updateError);
              //Alert.alert('Error updating profile. Please try again.');
            }
          }
        });
      } else {
        //   setShowAlert({
        //     visible: true,
        //     title: 'Action Incomplete',
        //     message: 'Please select a profile picture.'
        // });
        //   Alert.alert('Please select a profile picture');
        return;
      }
    } catch (error) {
      setShowAlert({
        visible: true,
        title: 'Action Incomplete',
        message: 'Error updating profile picture. Please try again.',
      });
      //console.error('Error uploading profile picture:', error);
      //Alert.alert('Error updating profile picture. Please try again.');
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'user'));
        querySnapshot.forEach(doc => {
          if (doc.data().userId === auth.currentUser?.uid) {
            setCurrentName(doc.data().name);
            setCurrentBio(doc.data().bio);
            setProfilePicture(doc.data().profilePicture);
          }
        });
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const reauthenticateUser = async (currentPassword: string) => {
    const user = auth.currentUser;

    // Create a credential with the user's current email and password
    const credential = EmailAuthProvider.credential(
      user.email,
      currentPassword,
    );

    try {
      // Reauthenticate the user with the provided credential
      await reauthenticateWithCredential(user, credential);
      console.log('User reauthenticated successfully');
      return true; // Reauthentication successful
    } catch (error) {
      //console.error('Error reauthenticating user:', error);
      return false; // Reauthentication failed
    }
  };

  const verifySignUp = (password: string) => {
    if (!password || !confirmPassword) {
      setShowAlert({
        visible: true,
        title: 'Action Incomplete',
        message: 'Please fill in all fields.',
      });
      return false;
    }
    if (password.length < 8) {
      setShowAlert({
        visible: true,
        title: 'Action Incomplete',
        message: 'Password should be atleast 8 characters.',
      });
      return false;
    }
    if (!/(?=.*\d)/.test(password)) {
      setShowAlert({
        visible: true,
        title: 'Action Incomplete',
        message: 'Password should contain atleast 1 number.',
      });
      return false;
    }
    if (!/(?=.*[a-z])/.test(password)) {
      setShowAlert({
        visible: true,
        title: 'Action Incomplete',
        message: 'Password should contain atleast 1 lowercase letter.',
      });
      return false;
    }
    if (!/(?=.*[A-Z])/.test(password)) {
      setShowAlert({
        visible: true,
        title: 'Action Incomplete',
        message: 'Password should contain atleast 1 uppercase letter.',
      });
      return false;
    }
    if (!/(?=.*[!@#$%^&*])/.test(password)) {
      setShowAlert({
        visible: true,
        title: 'Action Incomplete',
        message: 'Password should contain atleast 1 special character.',
      });
      return false;
    }
    if (password !== confirmPassword) {
      setShowAlert({
        visible: true,
        title: 'Action Incomplete',
        message: 'Password do not match.',
      });
      return false;
    }
    return true;
  };

  const updateProfile = async () => {
    if (currentName === '') {
      setShowAlert({
        visible: true,
        title: 'Action Incomplete',
        message: 'Please enter a name.',
      });
      //Alert.alert('Please enter a name');
      return;
    }
    try {
      const userQuery = await getDocs(collection(db, 'user'));
      userQuery.forEach(async currentDoc => {
        if (currentDoc.data().userId === auth.currentUser?.uid) {
          const userRef = doc(collection(db, 'user'), currentDoc.id);
          const updateData = {
            name: currentName,
            bio: currentBio ? currentBio : '',
            password: currentDoc.data().password,
          };
          if (currentPassword !== '') {
            // Reauthenticate the user before changing the password
            const isReauthenticated = await reauthenticateUser(currentPassword);
            if (!isReauthenticated) {
              setShowAlert({
                visible: true,
                title: 'Action Incomplete',
                message: 'Current password is incorrect.',
              });
              //Alert.alert('Current password is incorrect');
              return;
            }
            try {
              if (!verifySignUp(newPassword)) {
                return;
              }
              updateData.password = newPassword;
              // Update the user document with new profile data and potentially new password
              await updateDoc(userRef, updateData);
              navigation.navigate('Profile Details');
              // Update the password after successfully updating the profile
              try {
                await updatePassword(auth.currentUser!, newPassword);
                setShowAlert({
                  visible: true,
                  title: 'Action Completed',
                  message: 'Profile and password updated successfully.',
                });
                //Alert.alert('Profile and password updated successfully');
              } catch (error) {
                setShowAlert({
                  visible: true,
                  title: 'Action Incomplete',
                  message: 'Error updating password. Please try again.',
                });
                //console.error('Error updating password:', error);
                //Alert.alert('Error updating password. Please try again.');
              }
            } catch (updateError) {
              setShowAlert({
                visible: true,
                title: 'Action Incomplete',
                message: 'Error updating profile. Please try again.',
              });
              //console.error('Error updating profile:', updateError);
              //Alert.alert('Error updating profile. Please try again.');
            }
          } else {
            // If no current password provided, update the profile without updating the password
            try {
              await updateDoc(userRef, updateData);
              setShowAlert1({
                visible: true,
                title: 'Action Completed',
                message: 'Profile updated successfully.',
              });
              //Alert.alert('Profile updated successfully');
              //navigation.navigate('Profile Details');
            } catch (updateError) {
              setShowAlert({
                visible: true,
                title: 'Action Incomplete',
                message: 'Error updating profile. Please try again.',
              });
              //console.error('Error updating profile:', updateError);
              //Alert.alert('Error updating profile. Please try again.');
            }
          }
        }
      });
    } catch (error) {
      setShowAlert({
        visible: true,
        title: 'Action Incomplete',
        message: 'Error updating profile. Please try again.',
      });
      //console.error('Error querying user data:', error);
      //Alert.alert('Error updating profile. Please try again.');
    }
  };

  const imageSizePercentage = 30;
  const imageSize =
    Dimensions.get('window').width * (imageSizePercentage / 100);
  const borderRadius = imageSize / 2;

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <ImageBackground
      source={require('../images/real_bg.png')}
      style={styles.backgroundImage1}>
      <View style={styles.container}>
        <View style={styles.back}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <FontAwesomeIcon
              icon={icons.faArrowLeft}
              style={styles.backIcon}
              size={25}
            />
          </TouchableOpacity>
          <Text style={styles.backText}>Edit Clinic Password</Text>
        </View>
        <View style={styles.formContainer}>
          <View style={styles.iconInputRow}>
            <FontAwesomeIcon icon={icons.faEnvelope} style={styles.icon} />
            <Text style={styles.input}>{auth.currentUser?.email}</Text>
          </View>
          <View style={styles.iconInputRow}>
            <FontAwesomeIcon icon={icons.faUser} style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder={currentName ? currentName : 'Name'}
              value={currentName}
              onChangeText={text => setCurrentName(text)}
            />
          </View>

          <View style={styles.changePassword} />
          <Text style={styles.changePassword}>Change Password</Text>
          <View style={styles.iconInputRow}>
            <FontAwesomeIcon icon={icons.faLock} style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Current Password"
              secureTextEntry
              value={currentPassword}
              onChangeText={text => setCurrentPassword(text)}
            />
            {/* toggle show and hide */}
            <TouchableOpacity
              onPress={() => {
                setIsSecureEntry((prev) => !prev);
              }}
              style={styles.showButton}
            >
              {/* icon eye open and slash */}
              <FontAwesomeIcon icon={isSecureEntry ? icons.faEye : icons.faEyeSlash} style={styles.eyeicon} size={18} />
            </TouchableOpacity>
          </View>
          <View style={styles.iconInputRow}>
            <FontAwesomeIcon icon={icons.faUserLock} style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="New Password"
              secureTextEntry
              value={newPassword}
              onChangeText={text => setNewPassword(text)}
            />
            {/* toggle show and hide */}
            <TouchableOpacity
              onPress={() => {
                setIsSecureEntry((prev) => !prev);
              }}
              style={styles.showButton}
            >
              {/* icon eye open and slash */}
              <FontAwesomeIcon icon={isSecureEntry ? icons.faEye : icons.faEyeSlash} style={styles.eyeicon} size={18} />
            </TouchableOpacity>
          </View>
          <View style={styles.iconInputRow}>
            <FontAwesomeIcon icon={icons.faCheckCircle} style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              secureTextEntry
              value={confirmPassword}
              onChangeText={text => setConfirmPassword(text)}
            />
            {/* toggle show and hide */}
            <TouchableOpacity
              onPress={() => {
                setIsSecureEntry((prev) => !prev);
              }}
              style={styles.showButton}
            >
              {/* icon eye open and slash */}
              <FontAwesomeIcon icon={isSecureEntry ? icons.faEye : icons.faEyeSlash} style={styles.eyeicon} size={18} />
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.saveButton}
              onPress={() => {
                updateProfile();
                uploadProfilePicture();
              }}
              accessible={true}
              accessibilityRole="button">
              <LinearGradient
                colors={[constants.$backgroundColor1, constants.$accentColor]}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                style={styles.gradientBackground}>
                <Text style={styles.buttonSave}>Save Changes</Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => navigation.goBack()}
              accessible={true}
              accessibilityRole="button">
              <Text style={styles.buttonTextCancel}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <CustomAlert
        visible={showAlert1.visible} // Pass the state to control visibility
        title={showAlert1.title} // Pass the title from showAlert
        message={showAlert1.message} // Pass the message from showAlert
        onClose={() => {
          setShowAlert1({visible: false, title: '', message: ''});
          navigation.navigate('Profile Details'); // Navigate to a different page
        }} // Close the alert on button press
      />
      <CustomAlert
        visible={showAlert.visible} // Pass the state to control visibility
        title={showAlert.title} // Pass the title from showAlert
        message={showAlert.message} // Pass the message from showAlert
        onClose={() => {
          setShowAlert({visible: false, title: '', message: ''});
        }} // Close the alert on button press
      />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage1: {
    flex: 1,
    width: '100%',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    // padding: 66,
  },
  back: {
    flexDirection: 'row',
    marginBottom: '2%',
    top: '-32%',
    left: '2%',
  },
  backIcon: {
    color: constants.$senaryColor,
  },
  backText: {
    fontSize: 20,
    fontFamily: constants.$fontFamilyBold,
    color: constants.$secondaryColor,
    marginLeft: '5%',
  },
  formContainer: {
    marginTop: '10%',
    // left: '15%',
  },
  iconInputRow: {
    ...alignmentMixin.alignment1,
    justifyContent: undefined,
    marginBottom: '2%',
    left: '-5%',
    width: '70%',
  } as ViewStyle,
  icon: {
    color: constants.$senaryColor,
    position: 'absolute',
    top: '25%',
    marginLeft: '8%',
    paddingVertical: '5%',
  },
  input: {
    fontFamily: constants.$fontFamilyLight,
    flex: 1,
    fontSize: 16,
    height: 48,
    borderBottomWidth: 2,
    borderBottomColor: constants.$senaryColor,
    right: '-55%',
    paddingHorizontal: '10%',
    paddingVertical: '2%',
  },
  changePassword: {
    fontSize: 19,
    fontFamily: constants.$fontFamilyBold,
    left: '8%',
    marginBottom: '4%',
    color: constants.$senaryColor,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    left: '-12%',
    top: '20%',
    paddingTop: '7%',
  },
  //save changes button container
  saveButton: {
    ...alignmentMixin.alignment1,
    paddingHorizontal: '25%',
    left: '25%',
  } as ViewStyle,
  // cancel button
  buttonTextCancel: {
    ...addPetMixins.align5,
    textAlign: 'center',
    color: constants.$senaryColor,
    backgroundColor: constants.$tertiaryColor,
    fontSize: 18,
    paddingVertical: '2%',
  } as TextStyle,

  gradientBackground: {
    ...buttonMixin.button,
    position: 'absolute',
  },
  //text inside button
  buttonSave: {
    ...addPetMixins.align4,
    ...buttonMixin.buttonText,
    top: '19%',
  } as ViewStyle,
  cancelButton: {
    ...buttonMixin.button,
    ...buttonMixin.buttonText,
    width: undefined,
    color: constants.$senaryColor,
    backgroundColor: constants.$tertiaryColor,
    ...addPetMixins.align1,
    paddingVertical: '-10%',
    paddingHorizontal: '5%',
    top: '-5%',
  } as ViewStyle,
  // button for password toggle
  showButton: {
    width: '5%',
    right: '-10%',
    position: 'relative',
    alignItems: 'flex-end',
    zIndex: 5,
    top: '4%',
  },
  eyeicon: {
    color: constants.$primaryColor,
  },
});

export default EditClinicPassword;
