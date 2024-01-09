import React, {useState} from 'react';
import {
  ScrollView,
  SafeAreaView,
  Alert,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Image,
} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faCommentDots,
  faCircleXmark,
} from '@fortawesome/free-solid-svg-icons';
import {useNavigation} from '@react-navigation/native';
import {
  FIREBASE_AUTH,
  FIREBASE_DB,
  FIREBASE_STORAGE,
} from '../../firebase.config';
import {doc, setDoc, serverTimestamp} from 'firebase/firestore';
import {ref, uploadBytes, getDownloadURL} from 'firebase/storage';
import {launchImageLibrary} from 'react-native-image-picker';

const CreatePost = () => {
  const navigation = useNavigation();

  const handleButton1Press = () => {
    uploadPost();
  };
  interface AppButtonProps {
    onPress: () => void;
    title: string;
    buttonStyle?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
  }
  const AppButton: React.FC<AppButtonProps> = ({
    onPress,
    title,
    buttonStyle,
    textStyle,
  }) => (
    <TouchableOpacity onPress={onPress} style={[buttonStyle]}>
      <Text style={[textStyle]}>{title}</Text>
    </TouchableOpacity>
  );

  const [isPressed, setIsPressed] = useState(false);
  const [isPressedIcon1, setIsPressedIcon1] = useState(false);

  const togglePressedState = () => {
    setIsPressed(!isPressed);
    setIsPressedIcon1(false);
  };

  const togglePressedStateIcon1 = () => {
    setIsPressedIcon1(!isPressedIcon1);
    setIsPressed(false);
  };

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

  const auth = FIREBASE_AUTH;
  const db = FIREBASE_DB;
  const storage = FIREBASE_STORAGE;

  const [postText, setPostText] = useState('');

  const uploadPost = async () => {
    if (!postText && !selectedImage) {
      Alert.alert('Please enter a message or upload a photo');
      return;
    }

    let post = {
      userId: auth.currentUser?.uid,
      postText: postText,
      postTime: serverTimestamp(),
      postPicture: '',
      isApproved: false,
    };
    if (selectedImage) {
      const storageRef = ref(
        storage,
        'postPicture/' + selectedImage.split('/').pop(),
      );
      const metadata = {
        contentType: 'image/jpeg',
      };
      const response = await fetch(selectedImage);
      const blob = await response.blob();
      await uploadBytes(storageRef, blob, metadata);
      const imageUrl = await getDownloadURL(storageRef);
      post.postPicture = imageUrl;
    }
    await setDoc(doc(db, 'forum', Date.now().toString()), post);
    navigation.navigate('home');
    Alert.alert('Posted successfully!');
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View
          style={{
            backgroundColor: 'white',
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              margin: 20,
            }}>
            <View
              style={{
                flexDirection: 'row',
                margin: 15,
                justifyContent: 'flex-start',
              }}>
              <FontAwesomeIcon
                icon={faCommentDots}
                size={25}
                style={{color: '#5a2828', top: 5}}
              />
              <Text
                style={{
                  color: '#5a2828',
                  fontSize: 25,
                  fontFamily: 'Poppins-Bold',
                  left: 10,
                }}>
                Create Post
              </Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('home')}>
              <FontAwesomeIcon
                icon={faCircleXmark}
                size={25}
                style={{color: '#cbcbcb', top: 20}}
              />
            </TouchableOpacity>
          </View>
          <View style={{}}>
            <Image
              source={require('../images/cutePug.png')}
              style={{right: '10%', position: 'absolute'}}
            />
          </View>
          <View
            style={{
              width: 350,
              height: 2,
              backgroundColor: '#5a2828',
              alignSelf: 'center',
              bottom: 25,
            }}
          />
          <Text
            style={{
              color: '#ff8700',
              fontSize: 20,
              fontFamily: 'Poppins-Medium',
              left: 20,
            }}>
            Message
          </Text>

          <View
            style={{
              backgroundColor: 'white',
              borderRadius: 20,
              borderColor: '#ff8d4d',
              padding: 10,
              borderWidth: 2,
              margin: 20,
            }}>
            <TextInput
              multiline={true}
              numberOfLines={5}
              onChangeText={text => setPostText(text)}
              placeholder="Write something here..."
              textAlignVertical="top"
              style={{
                color: '#5a2828',
                fontSize: 15,
                fontFamily: 'Poppins-Regular',
              }}></TextInput>
          </View>
          <Text
            style={{
              color: '#ff8700',
              fontSize: 20,
              fontFamily: 'Poppins-Medium',
              left: 20,
            }}>
            Upload Media
          </Text>

          <View style={{}}>
            <View
              style={{
                backgroundColor: '#dcdcdc',
                padding: 10,
                borderRadius: 30,
                margin: 20,
              }}>
              <Text style={{color: '#5a2828', fontSize: 13}}>
                {selectedImage?.split('/').pop() || 'No photo selected'}
              </Text>
            </View>
            <TouchableOpacity onPress={openImagePicker}>
              <View
                style={{
                  backgroundColor: 'white',
                  borderRadius: 30,
                  padding: 8,
                  margin: 150,
                  //flex: 1,
                  bottom: 210,
                  left: 130,
                  elevation: 3,
                  borderColor: '#ff8d4d',
                  borderWidth: 1,
                }}>
                <Text
                  style={{
                    color: '#ff8d4d',
                    fontFamily: 'Poppins-Regular',
                    fontSize: 15,
                    textAlign: 'center',
                    fontWeight: '100',
                  }}>
                  Upload
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => setSelectedImage('')}>

            <View>
              <FontAwesomeIcon
                icon={faCircleXmark}
                size={23}
                style={{color: 'grey', bottom: '1710%', left: '66%'}}

              />
            </View>
          </TouchableOpacity>
          <Text
            style={{
              color: 'lightgray',
              fontFamily: 'Poppins-Italic',
              fontSize: 13,
              left: 30,
              bottom: '49%',
            }}>
            Maximum upload file size : 100 MB
          </Text>
          <View style={{bottom: '57%'}}>

            <AppButton
              title="Post"
              onPress={handleButton1Press}
              buttonStyle={styles.btn1}
              textStyle={styles.bt1}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  btn1: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: '20%',
    margin: 70,
    padding: 10,
    borderRadius: 50,
    backgroundColor: '#ff8d4d',
  },
  bt1: {
    color: 'white',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    textAlign: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default CreatePost;