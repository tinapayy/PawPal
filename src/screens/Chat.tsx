import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Pressable,
  Text,
  ScrollView,
  TextInput,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import ImagePicker, {
  ImagePickerResponse,
  launchImageLibrary,
} from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native';
import { getDocs, collection, serverTimestamp, addDoc } from 'firebase/firestore';
import { FIREBASE_AUTH, FIREBASE_DB } from '../../firebase.config';
import * as icons from '../imports/icons/icons';
import { buttonMixin } from '../components/buttonMixin';
import { alignmentMixin } from '../components/alignmentMixin';
import constants from '../styles/constants';
import { chatMixins } from '../components/chatMixins';
interface ChatMessage {
  id: number;
  senderId: string;
  receiverId: string;
  senderName: string;
  senderPicture: any;
  message: string;
  time: string;
}

const Chat = ({ route }) => {
  const navigation = useNavigation();

  const auth = FIREBASE_AUTH;
  const db = FIREBASE_DB;

  const senderId = route.params?.senderId;
  const senderName = route.params?.senderName;
  const senderPicture = route.params?.senderPicture;

  const handleImagePress = () => {
    navigation.navigate('ClinicProfile');
  };

  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const fetchData = async () => {
    try {
      const chatSnapshot = await getDocs(collection(db, 'chat'));
      const chat: ChatMessage[] = [];
      for (const chatDoc of chatSnapshot.docs) {
        if (
          chatDoc.data().senderId === senderId ||
          chatDoc.data().receiverId === senderId
        ) {
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
                senderId: chatDoc.data().senderId,
                receiverId: chatDoc.data().receiverId,
                senderName: userDoc.data().name,
                senderPicture: userDoc.data().profilePicture
                  ? { uri: userDoc.data().profilePicture }
                  : require('../images/chat_icon.jpg'),
                message: chatDoc.data().message,
                time: chatDoc.data().time.toDate().toLocaleTimeString(),
              });
            }
          }
        }
      }
      setMessages(chat.sort((a, b) => a.time.localeCompare(b.time)));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const [selectedImage, setSelectedImage] = useState(null);
  const openImagePicker = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorMessage) {
        console.log('Image picker error: ', response.errorMessage);
      } else {
        let imageUri = response.uri || response.assets?.[0]?.uri;
        setSelectedImage(imageUri);
      }
    });
  };

  const [text, onChangeText] = useState('');

  const sendMessage = async () => {
    if (!text && !selectedImage) {
      return;
    }

    const chatDoc = {
      senderId: auth.currentUser?.uid,
      receiverId: senderId,
      message: text,
      time: serverTimestamp(),
    };
    const chatRef = await addDoc(collection(db, 'chat'), chatDoc);
    console.log('Document written with ID: ', chatRef.id);

    onChangeText('');
    setSelectedImage(null);
    fetchData();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <icons.MaterialIcons name="arrow-back" size={30} color="#FFF" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleImagePress}>
          <Image
            style={styles.avatar}
            source={
              senderPicture ? senderPicture : require('../images/chat_icon.jpg')
            }
          />
        </TouchableOpacity>
        <Text style={styles.headerText}>{senderName}</Text>
      </View>

      <FlatList
        inverted
        data={[...messages].reverse()}
        renderItem={({ item }) => (
          <View
            style={
              item.senderId === auth.currentUser?.uid
                ? [styles.messageWrapper, styles.outgoingMessageWrapper]
                : styles.messageWrapper
            }>
            <Text style={styles.timestamp}>{item.time}</Text>
            {item.senderId === auth.currentUser?.uid ? (
              <View
                style={[styles.messageBubble, styles.outgoingMessageBubble]}>
                <Text style={styles.messageText}>{item.message}</Text>
              </View>
            ) : (
              <View style={[styles.incomingMessageAvatarWrapper]}>
                <Image
                  style={styles.incomingMessageAvatar}
                  source={item.senderPicture}
                />
                <View
                  style={[styles.messageBubble, styles.incomingMessageBubble]}>
                  <Text style={styles.messageText}>{item.message}</Text>
                </View>
              </View>
            )}
          </View>
        )}
        keyExtractor={item => item.id}
      />

      <View style={styles.inputContainer}>
        <TouchableOpacity
          onPress={openImagePicker}
          style={styles.attachmentButton}>
          <icons.MaterialIcons name="attachment" size={30} color="#FFBA69" />
        </TouchableOpacity>

        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          placeholder="Type a message..."
          value={text}
          multiline={true}
        />
        <Pressable style={styles.sendButton} onPress={sendMessage}>
          <icons.MaterialIcons name="send" size={30} color="#FFBA69" />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backButton: {
    left: '10%',
    marginLeft: '2%',
    paddingRight: '5%',
  },
  header: {
    backgroundColor: constants.$octonaryColor,
    height: '10%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 50,

  },
  headerText: {
    fontSize: 20,
    marginLeft: 10,
    color: constants.$tertiaryColor,
    fontWeight: 'bold',
  },
  messageContainer: {
    backgroundColor: constants.$tertiaryColor,
  },
  // to be adjusted
  messageWrapper: {
    marginVertical: '2%',
    paddingHorizontal: '2%',
  },
  timestamp: {
    textAlign: 'center',
    fontSize: 12,
    width: '100%',
    color: constants.$septenaryColor,
    marginBottom: '2%',
  },
  messageBubble: {
    flex: 1,
    borderRadius: 20,
    paddingHorizontal: '2%',
    paddingVertical: '1%',
    maxWidth: '80%',
  },
  outgoingMessageWrapper: {
    alignItems: 'flex-end',
  },
  outgoingMessageBubble: {
    backgroundColor: constants.$tertiaryColor,
  },
  incomingMessageAvatarWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  // to be adjusted
  incomingMessageAvatar: {
    width: '5%',
    height: '10%',
    borderRadius: 50,
    marginRight: '2%',
  },
  incomingMessageWrapper: {
    alignItems: 'flex-start',
  },
  incomingMessageBubble: {
    backgroundColor: constants.$backgroundColor2,
    maxWidth: '60%',
  },
  messageText: {
    fontSize: 16,
  },
  messageImage: {
    width: 200,
    height: 200,
    borderRadius: 20,
    alignSelf: 'flex-end',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    bottom: '3%',
    backgroundColor: constants.$tertiaryColor,
  },
  attachmentButton: {
    margin: '2%',
  },
  attachmentIcon: {

  },
  input: {
    flex: 1,
    backgroundColor: constants.$backgroundColor2,
    padding: '2%',
    borderRadius: 20,
    fontSize: 16,
    width: '100%',
  },
  sendButton: {
    margin: '2%',
  },
  sendIcon: {
    // width: 30,
    // height: 30,
  },
});

export default Chat;
