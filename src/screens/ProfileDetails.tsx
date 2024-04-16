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
import { buttonMixin } from '../components/buttonMixin';
import { alignmentMixin } from '../components/alignmentMixin';
import constants from '../styles/constants';
import { profDetMixins } from '../styles/mixins/profDetMixins';
import {PD_typeStyles} from '../components/PD_typeStyles';
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
          <View>
          <View style={styles.userInfo}>
            <View style={styles.avatarContainer}>
              <Avatar.Image size={50} source={profilePicture} />
            </View>
            <View style={styles.descriptionContainer}>
              <Text style={styles.userName}>{name}</Text>
              <Text style={styles.ownerTitle}>Pet Owner</Text>
            </View>
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
          onPress={() => navigation.navigate('Chat')}>
          <FontAwesomeIcon icon={icons.faMessage} style={styles.icon} size={20} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.settingsIcon}
          onPress={() => navigation.navigate('SettingsPage')}>
          <FontAwesomeIcon icon={icons.faCog} style={styles.icon} size={20} />
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
  imageContainer: {
   ...profDetMixins.imageContainer,
  } as ImageStyle,
  item: {
    width: screenWidth + 1,
    ...profDetMixins.item,
  } as ImageStyle,
  headerContainer:{
    ...profDetMixins.headerContainer,
  } as ImageStyle,
  image: {
    ...profDetMixins.image,
  } as ImageStyle,
  title: {
   ...profDetMixins.titlePet,
    fontWeight: constants.$fontWeightBold,
  } as ImageStyle,
  title1: {
    ...profDetMixins.titlePet,
    top: '-2.5%',
    fontSize: 18,
    fontWeight:constants.$fontFamilyExtraLight
  } as ImageStyle,
  petDetail: {
    ...profDetMixins.petDetail,
  } as ImageStyle,
  bottomTexts: {
    ...profDetMixins.align,
    top: '-15%',
    paddingVertical: '4%',
  } as ImageStyle,
  surface: {
    ...alignmentMixin.alignment1,
    ...profDetMixins.surface,
  } as ImageStyle,
  bottomContainer: {
    top: '-1%',
  } as ImageStyle,
  card: {
   ...profDetMixins.card,
  } as ImageStyle,
  cardContent: {
   ...profDetMixins.cardContent,
  } as ImageStyle,
  userInfo: {
    ...alignmentMixin.alignment,
    ...profDetMixins.userInfo,
  } as TextStyle,
  avatarContainer: {
   ...profDetMixins.avatarContainer,
  } as ImageStyle,
  userName: {
    ...profDetMixins.userName,
  } as TextStyle,
  ownerTitle: {
    ...profDetMixins.ownerTitle,
  },
  descriptionContainer: {
    ...profDetMixins.descriptionContainer,
  } as TextStyle,
  iconContainer: {
  ...profDetMixins.iconContainer,
  } as ViewStyle,

  icon: {
   ...profDetMixins.icon,
  } as ViewStyle,
  contentScroll: {
    ...alignmentMixin.alignment,
    ...profDetMixins.contentScroll,
  } as TextStyle,
  contentProfile: {
    ...profDetMixins.contentProfile,
  } as TextStyle,
  seeMore: {
   ...profDetMixins.seeMore,
  } as TextStyle,


});

export default ProfileDetails;