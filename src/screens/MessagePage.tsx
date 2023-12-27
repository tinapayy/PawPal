/* eslint-disable prettier/prettier */
import React from 'react';
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
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCirclePlus, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigation } from '@react-navigation/native';

const Messages = [
  {
    id: '1',
    userName: 'Cornerstone Animal Hospital',
    userImage: require('../images/user1.jpg'),
    messageTime: '10:00 AM',
    messageText:
      'Hello, Good morning! I would like to set an appointment for my dog today.',
    // messageStatus: 'read',
    // messageCount: 2,
    // isOnline: true,
  },
  {
    id: '2',
    userName: 'Labrod Veterinary Clinic',
    userImage: require('../images/user2.jpg'),
    messageTime: '2 hr',
    messageText: 'Please visit the clinic based on your time scheduled.',
    // messageStatus: 'unread',
  },
  {
    id: '3',
    userName: 'Lala land Veterinary Clinic',
    userImage: require('../images/user3.jpg'),
    messageTime: 'Nov 3',
    messageText: 'Thank you for visiting our clinic today.',
    // messageStatus: 'unread',
  },
  {
    id: '4',
    userName: 'Pet Express',
    userImage: require('../images/user4.jpg'),
    messageTime: 'Nov 1',
    messageText: 'Thank you for visiting our store today.',
    // messageStatus: 'unread',
  },
  {
    id: '5',
    userName: 'Pet Expresso',
    userImage: require('../images/user5.jpg'),
    messageTime: 'Sep 30',
    messageText: 'Thank you for visiting our store today.',
    // messageStatus: 'unread',
  },
  {
    id: '6',
    userName: 'Pet ExpressPadala',
    userImage: require('../images/user5.jpg'),
    messageTime: 'Sep 30',
    messageText: 'Thank you for visiting our store today.',
    // messageStatus: 'unread',
  },
  {
    id: '7',
    userName: 'Pet ExpressoCoffee',
    userImage: require('../images/user5.jpg'),
    messageTime: 'Sep 30',
    messageText: 'Thank you for visiting our store today.',
    // messageStatus: 'unread',
  },
  {
    id: '8',
    userName: 'Pet ExpressoSOSO',
    userImage: require('../images/user5.jpg'),
    messageTime: 'Sep 30',
    messageText: 'Thank you for visiting our store today.',
    // messageStatus: 'unread',
  },
];
const MessagePage = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.containerHeader}> 
      <ImageBackground
        source={require('../images/messagePage_bg.png')}
        style={{ width: '100%', height: '100%' }}
      >
        <View style={styles.back}>
          <TouchableOpacity>
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
            data={Messages}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Card style={styles.cardContainer}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Chat', { userId: item.id })}
                >
                <UserInfo>
                  <UserImgWrapper>
                    <UserImg source={item.userImage} />
                  </UserImgWrapper>
                  <TextSection>
                    <UserInfoText>
                      <UserName>{item.userName}</UserName>
                      <PostTime>{item.messageTime}</PostTime>
                    </UserInfoText>
                    <MessageText>{item.messageText}</MessageText>
                  </TextSection>
                </UserInfo>
                </TouchableOpacity>
              </Card>
            )}
          />
        </Container>
        <View style={styles.addIcon}>
          <TouchableHighlight  onPress={() => navigation.navigate("NewMessage")}>
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
    // borderRadius: 80,
  },
  containerHeader: {
    flex: 1,
    // backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  back: {
    flexDirection: 'row',
    // marginBottom: 40,
    // top: 90,
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
    // marginTop: 20,
    top: 170,
    left: 30,
    marginBottom: 40,
  },
  cardContainer: {
    width: '90%',
    // marginTop: 20,
  },
  addIcon: {
    position: 'absolute',
    bottom: 90,
    right: 40,
  },
});

export default MessagePage;
