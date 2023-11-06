import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Pressable,
  Text,
  ScrollView,
  TextInput,
  Image,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Chat = () => {
  const [text, onChangeText] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={30} color="#FFF" />
        </Pressable>
        <Image
          style={styles.avatar}
          source={{uri: 'https://reactnative.dev/img/tiny_logo.png'}}
        />
        <Text style={styles.headerText}>Labrod Veterinary Clinic</Text>
      </View>

      <ScrollView style={styles.messageContainer}>
        <View style={[styles.messageWrapper, styles.outgoingMessageWrapper]}>
          <Text style={styles.timestamp}>10:45 AM</Text>
          <View style={[styles.messageBubble, styles.outgoingMessageBubble]}>
            <Text style={styles.messageText}>
              Hi Doc, I would like to schedule an urgent appointment
            </Text>
          </View>
        </View>

        <View style={[styles.messageWrapper, styles.incomingMessageWrapper]}>
          <Text style={styles.timestamp}>10:47 AM</Text>
          <View style={[styles.incomingMessageAvatarWrapper]}>
            <Image
              style={styles.incomingMessageAvatar}
              source={{uri: 'https://reactnative.dev/img/tiny_logo.png'}}
            />
            <View style={[styles.messageBubble, styles.incomingMessageBubble]}>
              <Text style={styles.messageText}>
                Please visit the clinic based on your time schedule. Keep safe!
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.messageWrapper}>
          <Text style={styles.timestamp}>10:47 AM</Text>
          <Image
            style={styles.messageImage}
            source={{uri: 'https://reactnative.dev/img/tiny_logo.png'}}
          />
        </View>
      </ScrollView>

      <View style={styles.inputContainer}>
        <Pressable style={styles.attachmentButton}>
          <MaterialIcons name="attachment" size={30} color="#FFBA69" />
        </Pressable>
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          placeholder="Type a message..."
          value={text}
          multiline={true}
        />
        <Pressable style={styles.sendButton}>
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
