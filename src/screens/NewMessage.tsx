import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  Alert,
  StyleProp,
  ViewStyle,
  TextStyle,
  Switch,
  FlatList,
} from 'react-native';
import {
  View,
  Text,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Image,
} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import * as icons from '../imports/icons/icons';
import {useNavigation} from '@react-navigation/native';
import {getDocs, collection} from 'firebase/firestore';
import {FIREBASE_AUTH, FIREBASE_DB} from '../../firebase.config';
import {buttonMixin} from '../components/buttonMixin';
import {alignmentMixin} from '../components/alignmentMixin';
import constants from '../styles/constants';
import {chatMixins} from '../components/chatMixins';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

interface User {
  id: number;
  userId: string;
  userType: string;
  name: string;
  picture: any;
}

const NewMessage = () => {
  const navigation = useNavigation();

  const auth = FIREBASE_AUTH;
  const db = FIREBASE_DB;

  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);

  const fetchData = async () => {
    try {
      const userSnapshot = await getDocs(collection(db, 'user'));
      const users: User[] = [];
      for (const userDoc of userSnapshot.docs) {
        if (userDoc.data().userId === auth.currentUser?.uid) {
          continue;
        }
        users.push({
          id: users.length + 1,
          userId: userDoc.data().userId,
          userType: userDoc.data().userType,
          name: userDoc.data().name,
          picture: userDoc.data().profilePicture
            ? {uri: userDoc.data().profilePicture}
            : require('../images/chat_icon.jpg'),
        });
      }
      users.sort((a, b) => (a.userType > b.userType ? 1 : -1));
      setUsers(users);
    } catch (error) {
      console.error('Error fetching users: ', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filterUsers = (search: string) => {
    const filteredUsers = users.filter(user =>
      user.name.toLowerCase().includes(search.toLowerCase()),
    );
    setFilteredUsers(filteredUsers);
  };

  return (
    <SafeAreaView>
      <GestureHandlerRootView>
        <View
          style={{
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height,
          }}>
          <ImageBackground
            source={require('../images/header.png')}
            style={{width: '100%', height: '50%'}}>
            <View style={{flexDirection: 'row', margin: 30}}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <FontAwesomeIcon
                  icon={icons.faArrowLeft}
                  size={25}
                  color={constants.$tertiaryColor}
                  style={{
                    color: constants.$secondaryColor,
                    left: '2%',
                    top: '3%',
                  }}
                />
              </TouchableOpacity>
              <Text
                style={{
                  color: constants.$tertiaryColor,
                  fontFamily: constants.$fontFamilySemiBold,
                  fontSize: 24,
                  left: '25%',
                  top: '-1%',
                  // color:constants.$tertiaryColor,
                }}>
                New Message
              </Text>
            </View>

            <View
              style={{
                backgroundColor: constants.$tertiaryColor,
                borderRadius: 20,
                borderColor: constants.$primaryColor,
                elevation: 2,
                width: '80%',
                alignSelf: 'center',
                top: '5%',
              }}>
              <TextInput
                style={{
                  fontSize: 15,
                  color: constants.$primaryColor,
                  fontFamily: constants.$fontFamilyExtraLight,
                  left: '5%',
                }}
                placeholder="Search"
                onChangeText={text => filterUsers(text)}
              />
            </View>

            <Text
              style={{
                color: constants.$secondaryColor,
                fontFamily: constants.$fontFamilySemiBold,
                fontSize: 20,
                top: '15%',
                left: '7%',
              }}>
              Suggested
            </Text>

            <FlatList
              style={{top: '20%', left: '7%', width: '86%'}}
              data={filteredUsers.length > 0 ? filteredUsers : users}
              renderItem={({item}) => (
                <View>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('Chat', {
                        senderId: item.userId,
                        senderName: item.name,
                        senderPicture: item.picture,
                      })
                    }>
                    <View style={{flexDirection: 'row', marginBottom: '5%'}}>
                      <Image
                        source={item.picture}
                        style={{height: 50, width: 50, borderRadius: 50}}
                      />
                      <Text
                        style={{
                          color: constants.$secondaryColor,
                          fontFamily: constants.$fontFamilyRegular,
                          fontSize: 15,
                          top: '2%',
                          left: '20%',
                        }}>
                        {item.name}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              )}
              keyExtractor={item => item.id}
            />
          </ImageBackground>
        </View>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
};

export default NewMessage;
