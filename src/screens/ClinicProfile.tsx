import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import {faGear} from '@fortawesome/free-solid-svg-icons';
import {faMobileScreenButton} from '@fortawesome/free-solid-svg-icons';
import {faPhone} from '@fortawesome/free-solid-svg-icons';
import {faClock} from '@fortawesome/free-solid-svg-icons';
import {faCircleArrowDown} from '@fortawesome/free-solid-svg-icons';

import {useNavigation} from '@react-navigation/native';
import {FIREBASE_AUTH, FIREBASE_DB} from '../../firebase.config';
import {getDocs, collection} from 'firebase/firestore';

const ClinicProfile = () => {
  const navigation = useNavigation();

  const auth = FIREBASE_AUTH;
  const db = FIREBASE_DB;

  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const [clinicName, setClinicName] = useState('');
  const [clinicPicture, setClinicPicture] = useState(null);
  const [contactInfo, setContactInfo] = useState('');
  const [about, setAbout] = useState('');
  const [storeHours, setStoreHours] = useState([
    {day: 'Monday', open: '', close: ''},
    {day: 'Tuesday', open: '', close: ''},
    {day: 'Wednesday', open: '', close: ''},
    {day: 'Thursday', open: '', close: ''},
    {day: 'Friday', open: '', close: ''},
    {day: 'Saturday', open: '', close: ''},
    {day: 'Sunday', open: '', close: ''},
  ]);
  const [services, setServices] = useState([]);
  const [mapRegion, setMapRegion] = useState({
    latitude: 10.7202,
    longitude: 122.5621,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [address, setAddress] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'user'));
        querySnapshot.forEach(doc => {
          if (doc.data().userId === auth.currentUser?.uid) {
            setClinicName(doc.data().name);
            setAbout(doc.data().about);
            setClinicPicture(doc.data().clinicPicture);
            setContactInfo(doc.data().contactInfo);
            setStoreHours(doc.data().storeHours);
            setServices(doc.data().services);
            setMapRegion(doc.data().location);
            setAddress(doc.data().address);
          }
        });
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <SafeAreaView
      style={{
        backgroundColor: 'orange',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
      }}>
      <View>
        <View style={styles.icon}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <FontAwesomeIcon
              icon={faArrowLeft}
              size={30}
              style={{color: 'brown'}}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('SettingsPage_Clinic')}>
            <FontAwesomeIcon icon={faGear} size={30} style={{color: 'brown'}} />
          </TouchableOpacity>
        </View>

        <View>
          <ImageBackground
            source={
              clinicPicture
                ? {uri: clinicPicture}
                : require('../images/placeholder.png')
            }
            resizeMode="stretch"
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              width: 410,
              height: 410,
              left: '0.3%',
              position: 'relative',
              padding: 20,
              bottom: 90,
            }}></ImageBackground>
        </View>
      </View>
      <ScrollView>
        <View
          style={{
            backgroundColor: 'white',
            borderTopStartRadius: 50,
            borderTopEndRadius: 50,
            flex: 1,
            shadowColor: 'black',
            shadowOffset: {
              width: -2,
              height: 10,
            },
            shadowOpacity: 1,
            shadowRadius: 3,
            elevation: 1000,
            top: 150,
          }}>
          <Text
            style={{
              color: 'black',
              fontSize: 30,
              fontFamily: 'Poppins-Bold',
              marginTop: 30,
              marginLeft: 20,
            }}>
            {clinicName}
          </Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View
              style={{
                flexDirection: 'row',
                margin: 10,
                justifyContent: 'flex-start',
              }}>
              <FontAwesomeIcon
                icon={faMobileScreenButton}
                size={23}
                style={{
                  color: '#FF8D4D',
                }}
              />
              <Text
                style={{
                  color: '#ff8d4d',
                  fontSize: 18,
                  fontFamily: 'Poppins-Medium',
                  marginLeft: 7,
                }}>
                {contactInfo}
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                margin: 10,
                justifyContent: 'flex-start',
              }}>
              <FontAwesomeIcon
                icon={faClock}
                size={23}
                style={{
                  color: '#FF8D4D',
                }}
              />
              <Text
                style={{
                  color: '#ff8d4d',
                  fontSize: 18,
                  fontFamily: 'Poppins-Medium',
                  textDecorationLine: 'underline',
                  marginLeft: 6,
                  marginRight: 6,
                }}>
                Store Hours
              </Text>

              <View style={styles.drop}>
                <TouchableOpacity onPress={toggleDropdown}>
                  <FontAwesomeIcon
                    icon={faCircleArrowDown}
                    size={23}
                    style={{
                      color: '#FF8D4D',
                    }}
                  />
                </TouchableOpacity>
                {isDropdownOpen && (
                  <View style={styles.dropdown}>
                    {storeHours.map(
                      (dayHours, index) =>
                        dayHours.open !== '' &&
                        dayHours.close !== '' && (
                          <Text key={index}>
                            {dayHours.day}: {dayHours.open} to {dayHours.close}
                          </Text>
                        ),
                    )}
                  </View>
                )}
              </View>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              margin: 10,
              justifyContent: 'flex-start',
            }}>
            <FontAwesomeIcon
              icon={faPhone}
              size={23}
              style={{
                color: '#FF8D4D',
              }}
            />
            <Text
              style={{
                color: '#ff8d4d',
                fontSize: 18,
                fontFamily: 'Poppins-Medium',
                marginLeft: 7,
              }}>
              {contactInfo}
            </Text>
          </View>
          <Text
            style={{
              color: 'grey',
              fontSize: 24,
              marginLeft: 10,
              marginTop: 10,
            }}>
            Services
          </Text>
          {Array.isArray(services) && services.length > 0 && (
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'flex-start',
                margin: 10,
              }}>
              {services.map((service, index) => (
                <View
                  key={index}
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    margin: 5,
                  }}>
                  <Text
                    style={{
                      color: 'black',
                      textAlign: 'center',
                      backgroundColor: '#f1d5c5',
                      padding: 10,
                      borderRadius: 20,
                      fontFamily: 'Poppins-Medium',
                    }}>
                    {service}
                  </Text>
                </View>
              ))}
            </View>
          )}

          <View>
            <Image
              source={require('../images/Line_23.png')}
              resizeMode="stretch"
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                margin: 10,
                width: 1000,
              }}
            />
          </View>
          <Text
            style={{
              color: 'black',
              marginLeft: 10,
              fontSize: 16,
              fontFamily: 'Poppins-Semi',
            }}>
            {about}
          </Text>
          <Text
            style={{
              color: '#ff8d4d',
              marginLeft: 10,
              fontFamily: 'Poppins-Medium',
              fontSize: 28,
              padding: 10,
            }}>
            Location
          </Text>
          {mapRegion && (
            <View>
              <Text
                style={{
                  marginLeft: 20,
                  fontSize: 18,
                  fontFamily: 'Poppins-Medium',
                }}>
                {address}
              </Text>
              <MapView
                style={{margin: 20, height: 500}}
                provider={PROVIDER_GOOGLE}
                initialRegion={mapRegion}
                region={mapRegion}>
                <Marker
                  coordinate={{
                    latitude: mapRegion.latitude,
                    longitude: mapRegion.longitude,
                  }}
                />
              </MapView>
            </View>
          )}
          {!mapRegion && (
            <MapView
              style={{margin: 20, height: 500}}
              provider={PROVIDER_GOOGLE}
              initialRegion={{
                latitude: 10.7202,
                longitude: 122.5621,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}></MapView>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  icon: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 30,
    zIndex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.9,
  },
  content: {
    backgroundColor: '#ff8d4d',
    padding: 20,
    borderRadius: 30,
    margin: 50,
    color: 'white',
  },
  drop: {
    // flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center'
  },
  dropdown: {
    marginTop: 10,
    backgroundColor: 'white',
    borderWidth: 2,
    padding: 10,
    borderRadius: 5,
    position: 'absolute',
    width: 250,
    right: 5,
    zIndex: 5,
    top: 14,
    elevation: 20,
    borderColor: 'orange',
  },
});

export default ClinicProfile;
