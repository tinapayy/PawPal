import React, {useState} from 'react';
import {Alert, TouchableOpacity, Pressable, View, StyleSheet, Image, Text, TextInput , SafeAreaView, Keyboard, ScrollView, Platform, KeyboardAvoidingView, TouchableWithoutFeedback} from 'react-native';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import {FIREBASE_AUTH} from '../../FirebaseConfig';
import MyComponent from '../components/SegmentedButton';
import SwitchButton from '../components/SwtichButton';


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
      <SafeAreaView style={styles.container}>
    <View style = {{padding: 0, flex: 1}}>
      <View style={styles.container1}>
        <Image
          source={require('../images/catBg.png')}
          style={styles.image}
        />
      </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
      <View style = {{
          backgroundColor: 'white',  
          borderTopStartRadius:50, 
          borderTopEndRadius:50,
          top: 305,
          height: 1000,
          elevation: 20,
          }}>
      <SwitchButton/>
      <View style={styles.signInForm}>
          <Text style={styles.header}>Sign In</Text>
          <View style={styles.inputs}>
          <TextInput
            style={styles.input}
              placeholder="Email"
              value={email}
              underlineColorAndroid='orange'
              onChangeText={text => setEmail(text)}
          />
          <TextInput
            style = {styles.input}
            placeholder="Password"
            value={password}
            secureTextEntry={true}
            underlineColorAndroid='orange'
            onChangeText={text => setPassword(text)}
          />
          </View>
          <View style={styles.btnContainer}>
          <Pressable 
                  style={({ pressed }) => [
                  styles.button,
                  {
                  backgroundColor: pressed ? '#FF6464' : '#FFAC4E', // Change color when pressed
                  },
                  ]}
                  onPress={signIn}>
                <Text style={styles.text}>Login</Text>
          </Pressable>
          </View>
        </View>
        </View>
        </ScrollView>
      </SafeAreaView>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'orange',
      
    },
    container1: {
      backgroundColor: 'orange'
    },
    container2:{
      height: 1000,
      bottom: 330,
      backgroundColor: 'white',
      borderTopLeftRadius: 60,
      borderTopRightRadius: 60,
      paddingVertical: 50,
      paddingHorizontal: 30,
      elevation: 15,
    },
    signInForm:{
      height: 600,
      top: -55
    },
    image: {
      width: '100%',
      resizeMode: 'contain',
      bottom: 130,
      zIndex: -1
    },
    inputs: {
      alignItems: 'center',
      height: 100,
      top: -300,
      width: "80%",
      alignSelf:'center'
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
      fontFamily: 'Poppins-SemiBold'
    },
    button:{
      alignSelf: 'center',
      justifyContent: 'center',
      paddingVertical: 8,
      borderRadius: 25,
      elevation: 3,
      backgroundColor:"#FFAC4E",
      width:340,
      top: -140
    },
    header: {
      position: 'absolute',
      alignContent:'flex-end',
      zIndex: 1,
      fontSize: 50,
      fontFamily: 'Poppins-SemiBold',
      color: '#5A2828',
      top: -323,
      left: 40
    },
  });
  
  export default SignIn;