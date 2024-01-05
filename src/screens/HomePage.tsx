import React, {useState, useRef, useEffect} from 'react';
import {ScrollView, SafeAreaView} from 'react-native';
import {
  View,
  Text,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';
import {Image} from 'react-native-elements';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faLocationDot} from '@fortawesome/free-solid-svg-icons';
import {faArrowRight} from '@fortawesome/free-solid-svg-icons';
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';
import {useNavigation} from '@react-navigation/native';
import {FIREBASE_AUTH, FIREBASE_DB} from '../../firebase.config';
import {getDocs, collection} from 'firebase/firestore';
import ViewPropTypes from 'deprecated-react-native-prop-types';
import StyleSheetPropType from 'deprecated-react-native-prop-types';


const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

const data1 = [
  {
    id: 1,
    imageSource: require('../images/rebadulla.jpg'),
    title: 'Rebadulla Animal Hospital',
    description: '88 Commission Civil St, Jaro, Iloilo City',
    info1: 'Open Now',
    info2: 'Wednesday 9:00 AM - 5:00 PM',
  },
  {
    id: 2,
    imageSource: require('../images/cornerstone.jpg'),
    title: 'Cornerstone Veterinary Clinic',
    description: 'Faith Bldg, Jalandoni St., Jaro, Iloilo City',
    info1: 'Open Now',
    info2: 'Wednesday 9:00 AM - 5:00 PM',
  },
  {
    id: 3,
    imageSource: require('../images/rebadulla.jpg'),
    title: 'Rebadulla Animal Hospital',
    description: '88 Commission Civil St, Jaro, Iloilo City',
    info1: 'Open Now',
    info2: 'Wednesday 9:00 AM - 5:00 PM',
  },
];

const data2 = [
  {
    id: 1,
    imageSource: require('../images/cutieCat.jpg'),
    title: 'Looking for Blood Donor',
    description:
      'My cat, Snow is suffering from anemia and in need of blood type A ...',
  },
  {
    id: 2,
    imageSource: require('../images/announcement1.jpg'),
    title: 'Emergency',
    description: 'My dog, Summer needs to undergo surgery...',
  },
  {
    id: 3,
    imageSource: require('../images/cutieCat.jpg'),
    title: 'Looking for Blood Donor',
    description:
      'My cat, Snow is suffering from anemia and in need of blood type A ...',
  },
  {
    id: 4,
    imageSource: require('../images/announcement1.jpg'),
    title: 'Emergency',
    description: 'My dog, Summer needs to undergo surgery...',
  },
];

const data3 = [
  {
    id: 1,
    img1: require('../images/Ellipse17.png'),
    img2: require('../images/Vector_11.png'),
    img3: require('../images/Ellipse18.png'),
    imageSome: require('../images/idPic.png'),
    title: 'Are cats allowed to eat chocolates?',
    description: 'Click Here',
    imageSource: require('../images/kitty.png'),
  },
  {
    id: 2,
    img1: require('../images/Ellipse17.png'),
    img2: require('../images/Vector_11.png'),
    img3: require('../images/Ellipse18.png'),
    imageSome: require('../images/idPic.png'),
    title: 'Are dogs allowed to eat grapes?',
    description: 'Click Here',
    imageSource: require('../images/doggy.png'),
  },
  {
    id: 3,
    img1: require('../images/Ellipse17.png'),
    img2: require('../images/Vector_11.png'),
    img3: require('../images/Ellipse18.png'),
    imageSome: require('../images/idPic.png'),
    title: 'Are cats allowed to eat peanut butter?',
    description: 'Click Here',
    imageSource: require('../images/kitty.png'),
  },
];

const renderItem = ({item, index, navigation}) => {
  //const navigation = useNavigation();

  const handleSeeMoreClick = () => {
    navigation.navigate('ForumPage');
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View
          style={{
            borderWidth: 1,
            padding: 10,
            borderRadius: 20,
            backgroundColor: 'white',
            borderColor: 'white',
            elevation: 10,
          }}>
          <View
            style={{
              alignSelf: 'center',
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              bottom: 9,
            }}>
            <Image
              source={item.imageSource}
              style={{
                width: 283,
                height: 150,
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
              }}
            />
          </View>
          <Text
            style={{
              fontSize: 19,
              fontWeight: 'bold',
              color: '#5a2828',
              textAlign: 'center',
              fontFamily: 'Poppins-Bold',
            }}>
            {item.title}
          </Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <FontAwesomeIcon icon={faLocationDot} style={{color: '#ff8700'}} />
            <Text
              style={{fontSize: 16, fontWeight: 'normal', color: '#ff8700'}}>
              {item.description}
            </Text>
          </View>
          <Text
            style={{
              fontSize: 15,
              fontWeight: 'bold',
              color: '#5a2828',
              textAlign: 'left',
            }}>
            {item.info1}
          </Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style ={{fontSize: 13, fontWeight: '300', color: '#5a2828'}}>
              {item.info2}
            </Text>
            <TouchableOpacity onPress= {handleSeeMoreClick} >
              <FontAwesomeIcon icon={faArrowRight} style={{color: '#ff8700'}} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const itemNumber2 = ({item}) => {
  return (
    <SafeAreaView>
      <ScrollView>
        <View
          style={{
            borderWidth: 1,
            padding: 10,
            borderRadius: 20,
            backgroundColor: 'white',
            elevation: 20,
            borderColor: '#FF8484',
          }}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Image
              source={item.imageSource}
              style={{width: 80, height: 80, borderRadius: 80 / 2}}
            />
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{color: '#5a2828', fontWeight: 'bold', fontSize: 20}}>
                {item.title}
              </Text>
              <Text style={{color: '#5a2828', fontWeight: '300', fontSize: 15}}>
                {item.description}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const Data3Item = ({item, handleItemClick, searchQuery, setSearchQuery}) => {
  const auth = FIREBASE_AUTH;
  const db = FIREBASE_DB;

  const [profilePicture, setProfilePicture] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'user'));
        querySnapshot.forEach(doc => {
          if (doc.data().userId === auth.currentUser?.uid) {
            setProfilePicture(doc.data().profilePicture);
          }
        });
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  if (profilePicture != null) {
    for (let i = 0; i < data3.length; i++) {
      data3[i].imageSome = {uri: profilePicture};
    }
  }

  const navigation = useNavigation();

  const handleSeeMoreClick = () => {
    navigation.navigate('FoodAdvisable');
  };
  const handleProfileClick = () => {
    navigation.navigate('ProfileDetails');
  };
  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          <ImageBackground
            source={require('../images/Group_75.png')}
            resizeMode="contain"
            style={{
              marginTop: 10,
              flex: 1,
              justifyContent: 'center',
              borderRadius: 30,
              padding: 25,
              left: 5,
            }}>
            <View style={{top: -3}}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View style={{flex: 1, top: 15, left: 20, margin: 10}}>
                  <View
                    style={{
                      flexDirection: 'row-reverse',
                      alignItems: 'center',
                      backgroundColor: 'white',
                      borderRadius: 20,
                      width: 200,
                    }}>
                  </View>
                </View>
                
                {/* profile click */}
                <TouchableOpacity onPress={handleProfileClick}>
                  <Image
                    source={item.imageSome}
                    style={{
                      width: 35,
                      height: 35,
                      top: '50%',
                      paddingRight: '20%',
                      position: 'relative',
                      borderRadius: 50,
                    }}
                  />
                </TouchableOpacity>
              </View>

              <View style={{flexDirection: 'row-reverse'}}>
                <Image
                  source={item.imageSource}
                  style={{
                    flex: 1,
                    width: 130,
                    height: 130,
                    top: 20,
                  }}
                />

                <View
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: 10,
                  }}>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: 'bold',
                      color: 'white',
                      textAlign: 'center',
                      marginBottom: 20,
                    }}>
                    {item.title}
                  </Text>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={handleSeeMoreClick} 
                  >
                    <Text
                      style={{
                        fontSize: 17,
                        fontWeight: 'bold',
                        color: 'white',
                        textAlign: 'center',
                      }}>
                      {item.description}
                    </Text>
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

const HomePage = () => {
  const navigation = useNavigation();
  const [index, setIndex] = useState(0);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const isCarousel = useRef(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleItemClick = item => {
    setSelectedItem(item);
    setIsModalVisible(true);
    navigation.navigate('FoodAdvisable'); 
  };
  const handleSearchSubmit = () => {
    console.log('Search query:', searchQuery);

    navigation.navigate('ResultsPage', {searchQuery});
  };
  const handleSearchIconClick = () => {
    navigation.navigate('ResultsPage'); 
  };

  return (
    <>
      <SafeAreaView>
        <ScrollView>
          <View>
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
                  width: 3,
                  height: 2,
                  borderRadius: 10,
                  padding: 6,
                  backgroundColor: '#ff6464',
                  bottom: 60,
                }}
                tappableDots={true}
                inactiveDotStyle={{
                  backgroundColor: 'black',
                  width: 2,
                  height: 2,
                  borderRadius: 10,
                }}
                inactiveDotOpacity={0.4}
                inactiveDotScale={0.6}
              />
            </View>

            <View style={{bottom: 50}}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginLeft: 20,
                  marginRight: 30,
                }}>
                <Text
                  style={{
                    color: '#FF6464',
                    fontFamily: 'Poppins-Bold',
                    fontSize: 20,
                  }}>
                  Urgent Announcements
                </Text>
                <TouchableOpacity
                  // onPress={() => {
                  //   navigation.navigate('ForumPage');
                  // }}
                  onPress={() => {
                    navigation.navigate('ClinicDetails');
                  }}
                  >
                  <Text
                    style={{
                      color: '#FF6464',
                      textDecorationLine: 'underline',
                      fontSize: 17,
                    }}>
                    More
                  </Text>
                </TouchableOpacity>
              </View>
              <Carousel
                style={{
                  flex: 1,
                  alignContent: 'center',
                  justifyContent: 'center',
                }}
                data={data2}
                renderItem={itemNumber2}
                sliderWidth={screenWidth}
                itemWidth={Math.round(screenWidth * 0.9)}
              />
            </View>

            <View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginLeft: 20,
                  marginRight: 30,
                }}>
                <Text
                  style={{
                    color: '#FF6464',
                    fontFamily: 'Poppins-Bold',
                    fontSize: 20,
                  }}>
                  Popular Clinics
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('PopularClinics');
                  }}>
                  <Text
                    style={{
                      color: '#FF6464',
                      textDecorationLine: 'underline',
                      fontSize: 17,
                    }}>
                    See all
                  </Text>
                </TouchableOpacity>
              </View>
                <Carousel
                  data={data1}
                  renderItem={({ item, index }) => renderItem({ item, index, navigation })}
                  sliderWidth={screenWidth}
                  sliderHeight={screenHeight}
                  itemWidth={Math.round(screenWidth * 0.8)}
                  itemHeight={Math.round(screenHeight - 30 * 0.7)}
                />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#ff6464',
    padding: 10,
    borderRadius: 20,
    bottom: 10,
  },
});

export default HomePage;
