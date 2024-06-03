import React, {useState} from 'react';
import {
  Alert,
  Pressable,
  View,
  StyleSheet,
  Text,
  TextInput,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from 'react-native';
import {signInWithEmailAndPassword} from 'firebase/auth';
import {FIREBASE_AUTH} from '../../firebase.config';
import SwitchButton from './SwitchButton';

const SignIn = () => {
  const auth = FIREBASE_AUTH;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

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
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container2}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <View style={styles.signInForm}>
            <Text style={styles.header}>Sign In</Text>
            <SwitchButton />
            <View style={styles.inputs}>
              <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                underlineColorAndroid="orange"
                onChangeText={text => setEmail(text)}
              />
              <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                secureTextEntry={true}
                underlineColorAndroid="orange"
                onChangeText={text => setPassword(text)}
              />
            </View>
            <View style={styles.btnContainer}>
              <Pressable
                style={({pressed}) => [
                  styles.button,
                  {
                    backgroundColor: pressed ? '#FF6464' : '#FFAC4E',
                  },
                ]}
                onPress={signIn}>
                <Text style={styles.text}>Login</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'orange',
  },
  container1: {
    backgroundColor: 'orange',
  },
  container2: {
    height: 700,
    bottom: 330,
    backgroundColor: 'white',
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
    paddingVertical: 50,
    paddingHorizontal: 30,
    elevation: 15,
  },
  signInForm: {
    height: 400,
  },
  image: {
    width: '100%',
    resizeMode: 'contain',
    bottom: 130,
    zIndex: -1,
  },
  inputs: {
    alignItems: 'center',
    height: 100,
  },
  btnContainer: {
    top: 100,
    alignSelf: 'center',
  },
  signInText: {
    fontSize: 20,
    marginBottom: 10,
  },
  input: {
    width: '100%',
    top: 200,
    height: 40,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderRadius: 5,
    marginBottom: 30,
    paddingHorizontal: 10,
    borderColor: 'transparent',
    borderBottomColor: 'orange',
  },
  text: {
    fontSize: 18,
    letterSpacing: 0.25,
    color: 'white',
    alignSelf: 'center',
    fontFamily: 'Poppins-SemiBold',
  },
  button: {
    alignSelf: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 25,
    elevation: 3,
    backgroundColor: '#FFAC4E',
    width: 340,
    top: 140,
  },
  header: {
    position: 'absolute',
    alignContent: 'flex-end',
    zIndex: 1,
    fontSize: 50,
    fontFamily: 'Poppins-SemiBold',
    color: '#5A2828',
    top: -15,
  },
});

export default SignIn;
