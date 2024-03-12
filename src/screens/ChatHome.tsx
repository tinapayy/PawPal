import React, {useEffect, useState} from 'react';
import {
  FlatList,
  StyleSheet,
  View,
  ImageBackground,
  Text,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import {
  Container,
  Card,
  UserInfo,
  UserImgWrapper,
  UserImg,
  TextSection,
  UserInfoText,
  UserName,
  PostTime,
  MessageText,
} from '../components/MessageStyle';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCirclePlus, faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import {useNavigation} from '@react-navigation/native';
import {getDocs, collection} from 'firebase/firestore';
import {FIREBASE_AUTH, FIREBASE_DB} from '../../firebase.config';

const Messages = [
  {
    id: '1',
    userName: 'Cornerstone Animal Hospital',
    userImage: require('../images/user1.jpg'),
    messageTime: '10:00 AM',
    messageText:
      'Hello, Good morning! I would like to set an appointment for my dog today.',
  },
  {
    id: '2',
    userName: 'Labrod Veterinary Clinic',
    userImage: require('../images/user2.jpg'),
    messageTime: '2 hr',
    messageText: 'Please visit the clinic based on your time scheduled.',
  },
  {
    id: '3',
    userName: 'Lala land Veterinary Clinic',
    userImage: require('../images/user3.jpg'),
    messageTime: 'Nov 3',
    messageText: 'Thank you for visiting our clinic today.',
  },
  {
    id: '4',
    userName: 'Pet Express',
    userImage: require('../images/user4.jpg'),
    messageTime: 'Nov 1',
    messageText: 'Thank you for visiting our store today.',
  },
  {
    id: '5',
    userName: 'Pet Expresso',
    userImage: require('../images/user5.jpg'),
    messageTime: 'Sep 30',
    messageText: 'Thank you for visiting our store today.',
  },
  {
    id: '6',
    userName: 'Pet ExpressPadala',
    userImage: require('../images/user5.jpg'),
    messageTime: 'Sep 30',
    messageText: 'Thank you for visiting our store today.',
  },
  {
    id: '7',
    userName: 'Pet ExpressoCoffee',
    userImage: require('../images/user5.jpg'),
    messageTime: 'Sep 30',
    messageText: 'Thank you for visiting our store today.',
  },
  {
    id: '8',
    userName: 'Pet ExpressoSOSO',
    userImage: require('../images/user5.jpg'),
    messageTime: 'Sep 30',
    messageText: 'Thank you for visiting our store today.',
  },
];

interface Chat {
  id: number;
  senderName: number;
  senderPicture: any;
  message: string;
  time: string;
}

const MessagePage = () => {
  const navigation = useNavigation();

  const auth = FIREBASE_AUTH;
  const db = FIREBASE_DB;

  const [messages, setMessages] = useState<Chat[]>([]);

  const fetchData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'chat'));
      const chat: Chat[] = [];
      for (const chatDoc of querySnapshot.docs) {
        const userSnapshot = await getDocs(collection(db, 'user'));
        for (const userDoc of userSnapshot.docs) {
          if (userDoc.data().userId === chatDoc.data().senderId) {
            if (auth.currentUser?.uid === chatDoc.data().receiverId) {
              chat.push({
                id: chat.length + 1,
                senderName: userDoc.data().name,
                senderPicture: {
                  uri: userDoc.data().profilePicture,
                },
                message: chatDoc.data().message,
                time: getTimeDifference(chatDoc.data().time),
              });
            }
          }
        }
      }
      const unique = chat.filter(
        (v, i, a) => a.findIndex(t => t.senderName === v.senderName) === i,
      );
      setMessages(unique.reverse());
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

    if (timeDifference < 86400000) {
      return postTime.toDate().toLocaleTimeString('en-US', {
        timeZone: 'Asia/Manila',
        hour: 'numeric',
        minute: 'numeric',
      });
      // } else if (timeDifference < 604800000) {
      //   return postTime.toDate().toLocaleDateString('en-US', {
      //     timeZone: 'Asia/Manila',
      //     weekday: 'short',
      //   });
    } else {
      return postTime.toDate().toLocaleDateString('en-US', {
        timeZone: 'Asia/Manila',
        month: 'short',
        day: 'numeric',
      });
    }
  }

  return (
    <View style={styles.containerHeader}>
      <ImageBackground
        source={require('../images/messagePage_bg.png')}
        style={{width: '100%', height: '100%'}}>
        <View style={styles.back}>
          <TouchableOpacity onPress={() => navigation.navigate('home')}>
            <FontAwesomeIcon
              icon={faArrowLeft}
              style={styles.backIcon}
              size={25}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.textHeader}>Messages</Text>
        <Container style={styles.container}>
          <FlatList
            data={messages}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <Card style={styles.cardContainer}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('Chat', {
                      userId: item.senderName,
                      receiverPicture: item.senderPicture,
                    })
                  }>
                  <UserInfo>
                    <UserImgWrapper>
                      <UserImg source={item.senderPicture} />
                    </UserImgWrapper>
                    <TextSection>
                      <UserInfoText>
                        <UserName>{item.senderName}</UserName>
                        <PostTime>{item.time}</PostTime>
                      </UserInfoText>
                      <MessageText>{item.message}</MessageText>
                    </TextSection>
                  </UserInfo>
                </TouchableOpacity>
              </Card>
            )}
          />
        </Container>
        <View style={styles.addIcon}>
          <TouchableHighlight>
            <FontAwesomeIcon icon={faCirclePlus} size={50} color="#F87000" />
          </TouchableHighlight>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 150,
  },
  containerHeader: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  back: {
    flexDirection: 'row',
  },
  backIcon: {
    color: '#ffffff',
    flexDirection: 'row',
    position: 'absolute',
    top: 30,
    left: 15,
    paddingRight: 30,
  },
  textHeader: {
    fontFamily: 'Poppins-Bold',
    color: '#F87000',
    fontSize: 30,
    fontWeight: 'bold',
    top: 170,
    left: 30,
    marginBottom: 40,
  },
  cardContainer: {
    width: '90%',
  },
  addIcon: {
    position: 'absolute',
    bottom: 90,
    right: 40,
  },
});

export default MessagePage;
