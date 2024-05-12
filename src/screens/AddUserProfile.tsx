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
  TextStyle,
  ViewStyle,
} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import * as icons from '../imports/icons/icons';
import {useNavigation} from '@react-navigation/native';
import CustomAlert from '../components/CustomAlert';
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
import {buttonMixin} from '../components/buttonMixin';
import {alignmentMixin} from '../components/alignmentMixin';
import {addPetMixins} from '../styles/mixins/addPetMixins';
import {KeyboardAvoidingView} from 'react-native';
const UserProfile = () => {
  const navigation = useNavigation();

  const auth = FIREBASE_AUTH;
  const db = FIREBASE_DB;
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

  const openImagePicker = async () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 200,
      maxWidth: 200,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.error('Image picker error:', response.errorMessage);
      } else {
        setProfilePicture(response.assets[0].uri);
      }
    });
  };

  const uploadProfilePicture = async () => {
    try {
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
            Alert.alert('Profile picture updated successfully');
          } catch (updateError) {
            console.error('Error updating profile:', updateError);
            Alert.alert('Error updating profile. Please try again.');
          }
        }
      });
    } catch (error) {
      console.error('Error uploading profile picture:', error);
      Alert.alert('Error updating profile picture. Please try again.');
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
            setProfilePicture(doc.data().profilePicture || null);
          }
        });
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const reauthenticateUser = async currentPassword => {
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
      console.error('Error reauthenticating user:', error);
      return false; // Reauthentication failed
    }
  };

  const updateProfile = async () => {
    if (currentName === '') {
      setShowAlert({
        visible: true,
        title: 'Action Incomplete',
        message: 'Please enter a name.'
    });
      //Alert.alert('Please enter a name');
      return;
    }
    if (profilePicture !== null) {
      uploadProfilePicture();
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
                message: 'Current password is incomplete.'
            });
              //Alert.alert('Current password is incorrect');
              return;
            }
            try {
              updateData.password = newPassword;
              // Update the user document with new profile data and potentially new password
              await updateDoc(userRef, updateData);
              navigation.navigate('Add Pet Profile');
              // Update the password after successfully updating the profile
              try {
                await updatePassword(auth.currentUser!, newPassword);
                setShowAlert({
                  visible: true,
                  title: 'Action Completed',
                  message: 'Profile and password updated successfully.'
              });
                //Alert.alert('Profile and password updated successfully');
              } catch (error) {
                setShowAlert({
                  visible: true,
                  title: 'Action Incomplete',
                  message: 'Error updating password. Please try again.'
              });
                console.error('Error updating password:', error);
                //Alert.alert('Error updating password. Please try again.');
              }
            } catch (updateError) {
              setShowAlert({
                visible: true,
                title: 'Action Incomplete',
                message: 'Error updating profile. Please try again.'
            });
              console.error('Error updating profile:', updateError);
              //Alert.alert('Error updating profile. Please try again.');
            }
          } else {
            // If no current password provided, update the profile without updating the password
            try {
              await updateDoc(userRef, updateData);
              setShowAlert1({
                visible: true,
                title: 'Action Completed',
                message: 'Profile updated successfully.'
            });
              //Alert.alert('Profile updated successfully');
              //navigation.navigate('Add Pet Profile');
            } catch (updateError) {
              setShowAlert({
                visible: true,
                title: 'Action Incomplete',
                message: 'Error updating profile. Please try again.'
            });
              console.error('Error updating profile:', updateError);
              //Alert.alert('Error updating profile. Please try again.');
            }
          }
        }
      });
    } catch (error) {
      setShowAlert({
        visible: true,
        title: 'Action Incomplete',
        message: 'Error updating profile. Please try again.'
    });
      console.error('Error querying user data:', error);
      //Alert.alert('Error updating profile. Please try again.');
    }
  };
  const imageSizePercentage = 30;
  const imageSize =
    Dimensions.get('window').width * (imageSizePercentage / 100);
  const borderRadius = imageSize / 2;

  return (
    <ImageBackground
      source={require('../images/real_bg.png')}
      //background image styling
      style={styles.backgroundImage1}>
      {/* container */}
      <View style={styles.container}>
        {/* back icon and text */}
        <View style={styles.back}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <FontAwesomeIcon
              icon={icons.faArrowLeft}
              style={styles.backIcon}
              size={25}
            />
          </TouchableOpacity>
          <Text style={styles.backText}>Add User Profile</Text>
        </View>
        {/* profile photo and arrow */}
        <View style={styles.profileContainer}>
          <View>
            <Image
              source={
                profilePicture
                  ? {uri: profilePicture}
                  : require('../images/userIcon.png')
              }
              style={{
                ...styles.profilePicture,
                width: imageSize,
                height: imageSize,
                borderRadius: borderRadius,
              }}
              resizeMode="cover"
            />
            <TouchableOpacity
              style={styles.arrowAdd}
              onPress={() => openImagePicker()}>
              <FontAwesomeIcon
                icon={icons.faCirclePlus}
                style={styles.arrowAdd}
                size={30}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.formContainer}>
          <View style={styles.iconInputRow}>
            <FontAwesomeIcon icon={icons.faEnvelope} style={styles.icon} />
            <View style={styles.iconInputRow}>
              <Text style={styles.input}>{auth.currentUser?.email}</Text>
            </View>
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
          <View style={styles.iconInputRow}>
            <FontAwesomeIcon icon={icons.faAddressCard} style={styles.icon} />
            <TextInput
              style={[styles.input, {fontSize: 16}, {top: 2}]}
              placeholder={currentBio ? currentBio : 'Tell more about yourself'}
              value={currentBio}
              onChangeText={text => setCurrentBio(text)}
              maxLength={500}
            />
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.saveButton}
              onPress={() => {
                updateProfile();
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
              onPress={() => navigation.navigate('Add New Pet Profile')}
              accessible={true}
              accessibilityRole="button">
              <Text style={styles.buttonTextCancel}>Skip</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <CustomAlert
            visible={showAlert1.visible} // Pass the state to control visibility
            title={showAlert1.title} // Pass the title from showAlert
            message={showAlert1.message} // Pass the message from showAlert
            onClose={() => {
              setShowAlert1({ visible: false, title: '', message: '' });
              navigation.navigate('Add Pet Profile'); // Navigate to a different page
          }} // Close the alert on button press
          />
          <CustomAlert
            visible={showAlert.visible} // Pass the state to control visibility
            title={showAlert.title} // Pass the title from showAlert
            message={showAlert.message} // Pass the message from showAlert
            onClose={() => {setShowAlert({ visible: false, title: '', message: '' })}} // Close the alert on button press
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
  },
  back: {
    flexDirection: 'row',
    left: '2.6%',
    top: '-29%',
    color: constants.$senaryColor,
  },
  backIcon: {
    color: constants.$senaryColor,
    flexDirection: 'row',
  },
  backText: {
    fontSize: 20,
    fontFamily: constants.$fontFamilyBold,
    color: constants.$secondaryColor,
    marginLeft: '5%',
  },
  profileContainer: {},
  profilePicture: {
    width: '40%',
    top: '-20%',
    aspectRatio: 1,
    borderRadius: 75,
    alignSelf: 'center',
    marginBottom: '10%',
    overflow: 'hidden',
  },
  arrowAdd: {
    color: constants.$senaryColor,
    position: 'absolute',
    top: '39%',
    left: '58%',
  },
  formContainer: {
    left: '-8%',
  },
  iconInputRow: {
    ...addPetMixins.align3,
    alignContent: 'center',
    marginBottom: '2.5%',
    width: '99%',
  } as TextStyle,
  icon: {
    color: constants.$senaryColor,
    position: 'absolute',
    top: '30%',
    marginLeft: '13%',
    ...addPetMixins.align3,
  } as TextStyle,
  //texts input field
  input: {
    fontFamily: constants.$fontFamily,
    flex: 1,
    fontSize: 18,
    height: 48,
    borderBottomWidth: 2,
    borderBottomColor: constants.$senaryColor,
    marginLeft: '17%',
    paddingHorizontal: '10%',
    paddingVertical: '2%',
  },
  //button container for save and skip
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    top: '-5%',
  },
  //save changes container
  saveButton: {
    ...alignmentMixin.alignment1,
    marginTop: '5%',
    paddingVertical: '15%',
    borderRadius: 40,
    top: '-5%',
    left: '54%',
  } as ViewStyle,
  //skip texts
  buttonTextCancel: {
    ...buttonMixin.button,
    ...buttonMixin.buttonText,
    width: undefined,
    color: constants.$senaryColor,
    backgroundColor: constants.$tertiaryColor,
    padding: '2%',
    paddingHorizontal: '7%',
  } as ViewStyle,

  gradientBackground: {
    ...buttonMixin.button,
    position: 'absolute',
  },
  //text save changes
  buttonSave: {
    ...buttonMixin.buttonText,
    top: '19%',
  } as ViewStyle,
  //skip container
  cancelButton: {
    ...alignmentMixin.align,
    borderRadius: 40,
  } as ViewStyle,
});

export default UserProfile;
