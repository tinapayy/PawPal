import React, {useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {RadioButton} from 'react-native-paper';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
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
import {
  addDoc,
  getDocs,
  collection,
  arrayUnion,
  updateDoc,
  doc,
} from 'firebase/firestore';
import {ref, uploadBytes, getDownloadURL} from 'firebase/storage';
import {launchImageLibrary} from 'react-native-image-picker';
import {buttonMixin} from '../components/buttonMixin';
import {alignmentMixin} from '../components/alignmentMixin';
import constants from '../styles/constants';
import {addPetMixins} from '../styles/mixins/addPetMixins';

const PetProfile = () => {
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

  const [petId, setPetId] = useState('');
  const [petName, setPetName] = useState('');
  const [breed, setBreed] = useState('');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [color, setColor] = useState('');
  const [checked, setChecked] = useState('');
  const [petPicture, setPetPicture] = useState(null);

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
        setPetPicture(response.assets[0].uri);
      }
    });
  };

  const uploadPetProfile = async () => {
    try {
      if (!petPicture) {
        setShowAlert({
          visible: true,
          title: 'Action Incomplete',
          message: 'Please select a picture of your pet.',
        });
        //Alert.alert('Please select a picture of your pet');
        return;
      }

      const metadata = {
        contentType: 'image/jpeg', // Adjust the content type based on your image type
      };

      const storage = FIREBASE_STORAGE;
      const storageRef = ref(
        storage,
        `petPicture/${auth.currentUser?.uid}.jpeg`,
      );

      // Convert image URI to Blob
      const response = await fetch(petPicture);
      const blob = await response.blob();

      // Upload the image to Firebase Storage
      await uploadBytes(storageRef, blob, metadata);

      // Get the download URL of the uploaded image
      const imageUrl = await getDownloadURL(storageRef);

      // Update the user profile in Firestore with the new image URL
      const petRef = await addDoc(collection(db, 'pet'), {
        name: petName,
        breed: breed,
        age: age,
        weight: weight,
        color: color,
        sex: checked,
        petPicture: imageUrl,
      });

      console.log('Document written with ID: ', petRef.id);

      const petIdRef = doc(db, 'pet', petRef.id);

      await updateDoc(petIdRef, {
        petId: petRef.id,
      });

      const userQuery = await getDocs(collection(db, 'user'));

      userQuery.forEach(async currentDoc => {
        if (currentDoc.data().userId === auth.currentUser?.uid) {
          const userRef = doc(collection(db, 'user'), currentDoc.id);

          try {
            await updateDoc(userRef, {
              pet: arrayUnion(petRef.id),
            });
            setShowAlert1({
              visible: true,
              title: 'Action Completed',

              message: 'Pet profile updated successfully.',
            });
            //Alert.alert('Profile picture updated successfully');
            // navigation.reset({
            //   index: 0,
            //   routes: [{name: 'HomePage'}],
            // });
          } catch (updateError) {
            setShowAlert({
              visible: true,
              title: 'Action Incomplete',
              message: 'Error updating profile. Please try again.',
            });
            console.error('Error updating profile:', updateError);
            //Alert.alert('Error updating profile. Please try again.');
          }
        }
      });
    } catch (error) {
      setShowAlert({
        visible: true,
        title: 'Action Incomplete',
        message: 'Error updating profile picture. Please try again.',
      });
      console.error('Error uploading profile picture:', error);
      //Alert.alert('Error updating profile picture. Please try again.');
    }
  };
  const imageSizePercentage = 30;
  const imageSize =
    Dimensions.get('window').width * (imageSizePercentage / 100);
  const borderRadius = imageSize / 2;
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
          <Text style={styles.backText}>Add Pet Profile</Text>
        </View>
        <View>
          <Image
            source={
              petPicture
                ? {uri: petPicture}
                : require('../images/defaultIcon.png')
            }
            style={{
              ...styles.profileImage,
              width: imageSize,
              height: imageSize,
              borderRadius: borderRadius,
            }}
            resizeMode="cover"
          />
          <TouchableOpacity style={styles.arrowAdd} onPress={openImagePicker}>
            <FontAwesomeIcon
              icon={icons.faCirclePlus}
              style={styles.arrowAdd}
              size={30}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.formContainer}>
          <View style={styles.iconInputRow}>
            <FontAwesomeIcon icon={icons.faUser} style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Pet Name"
              value={petName}
              onChangeText={text => setPetName(text)}
            />
          </View>
          <View style={styles.iconInputRow}>
            <FontAwesomeIcon icon={icons.faPaw} style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Breed"
              value={breed}
              onChangeText={text => setBreed(text)}
            />
          </View>
          <View style={styles.iconInputRow}>
            <FontAwesomeIcon icon={icons.faCalendar} style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Age"
              value={age}
              onChangeText={text => setAge(text)}
            />
          </View>
          <View style={styles.iconInputRow}>
            <FontAwesomeIcon icon={icons.faWeight} style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Weight"
              value={weight}
              onChangeText={text => setWeight(text)}
            />
          </View>
          <View style={styles.iconInputRow}>
            <FontAwesomeIcon icon={icons.faPalette} style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Color"
              value={color}
              onChangeText={text => setColor(text)}
            />
          </View>
          <View style={styles.iconInputRow}>
            <FontAwesomeIcon
              icon={icons.faVenusMars}
              style={styles.malInput}
              size={25}
            />
            <Text style={styles.malefeminput}>Sex</Text>
            <View style={styles.radioButton} />
            <RadioButton
              value="Male"
              status={checked === 'Male' ? 'checked' : 'unchecked'}
              onPress={() => setChecked('Male')}
              color={constants.$senaryColor}
              uncheckedColor={constants.$quaternaryColor}
            />
            <Text style={styles.maleinput}>Male</Text>
            <View style={{marginLeft: '1%'}} />
            <RadioButton
              value="Female"
              status={checked === 'Female' ? 'checked' : 'unchecked'}
              onPress={() => setChecked('Female')}
              color={constants.$senaryColor}
              uncheckedColor={constants.$quaternaryColor}
            />
            <Text style={styles.maleinput}>Female</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: '10%',
              left: '5%',
            }}>
            <View style={styles.buttonContainer}>
              <View>
                <TouchableOpacity
                  style={styles.saveButton}
                  onPress={() => uploadPetProfile()}
                  accessible={true}
                  accessibilityRole="button">
                  <LinearGradient
                    colors={[
                      constants.$backgroundColor1,
                      constants.$accentColor,
                    ]}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}
                    style={styles.gradientBackground}>
                    <Text style={styles.buttonSave}>Save Changes</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => navigation.goBack()}
                  accessibilityRole="button">
                  <Text style={styles.buttonTextCancel}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
      <CustomAlert
        visible={showAlert1.visible} // Pass the state to control visibility
        title={showAlert1.title} // Pass the title from showAlert
        message={showAlert1.message} // Pass the message from showAlert
        onClose={() => {
          setShowAlert1({visible: false, title: '', message: ''});
          navigation.navigate('HomePage'); // Navigate to a different page
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
  maleinput: {
    ...addPetMixins.input,
    right: '0%',
    top: '4%',
    fontSize: 16,

  } as TextStyle,

  malefeminput: {
    ...addPetMixins.input,
    left: '9%',
    top: '-1%',
    fontSize: 16,
  } as TextStyle,
  malInput: {
    ...addPetMixins.align,
    left: '7%',
    color: constants.$senaryColor,
    bottom: '-25%',
    marginBottom: '5%',
  } as TextStyle,
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: '2.7%',
  },
  back: {
    flexDirection: 'row',
    marginBottom: '2%',
    bottom: '45%',

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
  profileImage: {
    bottom: '60%',
    width: '40%',
    aspectRatio: 1,
    alignSelf: 'center',
  },
  arrowAdd: {
    color: constants.$senaryColor,
    position: 'absolute',
    top: '10%',
    left: '59%',
  },
  formContainer: {
    marginTop: '-20%',
    top: '10%',
  },
  iconInputRow: {
    ...addPetMixins.align3,
    alignContent: 'center',
    marginBottom: '2.5%',
    left: '3%',
    width: '89%',
  } as TextStyle,
  icon: {
    color: constants.$senaryColor,
    position: 'absolute',
    top: '25%',
    marginLeft: '5%',
    paddingVertical: '30%',
  },
  input: {
    flex: 1,
    fontSize: 18,
    height: 48,
    borderBottomWidth: 2,
    borderBottomColor: constants.$senaryColor,
    marginLeft: '5%',
    paddingHorizontal: '10%',
    paddingVertical: '2%',
  },
  radioButton: {
    borderColor: constants.$senaryColor,
    justifyContent: 'space-between',
    paddingHorizontal: '4%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    top: '40%',
    left: '10%',
  },
  gradientBackground: {
    ...buttonMixin.button,
    position: 'absolute',
  },
  saveButton: {
    ...addPetMixins.align1,
    top: '5%',
    paddingTop: '25%',
    paddingHorizontal: '25%',
    left: '15%',
  } as TextStyle,
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
    paddingVertical: '10%',
    paddingHorizontal: '5%',
  } as TextStyle,
  buttonTextCancel: {
    ...addPetMixins.align5,
    color: constants.$senaryColor,
    fontSize: 18,
    paddingHorizontal: '5%',
  } as TextStyle,
});

export default PetProfile;
