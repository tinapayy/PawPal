import React, { useRef, useState, useEffect } from 'react';
import Carousel from 'react-native-snap-carousel';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  Image,
  TouchableOpacity,
  GestureResponderEvent,
  ScrollView,
} from 'react-native';
import { Card, Avatar, Surface, Divider } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

import {
  faArrowLeft,
  faMessage,
  faCog,
  faAddressCard,
  faComments,
} from '@fortawesome/free-solid-svg-icons';

// Import your data
import { petData, ownerData } from '../components/data';


// window dimensions
const { width: screenWidth } = Dimensions.get('window');



const ProfileDetails = () => {
  const [entries, setEntries] = useState<CarouselItem[]>([]);
  const [ownerDataDetails, setOwnerDataDetails] = useState<OwnerData | null>(null);
  const MAX_DESCRIPTION_LENGTH = 200;

  // Use ownerDataDetails.description as the initial description
  const initialDescription = ownerDataDetails?.description || '...';

  const [showFullDescription, setShowFullDescription] = useState(true);
  const [truncatedDescription, setTruncatedDescription] = useState(
    `${initialDescription.slice(0, MAX_DESCRIPTION_LENGTH)}...`
  );

  const [lines, setLines] = useState<string[]>([]);
  const [numLines, setNumLines] = useState<number | undefined>(2);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const handleDescriptionPress = () => {
    toggleDescription();


    if (showFullDescription) {
      setTruncatedDescription(`${initialDescription.slice(0, MAX_DESCRIPTION_LENGTH)}...`);
      setLines(initialDescription.split('\n')); // Split text into lines
      setNumLines(undefined); // Display full text with unlimited lines
    } else {
      setTruncatedDescription(initialDescription);
      setLines([]); // Clear lines
      setNumLines(2); // Display truncated text with 2 lines
    }
  };
  const carouselRef = useRef<Carousel<CarouselItem> | null>(null);
  const navigation = useNavigation();
  const [maxHeight, setMaxHeight] = useState<number | null>(null);

  useEffect(() => {
    setMaxHeight(showFullDescription ? null : 100);
  }, [showFullDescription]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setEntries([...petData.map((pet) => ({ type: 'pet', data: pet })), { type: 'owner', data: ownerData }]);
        setOwnerDataDetails(ownerData);
      } catch (error) {
        console.error('Error setting data:', error);
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
  const renderItem = ({ item, index }: { item: CarouselItem; index: number }) => {
    return (
      <View style={styles.item}>
        {/* Render pet data */}
        {item.type === 'pet' && (
          <>
            <View style={styles.imageContainer}>
              <Image source={item.data.petPicture} style={styles.image} />
            </View>
            <Text style={styles.title} numberOfLines={2}>
              {item.data.name}
            </Text>
            <Text style={styles.title1} numberOfLines={2}>
              {item.data.breed}
            </Text>
            <View style={styles.bottomContainer}>
              <View style={styles.bottomTexts}>
                <Divider style={{ height: '100%', marginHorizontal: 20, backgroundColor: '#FF8D4D80' }} />
                <Text style={styles.petDetail}>Age</Text>
                <Divider style={{ height: '100%', marginHorizontal: 28, backgroundColor: '#FF8D4D80' }} />
                <Text style={styles.petDetail}>Sex</Text>
                <Divider style={{ height: '100%', marginHorizontal: 25, backgroundColor: '#FF8D4D80' }} />
                <Text style={styles.petDetail}>Weight</Text>
                <Divider style={{ height: '100%', marginHorizontal: 15, backgroundColor: '#FF8D4D80' }} />
                <Text style={styles.petDetail}>Height</Text>
              </View>
            </View>
            <View style={styles.bottomTexts}>
              <Surface style={styles.surface} elevation={2}>
                <Text style={{ color: '#5A2828', fontFamily: 'Poppins-Bold', fontSize: 13.1 }}>{item.data.age}</Text>

              </Surface>
              <Surface style={styles.surface} elevation={2}>
                <Text style={{ color: '#5A2828', fontFamily: 'Poppins-Bold', fontSize: 13.1 }}>{item.data.sex}</Text>
              </Surface>

              <Surface style={styles.surface} elevation={2}>
                <Text style={{ color: '#5A2828', fontFamily: 'Poppins-Bold', fontSize: 13.1 }}>{item.data.weight}</Text>
              </Surface>
              <Surface style={styles.surface} elevation={2}>
                <Text style={{ color: '#5A2828', fontFamily: 'Poppins-Bold', fontSize: 13.1 }}>{item.data.height}</Text>
              </Surface>
              <Image
                source={require('../images/gradient_logo.png')}
                style={{
                  ...StyleSheet.absoluteFillObject,
                  resizeMode: 'contain',
                  width: "20%",
                  height: 40,
                  // zIndex: -10,
                  top: -90,
                  left: 300,
                }}
              />
            </View>
          </>
        )}
        {/* <View style={styles.ownerDetailsContainer}>{ownerCard}</View> */}
      </View>
    );
  };

  //handling the card which must contain the profile, username, title (pet owner) and description
  const ownerCard = ownerDataDetails && (

    <Card style={styles.card}>
      <Card.Content style={styles.cardContent}>
        <View style={styles.userInfo}>
          <View style={styles.avatarContainer}>
            <Avatar.Image size={50} source={ownerDataDetails.profilePicture} />
          </View>
          <View style={styles.descriptionContainer}>
            <Text style={styles.userName}>{ownerDataDetails.username}</Text>
            <Text style={styles.ownerTitle}>{ownerDataDetails.title}</Text>
            <TouchableOpacity onPress={handleDescriptionPress}>
              <TouchableOpacity onPress={handleDescriptionPress} >
                <View style={styles.contentScroll}>
                  <Text style={styles.contentProfile}>
                    {showFullDescription ? initialDescription : truncatedDescription}
                  </Text>
                  <Text style={styles.readMore}>
                    {showFullDescription ? 'Read Less' : 'Read More'}
                  </Text>
                </View>
              </TouchableOpacity>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.iconContainer}>
          <TouchableOpacity
            style={styles.messageIcon}
            onPress={() => navigation.navigate('MessagePage')}
          >
            <Surface style={styles.surfaceMessage} elevation={2}>
              <FontAwesomeIcon icon={faComments} style={styles.iconMessage} size={20} />
              <Text style={{ color: '#ffffff', fontFamily: 'Poppins', fontSize: 16, marginLeft: 5 }}>
                Message
              </Text>
            </Surface>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.settingsIcon}
            onPress={() => navigation.navigate('SettingsPage')}
          >
            <FontAwesomeIcon icon={faCog} style={styles.icon} size={20} />
          </TouchableOpacity>

          {/* <View style={styles.content}>
              <FontAwesomeIcon icon={faAddressCard} style={styles.icon} size={20} />
              <Text style={styles.bio}>About the Pet Owner</Text>
            </View> */}

        </View>
      </Card.Content>
    </Card>
  );

  // Return the component's UI
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={goForward}>
      </TouchableOpacity>
      <Image
        source={require('../images/header.png')}
        style={{
          position: 'absolute',
          width: screenWidth,
          height: 200,
          zIndex: -10,
        }}
      />
      <Text style={{ fontSize: 24, fontFamily: 'Poppins-Bold', color: '#ffffff', left: 50, top: 20 }}>
        Profile Details
      </Text>
      <TouchableOpacity onPress={() => navigation.goBack()} style={{ top: -15, left: 15 }}>
        <FontAwesomeIcon icon={faArrowLeft} size={24} color="#FFF" />
      </TouchableOpacity>
      <View style={styles.horizontalLine} />


      <View style={styles.carouselContainer}>
        <Carousel
          ref={carouselRef}
          sliderWidth={screenWidth - 10}
          sliderHeight={screenWidth - 20}
          itemWidth={screenWidth - 30}
          data={entries}
          renderItem={renderItem}
          hasParallaxImages={true}
          style={{ zIndex: 0 }} // Adjust this value
        />
        {/* <ScrollView style={styles.descriptionScrollView}>
          <View style={styles.ownerCardContainer}>{ownerCard}</View>
        </ScrollView> */}
        <View>{ownerCard}</View>

      </View>
    </View>
  );
};
type CarouselItem = {
  type: string;
  data: {
    id: number;
    name?: string;
    breed?: string;
    color?: string;
    age?: string;
    sex?: string;
    weight?: string;
    height?: string;
    petPicture?: any;
    user?: {
      profilePicture: any;
      username: string;
      title: string;
      description: string;
    };
  };
};

type OwnerData = {
  id: number;
  username: string;
  profilePicture: any;
  title: string;
  description: string;
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
    // aspectRatio:1,
    // top: -205,
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    // top: -200,
  },
  image: {
    // ...StyleSheet.absoluteFillObject,
    resizeMode: 'contain',
    // position:'relative',
    height: '100%',
    // height: 200,
    borderRadius: 10,
    // top: -205,
    // marginTop:-40,
    zIndex: 999,
  },
  title: {
    fontFamily: 'Poppins-Regular',
    color: '#5A2828',
    fontSize: 32,
    fontWeight: 'bold',
    position: 'relative',
    top: 5,
    padding: 10,
    backgroundColor: 'rgba(255, 100, 100, 0)',
    textAlign: 'left',
    borderRadius: 30,

  },
  title1: {
    fontFamily: 'Poppins-Regular',
    color: '#5A2828',
    position: 'relative',
    top: -20,
    backgroundColor: 'rgba(255, 100, 100, 0)',
    padding: 10,
    textAlign: 'left',
    fontSize: 18,
  },
  petDetail: {
    fontFamily: 'Poppins-Regular',
    // color:'#5A2828',
    color: 'gray',
    fontSize: 18,
    top: 40,
  },
  bottomTexts: {
    flexDirection: 'row',
    alignItems: 'center',
    top: -70,
    paddingVertical: 20,
  },
  horizontalLine: {
    alignSelf: 'center',
    width: screenWidth,
    height: 3,
    backgroundColor: '#FF8D4D',
    top: 497,
  },
  surface: {
    flexDirection: 'row',
    backgroundColor: '#F1D5C6',
    padding: 8,
    height: 50,
    width: 80,
    top: -5,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
    borderRadius: 20,
    left: 15,
  },
  bottomContainer: {
    top: -10,
  },
  card: {
    width: 500,
    alignSelf: 'center',
    height: 190,
    top: -155,
    zIndex: 1,
    backgroundColor: 'white',
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    // top: -40,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarContainer: {
    left: 45,
    top: -60,
    position: 'relative',
  },
  userName: {
    fontFamily: 'Poppins-Bold',
    color: '#5A2828',
    top: -7,
    fontSize: 18,
    left: 50,
    fontWeight: 'bold',
  },
  ownerTitle: {
    fontFamily: 'Poppins',
    color: '#5A2819',
    top: -10,
    fontSize: 18,
    left: 50,
    // fontWeight: 'bold',

  },
  description: {
    fontSize: 18,
    // april: 10,
    top: 400,
    // maxWidth: screenWidth - 60,
    color: '#000000',
    fontFamily: 'Poppins',
    textAlign: 'justify',
  },
  iconContainer: {
    flexDirection: 'row',
    // left: 50,

  },
  messageIcon: {
    color: '#ffffffff',
    // marginRight: 10,
    right: 210,
    top: -60,
  },
  surfaceMessage: {
    flexDirection: 'row',
    backgroundColor: '#F87000',
    padding: 5,
    height: 35,
    width: 100,
    top: -5,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
    borderRadius: 30,
    left: 15,
  },
  settingsIcon: {
    // top: 7,
    right: 200,
    top: -55,
  },

  icon: {
    color: '#F87000',
    top: -5,
    paddingHorizontal: 20,
    left: 10,
    zIndex: 999,
    position: 'relative',
  },
  iconMessage: {
    color: '#ffffff',

  },
  content: {
    flexDirection: 'row',
    top: 45,
    left: -575,
    // left:'auto',
    // justifyContent: 'flex-start',
    alignContent: 'flex-start',
    fontFamily: 'Poppins',
  },
  bio: {
    fontFamily: 'Poppins',
    fontSize: 18,
    // left: 80,
    // textAlign:'left'
    justifyContent: 'flex-start',
    color: '#5A2828',
    top: -9,
    left: 9,
    textDecorationLine: 'underline',


  },
  carouselContainer: {},
  cardContainer: {},
  descriptionContainer: {
    flex: 1,
    marginLeft: 10, // Adjust margin as needed
    // top: 35,
  },
  descriptionScrollView: {
    // maxHeight: showFullDescription ? null : 100,
    overflow: 'hidden',
    maxHeight: 100,
    // marginTop: 20,
    top: 140,
    zIndex: 1,


  },
  descriptionText: {
    fontSize: 18,
    left: 15,
    color: '#000000',
    fontFamily: 'Poppins',
    textAlign: 'justify',
    // top: 10,
    padding: 10,
  },
  ownerCardContainer: {
    // paddingHorizontal: 20,
    // paddingBottom: 20,
  },
  contentScroll: {
    marginTop: 0,
    color: 'white',
    textAlign: 'justify',
    paddingHorizontal: 20,
  },
  contentProfile: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: 'black',
    textAlign: 'justify',
    lineHeight: 24,
    right: 30,
  },
  readMore: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    textDecorationStyle: 'solid',
    color: '#ff8700',
    // marginTop: 10,
    top: -23,
    left: 55,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
});

export default ProfileDetails;
