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
import * as icons from '../imports/icons/icons';
import {useNavigation} from '@react-navigation/native';
import {FIREBASE_AUTH, FIREBASE_DB} from '../../firebase.config';
import {getDocs, collection} from 'firebase/firestore';
import constants from '../styles/constants';
import {buttonMixin} from '../components/buttonMixin';
import { alignmentMixin } from '../components/alignmentMixin';

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
              icon={icons.faArrowLeft}
              size={30}
              style={{color: 'brown'}}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('SettingsPage_Clinic')}>
            <FontAwesomeIcon icon={icons.faGear} size={30} style={{color: 'brown'}} />
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
            style={styles.profile}></ImageBackground>
        </View>
      </View>
      <ScrollView>
        <View
          style={styles.scrollBar}>
          <Text
            style={styles.clinicTitle}>
            {clinicName}
          </Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View
              style={styles.iconStyles}>
              <FontAwesomeIcon
                icon={icons.faPhone} size={23}
                style={{
                  color: constants.$senaryColor,
                  left: 9,
                }}
              />
              <Text
                style={styles.phoneText}>
                {contactInfo}
              </Text>
            </View>

            <View
              style={styles.iconStyles}>
              <FontAwesomeIcon
                icon={icons.faClock}
                size={23}
                style={{
                  color: constants.$senaryColor,
                }}
              />
              <Text
                style={styles.storeText}>
                Store Hours
              </Text>

              <View style={styles.drop}>
                <TouchableOpacity onPress={toggleDropdown}>
                  <FontAwesomeIcon
                    icon={icons.faCircleArrowDown}
                    size={23}
                    style={{
                      color: constants.$senaryColor,
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
          <Text
            style={styles.servicesText}>
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
                  style={styles.servicesForm}>
                  <Text
                    style={styles.servicesView}>
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
              style={styles.lineStyle}
            />
          </View>
          <Text
            style={styles.aboutText}>
            {about}
          </Text>
          <Text
            style={styles.locText}>
            Location
          </Text>
          {mapRegion && (
            <View>
              <Text
                style={styles.addressText}>
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
  profile: {
    ...alignmentMixin.align,
    flex: 1,
    width: 410,
    height: 410,
    left: '0.3%',
    position: 'relative',
    padding: '5%',
    bottom: '230%',
  },
  scrollBar: {
    backgroundColor: constants.$textColor2,
    borderTopStartRadius: 50,
    borderTopEndRadius: 50,
    flex: 1,
    shadowColor: constants.$textColor1,
    shadowOffset: {
      width: -2,
      height: 10,
    },
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 1000,
    top: '20%',
  },
  clinicTitle: {
    color: constants.$textColor1,
    fontSize: 30,
    fontFamily: constants.$fontFamilyBold,
    marginTop: '6%',
    marginLeft: '7%',
  },
  iconStyles: {
    flexDirection: 'row',
    margin: '3%',
    justifyContent: 'flex-start',
  },
  phoneText: {
    color: constants.$senaryColor,
    fontSize: 18,
    fontFamily: constants.$fontFamilyMedium,
    marginLeft: 7,
  },
  storeText: {
    color: constants.$senaryColor,
    fontSize: 18,
    fontFamily: constants.$fontFamilyMedium,
    textDecorationLine: 'underline',
    marginLeft: 6,
    marginRight: 6,
  },
  servicesText: {
    color: constants.$secondaryColor,
    fontFamily: constants.$fontFamilyMedium,
    fontSize: 24,
    marginLeft: 10,
    marginTop: 10,
  },
  servicesForm: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    margin: 5,
  },
  servicesView: {
    color: constants.$textColor1,
    textAlign: 'center',
    backgroundColor: '#f1d5c5',
    padding: 10,
    borderRadius: 20,
    fontFamily: constants.$fontFamilyMedium,
  },
  lineStyle: {
    ...alignmentMixin.align,
    margin: 10,
    width: 1000,
  },
  aboutText: {
    color: constants.$textColor1,
    marginLeft: 10,
    fontSize: 16,
    fontFamily: constants.$fontFamilySemiBold,
    left: 10,
  },
  locText: {
    color: constants.$senaryColor,
    marginLeft: 10,
    fontFamily: constants.$fontFamilyMedium,
    fontSize: 28,
    padding: 10,
  },
  addressText: {
    marginLeft: 20,
    fontSize: 14,
    fontFamily: constants.$fontFamilyMedium,
  },
  icon: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 30,
    zIndex: 1,
  },
  container: {
    ...alignmentMixin.align,
    flex: 1,
    opacity: 0.9,
  },
  content: {
    backgroundColor: constants.$senaryColor,
    padding: 20,
    borderRadius: 30,
    margin: 50,
    color: constants.$textColor2,
  },
  drop: {
  },
  dropdown: {
    marginTop: 10,
    backgroundColor: constants.$textColor2,
    borderWidth: 2,
    padding: 10,
    borderRadius: 5,
    position: 'absolute',
    width: 250,
    right: 5,
    zIndex: 5,
    top: 14,
    elevation: 20,
    borderColor: constants.$senaryColor,
  },
});

export default ClinicProfile;