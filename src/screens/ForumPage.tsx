import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import * as icons from '../imports/icons/icons';
import {Card, Avatar} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {FIREBASE_AUTH, FIREBASE_DB} from '../../firebase.config';
import {getDocs, collection, query, orderBy, limit} from 'firebase/firestore';

interface Post {
  id: number;
  name: string;
  profilePicture: any;
  postText: string;
  postTime: string;
  postPicture: any;
}

const ForumPage = () => {
  const navigation = useNavigation();

  const db = FIREBASE_DB;

  const [userPosts, setUserPosts] = useState<Post[]>([]);

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

  function getTimeDifference(postTime) {
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
        <TouchableOpacity
          onPress={() => {
            console.log('Food icon pressed');
            navigation.navigate('FoodAdvisable');
          }}>
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
              <Avatar.Image
                size={50}
                source={post.profilePicture}
                style={styles.userIcon}
              />
              <View style={styles.userInfoText}>
                <Text style={styles.userName}>{post.name}</Text>
                <Text style={styles.postTime}>{post.postTime}</Text>
              </View>
            </View>
            {post.postText !== '' && (
              <Text style={styles.postText}>{post.postText}</Text>
            )}
            <View style={styles.postImageContainer}>
              <Image
                source={post.postPicture}
                // Add image style if post is not empty string
                {...(post.postPicture && {style: styles.image})}
              />
            </View>
          </Card.Content>
        </Card>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  video: {
    width: '100%',
    height: 200,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    bottom: 5,
    left: 30,
  },
  imageHeader: {
    width: 150,
    height: 70,
    bottom: 5,
    objectFit: 'contain',
    paddingHorizontal: 10,
    position: 'relative',
  },
  imageHeader1: {
    position: 'relative',
    bottom: 5,
    top: 20,
    left: -90,
  },
  headerText: {
    fontSize: 14,
    left: -57,
  },
  card: {
    margin: 19,
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
    marginLeft: 12,
    fontFamily: 'Poppins',
  },
  message: {
    marginLeft: 'auto',
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
    color: '#000',
  },
  postTime: {
    fontSize: 12,
    color: 'gray',
  },
  postText: {
    fontSize: 14,
    textAlign: 'justify',
    fontFamily: 'Poppins',
    color: '#000',
    top: 8,
    bottom: 8,
  },
  postImageContainer: {
    marginTop: 8,
    alignItems: 'center',
    marginBottom: 8,
  },
  image: {
    width: 300,
    height: 150,
    resizeMode: 'cover',
    borderRadius: 20,
    top: 8,
  },
});

export default ForumPage;