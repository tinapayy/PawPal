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
import { buttonMixin } from '../components/buttonMixin';
import { alignmentMixin } from '../components/alignmentMixin';
import constants from '../styles/constants';
import { profDetMixins } from '../styles/mixins/profDetMixins';

const PetProfile = () => {
  const navigation = useNavigation();

  const auth = FIREBASE_AUTH;
  const db = FIREBASE_DB;

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
        Alert.alert('Please select a picture of your pet');
        return;
      }

      const metadata = {
        contentType: 'image/jpeg', 
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

            Alert.alert('Profile picture updated successfully');
            navigation.reset({
              index: 0,
              routes: [{name: 'HomePage'}],
            });
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
  const imageSizePercentage = 40;
  const imageSize = Dimensions.get('window').width*(imageSizePercentage/100);
  const borderRadius = imageSize/2;
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
                : require('../images/UserIcon1.png')
            }
            style={{
              ...styles.profileImage,
              width: `${imageSizePercentage}%`,
              height: `${imageSizePercentage}%`,
              borderRadius: Number(borderRadius),
            }}
            resizeMode='cover'
          />
          <TouchableOpacity style={styles.arrowAdd} onPress={openImagePicker}>
            <FontAwesomeIcon icon={icons.faCirclePlus} style={styles.arrowAdd} size={30}/>
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
            <FontAwesomeIcon icon={icons.faVenusMars} style={styles.malInput} />
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
            <View style={{marginLeft: '2%'}} />
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
            <View style={styles.buttonContainerSaveCancel}>
              <View>
                <TouchableOpacity
                  style={styles.saveButton}
                  onPress={() => uploadPetProfile()}
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
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage1: {
    flex: 1,
    width: '100%',
  },
  maleinput: {
    flex: 1,
    alignItems: 'center',
    right: '-3%',
    top: '4%',
    flexDirection: 'row',
    fontSize: 18,
    fontFamily: constants.$fontFamily,
  },
  malefeminput: {
    flex: 1,
    fontSize: 18,
    alignItems: 'center',
    left: '15%',
    top: '-1%',
    flexDirection: 'row',
    fontFamily: constants.$fontFamily,
  },
  malInput: {
    flex: 1,
    alignItems: 'center',
    left: '11%',
    color: constants.$senaryColor,
    bottom: '-25%',
    flexDirection: 'row',
    marginBottom: '5%',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: '2.7%',
  },
  back: {
    flexDirection: 'row',
    marginBottom:'2%',
    top: '10%',
  },
  backIcon: {
    color: constants.$senaryColor,
    left: '20%',
  },
  backText: {
    fontSize: 20,
    fontFamily: constants.$fontFamilyBold,
    color: constants.$secondaryColor,
    marginLeft: '5%',
  },
  profileImage: {
    top: '20%',
    width: '40%',
    aspectRatio:1,
    alignSelf: 'center',
    marginBottom: 20,
  },
  arrowAdd: {
    color: constants.$senaryColor,
    position: 'absolute',
    top: '54%',
    right: '102%',
    // paddingRight: '60%',
    // marginBottom: 90,
    // paddingVertical: 40,
  },
  formContainer: {
    marginTop: 30,
  },
  iconInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    marginBottom: 10,
    right: 5,
    left: 7,
    width: 340,
  },
  icon: {
    color: constants.$senaryColor,
    position: 'absolute',
    top: 10,
    marginLeft: 30,
    paddingRight: 30,
    flexDirection: 'row',
    paddingVertical: 11,
  },
  input: {
    flex: 1,
    fontSize: 18,
    height: 48,
    borderBottomWidth: 2,
    borderBottomColor: constants.$senaryColor,
    marginLeft: 20,
    paddingHorizontal: 40,
    paddingVertical: 10,
    width: 50,
    padding: 20,
    alignContent: 'center',
  },
  radioButton: {
    borderColor: constants.$senaryColor,
    justifyContent: 'space-between',
    right: 30,
  },
  buttonContainerSaveCancel: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    borderRadius: 40,
  },
  gradientBackground: {
    borderRadius: 20,
    width: 160,
    height: 50,
    position: 'absolute',
    top: 8,
    left: -20,
    elevation: 3,
    shadowColor: constants.$textColor1,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.4,
    shadowRadius: 3,
  },
  saveButton: {
    justifyContent: 'center',
    alignItems: 'center',
    right: 10,
    paddingTop: 50,
    paddingHorizontal: 75,
  },
  buttonSave: {
    color: constants.$textColor2,
    fontSize: 19,
    fontFamily: 'Poppins-Regular',
    alignContent: 'center',
    alignSelf: 'center',
    top: 10,
  },
  cancelButton: {
    backgroundColor: constants.$textColor2,
    top: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 40,
    elevation: 3,
    shadowColor: constants.$textColor1,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.4,
    shadowRadius: 3,
  },
  buttonText: {
    color: constants.$textColor2,
    fontFamily: 'Poppins-Regular',
    alignContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
  },
  buttonTextCancel: {
    color: constants.$senaryColor,
    fontSize: 18,
    fontFamily: 'Poppins-Regular',
    alignContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
  },
});

export default PetProfile;