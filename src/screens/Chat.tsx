import React, {useState, useEffect} from 'react';
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
import {useNavigation} from '@react-navigation/native';
import {getDocs, collection, serverTimestamp, addDoc} from 'firebase/firestore';
import {FIREBASE_AUTH, FIREBASE_DB} from '../../firebase.config';
import * as icons from '../imports/icons/icons';
import {buttonMixin} from '../components/buttonMixin';
import {alignmentMixin} from '../components/alignmentMixin';
import constants from '../styles/constants';
import {chatMixins} from '../components/chatMixins';
interface ChatMessage {
  id: number;
  senderId: string;
  receiverId: string;
  senderName: string;
  senderPicture: any;
  message: string;
  date: string;
  time: string;
}

const Chat = ({route}) => {
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
                  ? {uri: userDoc.data().profilePicture}
                  : require('../images/chat_icon.jpg'),
                message: chatDoc.data().message,
                date: chatDoc.data().time.toDate(),
                time:
                  // chatDoc.data().time.toDate().toLocaleTimeString('en-US', {
                  //   hour: 'numeric',
                  //   minute: 'numeric',
                  //   second: 'numeric',
                  // }),
                  chatDoc.data().time.toDate().toLocaleDateString('en-US', {
                    timeZone: 'Asia/Manila',
                    hour: 'numeric',
                    minute: 'numeric',
                    second: 'numeric',
                  }),
              });
            }
          }
        }
      }
      // Sort chat by date of message
      chat.sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
      );
      setMessages(chat);
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
          <icons.MaterialIcons name="arrow-back" size={30} color= {constants.$tertiaryColor} />
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
        renderItem={({item}) => (
          <View
            style={
              item.senderId === auth.currentUser?.uid
                ? [styles.messageWrapper, styles.outgoingMessageWrapper]
                : styles.messageWrapper
            }>
            {/* Display timestamp if it is the first message or if the time difference is more than 5 minutes */}
            {messages.indexOf(item) === 0 ||
            new Date(item.date).getTime() -
              new Date(messages[messages.indexOf(item) - 1].date).getTime() >
              5 * 60 * 1000 ? (
              <Text style={styles.timestamp}>{item.time}</Text>
            ) : null}
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
        keyExtractor={item => item.id.toString()}
      />

      <View style={styles.inputContainer}>
        <TouchableOpacity
          onPress={openImagePicker}
          style={styles.attachmentButton}>
          <icons.MaterialIcons name="attachment" size={30} color={constants.$quaternaryColor} />
        </TouchableOpacity>

        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          placeholder="Type a message..."
          value={text}
          multiline={true}
        />
        <Pressable style={styles.sendButton} onPress={sendMessage}>
          <icons.MaterialIcons name="send" size={30} color={constants.$quaternaryColor} />
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
    backgroundColor: constants.$primaryColor,
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
    color: constants.$textColor1,
    marginBottom: '2%',
  },
  messageBubble: {
    flex: 1,
    borderRadius: 10,
    paddingHorizontal: '3%',
    paddingVertical: '1%',
    maxWidth: '70%',
    marginBottom:'5%',
  },
  outgoingMessageWrapper: {
    alignItems: 'flex-end',
  },
  outgoingMessageBubble: {
    backgroundColor: constants.$backgroundColor4,
  },
  incomingMessageAvatarWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  // to be adjusted
  incomingMessageAvatar: {
    width: '10%',
    height: '150%',
    borderRadius: 50,
    marginRight: '2%',
  },
  incomingMessageWrapper: {
    alignItems: 'flex-start',
  },
  incomingMessageBubble: {
    backgroundColor: constants.$backgroundColor2,
    borderRadius:30,
    maxWidth: '60%',
  },
  messageText: {
    fontSize: 15,
    fontFamily:constants.$fontFamilyRegular,
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
  attachmentIcon: {},
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
  },
});

export default Chat;
