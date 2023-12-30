import React, {useState} from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View, TouchableOpacity, Image, Alert, StyleProp, ViewStyle, TextStyle, FlatList} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCirclePlus, 
        faImage, 
        faLocationDot, 
        faTimesCircle,
        faCaretDown} from '@fortawesome/free-solid-svg-icons';
import { FIREBASE_DB, FIREBASE_AUTH} from '../../firebase.config';
import {getDocs, collection, updateDoc, doc} from 'firebase/firestore';
import {useNavigation} from '@react-navigation/native';
import { red } from 'react-native-reanimated/lib/typescript/reanimated2/Colors';

// import DateTimePicker from '@react-native-community/datetimepicker';
// import DateTimePickerModal from 'react-native-modal-datetime-picker';

const PawPalApp = () => {
  const navigation = useNavigation();

  const db = FIREBASE_DB;
  const auth = FIREBASE_AUTH;

  const [selectedImage, setSelectedImage] = useState(null);
  const [user, setUser] = useState(null);
  const [number, setNumber] = useState('');
  const [description, setDescription] = useState('');
  const [selectedDays, setSelectedDays] = useState([
    { day: 'Monday', open: '', close: '' },
    { day: 'Tuesday', open: '', close: '' },
    { day: 'Wednesday', open: '', close: '' },
    { day: 'Thursday', open: '', close: '' },
    { day: 'Friday', open: '', close: '' },
    { day: 'Saturday', open: '', close: '' },
    { day: 'Sunday', open: '', close: '' },
  ]);

  const [tagsInput, setTagsInput] = useState([]);

  const toggleDaySelection = (day: string) => {
    const existingDay = selectedDays.find((selectedDay) => selectedDay.day === day);
  
    if (existingDay) {
      // Day exists, remove it from the array
      setSelectedDays(selectedDays.filter((selectedDay) => selectedDay.day !== day));
    } else {
      // Day doesn't exist, add it to the array with default open and close hours
      setSelectedDays([...selectedDays, { day, open: '', close: '' }]);
    }
  };
  
  const daysOfWeek = [
    { day: 'Monday', open: '', close: '' },
    { day: 'Tuesday', open: '', close: '' },
    { day: 'Wednesday', open: '', close: '' },
    { day: 'Thursday', open: '', close: '' },
    { day: 'Friday', open: '', close: '' },
    { day: 'Saturday', open: '', close: '' },
    { day: 'Sunday', open: '', close: '' },
];

  const saveClinicInfo = async () => {
    try{
      const userQuery = await getDocs(collection(db, 'user'));
      userQuery.forEach(async currentDoc => {
        if (currentDoc.data().userId === auth.currentUser?.uid) {
          const userRef = doc(collection(db, 'user'), currentDoc.id);
          const updateData = {
            picture: selectedImage,
            services: tagsInput,
            contactInfo: number,
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

  const exitClinicEdit = () => {
    navigation.navigate('HomePage');
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

  const handleTagsChange = (updatedTags) => {
    setTagsInput(updatedTags);
  };

  const handleSaveInput = () => {
    console.log('Input Text: ' + tagsInput);
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

    const handleOpenHoursChange = (day: string, text: string) => {
      setSelectedDays((prevDays) =>
        prevDays.map((selectedDay) =>
          selectedDay.day === day ? { ...selectedDay, open: text } : selectedDay
        )
      );
    };
    
    const handleCloseHoursChange = (day: string, text: string) => {
      setSelectedDays((prevDays) =>
        prevDays.map((selectedDay) =>
          selectedDay.day === day ? { ...selectedDay, close: text } : selectedDay
        )
      );
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

          <View style={{flexDirection: 'column',flexWrap:'wrap'}}>
            <View style={{flexDirection: 'row', alignItems: 'flex-end' ,flexWrap:'wrap'}}>
            <Text style={styles.services}>Services</Text>
            <TouchableOpacity onPress={handleToggleInput}>
              <FontAwesomeIcon
                icon={faCaretDown}
                size={25}
                style={{color: '#ff8700', marginLeft: 10}}
              />
            </TouchableOpacity>
            </View>

            <View 
              style={{ justifyContent: 'center',
                      alignItems: 'flex-end',
                      marginLeft: 40,
                      flexWrap:'wrap',
                      width: 350
                      }}
            >
              {/* CONCERN: ADDING MORE TAGS */}
              {isInputVisible && (
              <View>
                <View style={styles.tagsContainer}>
                  <FlatList
                    data={tags}
                    horizontal
                    renderItem={({ item, index }) => (
                      <View style={styles.tagitems}>
                        <Text>{item}</Text>
                        <TouchableOpacity onPress={() => removeTag(index)}>
                          <FontAwesomeIcon
                            icon={faTimesCircle}
                            size={25}
                            style={{ color: '#ff8700', marginLeft: 5 }}
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
                      onChangeText={(text) => setTagVal(text)}
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
                    <Text
                      style={{
                        marginLeft: 10,
                        color: 'white',
                        fontSize: 13,
                        backgroundColor: '#ff8700',
                        borderRadius: 10,
                        padding: 10,
                      }}>
                      Save
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              )}
            </View>
          </View>

          <Text style={styles.phoneInfo}>Phone Information</Text>
          <TextInput
            style={styles.input}
            onChangeText={text => setNumber(text)}
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
            {selectedDays.map(({day, open, close }, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => toggleDaySelection(day)}>
                <View style={styles.wrap}>
                  <View style={styles.btn}>
                  {selectedDays.some((selectedDay) => selectedDay.day === day) && (
                      <View style={styles.bg}></View>
                    )}
                  </View>

                  {/* CONCERN: OPEN AND CLOSING HOURS HOW SHOULD I STORE */}
                  <Text style={styles.text}>{day}</Text>
                  {selectedDays.some((selectedDay) => selectedDay.day === day) && (
                    <TextInput
                      style={{fontSize: 20, marginLeft: 25, color: '#5A2828', width: 75}}
                      placeholderTextColor={'#D3D3D3'}
                      placeholder="Open"
                      value={open}
                      onChangeText={(text) => handleOpenHoursChange(day, text)}
                    />
                  )}
                  {selectedDays.some((selectedDay) => selectedDay.day === day) && (
                    <TextInput
                      style={{fontSize: 20, marginLeft: 25, color: '#5A2828', width: 75}}
                      placeholderTextColor={'#D3D3D3'}
                      placeholder="Close"
                      value={close}
                      onChangeText={(text) => handleCloseHoursChange(day, text)}
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
              onPress={exitClinicEdit}
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

  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 5,
    marginBottom: 10,
    borderColor: '#FFAC4E',
    borderWidth: 2,
    borderRadius: 15,
    backgroundColor: 'white',
  },
  tagitems: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    margin: 6,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#FFAC4E',
    color: '#5A2828', 
    backgroundColor: '#F1D5C6', 
    borderRadius: 15, 

    
  },
  taginputcontainer: {
    textAlign: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#5A2828', 
    fontSize: 15, 
    marginLeft: 5,
    marginRight: 0,
    borderRadius: 15,
    margintop: 10,
    marginBottom: 5,
    fontWeight: 'bold',
  },

  taginput: {
    textAlign: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    color: '#5A2828', 
    fontSize: 15, 
    marginLeft: 5, 
    backgroundColor: '#F1D5C6', 
    borderRadius: 10, 
  },
  tagupdatecontainer:{
    flexDirection: 'row',
    alignItems: 'center',

  },
});

export default PawPalApp;