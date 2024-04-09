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

interface Chat {
  id: number;
  senderId: string;
  senderName: number;
  senderPicture: any;
  message: string;
  date: string;
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
          if (
            (userDoc.data().userId === chatDoc.data().senderId &&
              auth.currentUser?.uid === chatDoc.data().receiverId) ||
            (userDoc.data().userId === chatDoc.data().receiverId &&
              auth.currentUser?.uid === chatDoc.data().senderId)
          ) {
            chat.push({
              id: chat.length + 1,
              senderId:
                chatDoc.data().senderId === auth.currentUser?.uid
                  ? chatDoc.data().receiverId
                  : chatDoc.data().senderId,
              senderName: userDoc.data().name,
              senderPicture: {
                uri: userDoc.data().profilePicture,
              },
              message:
                chatDoc.data().senderId === auth.currentUser?.uid
                  ? 'You: ' + chatDoc.data().message
                  : chatDoc.data().message,
              date: chatDoc.data().time.toDate(),
              time: getTimeDifference(chatDoc.data().time),
            });
          }
        }
      }
      // Sort chat by date of message
      chat.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      );
      // Remove duplicate senderId
      const uniqueChat = chat.filter(
        (v, i, a) => a.findIndex(t => t.senderId === v.senderId) === i,
      );
      setMessages(uniqueChat);
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
          <TouchableOpacity onPress={() => navigation.goBack()}>
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
                      senderId: item.senderId,
                      senderName: item.senderName,
                      senderPicture: item.senderPicture,
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
