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
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ImagePicker, {
  ImagePickerResponse,
  launchImageLibrary,
} from 'react-native-image-picker';
import {useNavigation} from '@react-navigation/native';
import {getDocs, collection, serverTimestamp, addDoc} from 'firebase/firestore';
import {FIREBASE_AUTH, FIREBASE_DB} from '../../firebase.config';

interface Chat {
  id: number;
  senderId: string;
  receiverId: string;
  senderName: string;
  senderPicture: any;
  message: string;
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

  const [messages, setMessages] = useState<Chat[]>([]);

  const fetchData = async () => {
    try {
      const chatSnapshot = await getDocs(collection(db, 'chat'));
      const chat: Chat[] = [];
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
          <MaterialIcons name="arrow-back" size={30} color="#FFF" />
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
        data={messages}
        renderItem={({item}) => (
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
          <MaterialIcons name="attachment" size={30} color="#FFBA69" />
        </TouchableOpacity>

        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          placeholder="Type a message..."
          value={text}
          multiline={true}
        />
        <Pressable style={styles.sendButton} onPress={sendMessage}>
          <MaterialIcons name="send" size={30} color="#FFBA69" />
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
    margin: 10,
  },
  header: {
    backgroundColor: '#FF8D4D',
    height: 100,
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
    color: '#FFF',
    fontWeight: 'bold',
  },
  messageContainer: {
    backgroundColor: '#FFF',
  },
  messageWrapper: {
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  timestamp: {
    textAlign: 'center',
    fontSize: 12,
    width: '100%',
    color: '#AAA',
    marginBottom: 10,
  },
  messageBubble: {
    flex: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 8,
    maxWidth: '80%',
  },
  outgoingMessageWrapper: {
    alignItems: 'flex-end',
  },
  outgoingMessageBubble: {
    backgroundColor: '#ECECEC',
  },
  incomingMessageAvatarWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  incomingMessageAvatar: {
    width: 30,
    height: 30,
    borderRadius: 50,
    marginRight: 10,
  },
  incomingMessageWrapper: {
    alignItems: 'flex-start',
  },
  incomingMessageBubble: {
    backgroundColor: 'rgba(255, 186, 105, 0.28)',
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
    backgroundColor: '#FFF',
  },
  attachmentButton: {
    margin: 10,
  },
  attachmentIcon: {
    width: 30,
    height: 30,
  },
  input: {
    flex: 1,
    backgroundColor: 'rgba(255, 186, 105, 0.28)',
    padding: 10,
    borderRadius: 20,
    fontSize: 16,
    width: '100%',
  },
  sendButton: {
    margin: 10,
  },
  sendIcon: {
    width: 30,
    height: 30,
  },
});

export default Chat;
