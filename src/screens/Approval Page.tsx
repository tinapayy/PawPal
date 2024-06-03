import React, {useEffect, useState} from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  Dimensions,
  RefreshControl,
} from 'react-native';
import {Avatar} from 'react-native-paper';
import * as icons from '../imports/icons/icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {useNavigation} from '@react-navigation/native';
import {FIREBASE_AUTH, FIREBASE_DB} from '../../firebase.config';
import {
  getDocs,
  collection,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';
import constants from '../styles/constants';

import CustomAlert from '../components/CustomAlert';

const ForumCard = ({userPost, onCheck, onX}) => {
  return (
    <View style={styles.cardBg}>
      <View style={styles.userBg}>
        <View>
          <Avatar.Image size={60} source={userPost.profilePicture} />
        </View>
        <View style={styles.detailsBg}>
          <View>
            <Text style={{fontSize: 20, fontWeight: constants.$fontWeightBold}}>
              {userPost.name}
            </Text>
          </View>
          <View>
            <Text>{userPost.postTime}</Text>
          </View>
        </View>
      </View>
      <View style={styles.contentBg}>
        <Text style={{fontSize: 20, paddingHorizontal: 10}}>
          {userPost.postText}
        </Text>
      </View>
      {userPost.postPicture !== '' && (
        <Image
          source={userPost.postPicture}
          style={{
            width: 370,
            height: 200,
            alignSelf: 'center',
            marginBottom: 10,
          }}
        />
      )}
      <View style={styles.approvedBg}>
        <View style={styles.approvedBtn}>
          <TouchableOpacity onPress={onCheck}>
            <icons.CheckIcon
              size="40"
              color="white"
              stroke={'#4BD37B'}
              strokeWidth={2}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={onX}>
            <icons.XIcon
              size="40"
              color="white"
              stroke={'#FF6464'}
              strokeWidth={2}
              style={{left: '200%'}}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

type Post = {
  id: number;
  postId: string;
  name: string;
  profilePicture: any;
  postText: string;
  postTime: string;
  postPicture: any;
};

const ApprovalPage = () => {
  const navigation = useNavigation();

  const auth = FIREBASE_AUTH;
  const db = FIREBASE_DB;

  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [showAlert, setShowAlert] = useState({
    visible: false,
    title: '',
    message: '',
  });

  const fetchData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'forum'));
      const posts: Post[] = [];
      for (const forumDoc of querySnapshot.docs) {
        const userSnapshot = await getDocs(collection(db, 'user'));
        for (const userDoc of userSnapshot.docs) {
          if (userDoc.data().userId === forumDoc.data().userId) {
            if (!forumDoc.data().isApproved) {
              posts.push({
                id: posts.length + 1,
                postId: forumDoc.id,
                name: userDoc.data().name,
                profilePicture: userDoc.data().profilePicture
                  ? {uri: userDoc.data().profilePicture}
                  : require('../images/defaultIcon.png'),
                postText: forumDoc.data().postText,
                postTime: getTimeDifference(forumDoc.data().postTime),
                postPicture: forumDoc.data().postPicture
                  ? {uri: forumDoc.data().postPicture}
                  : '',
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

  const handleCheck = async postId => {
    try {
      await updateDoc(doc(db, 'forum', postId), {
        isApproved: true,
      });
      // Remove the approved post from userPosts
      setUserPosts(prevPosts =>
        prevPosts.filter(post => post.postId !== postId),
      );
      setShowAlert({
        visible: true,
        title: 'Action Completed',
        message: 'The post has been approved.',
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleX = async postId => {
    try {
      await deleteDoc(doc(db, 'forum', postId));
      // Remove the deleted post from userPosts
      setUserPosts(prevPosts =>
        prevPosts.filter(post => post.postId !== postId),
      );
      // Show success alert message
      setShowAlert({
        visible: true,
        title: 'Action Completed',
        message: 'The post has been deleted.',
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View
      style={{
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
      }}>
      <View style={styles.header}>
        <View style={{flexDirection: 'row', right: '3%'}}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('AdminForumPage');
            }}>
            <icons.Bubble
              size="33"
              color="#5a2828"
              strokeWidth={0}
              stroke={'white'}
              style={{left: '25%', top: '15%'}}
            />
          </TouchableOpacity>
          <Text style={styles.approvalText}>Approval Page</Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            auth.signOut().then(() => {
              navigation.reset({
                index: 0,
                routes: [{name: 'GettingStarted'}],
              });
            });
          }}>
          <FontAwesomeIcon
            icon={icons.faRightFromBracket}
            size={30}
            style={{color: '#5a2828', right: '15%', top: '15%'}}
          />
        </TouchableOpacity>
      </View>
      <ScrollView
        style={{
          width: Dimensions.get('window').width,
          height: Dimensions.get('window').height,
        }}
        refreshControl={
          <RefreshControl
            refreshing={false}
            onRefresh={() => {
              fetchData();
            }}
          />
        }>
        {userPosts.map(userPost => (
          <ForumCard
            key={userPost.id}
            userPost={userPost}
            onCheck={() => handleCheck(userPost.postId)}
            onX={() => handleX(userPost.postId)}
          />
        ))}
      </ScrollView>
      <CustomAlert
        visible={showAlert.visible} // Pass the state to control visibility
        title={showAlert.title} // Pass the title from showAlert
        message={showAlert.message} // Pass the message from showAlert
        onClose={() => setShowAlert({visible: false, title: '', message: ''})} // Close the alert on button press
      />
    </View>
  );
};

export default ApprovalPage;

const styles = StyleSheet.create({
  cardBg: {
    paddingTop: '2%',
    backgroundColor: constants.$backgroundColor,
    margin: '2%',
    marginBottom: '8%',
    position: 'relative',
    borderRadius: 30,
    elevation: 10,
  },
  userBg: {
    backgroundColor: constants.$backgroundColor,
    margin: '3%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  detailsBg: {
    flexDirection: 'column',
    backgroundColor: constants.$backgroundColor,
    marginLeft: '2%',
  },
  contentBg: {
    backgroundColor: constants.$backgroundColor,
    paddingBottom: '3%',
    flexDirection: 'row',
  },
  approvedBg: {
    backgroundColor: constants.$primaryColor,
    flexDirection: 'row',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  approvedBtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    left: '30%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: '5%',
  },
  approvalText: {
    color: constants.$senaryColor,
    fontSize: 28,
    fontFamily: constants.$fontFamilySemiBold,
    left: '115%',
  },
});
