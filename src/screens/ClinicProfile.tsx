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
  ViewStyle,
  ImageStyle,
} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import * as icons from '../imports/icons/icons';
import {useNavigation} from '@react-navigation/native';
import {FIREBASE_AUTH, FIREBASE_DB} from '../../firebase.config';
import {getDocs, collection} from 'firebase/firestore';
import constants from '../styles/constants';
import {buttonMixin} from '../components/buttonMixin';
import {alignmentMixin} from '../components/alignmentMixin';
import {useNavigateTo} from '../components/navigation';
import LoadingScreen from '../components/loading';

const ClinicProfile = ({route}) => {
  const navigation = useNavigation();
  const SettingsClinic = useNavigateTo('SettingsPage_Clinic');
  const ChatHome = useNavigateTo('ChatHome');

  const auth = FIREBASE_AUTH;
  const db = FIREBASE_DB;

  const [loading, setLoading] = useState(true);

  const userId = route.params?.userId;

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

  const fetchData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'user'));
      querySnapshot.forEach(doc => {
        if (
          (userId && doc.data().userId === userId) ||
          (!userId && doc.data().userId === auth.currentUser?.uid)
        ) {
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
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Fetch data after editing profile
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchData();
    });
    return unsubscribe;
  }, [navigation]);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <SafeAreaView
      style={{
        backgroundColor: 'white',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
      }}>
      <View>
        <View style={styles.icon}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <FontAwesomeIcon
              icon={icons.faArrowLeft}
              size={25}
              style={{color: constants.$secondaryColor}}
            />
          </TouchableOpacity>
          {!userId && (
            <TouchableOpacity onPress={SettingsClinic}>
              <FontAwesomeIcon
                icon={icons.faGear}
                size={30}
                style={{color: constants.$secondaryColor, right: '60%'}}
              />
            </TouchableOpacity>
          )}
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
        <View style={styles.scrollBar}>
          <Text style={styles.clinicTitle}>{clinicName}</Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={styles.iconStyles}>
              <FontAwesomeIcon
                icon={icons.faPhone}
                size={19}
                style={{
                  color: constants.$senaryColor,
                  left: '75%',
                }}
              />
              <Text style={styles.phoneText}>{contactInfo}</Text>
            </View>

            <View style={styles.iconStyles}>
              <FontAwesomeIcon
                icon={icons.faClock}
                size={16}
                style={{
                  color: constants.$senaryColor,
                  top: '3%',
                  right: '20%',
                }}
              />
              <Text style={styles.storeText}>Store Hours</Text>

              <View>
                <TouchableOpacity onPress={toggleDropdown}>
                  <FontAwesomeIcon
                    icon={icons.faCaretDown}
                    size={18}
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

          {userId && (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Chat', {
                  senderId: userId,
                  senderName: clinicName,
                  senderPicture: clinicPicture
                    ? {uri: clinicPicture}
                    : require('../images/placeholder.png'),
                })
              }>
              <View style={styles.messageDets}>
                <FontAwesomeIcon
                  icon={icons.faComment}
                  size={19}
                  style={{
                    color: constants.$senaryColor,
                    left: '120%',
                  }}
                />
                <Text style={styles.messageText}>Message</Text>
              </View>
            </TouchableOpacity>
          )}

          <Text style={styles.servicesText}>Services</Text>
          {Array.isArray(services) && services.length > 0 && (
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'flex-start',
                margin: 10,
              }}>
              {services.map((service, index) => (
                <View key={index} style={styles.servicesForm}>
                  <Text style={styles.servicesView}>{service}</Text>
                </View>
              ))}
            </View>
          )}

          <View>
            <Image
              source={require('../images/Line_23.png')}
              style={styles.lineStyle}
              resizeMode="stretch"
            />
          </View>
          <Text style={styles.aboutText}>{about}</Text>
          <Text style={styles.locText}>Location</Text>
          {mapRegion && (
            <View>
              <Text style={styles.addressText}>{address}</Text>
              <View>
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
    ...alignmentMixin.alignment,
    flex: 1,
    width: Dimensions.get('window').width,
    //width: 410,
    height: 410,
    //left: '0.3%',
    position: 'relative',
    padding: '5%',
    bottom: '230%',
  } as ViewStyle,
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
    fontSize: 28,
    fontFamily: constants.$fontFamilySemiBold,
    marginTop: '6%',
    marginLeft: '7%',
  },
  iconStyles: {
    padding: '2%',
    flexDirection: 'row',
    margin: '3%',
    justifyContent: 'flex-start',
    right: '3%',
  },
  phoneText: {
    color: constants.$senaryColor,
    fontSize: 16,
    fontFamily: constants.$fontFamilyMedium,
    marginLeft: '15%',
  },
  storeText: {
    color: constants.$senaryColor,
    fontSize: 16,
    fontFamily: constants.$fontFamilyMedium,
    textDecorationLine: 'underline',
    marginLeft: 6,
    marginRight: 6,
  },
  servicesText: {
    color: constants.$secondaryColor,
    fontFamily: constants.$fontFamilyMedium,
    fontSize: 21,
    marginLeft: '7%',
    marginTop: 10,
  },
  servicesForm: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    margin: '1%',
  },
  servicesView: {
    left: '35%',
    color: constants.$textColor1,
    textAlign: ' center ',
    backgroundColor: '#f1d5c5',
    padding: '2.5%',
    borderRadius: 20,
    fontFamily: constants.$fontFamilyMedium,
  },
  lineStyle: {
    ...alignmentMixin.alignment,
    margin: '3%',
    width: '90%',
  } as ImageStyle,
  aboutText: {
    color: constants.$textColor1,
    marginLeft: '9%',
    fontSize: 16,
    fontFamily: constants.$fontFamilySemiBold,
  },
  locText: {
    color: constants.$senaryColor,
    marginLeft: '9%',
    fontFamily: constants.$fontFamilyMedium,
    fontSize: 21,
    padding: '3%',
  },
  addressText: {
    marginLeft: '12%',
    fontSize: 14,
    fontFamily: constants.$fontFamilyMedium,
  },
  icon: {
    top: '5%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: '3%',
    zIndex: 1,
  },
  container: {
    ...alignmentMixin.align,
    flex: 1,
    opacity: 0.9,
  } as ViewStyle,
  dropdown: {
    backgroundColor: constants.$textColor2,
    borderWidth: 2,
    padding: '4%',
    borderRadius: 5,
    position: 'absolute',
    width: '1200%',
    right: '5%',
    zIndex: 5,
    top: '90%',
    elevation: 20,
    borderColor: constants.$senaryColor,
  },
  messageText: {
    color: constants.$senaryColor,
    fontSize: 16,
    fontFamily: constants.$fontFamilyMedium,
    marginLeft: '10%',
    top: '-0.5%',
    textDecorationLine: 'underline',
  },
  messageDets: {
    top: '-2%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
});

export default ClinicProfile;
