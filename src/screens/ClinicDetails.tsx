import React, {useState, Component} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
  TouchableOpacity,
  Image,
  Button,
  Platform,
  FlatList,
  Alert,
  StyleProp,
  ViewStyle,
  TextStyle,
  PermissionsAndroid,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import {CheckBox, Input} from 'react-native-elements';

import {launchImageLibrary, ImageLibraryOptions} from 'react-native-image-picker';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCirclePlus} from '@fortawesome/free-solid-svg-icons';
import {faImage} from '@fortawesome/free-solid-svg-icons';
import {faLocationDot} from '@fortawesome/free-solid-svg-icons';
import Geolocation from 'react-native-geolocation-service';
import MapView from 'react-native-maps';

import { FIREBASE_DB, FIREBASE_AUTH} from '../../firebase.config';
import {getDocs, collection, updateDoc, doc} from 'firebase/firestore';

import {useNavigation} from '@react-navigation/native';

// import DateTimePicker from '@react-native-community/datetimepicker';
// import DateTimePickerModal from 'react-native-modal-datetime-picker';

const PawPalApp = () => {
  const navigation = useNavigation();

  const db = FIREBASE_DB;
  const auth = FIREBASE_AUTH;

  const [selectedImage, setSelectedImage] = useState(null);
  const [user, setUser] = useState(null);
  const [number, onChangeNumber] = useState('');
  const [description, setDescription] = useState('');
  const [selectedDays, setSelectedDays] = useState<string[]>([]);

  const toggleDaySelection = (day: string) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter(selectedDay => selectedDay !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };
  const daysOfWeek = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];

  const saveClinicInfo = async () => {
    try{
      const userQuery = await getDocs(collection(db, 'user'));
      userQuery.forEach(async currentDoc => {
        if (currentDoc.data().userId === auth.currentUser?.uid) {
          const userRef = doc(collection(db, 'user'), currentDoc.id);
          const updateData = {
            picture: selectedImage,
            services: inputText,
            phoneInfo: number,
            about: description,
            storeHours: selectedDays,
          };
          try {
            await updateDoc(userRef, updateData);
            Alert.alert('Profile updated successfully');
            navigation.navigate('HomePage');
          } catch (updateError) {
            console.error('Error updating profile:', updateError);
            Alert.alert('Error updating clinic profile. Please try again.');
          }
        }
      });
    } catch (error) {
      console.log('Error querying user data: ', error);
      Alert.alert('Error updating clinic details. Please try again.')
    }
  }

  {/* CONCERN: CLEARING THE WHOLE PAGE or GOING TO HOME? */}
  const handleButton2Press = () => {
    Alert.alert('Update Cancelled');
  };

  interface AppButtonProps {
    onPress: () => void;
    title: string;
    buttonStyle?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
  }
  const AppButton: React.FC<AppButtonProps> = ({
    onPress,
    title,
    buttonStyle,
    textStyle,
  }) => (
    <TouchableOpacity onPress={onPress} style={[buttonStyle]}>
      <Text style={[textStyle]}>{title}</Text>
    </TouchableOpacity>
  );

  const [isInputVisible, setInputVisible] = useState(false);
  const [inputText, setInputText] = useState('');

  const handleToggleInput = () => {
    setInputVisible(!isInputVisible);
  };

  const handleInputChange = (text: React.SetStateAction<string>) => {
    setInputText(text);
  };

  const handleSaveInput = () => {
    console.log('Input Text: ' + inputText);
    setInputVisible(false);
  };

  const openImagePicker = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorMessage) {
        console.log('Image picker error: ', response.errorMessage);
      } else {
        let imageUri = response.uri || response.assets?.[0]?.uri;
        setSelectedImage(imageUri);
      }
    });
  };

  {/* CONCERN: LOCATION IMPLEMENTATION */}
  const handleIconPress = () => {
    Alert.alert('Google Map API to be implemented :>');
  };

  return (
    <SafeAreaView style={{backgroundColor: '#FFAC4E'}}>
      <View style={{padding: 0, flex: 1}}>
        <View style={{flex: 1}}>
          <Image
            source={require('../images/Ellipse_25.png')}
            style={{
              position: 'relative',
            }}
          />
        </View>

        <View>
          <Image
            source={require('../images/Vector_12.png')}
            style={{
              flex: 1,
              position: 'absolute',
            }}
          />
        </View>
        <View style={{flex: 1}}>
          <Image
            source={require('../images/pug.png')}
            style={{
              position: 'relative',
              bottom: '10%',
            }}
          />
        </View>

        <View>
          <Image
            source={require('../images/Ellipse_24.png')}
            style={{
              position: 'relative',
              marginLeft: '82%',
              bottom: '10%',
            }}
          />
        </View>
        <View>
          <Image
            source={require('../images/Vector_11.png')}
            style={{
              position: 'relative',
              marginTop: 70,
            }}
          />
        </View>

        <Text style={styles.skip}>Skip</Text>
      </View>

      <ScrollView>
        <View
          style={{
            backgroundColor: 'white',
            borderTopStartRadius: 50,
            borderTopEndRadius: 50,
            flex: 1,
            top: 170,
            shadowColor: 'black',
            shadowOffset: {
              width: -2,
              height: 10,
            },
            shadowOpacity: 1,
            shadowRadius: 3,
            elevation: 20,
          }}>
          <View>
            <Image
              source={require('../images/Vector_8.png')}
              style={{
                flex: 1,
                position: 'absolute',
                top: 200,
                left: '85%',
              }}
            />
          </View>

          <View>
            <Image
              source={require('../images/Vector_7.png')}
              style={{
                flex: 1,
                position: 'absolute',
                top: 830,
              }}
            />
          </View>

          <Text style={styles.clinic}>Clinic Details</Text>

          <Text style={styles.addClinic}>Add Clinic Picture</Text>
          <TouchableOpacity onPress={openImagePicker}>
            {selectedImage ? (
              <Image
                source={{ uri: selectedImage }}
                style={{
                  borderRadius: 30,
                  margin: 30,
                  height: 150,
                }}
              />
            ) : (
              <View
                style={{
                  backgroundColor: '#ffb78f80',
                  borderRadius: 30,
                  margin: 30,
                  height: 150,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <FontAwesomeIcon
                  icon={faImage}
                  size={30}
                  style={{
                    color: '#ff8700',
                  }}
                />
              </View>
            )}
          </TouchableOpacity>

          <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
            <Text style={styles.services}>Services</Text>

            <View>
              <TouchableOpacity onPress={handleToggleInput}>
                <FontAwesomeIcon
                  icon={faCirclePlus}
                  size={25}
                  style={{color: '#ff8700', marginLeft: 10}}
                />
              </TouchableOpacity>



              {/* CONCERN: ADDING MORE TAGS */}
              {isInputVisible && (
                <View>
                  <TextInput
                    style={{color: '#5A2828', fontSize: 15, marginLeft: 15, backgroundColor: '#F1D5C6', borderRadius: 10, marginVertical: 5,}}
                    placeholder="Enter"
                    value={inputText}
                    onChangeText={handleInputChange}
                  />
                  <TouchableOpacity onPress={handleSaveInput}>
                    <Text
                      style={{
                        marginLeft: 20,
                        color: 'white',
                        textDecorationLine: 'underline',
                        fontSize: 13,
                        backgroundColor: '#ff8700',
                        borderRadius: 10,
                        textAlign: 'center',
                      }}>
                      Save
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>

          <Text style={styles.phoneInfo}>Phone Information</Text>
          <TextInput
            style={styles.input}
            onChangeText={ text => onChangeNumber(text)}
            value={number}
            keyboardType="numeric"
          />

          <Text style={styles.about}>About</Text>
          <TextInput 
          style={styles.input}
          onChangeText={ text => setDescription(text)}
          value={description}
          />

          <Text style={styles.storeHours}>Store Hours</Text>
          <View style={styles.radio}>
            {daysOfWeek.map((day, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => toggleDaySelection(day)}>
                <View style={styles.wrap}>
                  <View style={styles.btn}>
                    {selectedDays.includes(day) && (
                      <View style={styles.bg}></View>
                    )}
                  </View>

                  {/* CONCERN: OPEN AND CLOSING HOURS HOW SHOULD I STORE */}
                  <Text style={styles.text}>{day}</Text>
                  {selectedDays.includes(day) && (
                    <TextInput
                      style={{fontSize: 20, marginLeft: 35, color: '#5A2828'}}
                      placeholderTextColor={'#D3D3D3'}
                      placeholder="Open"
                    />
                  )}
                  {selectedDays.includes(day) && (
                    <TextInput
                      style={{fontSize: 20, marginLeft: 40, color: '#5A2828'}}
                      placeholderTextColor={'#D3D3D3'}
                      placeholder="Close"
                    />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.loc}>Location</Text>
          
          <TouchableOpacity onPress={handleIconPress}>
            <FontAwesomeIcon
              icon={faLocationDot}
              size={30}
              style={{
                color: '#ff8700',
                padding: 0,
                flex: 1,
                justifyContent: 'center',
                position: 'absolute',
                top: 90,
                marginLeft: '35%',
              }}
            />

            <View>
              <View
                style={{
                  backgroundColor: '#ffb78f80',
                  borderRadius: 30,
                  margin: 30,
                  height: 150,
                  // flex: 1,
                  justifyContent: 'center',
                }}
              />
            </View>
          </TouchableOpacity>
          <View style={{height: 300}}>
            <AppButton
              title="Save"
              onPress={saveClinicInfo}
              buttonStyle={styles.btn1}
              textStyle={styles.bt1}
            />
            <AppButton
              title="Cancel"
              onPress={handleButton2Press}
              buttonStyle={styles.cancel}
              textStyle={styles.cancelText}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  skip: {
    flex: 1,
    position: 'absolute',
    fontSize: 20,
    fontWeight: '600',
    color: '#5A2828',
    fontFamily: 'Poppins-Medium',
    marginLeft: '85%',
    textDecorationLine: 'underline',
  },
  clinic: {
    paddingTop: 10,
    paddingLeft: 40,
    fontSize: 40,
    fontWeight: '600',
    color: '#5A2828',
    fontFamily: 'Poppins-SemiBold',
  },
  addClinic: {
    paddingTop: 10,
    paddingLeft: 40,
    fontSize: 25,
    fontWeight: '400',
    color: '#5A2828',
    fontFamily: 'Poppins',
  },
  services: {
    paddingTop: 0,
    paddingLeft: 40,
    fontSize: 25,
    fontWeight: '400',
    color: '#5A2828',
    fontFamily: 'Poppins',
  },
  phoneInfo: {
    paddingTop: 20,
    paddingLeft: 40,
    fontSize: 25,
    fontWeight: '400',
    color: '#5A2828',
    fontFamily: 'Poppins',
  },
  about: {
    flex: 1,
    paddingTop: 20,
    paddingLeft: 40,
    fontSize: 25,
    fontWeight: '400',
    color: '#5A2828',
    fontFamily: 'Poppins',
  },
  storeHours: {
    paddingTop: 20,
    paddingLeft: 40,
    fontSize: 25,
    fontWeight: '400',
    color: '#5A2828',
    fontFamily: 'Poppins',
  },
  loc: {
    paddingTop: 20,
    paddingLeft: 40,
    fontSize: 25,
    fontWeight: '400',
    color: '#5A2828',
    fontFamily: 'Poppins',
  },
  input: {
    padding: 0,
    fontSize: 25,
    width: 350,
    color: 'black',
    borderBottomWidth: 1.5,
    borderColor: '#FFBA69',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: '7%',
  },
  btn1: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: '20%',
    margin: 70,
    padding: 4,
    borderRadius: 50,
    backgroundColor: '#FFAC4E',
    shadowColor: 'black',
    shadowOffset: {
      width: -2,
      height: 4,
    },
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 15,
    marginRight: '45%',
    height: '3%',
    bottom: '20%',
  },
  bt1: {
    color: 'white',
    fontSize: 25,
    fontWeight: '500',
    fontFamily: 'Poppins',
    textAlign: 'center',
  },
  cancel: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: '60%',
    margin: 10,
    padding: 4,
    borderRadius: 50,
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset: {
      width: -2,
      height: 4,
    },
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 15,
    marginRight: '10%',
    height: '4%',
    bottom: '70%',
    //display: 'flex',
  },
  cancelText: {
    color: '#FF8D4D',
    fontSize: 20,
    fontWeight: '400',
    fontFamily: 'Poppins',
    textAlign: 'center',
  },
  radio: {
    alignItems: 'baseline',
    justifyContent: 'space-between',
    padding: 2,
  },
  text: {
    marginLeft: 15,
    fontSize: 20,
    padding: 3,
    color: '#878787',
    fontFamily: 'Poppins-Regular',
  },
  btn: {
    marginLeft: 45,
    width: 25,
    height: 25,
    borderRadius: 20,
    borderColor: '#FFAC4E',
    borderWidth: 3,
  },
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bg: {
    backgroundColor: '#FFAC4E',
    height: 15,
    width: 15,
    borderRadius: 20,
    margin: 2,
  },
  con: {
    flex: 1,
  },
  pug: {
    position: 'relative',
    bottom: '10%',
  },
});

export default PawPalApp;