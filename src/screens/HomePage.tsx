import React, {useState, useRef, useEffect} from 'react';
import {
  ScrollView,
  SafeAreaView,
  TextInput,
  NativeSyntheticEvent,
  TextInputSubmitEditingEventData,
  ViewStyle,
  ImageStyle,
} from 'react-native';
import {
  View,
  Text,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {Avatar} from 'react-native-paper';
import {Image} from 'react-native-elements';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import * as icons from '../imports/icons/icons';
import {useNavigation} from '@react-navigation/native';
import {FIREBASE_AUTH, FIREBASE_DB} from '../../firebase.config';
import {getDocs, collection} from 'firebase/firestore';
import constants from '../styles/constants';
import {alignmentMixin} from '../components/alignmentMixin';
import {useNavigateTo} from '../components/navigation';
import FoodAdvisable from './FoodAdvisable';

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');
const data3 = [
  {
    id: 1,
    img1: require('../images/Ellipse17.png'),
    img2: require('../images/Vector_11.png'),
    img3: require('../images/Ellipse18.png'),
    imageSome: require('../images/defaultIcon.png'),
    title: 'Are cats allowed to eat chocolates?',
    description: 'Click Here',
    imageSource: require('../images/kitty.png'),
  },
  {
    id: 2,
    img1: require('../images/Ellipse17.png'),
    img2: require('../images/Vector_11.png'),
    img3: require('../images/Ellipse18.png'),
    imageSome: require('../images/defaultIcon.png'),
    title: 'Are dogs allowed to eat grapes?',
    description: 'Click Here',
    imageSource: require('../images/doggy.png'),
  },
  {
    id: 3,
    img1: require('../images/Ellipse17.png'),
    img2: require('../images/Vector_11.png'),
    img3: require('../images/Ellipse18.png'),
    imageSome: require('../images/defaultIcon.png'),
    title: 'Are cats allowed to eat peanut butter?',
    description: 'Click Here',
    imageSource: require('../images/kitty.png'),
  },
];

const renderItem = ({item, index, navigation}) => {
  return (
    <SafeAreaView>
      <View style={styles.data3View}>
        <View style={styles.view1}>
          <Image source={item.clinicPicture} style={styles.clinicImage} />
        </View>
        <Text style={styles.clinicName}>{item.name}</Text>
        <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
          <FontAwesomeIcon
            icon={icons.faLocationDot}
            style={{color: constants.$senaryColor, marginTop: 5}}
          />
          <Text style={styles.clinicAddress}>{item.address}</Text>
        </View>
        <Text style={styles.clinicSched}>
          {item.isOpen ? (
            <Text style={styles.open}>Open</Text>
          ) : (
            <Text style={styles.closed}>Closed</Text>
          )}
        </Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text
            style={{
              fontSize: 13,
              fontWeight: '300',
              color: constants.$secondaryColor,
            }}></Text>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('ClinicProfile', {userId: item.clinicId})
            }>
            <FontAwesomeIcon
              icon={icons.faArrowRight}
              size={20}
              style={{color: constants.$senaryColor, top: -15, left: -5}}
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const itemNumber2 = ({item}) => {
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.data2View}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Avatar.Image source={item.profilePicture} size={80} />
            <View
              style={
                {
                  ...alignmentMixin.align,
                  flex: 1,
                } as ViewStyle
              }>
              <Text style={styles.userName}>{item.name}</Text>
              <Text
                style={{
                  color: constants.$secondaryColor,
                  fontWeight: '300',
                  fontSize: 15,
                  alignSelf: 'flex-start',
                  left: '7%',
                  width: '90%',
                }}
                numberOfLines={3}
                ellipsizeMode="tail">
                {item.postText}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
//data 3
const Data3Item = ({item, handleItemClick, searchQuery, setSearchQuery}) => {
  const auth = FIREBASE_AUTH;
  const db = FIREBASE_DB;

  const [profilePicture, setProfilePicture] = useState(null);
  const [userType, setUserType] = useState('');

  const fetchData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'user'));
      querySnapshot.forEach(doc => {
        if (doc.data().userId === auth.currentUser?.uid) {
          setProfilePicture(null);
          setUserType(doc.data().userType);
          if (doc.data().profilePicture) {
            setProfilePicture(doc.data().profilePicture);
          } else if (doc.data().clinicPicture) {
            setProfilePicture(doc.data().clinicPicture);
          }
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (profilePicture != null) {
    for (let i = 0; i < data3.length; i++) {
      data3[i].imageSome = {uri: profilePicture};
    }
  } else {
    for (let i = 0; i < data3.length; i++) {
      data3[i].imageSome = require('../images/defaultIcon.png');
    }
  }

  const navigation = useNavigation();
  const FoodAdvisable = useNavigateTo('FoodAdvisable');
  const ProfileDetails = useNavigateTo('ProfileDetails');
  const ClinicProfile = useNavigateTo('ClinicProfile');

  const handleProfileClick = () => {
    if (userType === 'petOwner') {
      ProfileDetails;
    } else {
      ClinicProfile;
    }
  };

  function handleSearchSubmit(
    e: NativeSyntheticEvent<TextInputSubmitEditingEventData>,
  ): void {
    throw new Error('Function not implemented.');
  }

  // first carousel
  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          <ImageBackground
            source={require('../images/Group_75.png')}
            resizeMode="contain"
            style={styles.imgBack}>
            <View style={{top: -3}}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View style={{flex: 1, top: '6%', left: '25%', margin: '3%'}}>
                  <View style={styles.searchBar}>
                    <TouchableOpacity onPress={handleSearchSubmit}>
                      <FontAwesomeIcon
                        icon={icons.faMagnifyingGlass}
                        size={20}
                        style={{color: '#ff8700', right: '70%'}}
                      />
                    </TouchableOpacity>
                    <TextInput
                      style={styles.serchText}
                      //search not implemented
                      placeholder="Search"
                      placeholderTextColor={constants.$senaryColor}
                      onSubmitEditing={handleSearchSubmit}
                    />
                  </View>
                </View>

                {/* profile click */}
                <TouchableOpacity onPress={handleProfileClick}>
                  <Image source={item.imageSome} style={styles.userImg} />
                </TouchableOpacity>
              </View>

              <View style={{flexDirection: 'row-reverse'}}>
                <Image source={item.imageSource} style={styles.animalImg} />

                <View
                  style={
                    {
                      flex: 1,
                      ...alignmentMixin.align,
                      margin: 10,
                    } as ViewStyle
                  }>
                  <Text style={styles.firstDesc}>{item.title}</Text>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={FoodAdvisable}>
                    <Text style={styles.clickHere}>{item.description}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </ImageBackground>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

type Post = {
  id: number;
  name: string;
  profilePicture: any;
  postText: string;
};

type Clinic = {
  id: number;
  clinicId: string;
  clinicPicture: any;
  name: string;
  address: string;
  isOpen: boolean;
};

const HomePage = () => {
  const navigation = useNavigation();

  const db = FIREBASE_DB;

  const [userPosts, setUserPosts] = useState<Post[]>([
    {
      id: 1,
      name: 'Jeff',
      profilePicture: require('../images/defaultIcon.png'),
      postText:
        'My cat, Snow is suffering from anemia and in need of blood type A ...',
    },
  ]);

  const [index, setIndex] = useState(0);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const isCarousel = useRef(null);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchLatestPosts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'forum'));
      const posts: Post[] = [];
      for (const forumDoc of querySnapshot.docs) {
        const userSnapshot = await getDocs(collection(db, 'user'));
        for (const userDoc of userSnapshot.docs) {
          if (userDoc.data().userId === forumDoc.data().userId) {
            if (forumDoc.data().isApproved && forumDoc.data().postText) {
              posts.push({
                id: posts.length + 1,
                name: userDoc.data().name,
                profilePicture:
                  userDoc.data().profilePicture || userDoc.data().clinicPicture
                    ? {
                        uri:
                          userDoc.data().profilePicture ||
                          userDoc.data().clinicPicture,
                      }
                    : require('../images/defaultIcon.png'),
                postText: forumDoc.data().postText.slice(0, 100) + '...',
              });
            }
          }
        }
      }
      setUserPosts(posts.reverse().slice(0, 3));
    } catch (error) {
      console.error(error);
    }
  };

  const [clinics, setClinics] = useState<Clinic[]>([]);

  const fetchClinics = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'user'));
      const clinics: any[] = [];
      for (const clinicDoc of querySnapshot.docs) {
        if (clinicDoc.data().userType === 'clinic') {
          clinics.push({
            id: clinics.length + 1,
            clinicId: clinicDoc.data().userId,
            clinicPicture: clinicDoc.data().clinicPicture
              ? {uri: clinicDoc.data().clinicPicture}
              : require('../images/placeholder.png'),
            name: clinicDoc.data().name,
            address: clinicDoc.data().address,
            isOpen: clinicDoc.data().storeHours
              ? isClinicOpen(clinicDoc.data().storeHours)
              : false,
          });
        }
      }
      setClinics(clinics.slice(0, 5));
    } catch (error) {
      console.error(error);
    }
  };

  const isClinicOpen = storeHours => {
    const currentDay = Date.now();

    const currentDayPlus8 = new Date(currentDay).setHours(
      new Date(currentDay).getHours() + 8,
    );

    const utcDay = new Date(currentDayPlus8).getUTCDay();

    const dayNames = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];

    const currentDayName = dayNames[utcDay];

    const currentTime = new Date().toLocaleString('en-US', {
      timeZone: 'Asia/Manila',
      hour12: false,
    });

    const formattedTime = currentTime.split(',')[1].trim().slice(0, -3);

    for (let i = 0; i < storeHours.length; i++) {
      if (currentDayName === storeHours[i].day) {
        const openingTime = convertTo24HourFormat(storeHours[i].open);

        const closingTime = convertTo24HourFormat(storeHours[i].close);

        if (formattedTime >= openingTime && formattedTime <= closingTime) {
          return true;
        }
      }
    }
    return false;
  };

  const convertTo24HourFormat = timeString => {
    let [time, period] = timeString.split(' ');
    let [hours, minutes] = time.split(':');

    if (period === 'AM' && hours === '12') {
      hours = '00';
    } else if (period === 'PM' && hours !== '12') {
      hours = String(parseInt(hours) + 12);
    }

    if (parseInt(hours) < 10) {
      hours = '0' + hours;
    }

    return `${hours}:${minutes}`;
  };

  useEffect(() => {
    fetchLatestPosts();
    fetchClinics();
  }, []);

  const handleItemClick = item => {
    setSelectedItem(item);
    setIsModalVisible(true);
    //navigation.navigate('FoodAdvisable');
    FoodAdvisable;
  };
  const handleSearchSubmit = () => {
    console.log('Search query:', searchQuery);

    navigation.navigate('ResultsPage', {searchQuery});
  };
  // const handleSearchIconClick = () => {
  //   navigation.navigate('ResultsPage');
  // };
  const ForumPage = useNavigateTo('ForumPage');
  const ResultsPage = useNavigateTo('ResultsPage');

  return (
    <>
      <SafeAreaView>
        <ScrollView>
          <View style={{width: Dimensions.get('window').width}}>
            <View>
              <Carousel
                ref={isCarousel}
                data={data3}
                renderItem={({item}) => (
                  <Data3Item
                    item={item}
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    handleItemClick={handleItemClick}
                  />
                )}
                sliderWidth={screenWidth}
                sliderHeight={screenHeight}
                itemWidth={Math.round(screenWidth * 1)}
                itemHeight={Math.round(screenHeight - 30 * 0.7)}
                onSnapToItem={index => setIndex(index)}
              />
              <Pagination
                dotsLength={data3.length}
                activeDotIndex={index}
                carouselRef={isCarousel}
                dotStyle={{
                  flex: 1,
                  borderRadius: 10,
                  padding: 6,
                  backgroundColor: constants.$accentColor,
                  bottom: '630%',
                }}
                tappableDots={true}
                inactiveDotStyle={{
                  backgroundColor: constants.$textColor1,
                  width: 2,
                  height: 2,
                  borderRadius: 10,
                }}
                inactiveDotOpacity={0.4}
                inactiveDotScale={0.6}
              />
            </View>

            <View style={{top: '-11%'}}>
              <View style={styles.announceMore}>
                <Text style={styles.announcement}>Urgent Announcements</Text>
                <TouchableOpacity onPress={ForumPage}>
                  <Text style={styles.more}>More</Text>
                </TouchableOpacity>
              </View>
              <Carousel
                style={styles.carousel2}
                data={userPosts}
                renderItem={itemNumber2}
                sliderWidth={screenWidth}
                sliderHeight={screenHeight}
                itemWidth={Math.round(screenWidth * 0.9)}
              />
            </View>

            <View style={{top: '-8%'}}>
              <View style={styles.exploreMore}>
                <Text style={styles.exploreClinics}>Explore Clinics</Text>
                <TouchableOpacity onPress={ResultsPage}>
                  <Text style={styles.seeAll}>See all</Text>
                </TouchableOpacity>
              </View>
              <View style={{width: Dimensions.get('window').width, top: '-5%'}}>
                <Carousel
                  data={clinics}
                  renderItem={({item, index}) =>
                    renderItem({item, index, navigation})
                  }
                  sliderWidth={screenWidth}
                  sliderHeight={screenHeight}
                  itemWidth={Math.round(screenWidth * 0.8)}
                  itemHeight={Math.round(screenHeight - 30 * 0.7)}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  data3View: {
    borderWidth: 1,
    padding: '3%',
    borderRadius: 20,
    backgroundColor: constants.$backgroundColor,
    borderColor: constants.$backgroundColor,
    elevation: 5,
    marginBottom: 15,
    position: 'relative',
    left: '-4%',
  },
  view1: {
    ...alignmentMixin.alignment,
    flex: 1,
    bottom: 10,
  } as ViewStyle,
  clinicImage: {
    width: 308,
    height: 180,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  clinicName: {
    fontSize: 19,
    fontWeight: 'bold',
    color: constants.$secondaryColor,
    textAlign: 'left',
    fontFamily: constants.$fontFamilyBold,
  },
  clinicAddress: {
    left: '40%',
    fontSize: 16,
    fontWeight: 'normal',
    color: constants.$senaryColor,
  },
  clinicSched: {
    fontWeight: 'bold',
    color: constants.$secondaryColor,
    textAlign: 'left',
    left: '5%',
    marginTop: '1.5%',
  },
  data2View: {
    top: '25%',
    borderWidth: 1,
    padding: '4%',
    borderRadius: 20,
    backgroundColor: constants.$backgroundColor,
    elevation: 5,
    shadowColor: constants.$textColor1,
    borderColor: '#FF8484',
    marginBottom: '25%',
  },
  userName: {
    color: constants.$secondaryColor,
    fontWeight: 'bold',
    fontSize: 20,
    alignSelf: 'flex-start',
    left: '4%',
    maxWidth: '80%',
  },
  imgBack: {
    marginTop: '-5%',
    flex: 1,
    justifyContent: 'center',
    borderRadius: 30,
    padding: '6%',
    left: '3%',
  },
  searchBar: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    backgroundColor: constants.$backgroundColor,
    borderRadius: 20,
    width: '90%',
    right: '40%',
  },
  serchText: {
    flex: 1,
    color: constants.$textColor1,
    fontSize: 13,
    height: 35,
    marginLeft: '4%',
  },
  userImg: {
    width: 35,
    height: 35,
    top: '49%',
    paddingRight: '20%',
    position: 'relative',
    borderRadius: 50,
  },
  animalImg: {
    flex: 3,
    width: 160,
    height: 165,
    top: '10%',
    left: '-5%',
  },
  firstDesc: {
    fontSize: 23,
    fontWeight: 'bold',
    color: constants.$backgroundColor,
    textAlign: 'center',
    marginBottom: 20,
    bottom: '1%',
  },
  clickHere: {
    fontSize: 15,
    fontWeight: 'bold',
    color: constants.$backgroundColor,
    textAlign: 'center',
  },
  announceMore: {
    top: '10%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 20,
    marginRight: 30,
  },
  announcement: {
    color: constants.$accentColor,
    fontFamily: constants.$fontFamilyBold,
    fontSize: 20,
  },
  more: {
    color: constants.$accentColor,
    textDecorationLine: 'underline',
    fontSize: 17,
  },
  carousel2: {
    top: '10%',
    flex: 1,
    alignContent: 'center',
    justifyContent: 'flex-start',
  },
  exploreMore: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: '6%',
    marginRight: '6%',
    top: '-8%',
  },
  exploreClinics: {
    color: constants.$accentColor,
    fontFamily: constants.$fontFamilyBold,
    fontSize: 20,
  },
  seeAll: {
    color: constants.$accentColor,
    textDecorationLine: 'underline',
    fontSize: 17,
  },
  button: {
    backgroundColor: constants.$accentColor,
    padding: 10,
    borderRadius: 20,
    bottom: '8%',
  },
  open: {
    fontSize: 17,
    color: 'green',
  },
  closed: {
    fontSize: 17,
    color: 'red',
  },
});

export default HomePage;
