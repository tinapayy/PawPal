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
import { TextInputContentSizeChangeEventData } from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {getDocs, collection, serverTimestamp, addDoc} from 'firebase/firestore';
import {ref, uploadBytes, getDownloadURL} from 'firebase/storage';
import {
  FIREBASE_AUTH,
  FIREBASE_DB,
  FIREBASE_STORAGE,
} from '../../firebase.config';
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
  chatPicture?: any;
  date: string;
  time: string;
  isSent: boolean;
}

const Chat = ({route}) => {
  const navigation = useNavigation();

  const auth = FIREBASE_AUTH;
  const db = FIREBASE_DB;
  const storage = FIREBASE_STORAGE;

  const senderId = route.params?.senderId;
  const senderName = route.params?.senderName;
  const senderPicture = route.params?.senderPicture;

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
                chatPicture: chatDoc.data().chatPicture
                  ? {uri: chatDoc.data().chatPicture}
                  : null,
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
                  }),
                isSent: true,
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
      chatPicture: '',
      time: serverTimestamp(),
    };

    setMessages([
      ...messages,
      {
        id: messages.length + 1,
        senderId: auth.currentUser?.uid,
        receiverId: senderId,
        senderName: auth.currentUser?.displayName,
        senderPicture: auth.currentUser?.photoURL
          ? {uri: auth.currentUser?.photoURL}
          : require('../images/chat_icon.jpg'),
        message: text,
        chatPicture: selectedImage ? {uri: selectedImage} : null,
        date: new Date(),
        time: new Date().toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric',
        }),
        isSent: false,
      },
    ]);

    if (selectedImage) {
      const storageRef = ref(
        storage,
        'chatPicture/' + selectedImage.split('/').pop(),
      );
      const metadata = {
        contentType: 'image/jpeg',
      };
      const response = await fetch(selectedImage);
      const blob = await response.blob();
      await uploadBytes(storageRef, blob, metadata);
      const imageUrl = await getDownloadURL(storageRef);
      chatDoc.chatPicture = imageUrl;
    }

    onChangeText('');
    setSelectedImage(null);

    const chatRef = await addDoc(collection(db, 'chat'), chatDoc);
    console.log('Document written with ID: ', chatRef.id);

    fetchData();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <icons.MaterialIcons
            name="arrow-back"
            size={30}
            color={constants.$tertiaryColor}
          />
        </TouchableOpacity>
        <Image
          style={styles.avatar}
          source={
            senderPicture
              ? senderPicture
              : require('../images/chat_icon.jpg')
          }
        />
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
            }
          >
            {/* Display timestamp if it is the first message or if the time difference is more than 5 minutes */}
            {messages.indexOf(item) === 0 ||
              new Date(item.date).getTime() -
              new Date(
                messages[messages.indexOf(item) - 1].date
              ).getTime() >
              5 * 60 * 1000 ? (
              <Text style={styles.timestamp}>
                {new Date(item.date).toLocaleDateString('en-US', {
                  timeZone: 'Asia/Manila',
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                  hour: 'numeric',
                  minute: 'numeric',
                })}
              </Text>
            ) : null}
            {item.senderId === auth.currentUser?.uid ? (
              <View
                style={[styles.messageBubble, styles.outgoingMessageBubble,
                  {flexDirection:'row', right:'2%', alignSelf:'flex-end' }
                ]} 
              >
                <Text style={styles.messageText}>{item.message}</Text>
                {item.chatPicture ? (
                  <Image
                    style={[
                      styles.messageImage,
                      item.isSent && { backgroundColor: 'transparent' },
                    ]}
                    source={item.chatPicture}
                  />
                ) : null}

                {/* Display time icon if message is not yet sent */}
                {!item.isSent ? (
                  <icons.MaterialIcons
                    style={{ alignSelf: 'flex-end', top:'-2%', right:'-5%' }}
                    name="access-time"
                    size={15}
                    color={constants.$quaternaryColor}
                  />
                ) : null}
              </View>
            ) : (
              <View style={[styles.incomingMessageAvatarWrapper]}>
                {messages.indexOf(item) === messages.length - 1 ||
                  new Date(
                    messages[messages.indexOf(item) + 1].date
                  ).getTime() -
                  new Date(item.date).getTime() >
                  5 * 60 * 1000 ||
                  messages[messages.indexOf(item) + 1].senderId !==
                  item.senderId ? (
                  <Image
                    style={styles.incomingMessageAvatar}
                    source={item.senderPicture}
                  />
                ) : (
                  <View style={{ width: '12%' }}></View>
                )}
                <View
                  style={[
                    styles.messageBubble,
                    styles.incomingMessageBubble,
                  ]}
                >
                  <Text style={styles.messageText}>{item.message}</Text>
                  {item.chatPicture ? (
                    <Image
                      style={[
                        styles.messageImage,
                        item.isSent && { backgroundColor: 'transparent' },
                      ]}
                      source={item.chatPicture}
                    />
                  ) : null}
                </View>
              </View>
            )}
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />

      <View style={styles.inputContainer}>
        <TouchableOpacity
          onPress={openImagePicker}
          style={styles.attachmentButton}
        >
          <icons.MaterialIcons
            name="attachment"
            size={30}
            color={constants.$quaternaryColor}
          />
        </TouchableOpacity>
        <View style={styles.textInputContainer}>
          {selectedImage ? (
            <View style={styles.selectedImageContainer}>
              <Image
                source={{ uri: selectedImage }}
                style={styles.selectedImage}
              />
              <TouchableOpacity
                style={styles.closeIconContainer}
                onPress={() => setSelectedImage(null)}
              >
                <icons.MaterialIcons
                  name="close"
                  size={20}
                  color={constants.$textColor1}
                  style={styles.closeIcon}
                />
              </TouchableOpacity>
            </View>
          ) : null}
          <TextInput
            style={[
              styles.input,
              selectedImage && { paddingTop: 50 },
            ]}
            onChangeText={onChangeText}
            placeholder="Type a message..."
            value={text}
            multiline={true}
            onContentSizeChange={(
              event: TextInputContentSizeChangeEventData,
            ) => {
              if (event.nativeEvent.contentSize.height < 100) {
                event.nativeEvent.contentSize.height = 100;
              }
            }
            }
          />
        </View>
        <Pressable style={styles.sendButton} onPress={sendMessage}>
          <icons.MaterialIcons
            name="send"
            size={30}
            color={constants.$quaternaryColor}
          />
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
    minHeight: 76,
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
  // time message sent
  timestamp: {
    textAlign: 'center',
    fontSize: 12,
    width: '100%',
    color: constants.$textColor1,
    marginBottom: '2%',
  },
  // message bubble container
  messageBubble: {
    // flex: 1,
    borderRadius: 10,
    paddingHorizontal: '5%',
    paddingVertical: '3%',
    maxWidth: '80%',
    marginBottom: '0.8%',
  },
  outgoingMessageWrapper: {
    alignItems: 'flex-end',
    // marginBottom:'2%',
  },
  outgoingMessageBubble: {
    backgroundColor: constants.$backgroundColor4,
  },

  incomingMessageAvatarWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  // incoming message avatar

  incomingMessageAvatar: {
    width: 40,
    height: 40,
    borderRadius: 50,
    // marginRight: '2%',
  },
  incomingMessageWrapper: {
    alignItems: 'flex-start',
    // width:'90%',
  },
  //messages received
  incomingMessageBubble: {
    backgroundColor: constants.$backgroundColor2,
    // borderRadius: 10,
    // paddingHorizontal: '3%',
    // paddingVertical: '1%',
    marginBottom: '-0.8%',
    alignSelf: 'flex-start',
  },
  messageText: {
    fontSize: 15,
    // left:'3%',
    fontFamily: constants.$fontFamilyRegular,
  },
  messageImage: {
    width: 200,
    height: 200,
    borderRadius: 20,
    alignSelf: 'flex-end',
    backgroundColor:'transparent',
  },
  //typing of message
  inputContainer: {
    marginTop: '4%',
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
  sendIcon: {},
  textInputContainer:{
    flexDirection: 'row',
    position:'relative',
    width:'79%',
  },
  selectedImageContainer: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    paddingLeft: 10,
  },
  selectedImage: {
    width: 60,
    height: 40,
    borderRadius: 10,
    alignItems:'center',
    top:'15%',
    // marginRight: 5,
  },
  closeIcon: {
    marginLeft: 1,
  },
  closeIconContainer:{
    position: 'relative',
    zIndex:5,
    top: '-2%',
    right: '45%',
    backgroundColor: 'rgba(220, 150, 100, 0.5)',
    borderRadius: 50,
    padding: '2%',

  },
});

export default Chat;
