import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
  Alert,
  StyleProp,
  ViewStyle,
  TextStyle,
  FlatList,
  Button,
  ImageBackground,
  Dimensions,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faCirclePlus,
  faImage,
  faTimesCircle,
  faCaretDown,
} from '@fortawesome/free-solid-svg-icons';
import {
  FIREBASE_DB,
  FIREBASE_AUTH,
  FIREBASE_STORAGE,
} from '../../firebase.config';
import {getDocs, collection, updateDoc, doc} from 'firebase/firestore';
import {ref, uploadBytes, getDownloadURL} from 'firebase/storage';
import {useNavigation} from '@react-navigation/native';
import DateTimePicker, {
  DateTimePickerAndroid,
} from '@react-native-community/datetimepicker';
import constants from '../styles/constants';
import {buttonMixin} from '../components/buttonMixin';
import {alignmentMixin} from '../components/alignmentMixin';

const PawPalApp = () => {
  const {width: screenWidth, height: screenHeight} = Dimensions.get('window');
  const navigation = useNavigation();

  const db = FIREBASE_DB;
  const auth = FIREBASE_AUTH;
  const storage = FIREBASE_STORAGE;

  const [selectedImage, setSelectedImage] = useState('');
  const [number, setNumber] = useState('');
  const [description, setDescription] = useState('');
  const [selectedDays, setSelectedDays] = useState([
    {day: '', open: '', close: ''},
  ]);

  const daysOfWeek = [
    {day: 'Monday'},
    {day: 'Tuesday'},
    {day: 'Wednesday'},
    {day: 'Thursday'},
    {day: 'Friday'},
    {day: 'Saturday'},
    {day: 'Sunday'},
  ];

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('time');
  const [openshow, setOpenShow] = useState(false);
  const [closeshow, setCloseShow] = useState(false);
  const [currentDay, setCurrentDay] = useState('');

  const [tagsInput, setTagsInput] = useState([]);

  const saveClinicInfo = async () => {
    try {
      const userQuery = await getDocs(collection(db, 'user'));
      userQuery.forEach(async currentDoc => {
        if (currentDoc.data().userId === auth.currentUser?.uid) {
          const userRef = doc(collection(db, 'user'), currentDoc.id);
          const updateData = {
            clinicPicture: selectedImage,
            services: tagsInput,
            contactInfo: number,
            about: description,
            storeHours: selectedDays,
            location: mapRegion,
            address: await getAddress(),
          };
          if (selectedImage) {
            const metadata = {
              contentType: 'image/jpeg',
            };

            const storageRef = ref(
              storage,
              `clinicPicture/${auth.currentUser?.uid}.jpeg`,
            );

            // Convert image URI to Blob
            const response = await fetch(selectedImage);
            const blob = await response.blob();

            // Upload the image to Firebase Storage
            await uploadBytes(storageRef, blob, metadata);

            // Get the download URL of the uploaded image
            const imageUrl = await getDownloadURL(storageRef);

            updateData.clinicPicture = imageUrl;
          }
          try {
            await updateDoc(userRef, updateData);
            Alert.alert('Profile updated successfully');
            navigation.reset({
              index: 0,
              routes: [{name: 'HomePage'}],
            });
          } catch (updateError) {
            console.error('Error updating profile:', updateError);
            Alert.alert('Error updating clinic profile. Please try again.');
          }
        }
      });
    } catch (error) {
      console.log('Error querying user data: ', error);
      Alert.alert('Error updating clinic details. Please try again.');
    }
  };

  const skipAddClinic = () => {
    navigation.reset({
      index: 0,
      routes: [{name: 'HomePage'}],
    });
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

  const handleSaveTagInput = () => {
    handleTagsChange(tags);
    Alert.alert('Services tags updated successfully');
    setInputVisible(!isInputVisible);
  };

  const handleToggleInput = () => {
    setInputVisible(!isInputVisible);
  };

  const handleTagsChange = updatedTags => {
    setTagsInput(updatedTags);
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

  const [tags, setTags] = useState([]);
  const [tagVal, setTagVal] = useState('');

  function addTag() {
    if (tagVal.trim() !== '') {
      setTags([...tags, tagVal]);
      setTagVal(''); // Clear the input field after adding a tag
    }
  }

  function removeTag(indexToRemove) {
    const updatedTags = tags.filter((_, index) => index !== indexToRemove);
    setTags(updatedTags);
  }

  const toggleDaySelection = day => {
    const existingDay = selectedDays.find(daysOfWeek => daysOfWeek.day === day);

    if (existingDay) {
      setSelectedDays(
        selectedDays.filter(selectedDay => selectedDay.day !== day),
      );
    } else {
      setSelectedDays([...selectedDays, {day, open: '', close: ''}]);
    }
  };

  const showOpenTimepicker = day => {
    setOpenShow(true);
    setMode('time');
    setCurrentDay(day);
  };

  const showCloseTimepicker = day => {
    setCloseShow(true);
    setMode('time');
    setCurrentDay(day);
  };

  const onChangeOpenTime = (_, selectedDate) => {
    const currentDate = selectedDate || date;
    setOpenShow(false);

    const formattedTime = currentDate.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });

    // Update the selected day's open or close time based on the current mode
    const updatedDays = selectedDays.map(selectedDay =>
      selectedDay.day === currentDay
        ? {
            ...selectedDay,
            [mode === 'time' ? 'open' : '']: formattedTime,
          }
        : selectedDay,
    );

    setSelectedDays(updatedDays);
  };

  const onChangeCloseTime = (_, selectedDate) => {
    const currentDate = selectedDate || date;
    setCloseShow(false);

    const formattedTime = currentDate.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });

    // Update the selected day's open or close time based on the current mode
    const updatedDays = selectedDays.map(selectedDay =>
      selectedDay.day === currentDay
        ? {
            ...selectedDay,
            [mode === 'time' ? 'close' : 'close']: formattedTime,
          }
        : selectedDay,
    );

    setSelectedDays(updatedDays);
    console.log(selectedDays);
  };

  const [mapRegion, setMapRegion] = useState({
    latitude: 10.7202,
    longitude: 122.5621,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const handleRegionChange = region => {
    setMapRegion(region);
  };

  const getAddress = async () => {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${mapRegion.latitude},${mapRegion.longitude}&key=AIzaSyBEfiinUCUa7yJzKNYfR_MRBYLfSj9e9VA`,
    );
    const data = await response.json();
    const address = data.results[0].formatted_address.split(',');
    address.pop();
    return address.join(',');
  };

  return (
    <SafeAreaView>
      <ImageBackground
        source={require('../images/clinicSettings.png')}
        style={{width: Dimensions.get('window').width}}>
        <ScrollView>
          <View style={styles.scrollView}>
            <View>
              <Image
                source={{uri: selectedImage}}/> ) : (
              <View
                style={styles.style1}>
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

          <View style={styles.style2}>
            <View
              style={styles.style3}>
              <Text style={styles.services}>Services</Text>
              <TouchableOpacity onPress={handleToggleInput}>
                <FontAwesomeIcon
                  icon={faCaretDown}
                  size={25}
                  style={{color: '#ff8700', marginLeft: 10, bottom: '20%'}}
                />
              </TouchableOpacity>
            </View>

            <Text style={styles.clinic}>Clinic Details</Text>

            <Text style={styles.clinicDets}>Add Clinic Picture</Text>
            <TouchableOpacity onPress={openImagePicker}>
              {selectedImage ? (
                <Image source={{uri: selectedImage}} style={styles.adClinic} />
              ) : (
                <View style={styles.style1}>
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

            <View style={styles.style2}>
              <View style={styles.style3}>
                <Text style={styles.services}>Services</Text>
                <TouchableOpacity onPress={handleToggleInput}>
                  <FontAwesomeIcon
                    icon={faCaretDown}
                    size={25}
                    style={{color: '#ff8700', marginLeft: 10, bottom: '20%'}}
                  />
                </TouchableOpacity>
              </View>

              <View style={styles.style4}>
                {isInputVisible && (
                  <View>
                    <View style={styles.tagsContainer}>
                      <FlatList
                        data={tags}
                        horizontal
                        renderItem={({item, index}) => (
                          <View style={styles.tagitems}>
                            <Text>{item}</Text>
                            <TouchableOpacity onPress={() => removeTag(index)}>
                              <FontAwesomeIcon
                                icon={faTimesCircle}
                                size={25}
                                style={{color: '#ff8700', marginLeft: 5}}
                              />
                            </TouchableOpacity>
                          </View>
                        )}
                        keyExtractor={(item, index) => index.toString()}
                      />
                    </View>

                    <View style={styles.tagupdatecontainer}>
                      <View style={styles.taginputcontainer}>
                        <TextInput
                          value={tagVal}
                          onChangeText={text => setTagVal(text)}
                          placeholder="Enter service"
                          onSubmitEditing={addTag}
                          style={styles.taginput}
                        />
                        <TouchableOpacity onPress={addTag}>
                          <FontAwesomeIcon
                            icon={faCirclePlus}
                            size={25}
                            style={{color: '#ff8700', marginLeft: 10}}
                          />
                        </TouchableOpacity>
                      </View>

                      <TouchableOpacity onPress={handleSaveTagInput}>
                        <Text style={styles.saveService}>Save</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              </View>
            </View>

            <Text style={styles.clinicDets}>Phone Information</Text>
            <TextInput
              style={styles.input}
              onChangeText={text => setNumber(text)}
              value={number}
              keyboardType="numeric"
            />

            <Text style={styles.clinicDets}>About</Text>
            <TextInput
              style={styles.input}
              onChangeText={text => setDescription(text)}
              value={description}
            />

            <Text style={styles.clinicDets}>Store Hours</Text>
            <View style={styles.radio}>
              {daysOfWeek.map(({day, open, close}, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => toggleDaySelection(day)}>
                  <View style={styles.wrap}>
                    <View style={styles.btn}>
                      {selectedDays.some(
                        selectedDay => selectedDay.day === day,
                      ) && <View style={styles.bg}></View>}
                    </View>

                    <Text style={styles.text}>{day}</Text>
                    {daysOfWeek.some(
                      selectedDay => selectedDay.day === day,
                    ) && (
                      <View style={{width: 85}}>
                        <Button
                          onPress={() => showOpenTimepicker(day)}
                          title={
                            selectedDays.find(d => d.day === day)?.open ||
                            'Open'
                          }
                          color={'#FFAC4E'}
                        />
                      </View>
                    )}
                    <Text style={styles.dashText}> -</Text>

                    {daysOfWeek.some(
                      selectedDay => selectedDay.day === day,
                    ) && (
                      <View style={{width: 85}}>
                        <Button
                          onPress={() => showCloseTimepicker(day)}
                          title={
                            selectedDays.find(d => d.day === day)?.close ||
                            'Close'
                          }
                          color={'#FFAC4E'}
                        />
                      </View>
                    )}
                  </View>
                </TouchableOpacity>
              ))}
            </View>
            {openshow && (
              <DateTimePicker
                testID="dateOpenTimePicker"
                value={date}
                mode={mode}
                is24Hour={true}
                display="default"
                onChange={onChangeOpenTime}
              />
            )}
            {closeshow && (
              <DateTimePicker
                testID="dateCloseTimePicker"
                value={date}
                mode={mode}
                is24Hour={true}
                display="default"
                onChange={onChangeCloseTime}
              />
            )}

            <Text style={styles.clinicDets}>Location</Text>
            <View style={{flex: 1}}>
              <MapView
                style={{flex: 1, margin: 40, height: 300}}
                provider={PROVIDER_GOOGLE}
                initialRegion={mapRegion}
                onRegionChangeComplete={handleRegionChange}>
                <Marker
                  coordinate={{
                    latitude: mapRegion.latitude,
                    longitude: mapRegion.longitude,
                  }}
                />
              </MapView>
            </View>

            <View style={{height: 300}}>
              <AppButton
                title="Save"
                onPress={saveClinicInfo}
                buttonStyle={styles.btn1}
                textStyle={styles.bt1}
              />
              <AppButton
                title="Skip"
                onPress={skipAddClinic}
                buttonStyle={styles.skip}
                textStyle={styles.skipText}
              />
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: constants.$textColor2,
    borderTopStartRadius: 50,
    borderTopEndRadius: 50,
    flex: 1,
    top: 170,
    shadowColor: constants.$textColor1,
    shadowOffset: {
      width: -2,
      height: 10,
    },
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 50,
  },
  vecImg: {
    flex: 1,
    position: 'absolute',
    top: 200,
    left: '85%',
  },
  style1: {
    ...alignmentMixin.alignment,
    backgroundColor: '#ffb78f80',
    borderRadius: 40,
    margin: '1%',
    height: 150,
    width: '82%',
  } as ViewStyle,
  style2: {
    flexDirection: 'column',
    flexWrap: 'wrap',
  },
  style3: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    flexWrap: 'wrap',
  },
  style4: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginLeft: 40,
    flexWrap: 'wrap',
    width: 350,
  },
  saveService: {
    marginLeft: 10,
    color: constants.$textColor2,
    fontSize: constants.$fontSizeSmall,
    backgroundColor: constants.$primaryColor,
    borderRadius: 10,
    padding: 10,
  },
  dashText: {
    fontSize: constants.$fontSizeMedium,
    color: constants.$secondaryColor,
    fontWeight: 'bold',
    marginRight: 5,
  },
  clinic: {
    paddingTop: '3%',
    paddingLeft: '8%',
    fontSize: 35,
    color: constants.$secondaryColor,
    fontFamily: constants.$fontFamilySemiBold,
  },
  clinicDets: {
    ...alignmentMixin.alignClinic,
  } as ViewStyle,
  services: {
    ...alignmentMixin.alignClinic,
    paddingTop: '1%',
  } as ViewStyle,
  input: {
    ...alignmentMixin.alignment,
    padding: 0,
    fontSize: 18,
    width: '75%',
    color: constants.$textColor1,
    borderBottomWidth: 1.5,
    borderColor: constants.$quaternaryColor,
    flex: 1,
    marginLeft: '-4%',
  } as TextStyle,
  btn1: {
    ...buttonMixin.button,
    ...alignmentMixin.alignment,
    flex: 1,
    marginLeft: '20%',
    margin: '23%',
    borderRadius: 40,
    marginRight: '45%',
    bottom: '40%',
    width: '30%'
  } as ViewStyle,
  bt1: {
    ...buttonMixin.buttonText,
    fontFamily: constants.$fontFamilyMedium,
    fontSize: constants.$fontSizeLarge,
  } as ViewStyle,
  skip: {
    ...buttonMixin.button,
    ...alignmentMixin.alignment,
    flex: 1,
    marginLeft: '60%',
    borderRadius: 50,
    backgroundColor: 'white',
    marginRight: '10%',
    bottom: '90%',
    width: '30%',
  } as ViewStyle,
  skipText: {
    ...buttonMixin.buttonText,
    color: constants.$primaryColor,
    fontFamily: constants.$fontFamilyMedium,
  } as ViewStyle,
  radio: {
    alignItems: 'baseline',
    justifyContent: 'space-between',
    padding: '-2%',
  },
  text: {
    marginLeft: '2%',
    fontSize: constants.$fontSizeLarge,
    padding: '1%',
    color: '#878787',
    fontFamily: constants.$fontFamily,
    width: '33%',
  },
  btn: {
    marginLeft: '10%',
    width: '5%',
    height: '50%',
    borderRadius: 20,
    borderColor: constants.$primaryColor,
    borderWidth: 3,
  },
  wrap: {
    ...alignmentMixin.alignment1
  } as ViewStyle,
  bg: {
    backgroundColor: constants.$primaryColor,
    height: 15,
    width: 15,
    borderRadius: 20,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: '3%',
    borderColor: constants.$primaryColor,
    borderWidth: 2,
    borderRadius: 15,
    backgroundColor: constants.$textColor2,
    paddingHorizontal: '-1%',
    paddingVertical: '1%',
    marginHorizontal: '1%',
    height: 60,
    width: '95%',
  },
  tagitems: {
    flex: 1,
    ...alignmentMixin.alignment1,
    padding: '4%',
    margin: 6,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: constants.$primaryColor,
    color: constants.$secondaryColor,
    backgroundColor: constants.$quinaryColor,
  } as ViewStyle,
  taginputcontainer: {
    ...alignmentMixin.alignment1,
    color: constants.$secondaryColor,
    fontSize: constants.$fontSizeMedium,
    marginLeft: '8%',
    borderRadius: 15,
    marginTop: '2%',
    marginBottom: '2%',
    fontWeight: 'bold',
    paddingHorizontal: '3%',
    backgroundColor: constants.$quinaryColor,
  } as ViewStyle,
  taginput: {
    ...alignmentMixin.alignment1,
    color: constants.$secondaryColor,
    backgroundColor: constants.$quinaryColor,
    fontSize: constants.$fontSizeMedium,
    marginLeft: '1%',
    borderRadius: 10,
  } as ViewStyle,
  tagupdatecontainer: {
    ...alignmentMixin.alignment1
  } as ViewStyle,
});

export default PawPalApp;
