import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faCircleChevronRight,
  faCircleChevronLeft,
  faMessage,
  faCog,
  faAddressCard,
} from '@fortawesome/free-solid-svg-icons';
// import addpet from '../components/addpet';
// import { petData, ownerData } from '../components/addpet';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import ViewPropTypes from 'deprecated-react-native-prop-types';

import {Card, Avatar} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {getDocs, collection} from 'firebase/firestore';
import {FIREBASE_AUTH, FIREBASE_DB} from '../../firebase.config';

interface Pet {
  id: number;
  name: string;
  breed: string;
  color: string;
  age: string;
  sex: string;
  weight: string;
}
interface Owner {
  id: number;
  username: string;
  profilePicture: any; // Adjust the type based on your actual data type
  title: string;
  description: string;
}

const ProfileDetails = () => {
  const navigation = useNavigation();

  const auth = FIREBASE_AUTH;
  const db = FIREBASE_DB;

  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [profilePicture, setProfilePicture] = useState<any>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [petDatabase, setPetDatabase] = useState<Pet[]>([
    {
      id: 1,
      name: 'Buddy',
      breed: 'Labrador',
      color: 'Golden',
      age: '2 months',
      sex: 'Male',
      weight: '2 kg',
    },
    // {age: '2 months' , sex: 'Male', weight: '2 kg' }
  ]);

  const [ownerDatabase, setOwnerDatabase] = useState<Owner[]>([
    {
      id: 1,
      username: 'Kristina V. Celis',
      profilePicture: require('../images/userIcon3.png'), // Path to profile icon
      title: 'Pet Owner',
      description: 'I am an avid pet owner!',
    },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'user'));
        querySnapshot.forEach(doc => {
          if (doc.data().userId === auth.currentUser?.uid) {
            setName(doc.data().name);
            setBio(doc.data().bio);
            setProfilePicture(doc.data().profilePicture);
          }
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const renderCarouselItem = ({item, index}: {item: Pet; index: number}) => (
    <View key={item.id} style={styles.boxContainer}>
      <LinearGradient
        colors={['#FFAC4E', '#FF6464']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={[styles.gradientBackground, {height: 150}]}>
        <View style={styles.boxContent}>
          <View style={styles.profileText}>
            <Text style={styles.petName}>{item.name}</Text>
            <Text style={styles.petBreed}>{item.breed}</Text>
            <Text style={styles.petColor}>{item.color}</Text>
          </View>
          <View style={styles.arrowLR}>
            <TouchableOpacity
              style={styles.arrowLeft}
              onPress={() => {
                const newIndex = activeIndex > 0 ? activeIndex - 1 : 0;
                setActiveIndex(newIndex);
              }}>
              <FontAwesomeIcon
                icon={faCircleChevronLeft}
                size={30}
                style={{
                  color: '#ff8700',
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.arrowRight}
              onPress={() => {
                const newIndex =
                  activeIndex < petDatabase.length - 1
                    ? activeIndex + 1
                    : petDatabase.length - 1;
                setActiveIndex(newIndex);
              }}>
              <FontAwesomeIcon
                icon={faCircleChevronRight}
                size={30}
                style={{
                  color: '#ff8700',
                }}
              />
              <View style={styles.logo}>
                <Image
                  source={require('../images/pawpal_logo.png')}
                  style={styles.pawpalLogo}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
      <View style={styles.bottomContainer}>
        <View style={styles.bottomTexts}>
          <Text style={styles.petDetail}>Age</Text>
          <Text style={styles.petDetail}>Sex</Text>
          <Text style={styles.petDetail}>Weight</Text>
        </View>
        <View style={styles.boxContain}>
          <Text style={styles.boxText}>{item.age}</Text>
          <Text style={styles.boxText}>{item.sex}</Text>
          <Text style={styles.boxText}>{item.weight}</Text>
        </View>
        <View style={styles.horizontalLine} />
      </View>
    </View>
  );

  const UserProfileCard = ({user}: {user: Owner}) => {
    const calculateMargin = (usernameLength: number) => {
      // Your logic for calculating margin based on username length
      // Adjust this based on your specific requirements
      return usernameLength * 2;
    };

    return (
      <Card style={styles.card}>
        <Card.Content style={styles.cardContent}>
          <View style={styles.userInfo}>
            <View style={styles.avatarContainer}>
              <Avatar.Image
                size={80}
                source={
                  profilePicture
                    ? {uri: profilePicture}
                    : require('../images/userIcon3.png')
                }
                // style={styles.userIcon}
              />
            </View>
            <View style={styles.userInfoText}>
              <Text style={styles.userName}>{name}</Text>
              <Text style={styles.title}>{user.title}</Text>
              {/* <Text style={styles.description}>{user.description}</Text> */}
            </View>
          </View>
          <View style={styles.iconContainer}>
            <TouchableOpacity
              style={styles.messageIcon}
              onPress={() => navigation.navigate('MessagePage')}>
              <FontAwesomeIcon
                icon={faMessage}
                style={[
                  styles.icon,
                  {marginLeft: calculateMargin(user.username.length)},
                ]}
                size={20}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.settingsIcon}
              onPress={() => navigation.navigate('SettingsPage')}>
              <FontAwesomeIcon icon={faCog} style={styles.icon} size={20} />
            </TouchableOpacity>
            <View style={styles.content}>
              <FontAwesomeIcon
                icon={faAddressCard}
                style={styles.icon1}
                size={20}
              />
              <Text style={styles.bio}>About the Pet Owner</Text>
              <Text style={styles.description}>{bio}</Text>
            </View>
          </View>
        </Card.Content>
      </Card>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{padding: 0, flex: 1}}>
        <View style={styles.container1}>
          <Image
            source={require('../images/profile.png')}
            style={styles.image}
          />
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            backgroundColor: 'white',
            borderTopStartRadius: 50,
            borderTopEndRadius: 50,
            top: 405,
            height: 900,
            elevation: 20,
          }}>
          <Carousel
            data={petDatabase}
            renderItem={renderCarouselItem}
            sliderWidth={360}
            itemWidth={360}
            onSnapToItem={index => setActiveIndex(index)}
          />
          <Pagination
            dotsLength={petDatabase.length}
            activeDotIndex={activeIndex}
            containerStyle={{paddingTop: 10}}
            dotStyle={{
              width: 10,
              height: 10,
              borderRadius: 5,
              backgroundColor: '#F87000',
            }}
            inactiveDotStyle={{
              backgroundColor: '#ccc',
            }}
            inactiveDotOpacity={0.6}
            inactiveDotScale={0.8}
          />
          {ownerDatabase.map(owner => (
            <React.Fragment key={owner.id}>
              <UserProfileCard user={owner} />
            </React.Fragment>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

ProfileDetails.propTypes = {
  // Add propTypes if needed
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'orange',
  },
  container1: {
    backgroundColor: 'orange',
  },
  image: {
    width: 440,
    height: 445,
    resizeMode: 'contain',
    position: 'relative',
    // aspectRatio: 1,
  },
  boxContainer: {
    width: 305,
    height: 150,
    // marginHorizontal: 18,
    borderRadius: 10,
    alignSelf: 'center',
    top: -5,
    // marginTop: 10,
    marginLeft: 51,
    marginRight: 40,
    // left: 60,
    position: 'relative',
  },
  gradientBackground: {
    flex: 1,
    position: 'relative',
  },
  boxContent: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    position: 'relative',
  },
  profileText: {
    alignItems: 'center',
    top: 20,
  },
  petName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  petBreed: {
    fontSize: 16,
    color: 'white',
  },
  petColor: {
    fontSize: 14,
    color: 'white',
  },
  arrowRight: {
    left: 155,
    marginRight: 'auto',
    top: 25,
    zIndex: 1,
  },
  arrowLeft: {
    right: 125,
    marginLeft: 'auto',
    top: 25,
    zIndex: 1,
  },
  arrowLR: {
    flexDirection: 'row',
    top: -60,
  },
  logo: {
    flexDirection: 'row',
    // marginTop: -15,
    top: 5,
    alignSelf: 'center', // Align the logo container in the center
    right: 70,
  },
  pawpalLogo: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    marginLeft: 10, // Adjust the marginLeft as needed
    alignSelf: 'center',
    top: -35,
  },
  bottomContainer: {},
  bottomTexts: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    top: 20,
  },
  petDetail: {
    fontFamily: 'Poppins',
    fontSize: 18,
    // justifyContent: 'space-between',
  },
  boxText: {
    // top: -40,
    backgroundColor: '#F1D5C6',
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 15,
    alignContent: 'center',
    justifyContent: 'center',
  },
  boxContain: {
    flexDirection: 'row',
    top: 30,
    justifyContent: 'space-between',
  },
  horizontalLine: {
    alignSelf: 'center',
    width: 350,
    height: 2,
    backgroundColor: '#FF8D4D',
    top: 60,
    textDecorationStyle: 'solid',
  },

  card: {
    width: 500, // Adjust width as needed
    height: 350, // Adjust height as needed
    // margin: 19,
    top: -340, // Adjust this value based on the position of your horizontal line
    // borderRadius: 15,
    backgroundColor: 'white',
    // elevation: 5,
    zIndex: 999,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    marginRight: 15,
  },
  userIcon: {
    width: 40,
    height: 40,
    borderRadius: 50,
  },
  userInfoText: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 16,
    color: '#555',
  },
  description: {
    fontSize: 16,
    color: '#777',
    fontFamily: 'Poppins',
  },
  iconContainer: {
    flexDirection: 'row',
  },
  messageIcon: {
    color: '#F87000',
    marginRight: 10,
  },
  settingsIcon: {},
  icon: {
    color: '#F87000',
    top: 20,
    // paddingRight: 20,
    paddingHorizontal: 20,
    left: -240,
    zIndex: 999,
    position: 'relative',
  },
  icon1: {
    color: '#F87000',
    top: 20,
    paddingRight: 20,
    paddingHorizontal: 20,
    right: 20,
    position: 'relative',
  },

  content: {
    top: 65,
    left: -500,
    justifyContent: 'flex-start',
    fontFamily: 'Poppins',
  },
  bio: {
    fontFamily: 'Poppins',
    fontSize: 18,
    left: 20,
    // textDecorationLine: '#F87000',
  },
});

export default ProfileDetails;
