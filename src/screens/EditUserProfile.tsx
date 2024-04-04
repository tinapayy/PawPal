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
import { alignmentMixin } from '../components/alignmentMixin';
import { buttonMixin } from '../components/buttonMixin';

const UserProfile = () => {
  const navigation = useNavigation();

  const auth = FIREBASE_AUTH;
  const db = FIREBASE_DB;

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
      if (!profilePicture) {
        Alert.alert('Please select a profile picture');
        return;
      }

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
            setProfilePicture(doc.data().profilePicture);
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
      Alert.alert('Please enter a name');
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
              Alert.alert('Current password is incorrect');
              return;
            }
            try {
              updateData.password = newPassword;
              // Update the user document with new profile data and potentially new password
              await updateDoc(userRef, updateData);
              navigation.navigate('ProfileDetails');
              // Update the password after successfully updating the profile
              try {
                await updatePassword(auth.currentUser!, newPassword);
                Alert.alert('Profile and password updated successfully');
              } catch (error) {
                console.error('Error updating password:', error);
                Alert.alert('Error updating password. Please try again.');
              }
            } catch (updateError) {
              console.error('Error updating profile:', updateError);
              Alert.alert('Error updating profile. Please try again.');
            }
          } else {
            // If no current password provided, update the profile without updating the password
            try {
              await updateDoc(userRef, updateData);
              Alert.alert('Profile updated successfully');
              navigation.navigate('car');
            } catch (updateError) {
              console.error('Error updating profile:', updateError);
              Alert.alert('Error updating profile. Please try again.');
            }
          }
        }
      });
    } catch (error) {
      console.error('Error querying user data:', error);
      Alert.alert('Error updating profile. Please try again.');
    }
  };

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
          <Text style={styles.backText}>Edit User Profile</Text>
        </View>
        <View style={styles.profileContainer}>
          <Image
            source={
              profilePicture
                ? {uri: profilePicture}
                : require('../images/defaultIcon.png')
            }
            style={styles.profilePicture}
          />
          <TouchableOpacity
            style={styles.arrowAdd}
            onPress={() => openImagePicker()}>
            <FontAwesomeIcon
              icon={icons.faCirclePlus}
              style={styles.arrowAdd}
              size={25}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.formContainer}>
          <View style={styles.iconInputRow}>
            <FontAwesomeIcon icon={icons.faEnvelope} style={styles.icon} />
            <View style={styles.iconInputRow}>
              <Text style={styles.inputName}>{auth.currentUser?.email}</Text>
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
          </View>
          <View style={styles.iconInputRow}>
            <FontAwesomeIcon icon={icons.faLock} style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="New Password"
              secureTextEntry
              value={newPassword}
              onChangeText={text => setNewPassword(text)}
            />
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
                colors={['#FFAC4E', '#FF6464']}
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
    padding: 16,
  },
  back: {
    flexDirection: 'row',
    marginBottom: 40,
    top: 60,
  },
  backIcon: {
    color: constants.$senaryColor,
    flexDirection: 'row',
    position: 'absolute',
    top: -70,
    left: 10,
    paddingRight: 30,
  },
  backText: {
    fontSize: 20,
    fontFamily: constants.$fontFamily,
    color: constants.$secondaryColor,
    fontWeight: constants.$fontWeightBold,
    marginLeft: 30,
    top: -70,
    left: 25,
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profilePicture: {
    width: 150,
    height: 150,
    borderRadius: 75,
    alignSelf: 'center',
    marginBottom: 20,
  },
  arrowAdd: {
    color: constants.$senaryColor,
    position: 'absolute',
    top: 48,
    right: 54,
    paddingRight: 30,
    marginBottom: 90,
    paddingVertical: 40,
  },
  formContainer: {
    marginTop: 5,
    marginLeft: -20,
  },
  iconInputRow: {
    ...alignmentMixin.alignment1,
    justifyContent: undefined,
    marginBottom: 10,
    left: 0,
    width: 350,
  },
  icon: {
    color: constants.$senaryColor,
    position: 'absolute',
    top: 15,
    marginLeft: 65, 
    paddingRight: 10,
    flexDirection: 'row',
    alignContent: 'center',
  },
  inputLabel: {
    color: constants.$senaryColor,
    marginBottom: 8,
  },
  input: {
    fontFamily: constants.$fontFamilyLight,
    flex: 1,
    fontSize: 18,
    height: 45,
    borderBottomWidth: 2,
    borderBottomColor: constants.$senaryColor,
    marginLeft: 60,
    paddingHorizontal: 30,
  },
  inputName: {
    flex: 1,
    fontSize: 20,
    height: 40,
    borderBottomWidth: 2,
    top: 10,
    borderBottomColor: constants.$senaryColor,
    marginLeft: 60,
    paddingHorizontal: 30,
    color: constants.$secondaryColor,
  },
  changePassword: {
    fontSize: 25,
    fontFamily: constants.$fontFamily,
    left: 20,
    fontWeight: constants.$fontWeightBold,
    marginBottom: 20,
    color: constants.$senaryColor,
    paddingHorizontal: 8,
  },
  saveButton: {
    ...alignmentMixin.alignment1,
    marginTop: 20,
    paddingVertical: 20,
    borderRadius: 40,
    bottom: 30,
  },
  buttonTextCancel: {
    color: constants.$senaryColor,
    fontSize: 17,
    fontFamily: constants.$fontFamily,
    alignSelf: 'center',
    top: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    borderRadius: 40,
  },
  gradientBackground: {
    ...buttonMixin.button,
    position: 'absolute',
    top: 0,
    left: 100,
  },
  buttonSave: {
    ...buttonMixin.buttonText,
    top: 8,
  },
  cancelButton: {
    ...alignmentMixin.alignment1,
    backgroundColor: constants.$textColor2,
    left: -40,
    paddingHorizontal: 20,
    height: 50,
    borderRadius: 40,
    elevation: 3,
    top: -19,
  },
});

export default UserProfile;