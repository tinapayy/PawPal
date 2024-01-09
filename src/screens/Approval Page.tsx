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
import {
  CheckCircleIcon as CheckIcon,
  XCircleIcon as XIcon,
  ChatBubbleLeftRightIcon as ForumSolid,
  ChatBubbleBottomCenterTextIcon as Bubble,
} from 'react-native-heroicons/solid';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faRightFromBracket} from '@fortawesome/free-solid-svg-icons';
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

const ForumCard = ({userPost, onCheck, onX}) => {
  return (
    <View
      style={{
        paddingTop: 16,
        backgroundColor: 'white',
        margin: 8,
        marginBottom: 25,
        position: 'relative',
        borderRadius: 30,
        elevation: 10,
      }}>
      <View
        style={{
          backgroundColor: 'white',
          margin: 10,
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}>
        <View>
          <Avatar.Image size={60} source={userPost.profilePicture} />
        </View>
        <View
          style={{
            flexDirection: 'column',
            backgroundColor: 'ff8d4d',
            marginLeft: 5,
          }}>
          <View>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>
              {userPost.name}
            </Text>
          </View>
          <View>
            <Text>{userPost.postTime}</Text>
          </View>
        </View>
      </View>
      <View
        style={{
          backgroundColor: 'white',
          paddingBottom: 10,
          flexDirection: 'row',
        }}>
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
      <View
        style={{
          backgroundColor: '#FFAC4E',
          flexDirection: 'row',
          borderBottomLeftRadius: 30,
          borderBottomRightRadius: 30,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            left: '30%',
          }}>
          <TouchableOpacity onPress={onCheck}>
            <CheckIcon
              size="40"
              color="white"
              stroke={'#4BD37B'}
              strokeWidth={2}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={onX}>
            <XIcon
              size="40"
              color="white"
              stroke={'#FF6464'}
              strokeWidth={2}
              style={{left: 70}}
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
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  const handleX = async postId => {
    try {
      await deleteDoc(doc(db, 'forum', postId));
      fetchData();
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
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          margin: 20,
        }}>
        <View style={{flexDirection: 'row', right: '3%'}}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('AdminForumPage');
            }}>
            <Bubble
              size="33"
              color="brown"
              strokeWidth={0}
              stroke={'white'}
              style={{right: '-5%', top: '15%'}}
            />
          </TouchableOpacity>
          <Text
            style={{
              color: '#ff8d4d',
              fontSize: 28,
              fontFamily: 'Poppins-SemiBold',
              left: '110%',
            }}>
            Approval Page
          </Text>
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
            icon={faRightFromBracket}
            size={30}
            style={{color: 'brown', right: '-15%', top: '15%'}}
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
    </View>
  );
};

export default ApprovalPage;

const styles = StyleSheet.create({
  container: {
    paddingTop: 16,
    backgroundColor: 'white',
    margin: 8,
    marginBottom: 25,
    position: 'relative',
    borderRadius: 30,
    elevation: 10,
  },
  box: {
    backgroundColor: 'white',
    paddingBottom: 25,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  forumcontent: {
    fontSize: 20,
    justifyContent: 'center',
  },

  usercontainer: {
    backgroundColor: 'white',
    padding: 5,
    margin: 3,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  user: {
    flexDirection: 'column',
    backgroundColor: 'ff8d4d',
    marginLeft: 5,
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  choosebuttons: {
    backgroundColor: '#FFAC4E',
    flexDirection: 'row',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    left: '30%',
  },
  button: {
    minWidth: 80,
    marginHorizontal: 4,
    borderRadius: 40,
  },

  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 45,
    marginLeft: 25,
  },
  radioButton: {
    height: 20,
    width: 20,
    backgroundColor: '#F8F8F8',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E6E6E6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioButtonIcon: {
    height: 16,
    width: 16,
    borderRadius: 7,
    backgroundColor: '#FF8700',
  },
  radioButtonText: {
    fontSize: 16,
    marginLeft: 16,
  },
});
