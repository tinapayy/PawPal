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
} from 'react-native';
import {Card, Avatar, Surface, Divider} from 'react-native-paper';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import * as icons from '../imports/icons/icons';
import {useNavigation} from '@react-navigation/native';
import {getDocs, collection, getDoc, doc} from 'firebase/firestore';
import {FIREBASE_AUTH, FIREBASE_DB} from '../../firebase.config';
import Carousel from 'react-native-snap-carousel';
import { buttonMixin } from '../components/buttonMixin';
import { alignmentMixin } from '../components/alignmentMixin';
import constants from '../styles/constants';
import { profDetMixins } from '../styles/mixins/profDetMixins';

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

const ProfileDetails = () => {
  const navigation = useNavigation();

  const auth = FIREBASE_AUTH;
  const db = FIREBASE_DB;

  const [pet, setPet] = useState<CarouselItem[]>([]);
  const [name, setName] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const MAX_DESCRIPTION_LENGTH = 27;

  const [bio, setBio] = useState(''); // Ensure bio starts as an empty string
  const [showFullBio, setShowFullBio] = useState(false); // Ensure showFullBio starts as false
  const [truncatedBio, setTruncatedBio] = useState(''); // Ensure truncatedBio starts as an empty string
  const [lines, setLines] = useState<string[]>([]); // Ensure lines starts as an empty array
  const [numLines, setNumLines] = useState<number | undefined>(2); // Ensure numLines starts as 2 or undefined

  const toggleDescription = () => {
    setShowFullBio(!showFullBio);
  };

  const handleDescriptionPress = () => {
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
        setNumLines(2);
      }
    }
  }, [bio, showFullBio]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'user'));
        querySnapshot.forEach(doc => {
          if (doc.data().userId === auth.currentUser?.uid) {
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
          if (petDoc.data().userId === auth.currentUser?.uid) {
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
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  // navigate next carousel item
  const goForward = () => {
    carouselRef.current?.snapToNext();
  };

  //render each carousel item
  //handling pet data inside the carousel
  const renderItem = ({item}: {item: CarouselItem}) => {
    return (
      // UI pet data
      <View style={styles.item}>
        {/* Render pet data */}
        {item.type === 'pet' && (
          <>
            <View style={styles.imageContainer}>
              <Image
                source={
                  item.data.petPicture
                    ? item.data.petPicture
                    : require('../images/placeholder.png')
                }
                style={styles.image}
              />
            </View>
            <Text style={styles.title} numberOfLines={2}>
              {item.data.name}
            </Text>
            <Text style={styles.title1} numberOfLines={2}>
              {item.data.breed}
            </Text>
            <View style={styles.bottomContainer}>
              <View style={styles.bottomTexts}>
                <Text style={styles.petDetail}>Age</Text>
                <Text style={styles.petDetail}>Color</Text>
                <Text style={styles.petDetail}>Sex</Text>
                <Text style={styles.petDetail}>Weight</Text>
              </View>
            </View>
            <View style={styles.bottomTexts}>
              {/* for the inputs of age, color, sex and weight */}
              <Surface style={styles.surface} elevation={2}>
                <Text
                  style={{
                    ...profDetMixins.input,
                  }}>
                  {item.data.age}
                </Text>
              </Surface>
              <Surface style={styles.surface} elevation={2}>
                <Text
                  style={{
                    ...profDetMixins.input,
                  }}>
                  {item.data.color}
                </Text>
              </Surface>
              <Surface style={styles.surface} elevation={2}>
                <Text
                  style={{
                    ...profDetMixins.input,
                  }}>
                  {item.data.sex}
                </Text>
              </Surface>
              <Surface style={styles.surface} elevation={2}>
                <Text
                  style={{
                    ...profDetMixins.input,
                  }}>
                  {item.data.weight}
                </Text>
              </Surface>
              <Image
                source={require('../images/gradient_logo.png')}
                style={{
                  // logo
                  ...StyleSheet.absoluteFillObject,
                  ...profDetMixins.pawLogo,
                }}
              />
            </View>
          </>
        )}
      </View>
    );
  };

  //handling the card which must contain the profile, username, title (pet owner) and description
  const ownerCard = (
    <Card style={styles.card}>
      <Card.Content style={styles.cardContent}>
        <View style={styles.userInfo}>
          <View style={styles.avatarContainer}>
            <Avatar.Image size={50} source={profilePicture} />
          </View>
          <View style={styles.descriptionContainer}>
            <Text style={styles.userName}>{name}</Text>
            <Text style={styles.ownerTitle}>Pet Owner</Text>
          </View>
        </View>
        <TouchableOpacity onPress={handleDescriptionPress}>
          <View style={styles.contentScroll}>
            <Text style={styles.contentProfile}>
              {showFullBio ? bio : truncatedBio}
            </Text>
            <Text style={styles.seeMore}>
              {showFullBio ? 'See Less' : 'See More'}
            </Text>
          </View>
        </TouchableOpacity>
      </Card.Content>
      <View style={styles.iconContainer}>
        <TouchableOpacity
          style={styles.settingsIcon}
          onPress={() => navigation.navigate('SettingsPage')}>
          <FontAwesomeIcon icon={icons.faCog} style={styles.icon} size={20} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.settingsIcon}
          onPress={() => navigation.navigate('Chat')}>
          <FontAwesomeIcon icon={icons.faMessage} style={styles.icon} size={20} />
        </TouchableOpacity>
      </View>
    </Card>
  );

  // Return the component's UI
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={goForward}></TouchableOpacity>
      <Image
        source={require('../images/header.png')}
        //background image
        style={{
          ...profDetMixins.backgroundImage,
          width: screenWidth
        }}
      />
      < View style={styles.headerContainer}>
        <Text
          // Profile Details 
          style={{
            ...profDetMixins.profDetText,
          }}>
          Profile Details
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('Home')}
          //backbutton
          style={profDetMixins.backButton }>
          <FontAwesomeIcon icon={icons.faArrowLeft} size={24} color={constants.$tertiaryColor} />
        </TouchableOpacity>
      </View>
      
      <View style={profDetMixins.horizontalLine} width= {screenWidth}/>

      <View style={{bottom: 150}}>
        <Carousel
          ref={carouselRef}
          sliderWidth={screenWidth - 5}
          sliderHeight={screenWidth - 60}
          itemWidth={screenWidth - 30}
          data={pet}
          renderItem={renderItem}
          hasParallaxImages={true}
          style={{zIndex: 0}} 
        />
        <View>{ownerCard}</View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    width: screenWidth + 1,
    height: '88%',
    zIndex: 1,
    resizeMode: 'contain',
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  headerContainer:{
    flexDirection: 'row',
    top:'-40%',
    left:'9%',
    position:'relative',
    zIndex: 15,
  },
  image: {
    resizeMode: 'cover',
    height: '100%',
    borderRadius: 10,
    zIndex: 999,
    width: '90%',
    alignSelf: 'center',
    right: '3%',
  },
  title: {
   ...profDetMixins.titlePet,
    fontWeight: constants.$fontWeightBold,
  },
  title1: {
    ...profDetMixins.titlePet,
    top: '-2.5%',
    fontSize: 18,
    fontWeight:constants.$fontFamilyExtraLight
  },
  petDetail: {
    fontFamily: constants.$fontFamily,
    color: constants.$senaryColor,
    fontSize: 15,
    top: '9%',
    marginHorizontal: '6%',
    left: '10%',
  },
  bottomTexts: {
    flexDirection: 'row',
    alignItems: 'center',
    top: '-15%',
    paddingVertical: 15,
  },
  surface: {
    ...alignmentMixin.alignment1,
    backgroundColor: constants.$quinaryColor,
    padding: 8,
    height: '95%',
    width: '19%',
    top: '15%',
    marginHorizontal: 5,
    borderRadius: 20,
    left: '4%',
  },
  bottomContainer: {
    top: '-1.5%',
  },
  card: {
    width: '130%',
    alignSelf: 'center',
    height: '42%',
    top: '-20%',
    zIndex: 1,
    backgroundColor: constants.$backgroundColor,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
  },
  userInfo: {
    ...alignmentMixin.alignment,
    top: '-5%',
    // left:'-20%',
  },
  avatarContainer: {
    left: '70%',
    position: 'relative',
  },

  userName: {
    fontFamily: constants.$fontFamilyBold,
    color: constants.$secondaryColor,
    top: '-7%',
    left:'-24%',
    fontWeight: constants.$fontWeightBold,
  },
  ownerTitle: {
    fontFamily: constants.$fontFamily,
    color: '#5A2819',
    left: '-50%',
  },
  descriptionContainer: {
    flex: 1,
    marginLeft: 10,
  },
  description: {
    fontSize: 18,
    top: 400,
    color: constants.$textColor1,
    fontFamily: constants.$fontFamily,
    textAlign: 'justify',
  },
  iconContainer: {
    position: 'absolute',
    right: '-5%',
    top: '55%',
  },
  surfaceMessage: {
    ...alignmentMixin.alignment1,
   // flexDirection: 'row',
    backgroundColor: '#F8700bl0',
    padding: 5,
    height: 35,
    width: 100,
    top: -5,
    marginHorizontal: 5,
    borderRadius: 30,
    left: 15,
  },
  settingsIcon: {
    right: 120,
    top: -35,
  },

  icon: {
    color: constants.$senaryColor,
    top: -5,
    paddingHorizontal: 20,
    left: 10,
    zIndex: 999,
    position: 'relative',
  },
  content: {
    flexDirection: 'row',
    top: 45,
    left: -575,
    alignContent: 'flex-start',
    fontFamily: constants.$fontFamily,
  },
  bio: {
    fontFamily: constants.$fontFamily,
    fontSize: 18,
    justifyContent: 'flex-start',
    color: constants.$secondaryColor,
    top: -9,
    left: 9,
    textDecorationLine: 'underline',
  },
  descriptionScrollView: {
    overflow: 'hidden',
    maxHeight: 100,
    top: 140,
    zIndex: 1,
  },
  descriptionText: {
    fontSize: 18,
    left: 15,
    color: constants.$textColor1,
    fontFamily: constants.$fontFamily,
    textAlign: 'justify',
    padding: 10,
  },
  ownerCardContainer: {
  },
  contentScroll: {
    marginTop: 0,
    color: constants.$textColor2,
    textAlign: 'justify',
    paddingHorizontal: 20,
    top: 10,
  },
  contentProfile: {
    fontSize: 16,
    fontFamily: constants.$fontFamily,
    color: constants.$textColor1,
    textAlign: 'left',
    lineHeight: 24,
    right: -50,
    maxWidth: 300,
    maxHeight: 300,
  },
  seeMore: {
    fontFamily: constants.$fontFamily,
    fontSize: 14,
    textDecorationStyle: 'solid',
    color: constants.$octonaryColor,
    top: -25,
    left: 130,
    textAlign: 'center',
    textDecorationLine: 'underline',
    position: 'relative',
  },
});

export default ProfileDetails;