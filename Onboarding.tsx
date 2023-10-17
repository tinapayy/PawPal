import React, {useState} from 'react';
import {Alert, Button, TextInput, View} from 'react-native';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import {FIREBASE_AUTH} from './FirebaseConfig';

const Onboarding = () => {
  const auth = FIREBASE_AUTH;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const signUp = async () => {
    setLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      console.log(response);
      Alert.alert('User created successfully');
    } catch (error: any) {
      console.error(error);
      Alert.alert(error.message);
    }
    setLoading(false);
  };

  const signIn = async () => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log(response);
      Alert.alert('Logged in successfully');
    } catch (error: any) {
      console.error(error);
      Alert.alert(error.message);
    }
    setLoading(false);
  };

  return (
    <View>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={text => setEmail(text)}
      />
      <TextInput
        placeholder="Password"
        value={password}
        secureTextEntry={true}
        onChangeText={text => setPassword(text)}
      />
      <Button title="Sign Up" onPress={signUp} />
      <Button title="Sign In" onPress={signIn} />
    </View>
  );
};

export default Onboarding;
