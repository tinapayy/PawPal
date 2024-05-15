import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  TextStyle,
  StyleProp,
  ImageStyle,
  ViewStyle,
} from 'react-native';
import {Card, Avatar, Surface, Divider} from 'react-native-paper';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import * as icons from '../imports/icons/icons';
import {useNavigation} from '@react-navigation/native';
import {getDocs, collection, getDoc, doc} from 'firebase/firestore';
import {FIREBASE_AUTH, FIREBASE_DB} from '../../firebase.config';
import Carousel from 'react-native-snap-carousel';
import {buttonMixin} from '../components/buttonMixin';
import {alignmentMixin} from '../components/alignmentMixin';
import constants from '../styles/constants';
import {profDetMixins} from '../styles/mixins/profDetMixins';
import {PD_typeStyles} from '../components/PD_typeStyles';
import {ScreenHeight} from 'react-native-elements/dist/helpers';
import {useNavigateTo} from '../components/navigation';
import SettingsPage from './SettingsPage';
import LoadingScreen from '../components/loading';

// window dimensions
const {width: screenWidth} = Dimensions.get('window');

interface Pet {
  id: number;
  name: string;
  breed: string;
  color: string;
  age: string;
  sex: string;
  weight: string;
  petPicture: any;
}

type CarouselItem = {
  type: string;
  data: Pet;
};

const ProfileDetails = ({route}) => {
  const navigation = useNavigation();
  const ChatHome = useNavigateTo('ChatHome');
  const SettingsPage = useNavigateTo('SettingsPage');

  const auth = FIREBASE_AUTH;
  const db = FIREBASE_DB;
  const [loading, setLoading] = useState(true);

  const userId = route.params?.userId;

  const [pet, setPet] = useState<CarouselItem[]>([]);
  const [name, setName] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const MAX_DESCRIPTION_LENGTH = 45;

  const [bio, setBio] = useState(''); // Ensure bio starts as an empty string
  const [showFullBio, setShowFullBio] = useState(false); // Ensure showFullBio starts as false
  const [truncatedBio, setTruncatedBio] = useState(''); // Ensure truncatedBio starts as an empty string
  const [lines, setLines] = useState<string[]>([]); // Ensure lines starts as an empty array
  const [numLines, setNumLines] = useState<number | undefined>(2); // Ensure numLines starts as 2 or undefined

  const toggleDescription = () => {
    setShowFullBio(!showFullBio);
  };

  const carouselRef = useRef<Carousel<CarouselItem> | null>(null);
  const [maxHeight, setMaxHeight] = useState<number | null>(null);

  useEffect(() => {
    if (bio) {
      if (showFullBio) {
        setTruncatedBio(bio);
        setLines(bio.split('\n'));
        setNumLines(undefined);
      } else {
        const truncated = bio.slice(0, MAX_DESCRIPTION_LENGTH);
        setTruncatedBio(truncated);
        setLines(truncated.split('\n'));
        setNumLines(3);
      }
    }
  }, [bio, showFullBio]);

  const fetchData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'user'));
      querySnapshot.forEach(doc => {
        if (
          (userId && doc.data().userId === userId) ||
          (!userId && doc.data().userId === auth.currentUser?.uid)
        ) {
          setName(doc.data().name);
          setBio(doc.data().bio);
          setProfilePicture(
            doc.data().profilePicture
              ? {uri: doc.data().profilePicture}
              : require('../images/defaultIcon.png'),
          );
        }
      });
      const pet: Pet[] = [];
      for (const petDoc of querySnapshot.docs) {
        if (
          (userId && petDoc.data().userId === userId) ||
          (!userId && petDoc.data().userId === auth.currentUser?.uid)
        ) {
          const petIds = petDoc.data().pet;
          if (petIds.length > 0) {
            for (const petId of petIds) {
              const petDoc = await getDoc(doc(db, 'pet', petId.toString()));
              if (petDoc.exists()) {
                pet.push({
                  id: pet.length + 1,
                  name: petDoc.data().name || 'N/A',
                  breed: petDoc.data().breed || 'N/A',
                  age: petDoc.data().age || 'N/A',
                  sex: petDoc.data().sex || 'N/A',
                  weight: petDoc.data().weight || 'N/A',
                  color: petDoc.data().color || 'N/A',
                  petPicture: {uri: petDoc.data().petPicture || null},
                });
              }
            }
          } else {
            pet.push({
              id: 1,
              name: 'No pet',
              breed: 'No pet',
              age: 'No pet',
              sex: 'No pet',
              weight: 'No pet',
              color: 'No pet',
              petPicture: null,
            });
          }
        }
      }

      setPet([...pet.map(pet => ({type: 'pet', data: pet}))]);
      setLoading(false);
    } catch (error) {
      console.error(error);
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

  // navigate next carousel item
  const goForward = () => {
    carouselRef.current?.snapToNext();
  };

  if (loading) {
    return <LoadingScreen />;
  }

  //render each carousel item
  //handling pet data inside the carousel
  const renderItem = ({item}: {item: CarouselItem}) => {
    return (
      // UI pet data
      <View style={styles.item}>
        {/* Render pet data */}
        {item.type === 'pet' && (
          <>
            {/* for pet's image */}
            <View style={styles.imageContainer}>
              <Image
                source={
                  item.data.petPicture
                    ? item.data.petPicture
                    : require('../images/placeholder.png')
                }
                // styling for the pet image
                style={styles.image}
              />
            </View>
            {/* name and title of the owner */}
            <View style={styles.ownerContainer}>
              <Text style={styles.title} numberOfLines={2}>
                {item.data.name}
              </Text>
              <Text style={styles.title1} numberOfLines={2}>
                {item.data.breed}
              </Text>
              <Image
                source={require('../images/gradient_logo.png')}
                style={{
                  // logo
                  ...StyleSheet.absoluteFillObject,
                  ...profDetMixins.pawLogo,
                }}
              />
            </View>

            {/* age, color, sex and weight */}
            <View style={styles.bottomContainer}>
              <Text style={styles.petDetail}>Age</Text>
              <Text style={styles.petDetail}>Color</Text>
              <Text style={styles.petDetail}>Sex</Text>
              <Text style={styles.petDetail}>Weight</Text>
            </View>
            <View style={styles.bottomTexts}>
              {/* for the inputs of age, color, sex and weight */}
              <Surface style={{...styles.surface, flex: 1}} elevation={2}>
                {/* styling for the inputs */}
                <Text
                  style={{
                    ...profDetMixins.input,
                    textAlign: 'center',
                  }}>
                  {item.data.age}
                </Text>
              </Surface>
              <Surface style={{...styles.surface, flex: 1}} elevation={2}>
                <Text
                  style={{
                    ...profDetMixins.input,
                    textAlign: 'center',
                  }}>
                  {item.data.color}
                </Text>
              </Surface>
              <Surface style={{...styles.surface, flex: 1}} elevation={2}>
                <Text
                  style={{
                    ...profDetMixins.input,
                    textAlign: 'center',
                  }}>
                  {item.data.sex}
                </Text>
              </Surface>
              <Surface style={{...styles.surface, flex: 1}} elevation={2}>
                <Text
                  style={{
                    ...profDetMixins.input,
                    textAlign: 'center',
                  }}>
                  {item.data.weight}
                </Text>
              </Surface>
            </View>
          </>
        )}
      </View>
    );
  };

  //handling the card which must contain the profile, username, title (pet owner) and description
  const ownerCard = (
  <View style={styles.cardContainer}>
    <Card style={styles.card}>
      <Card.Content style={styles.cardContent}>

        <View style={styles.userInfo}>
            <View style={[{paddingRight: '5%'}]}>
              <Avatar.Image size={50} source={profilePicture} />
            </View>
            <View style={{...styles.UserInfoText, flexDirection: 'column'}}>
              <Text
                style={styles.userName}
                numberOfLines={2}
                ellipsizeMode="tail">
                {name.length > 25
                  ? name.slice(0, 25) + '\n' + name.slice(20)
                  : name}
              </Text>
              <Text style={styles.ownerTitle}> Pet Owner </Text>
            </View>
          </View>

          <View style={styles.iconContainer}>
            <View style={{flexDirection: 'row'}}>
              {userId ? (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('Chat', {
                      senderId: userId,
                      senderName: name,
                      senderPicture: profilePicture,
                    })
                  }>
                  <FontAwesomeIcon
                    icon={icons.faMessage}
                    style={styles.icon}
                    size={20}
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={SettingsPage}>
                  <FontAwesomeIcon
                    icon={icons.faCog}
                    style={styles.icon}
                    size={20}
                  />
                </TouchableOpacity>
              )}
            </View>
          </View>

          <View style={styles.contentScroll}>
            <Text style={styles.contentProfile}>
              {showFullBio ? bio : truncatedBio}
              {!showFullBio && truncatedBio !== bio && (
                <>
                  <Text>{' '}</Text>
                  <Text style={styles.seeMore} onPress={toggleDescription}>
                    See More
                  </Text>
                  {` ${
                    lines.length > numLines
                      ? lines.slice(numLines).join(' \n')
                      : ''
                  }`}
                </>
              )}
              {showFullBio && (
                <>
                  <Text>{' '}</Text>
                  <Text style={styles.seeMore} onPress={toggleDescription}>
                    See Less
                  </Text>
                </>
              )}
            </Text>
          </View>
          
        </Card.Content>
      </Card>
    </View>
  );

  // Return the component's UI
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={goForward}></TouchableOpacity>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Home')}
          //backbutton
          style={profDetMixins.backButton}>
          <FontAwesomeIcon
            icon={icons.faArrowLeft}
            size={24}
            color={constants.$primaryColor}
          />
        </TouchableOpacity>
        <Text
          // Profile Details in mixins
          style={{
            ...profDetMixins.profDetText,
          }}>
          Profile Details
        </Text>
      </View>

      {/* horizontal in mixins */}
      <View style={profDetMixins.horizontalLine} width={screenWidth} />

      {/* styling for positioning of the carousel */}
      <View style={{bottom: '25%'}}>
        <Carousel
          ref={carouselRef}
          sliderWidth={screenWidth}
          sliderHeight={ScreenHeight + 100}
          itemWidth={screenWidth - 30}
          data={pet}
          renderItem={renderItem}
          hasParallaxImages={true}
          style={{zIndex: 0}}
        />
        <View style={styles.owner}>{ownerCard}</View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 999,
    backgroundColor: constants.$tertiaryColor,
  },
  // image container positioning
  imageContainer: {
    flex: 1,
    alignItems: 'center',
    top: '37%',
  },

  // whole including photo, bottom text and container
  item: {
    // whole carousel
    width: '100%',
    height: '90%',
    paddingBottom: '10%',
  },

  // for back button and profile details
  headerContainer: {
    flexDirection: 'row',
    top: '5%',
    left: '7%',
    position: 'relative',
    zIndex: 1,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    borderRadius: 10,
    zIndex: 5,
    width: '90%',
    alignSelf: 'center',
  },
  // for name and title
  ownerContainer: {
    top: '37%',
    left: '4%',
    zIndex: 1,
  },
  // for name
  title: {
    ...profDetMixins.titlePet,
  } as TextStyle,
  //for breed
  title1: {
    ...profDetMixins.titlePet,
    fontFamily: constants.$fontFamilyLight,
    top: '-30%',
    fontSize: 18,
  } as TextStyle,
  // batch styling per category
  petDetail: {
    fontFamily: constants.$fontFamily,
    color: constants.$senaryColor,
    fontSize: 15,
    paddingHorizontal: '6.8%',
    left: '15%',
  },
  // adjust to be dynamic/responsive
  surface: {
    ...alignmentMixin.alignment1,
    backgroundColor: constants.$quinaryColor,
    padding: '2%',
    width: '20%',
    maxwidth: '20%',
    maxHeight: '100%',
    minWidth: '20%',
    marginHorizontal: 5,
    justifyContent: 'center',
    borderRadius: 20,
    left: '4%',
  } as ImageStyle,
  // age, color, sex and weight
  bottomContainer: {
    top: '49%',
    flexDirection: 'row',
    zIndex: 999,
    right: '0.5%',
  },
  // inputs of the user
  bottomTexts: {
    ...profDetMixins.align,
    top: '44%',
    flexDirection: 'row',
    paddingVertical: '5%',
    justifyContent: 'space-evenly',
    zIndex: 9,
    right: '3%',
    paddingBottom: '20%', // manipulate this
  } as ImageStyle,
  card: {
    backgroundColor: constants.$tertiaryColor,
  },
  cardContainer: {
    top: '114%',
    // backgroundColor:'white',
    backgroundColor: constants.$tertiaryColor,
  },
  cardContent: {
    position: 'relative',
    justifyContent: 'space-between',
    padding: '5%',
  },
  userInfo: {
    // flex:1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    top: '-18%',
  },
  userName: {
    fontFamily: constants.$fontFamilyBold,
    color: constants.$secondaryColor,
    fontSize: 18,
    paddingRight: '12%',
  } as TextStyle,
  ownerTitle: {
    fontFamily: constants.$fontFamily,
    color: constants.$accentColor,
    fontSize: 16,
  },

  iconContainer: {
    flexDirection: 'row',
    zIndex: 5,
    top: '-32%',
    alignSelf: 'flex-end',
    // justifyContent:'flex-start',
  },

  icon: {
    color: constants.$primaryColor,
    position: 'relative',
    paddingHorizontal: '4%',
  },
  // bio and see more
  contentScroll: {
    top: '-40%',
    right: '-2%',
    maxWidth: '98%',
    height: '60%',
    
  },
  // bio
  contentProfile: {
    fontSize: 16,
    fontFamily: constants.$fontFamily,
    color: constants.$textColor1,
  },
  // see more
  seeMore: {
    fontFamily: constants.$fontFamily,
    fontSize: 14,
    // paddingRight:'10%',
    color: constants.$primaryColor,
    textDecorationLine: 'underline',
    zIndex: 9,
    left: '-10%',
    // justifyContent:'space-between',
    paddingLeft:'10%',
  },
  settingsIcon: {},
  // messageIcon:{},
  owner: {
    height: '10%',
  },
});

export default ProfileDetails;
