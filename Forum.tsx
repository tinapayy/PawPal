import React, {useState} from 'react';
import {Alert, Button, TextInput, View} from 'react-native';
import {collection, addDoc} from 'firebase/firestore';
import {FIREBASE_DB} from './FirebaseConfig';

const Forum = () => {
  const [text, setText] = useState('');

  function Post(text: string) {
    addDoc(collection(FIREBASE_DB, 'forum'), {
      post: text,
    })
      .then(() => {
        Alert.alert('Document successfully written!');
      })
      .catch(error => {
        Alert.alert('Error writing document: ', error);
      });
  }

  return (
    <View>
      <TextInput
        placeholder="Type your post here"
        value={text}
        onChangeText={text => setText(text)}
      />
      <Button title="Post" onPress={() => Post(text)} />
    </View>
  );
};

export default Forum;
