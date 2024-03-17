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
            style={styles.profileImage}
          />
          <TouchableOpacity style={styles.arrowAdd} onPress={openImagePicker}>
            <FontAwesomeIcon icon={icons.faCirclePlus} style={styles.arrowAdd} />
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
              color="#FF8D4D"
              uncheckedColor="#FF8D4D"
            />
            <Text style={styles.maleinput}>Male</Text>
            <View style={{marginLeft: -20}} />
            <RadioButton
              value="Female"
              status={checked === 'Female' ? 'checked' : 'unchecked'}
              onPress={() => setChecked('Female')}
              color="#FF8D4D"
              uncheckedColor="#FF8D4D"
            />
            <Text style={styles.maleinput}>Female</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 70,
              left: 40,
            }}>
            <View style={styles.buttonContainerSaveCancel}>
              <View>
                <TouchableOpacity
                  style={styles.saveButton}
                  onPress={() => uploadPetProfile()}
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
              </View>
              <View>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => navigation.navigate('HomePage')}
                  accessibilityRole="button">
                  <Text style={styles.buttonTextCancel}>Skip</Text>
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
    right: 15,
    paddingVertical: 10,
    color: 'gray',
    top: 2,
    paddingLeft: 15,
    flexDirection: 'row',
    fontSize: 18,
    fontFamily: 'Poppins-Regular',
  },
  malefeminput: {
    flex: 1,
    fontSize: 18,
    alignItems: 'center',
    left: 50,
    color: 'gray',
    top: -1,
    marginRight: 30,
    flexDirection: 'row',
    fontFamily: 'Poppins-Regular',
  },
  malInput: {
    flex: 1,
    alignItems: 'center',
    left: 40,
    color: '#FF8D4D',
    top: 10,
    flexDirection: 'row',
    marginBottom: 20,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  back: {
    flexDirection: 'row',
    marginBottom: 40,
    top: 45,
  },
  backIcon: {
    color: '#FF8D4D',
    flexDirection: 'row',
    position: 'absolute',
    top: -92,
    left: 10,
    paddingRight: 30,
  },
  backText: {
    fontSize: 20,
    fontFamily: 'Poppins-Regular',
    color: '#5A2828',
    fontWeight: 'bold',
    marginLeft: 30,
    top: -95,
    left: 25,
  },
  profileImage: {
    top: -20,
    width: 150,
    height: 150,
    borderRadius: 75,
    alignSelf: 'center',
    marginBottom: 20,
  },
  arrowAdd: {
    color: '#FF8D4D',
    position: 'absolute',
    top: 37,
    bottom: 0,
    right: 62,
    paddingRight: 30,
    marginBottom: 90,
    paddingVertical: 40,
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
    color: '#FF8D4D',
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
    borderBottomColor: '#FF8D4D',
    marginLeft: 20,
    paddingHorizontal: 40,
    paddingVertical: 10,
    width: 50,
    padding: 20,
    alignContent: 'center',
  },
  radioButton: {
    borderColor: '#FF8D4D',
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
    shadowColor: '#000000',
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
    top: -20,
  },
  buttonSave: {
    color: '#ffffff',
    fontSize: 19,
    fontFamily: 'Poppins-Regular',
    alignContent: 'center',
    alignSelf: 'center',
    top: 10,
  },
  cancelButton: {
    backgroundColor: '#ffffff',
    top: -12,
    right: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 30,
    elevation: 3,
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.4,
    shadowRadius: 3,
  },
  buttonText: {
    color: '#ffffff',
    fontFamily: 'Poppins-Regular',
    alignContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
  },
  buttonTextCancel: {
    color: '#FF8D4D',
    fontSize: 18,
    fontFamily: 'Poppins-Regular',
    alignContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
  },
});

export default PetProfile;