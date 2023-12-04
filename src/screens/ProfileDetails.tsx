/* eslint-disable prettier/prettier */
import React, { useRef, useState } from 'react';
import {
  View,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faArrowLeft,
  faCircleChevronRight,
  faCircleChevronLeft,
  faMessage,
  faGear,
} from '@fortawesome/free-solid-svg-icons';
// import { ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SettingsPage from './SettingsPage';

const ProfileDetails = () => {
  const navigation = useNavigation();
  const scrollViewRef = useRef<ScrollView | null>(null);
  const MAX_DESCRIPTION_LENGTH = 200;
  const initialDescription =   'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.Viverra maecenas accumsan lacus vel facilisis. Sed egestas egestas fringilla phasellus faucibus scelerisque. Integer enim neque volutpat ac. Nulla facilisi morbi tempus iaculis urna id. Tempus quam pellentesque nec nam aliquam sem et. Ullamcorper velit sed ullamcorper morbi. Consequat interdum varius sit amet mattis vulputate enim. Et tortor consequat id porta nibh venenatis. Vitae justo eget magna fermentum iaculis eu non diam phasellus. Etiam tempor orci eu lobortis. Libero justo laoreet sit amet cursus sit amet. Aliquam sem et tortor consequat id porta nibh venenatis cras. Sed ullamcorper morbi tincidunt ornare massa eget. Lectus nulla at volutpat diam ut venenatis tellus in. Tortor vitae purus faucibus ornare suspendisse sed nisi. Nunc consequat interdum varius sit amet mattis vulputate enim. Suspendisse in vulputate .';

  const [showFullDescription, setShowFullDescription] = useState(false);
  const [truncatedDescription, setTruncatedDescription] = useState(
    `${initialDescription.slice(0, MAX_DESCRIPTION_LENGTH)}...`
  );

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const handleDescriptionPress = () => {
    toggleDescription();
    if (scrollViewRef.current) {
    if (showFullDescription) {
      setTruncatedDescription(`${initialDescription.slice(0, MAX_DESCRIPTION_LENGTH)}...`);
      // scrollViewRef.current.scrollTo({ x: 0, y: 0, animated: true });
    } else {
      setTruncatedDescription(initialDescription);
      // scrollViewRef.current.scrollToEnd({ animated: true });
    }
    }
  };
  return (
  <ImageBackground
    source={require('../images/profile_bg.png')}
    style={styles.imageBackground}
    >
    <View style={styles.container}>
      <View style={styles.back}>
        <TouchableOpacity>
        <FontAwesomeIcon
        icon={faArrowLeft}
        style={styles.backIcon}
        size={25}
          />
        </TouchableOpacity>
        <Text style={styles.backButtonText}>Back</Text>
        </View>
        <View style={styles.profileContainer}>
          <LinearGradient
            colors={['#FFAC4E', '#FF6464']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={styles.gradientBackground}>
              <View style={styles.profileText}>
            <Text style={styles.petName}>Goldie</Text>
            <Text style={styles.petBreed}>Golden Retriever</Text>
            <Text style={styles.petColor}>Brown</Text>
            </View>
          </LinearGradient>
          <View style={styles.arrowLR}>
            <View>
          <TouchableOpacity style={styles.arrowLeft}>
            <FontAwesomeIcon
              icon={faCircleChevronLeft}
              size={30}
              style={{
                color: '#ff8700',
              }}
            />
          </TouchableOpacity>
          </View>
          <View style={styles.logo}>
            <Image
             source={require('../images/pawpal_logo.png')}
            style={styles.pawpalLogo}
          />
          </View>
          <View>
          <TouchableOpacity style={styles.arrowRight}>
            <FontAwesomeIcon
              icon={faCircleChevronRight}
              size={30}
              // eslint-disable-next-line react-native/no-inline-styles
              style={{
                color: '#ff8700',
              }}
            />
          </TouchableOpacity>

          </View>
        </View>
        </View>
        <View style={styles.containerText}>
          <View style={styles.containText}>
          <Text style={styles.containText1}>Age</Text>
          <Text style={styles.containText2}>Sex</Text>
          <Text style={styles.containText3}>Weight</Text>
          </View>
          <View style={styles.boxContainer}>
            {/* <View style={{ marginLeft: -30 }} /> */}
            <View style={styles.box1}>
              <Text style={styles.boxText}>2 months</Text>
            </View>
            <View style={styles.box2}>
              <Text style={styles.boxText}>Male</Text>
            </View>
            <View style={styles.box3}>
              <Text style={styles.boxText}>7 kg</Text>
              </View>
            </View>
        </View>
         <View style={styles.horizontalLine} />
          </View>
        <View style={styles.bottomContainer}>
          <View>
          <Image
            source={require('../images/userIcon.png')}
            style={styles.userIcon}
          />
          </View>
          <View style={styles.textUserInfo}>
          <Text style={styles.textUser}>Kristina V. Celis</Text>
          <Text style={styles.textUser1}>Owner</Text>
          <View>
          <View style={styles.functionality} />
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('MessagePage')}
            >
              <FontAwesomeIcon icon={faMessage} style={{ color: '#ffffff' }} />
              <Text style={styles.chatIcon}>Message</Text>
            </TouchableOpacity>
            <TouchableOpacity
            style={styles.settings}
            onPress={() => navigation.navigate('SettingsPage')}
            >
              <FontAwesomeIcon icon={faGear} style={{ color: '#FF8D4D' }} />
            </TouchableOpacity>
          </View>
          </View>
           <View style={styles.container}>
           <ScrollView style={styles.scrollView} ref={scrollViewRef}>
            <TouchableOpacity onPress={handleDescriptionPress}>
              <View style={styles.content}>
                <Text style={styles.contentProfile}>
                   {showFullDescription ? initialDescription : truncatedDescription}
                   </Text>
                  <View style={styles.readMoreContainer}>
                    <Text style={styles.descriptionButton} onPress={toggleDescription}>
                      {showFullDescription ? 'See Less' : 'See More'}
                      </Text>
                      </View>
                </View>
                </TouchableOpacity>
                </ScrollView>
                </View>
                </View>
                </ImageBackground>
                    );
                  };

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBackground: {
    flex: 1,
    width: '100%',
  },
  back: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginLeft: 30,
    // right:20,
    elevation: 3,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
  },
  backIcon: {
    color: 'white',
  },
  backButtonText: {
    color: 'white',
    marginLeft: 5,
    fontSize: 20,
  },
  profileContainer: {
    alignItems: 'center',
    marginTop: 190,
    // width:20,
    height:200,
  },
  gradientBackground: {
    padding: 10,
    borderRadius: 20,
    // length:50,
    paddingHorizontal: 80,
  },
  profileText: {
    alignItems: 'flex-start',
    alignSelf: 'flex-start',
    fontFamily: 'Poppins-Regular',
    left: -50,
  },
  petName: {
    fontSize: 28,
    color: 'white',
    textDecorationStyle: 'solid',
    fontFamily: 'Poppins-SemiBold',
  },
  petBreed: {
    fontSize: 18,
    color: 'white',
    fontFamily: 'Poppins-Regular',
    marginTop: -5,
  },
  petColor: {
    fontSize: 14,
    color: 'white',
    fontFamily: 'Poppins-Regular',
    marginTop: -5,
  },
  arrowRight: {
    marginLeft: 145,
    marginRight: 'auto',
  },
  arrowLeft: {
    // marginTop: -40,
    // marginLeft: -155,
    // marginRight: 10,
    marginRight: 135,
    marginLeft: 'auto',
  },
  arrowLR: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: -70,
    // marginLeft: 10,
    paddingHorizontal: 80,
  },
  logo: {
    flexDirection: 'row',
    marginTop: -15,
  },
  pawpalLogo: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    position: 'absolute',
    marginLeft: 60,
    alignSelf:'center',
    // alignContent: 'center',
    top:-15,
    objectFit: 'cover',
  },
  containerText: {
    flexDirection: 'row',
    marginTop: 30,
    alignItems: 'center',
    paddingHorizontal: 100,
    alignContent:'space-between',
  },
    containText:{
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-evenly',
    // alignContent:'space-between',
    paddingHorizontal: 50,
    top:-120,
    // color: '#5A2828',
    color:'gray',
  },
   containText1:{
    // flexDirection: 'row',
    alignContent: 'center',
    // alignContent:'space-between',
    // paddingHorizontal: 50,
    // top:-50,
    // color: '#5A2828',
    color:'gray',
    fontFamily: 'Poppins-Regular',
    fontSize: 15,
    marginLeft: 20,
    left: -75,
  },
  containText2:{
    alignContent: 'center',
    color:'gray',
    fontFamily: 'Poppins-Regular',
    fontSize: 15,
    marginLeft: 20,
    left: 15,
  },
  containText3:{
    alignContent: 'center',
    color:'gray',
    fontFamily: 'Poppins-Regular',
    fontSize: 15,
    marginLeft: 20,
    left: 85,
  },
  boxContainer: {
  flexDirection: 'row',
  justifyContent: 'center',
  alignContent:'center',
  // marginTop: -80,
  top:-80,
  // left: 50,
  paddingHorizontal: 20,
},
  box1: {
  flexDirection: 'row',
  backgroundColor: '#F1D5C6',
  padding: 10,
  paddingHorizontal: 20,
  borderRadius: 15,
  alignContent: 'center',
  justifyContent: 'center',
  // paddingVertical: 10,
  marginRight: 20,
  // right: 10,
  left: -230,
  // marginLeft: 40,
},
box2: {
  flexDirection: 'row',
  backgroundColor: '#F1D5C6',
  padding: 10,
  paddingHorizontal: 20,
  borderRadius: 15,
  alignContent: 'center',
  justifyContent: 'center',
  // paddingVertical: 10,
  marginRight: 20,
  // right: 10,
  left: -260,
  marginLeft: 40,
},
box3: {
  flexDirection: 'row',
  backgroundColor: '#F1D5C6',
  padding: 10,
  paddingHorizontal: 20,
  borderRadius: 15,
  alignContent: 'center',
  justifyContent: 'center',
  // paddingVertical: 10,
  marginRight: 20,
  // right: 15,
  left: -285,
  marginLeft: 40,
},
boxText: {
  color: '#5A2828',
  fontFamily: 'Poppins-Regular',
  textAlign: 'center',
  textDecorationStyle: 'solid',
  fontSize: 16,
},
horizontalLine: {
  alignSelf: 'center',
  width: 350,
  height: 2,
  backgroundColor: '#FF8D4D',
  top: -60,
  textDecorationStyle: 'solid',
  },
  bottomContainer: {
    top: "22%",
    alignItems: 'center',
  },
  textUserInfo: {
    flexDirection: 'row',
    // alignItems: 'center',
    // left:10,
    textAlign: 'left',
    marginTop: 20,
  },
  userIcon: {
    width: 60,
    height: 60,
    top: -210,
    left: -160,
  },
  textUser: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    // textDecorationStyle: 'solid',
    color: '#5A2828',
    // textAlign:'left',
    top: -285,
    left: 30,
  },
  textUser1: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    // textDecorationStyle: 'solid',
    color: '#5A2828',
    // textAlign: 'left',
    top: -265,
    left: -115,
  },
  functionality: {
    flexDirection: 'row',
    // marginTop: -90,
    // left: 10,
    position: 'absolute',
  },
  settings: {
    flexDirection: 'row',
    position:'absolute',
    top: -280,
    right: -15,
    // right:20,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ff8700',
    padding: 10,
    marginRight: 10,
    borderRadius: 30,
    paddingHorizontal: 9,
    // marginTop: 20,
    top: -285,
    // left: 0,
  },
  chatIcon: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#ffffff',
    marginLeft: 5,
    marginRight: 5,
  },
  scrollView: {
    flex: 1,
    marginTop: -280,
  },
  content: {
    // marginTop: 0,
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
  },
  // readMore: {
  //   fontFamily: 'Poppins-Regular',
  //   fontSize: 14,
  //   textDecorationStyle: 'solid',
  //   color: '#ff8700',
  //   marginTop: 10,
  //   // textAlign: 'center',
  //   // display: 'inline',
  //   textDecorationLine: 'underline',
  // },
   readMoreContainer: {
    marginLeft: 0,
    position: 'absolute',
    bottom: 0,
    right: 120,
    // marginRight:10,
    // paddingHorizontal:10,
  },
  descriptionButton: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#ff8700',
    textDecorationLine: 'underline',
    marginLeft: 10,
    paddingHorizontal:5,
  },

});

export default ProfileDetails;
