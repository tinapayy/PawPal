import React, {useState, useEffect} from 'react';
import {
  Modal,
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  RefreshControl,
  ViewStyle,
} from 'react-native';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import * as icons from '../imports/icons/icons';
import {Card, Avatar} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {FIREBASE_AUTH, FIREBASE_DB} from '../../firebase.config';
import {getDocs, collection, query, orderBy, limit} from 'firebase/firestore';
import constants from '../styles/constants';
import {buttonMixin} from '../components/buttonMixin';
import {alignmentMixin} from '../components/alignmentMixin';
import {useNavigateTo} from '../components/navigation';
import ProfileDetails from './ProfileDetails';

interface Post {
  id: number;
  name: string;
  profilePicture: any;
  postText: string;
  postTime: string;
  postPicture: any; // Assuming postPicture is an object with a uri property
}

const ForumPage = () => {
  const NavFoodSuggestions = useNavigateTo('FoodAdvisable');
  const ProfileDetails = useNavigateTo('ProfileDetails');
  const db = FIREBASE_DB;

  const [userPosts, setUserPosts] = useState<Post[]>([]);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalImageUri, setModalImageUri] = useState('');

  const openModal = imageUri => {
    console.log('Modal Image URI:', imageUri); // Check URI in console

    setModalImageUri(imageUri); // Set the URI of the clicked image
    setModalVisible(true); // Set modal visibility to true
  };

  const fetchData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'forum'));
      const posts: Post[] = [];
      for (const forumDoc of querySnapshot.docs) {
        const userSnapshot = await getDocs(collection(db, 'user'));
        for (const userDoc of userSnapshot.docs) {
          if (userDoc.data().userId === forumDoc.data().userId) {
            if (forumDoc.data().isApproved) {
              posts.push({
                id: posts.length + 1,
                name: userDoc.data().name,
                profilePicture: {
                  uri:
                    userDoc.data().profilePicture ||
                    userDoc.data().clinicPicture,
                },
                postText: forumDoc.data().postText,
                postTime: getTimeDifference(forumDoc.data().postTime),
                postPicture: forumDoc.data().postPicture
                  ? {uri: forumDoc.data().postPicture}
                  : null,
              });
            }
          }
        }
      }
      setUserPosts(posts.reverse());
    } catch (error) {
      console.error(error);
    }
  };
  // Fetch data on first render
  useEffect(() => {
    fetchData();
  }, []);

  function getTimeDifference(postTime: {
    toDate: () => {
      (): any;
      new (): any;
      getTime: {(): any; new (): any};
      toLocaleDateString: {
        (
          arg0: string,
          arg1: {
            timeZone: string;
            weekday: string;
            year: string;
            month: string;
            day: string;
          },
        ): string;
        new (): any;
      };
      toLocaleTimeString: {
        (
          arg0: string,
          arg1: {timeZone: string; hour: string; minute: string},
        ): string;
        new (): any;
      };
    };
  }) {
    const currentTime = new Date().getTime();
    const postTimestamp = postTime.toDate().getTime();
    const timeDifference = currentTime - postTimestamp;

    if (timeDifference < 10000) {
      return 'Just Now';
    } else if (timeDifference < 60000) {
      return Math.floor(timeDifference / 1000) + 's';
    } else if (timeDifference < 3600000) {
      return Math.floor(timeDifference / 60000) + 'm';
    } else if (timeDifference < 86400000) {
      return Math.floor(timeDifference / 3600000) + 'h';
    } else {
      return (
        postTime.toDate().toLocaleDateString('en-US', {
          timeZone: 'Asia/Manila',
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }) +
        ' at ' +
        postTime.toDate().toLocaleTimeString('en-US', {
          timeZone: 'Asia/Manila',
          hour: 'numeric',
          minute: 'numeric',
        })
      );
    }
  }

  function calculateMargin(length: number): number {
    return length * 2;
  }

  return (
    <ScrollView
      style={styles.scrollView}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={false}
          onRefresh={() => {
            fetchData();
          }}
        />
      }>
      <View style={styles.header}>
        <View>
          <Image
            source={require('../images/pawpal_forum.png')}
            style={styles.imageHeader}
          />
        </View>
        <TouchableOpacity onPress={NavFoodSuggestions}>
          <View>
            <Image
              source={require('../images/dog_food.png')}
              style={styles.imageHeader1}
            />
            <Text style={styles.headerText}>Food Suggestions</Text>
          </View>
        </TouchableOpacity>
      </View>
      {userPosts.map(post => (
        <Card key={post.id} style={styles.card}>
          <Card.Content style={styles.cardContent}>
            <View style={styles.userInfo}>
              {/* click profile and navigate Profile Details */}
              <TouchableOpacity onPress={ProfileDetails}>
                <Avatar.Image
                  size={50}
                  source={post.profilePicture}
                  style={styles.userIcon}
                />
              </TouchableOpacity>

              <View style={styles.userInfoText}>
                {/* click profile and navigate Profile Details */}
                <TouchableOpacity onPress={ProfileDetails}>
                  <Text style={styles.userName}>{post.name}</Text>
                </TouchableOpacity>
                <Text style={styles.postTime}>{post.postTime}</Text>
              </View>
            </View>
            {post.postText !== '' && (
              <Text style={styles.postText}>{post.postText}</Text>
            )}
            <View style={styles.postImageContainer}>
              <TouchableOpacity
                onPress={() => {
                  post.postPicture && openModal(post.postPicture.uri);
                }}>
                <Image
                  source={post.postPicture}
                  // Add image style if post is not an empty string
                  {...(post.postPicture && {style: styles.image})}
                />
              </TouchableOpacity>
            </View>
          </Card.Content>
        </Card>
      ))}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <TouchableOpacity onPress={() => setModalVisible(false)}>
            {modalImageUri ? (
              <Image source={{uri: modalImageUri}} style={styles.modalImage} />
            ) : null}
          </TouchableOpacity>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: constants.$backgroundColor,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalImage: {
    width: 350, // Adjust width as needed
    height: 600, // Adjust height as needed
    resizeMode: 'contain',
  },

  video: {
    width: '100%',
    height: 200,
  },
  header: {
    ...alignmentMixin.alignment1,
    alignSelf: undefined,
    justifyContent: 'space-between',
    bottom: '2%',
    left: '2.5%',
  } as ViewStyle,
  imageHeader: {
    width: 150,
    height: 80,
    bottom: '7%',
    objectFit: 'contain',
    position: 'relative',
  },
  imageHeader1: {
    position: 'relative',
    top: '50%',
    left: '-55%',
  },
  headerText: {
    fontSize: 15,
    left: '-25%',
  },
  card: {
    marginTop: '5%',
    marginHorizontal: '5%',
  },
  cardContent: {
    flexDirection: 'column',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  userInfoText: {
    marginLeft: '3%',
    fontFamily: constants.$fontFamily,
  },
  message: {
    marginLeft: 3,
    position: 'absolute',
  },
  messageIcon: {
    color: '#F87000',
    top: 2,
    left: 50,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: constants.$textColor1,
  },
  postTime: {
    fontSize: 12,
    color: 'gray',
  },
  postText: {
    fontSize: 14,
    textAlign: 'justify',
    fontFamily: constants.$fontFamily,
    color: constants.$textColor1,
    top: '3%',
  },
  postImageContainer: {
    marginTop: '2%',
    alignItems: 'center',
    marginBottom: '2%',
  },
  image: {
    width: 340,
    height: 200,
    resizeMode: 'cover',
    borderRadius: 20,
    top: '3%',
  },
});

export default ForumPage;
