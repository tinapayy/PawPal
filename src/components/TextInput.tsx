import React, {useState} from 'react';
import {View} from 'react-native';
import {TextInput} from 'react-native-paper';

import {FIREBASE_AUTH} from '../../firebase.config';

const MyComponent = () => {
  const [text, setText] = React.useState('');
  const auth = FIREBASE_AUTH;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  return (
    <View>
      <TextInput
        label="Email"
        value={email}
        onChangeText={text => setEmail(text)}
      />
      <TextInput
        label="Password"
        value={password}
        secureTextEntry={true}
        onChangeText={text => setPassword(text)}
      />
    </View>
  );
};

export default MyComponent;
