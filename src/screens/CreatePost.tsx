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
import * as icons from '../imports/icons/icons';
import {
  FIREBASE_AUTH,
  FIREBASE_DB,
  FIREBASE_STORAGE,
} from '../../firebase.config';
import {doc, setDoc, serverTimestamp} from 'firebase/firestore';
import {ref, uploadBytes, getDownloadURL} from 'firebase/storage';
import {launchImageLibrary} from 'react-native-image-picker';
import constants from '../styles/constants';
import {useNavigateTo} from '../components/navigation';
import {useNavigation} from '@react-navigation/native';
import CustomAlert from '../components/CustomAlert';
import { black } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';

const CreatePost = () => {
  const navigation = useNavigation();
  const NavHome = useNavigateTo('Home');

  const handleButton1Press = () => {
    uploadPost();
  };

  const [showAlert, setShowAlert] = useState({
    visible: false,
    title: '',
    message: '',
  });
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

  const [selectedImage, setSelectedImage] = useState(null);
  const MAX_MESSAGE_LENGTH = 200;

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
      setShowAlert({
        visible: true,
        title: 'Empty Post',
        message: 'Please enter a message or upload a photo.',
      });
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
    setShowAlert({
      visible: true,
      title: 'Post Uploaded',
      message:
        'The post has been uploaded successfully to the admin. Wait for approval.',
    });
    setPostText('');
    setSelectedImage(null);
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View
          style={{
            backgroundColor: constants.$backgroundColor,
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height,
            // backgroundColor: 'black',
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              // backgroundColor: 'black',
              margin: 20,
            }}>
            <View
              style={{
                flexDirection: 'row',
                margin: 15,
                justifyContent: 'flex-start',
                
              }}>
              <FontAwesomeIcon
                icon={icons.faCommentDots}
                size={25}
                style={{color: constants.$secondaryColor, top: 5}}
              />
              <Text
                style={{
                  color: constants.$secondaryColor,
                  fontSize: 25,
                  fontFamily: constants.$fontFamilyBold,
                  left: 10,
                }}>
                Create Post
              </Text>
            </View>
            <TouchableOpacity onPress={NavHome}>
              <FontAwesomeIcon
                icon={icons.faCircleXmark}
                size={25}
                style={{color: '#cbcbcb', top: 20 }}
              />
            </TouchableOpacity>
          </View>
          <View style={{top: '9%'}}>
            <Image
              source={require('../images/cutePug.png')}
              style={{right: '10%', position: 'absolute',}}
            />
          </View>
          <View
            style={{
              width: 350,
              height: 2,
              backgroundColor: constants.$secondaryColor,
              alignSelf: 'center',
              bottom: 25,     
            }}
          />
          <Text
            style={{
              color: constants.$senaryColor,
              fontSize: 20,
              fontFamily: 'Poppins-Medium',
              left: 20,
            }}>
            Message
          </Text>

          <View
            style={{
              backgroundColor: constants.$textColor2,
              borderRadius: 20,
              borderColor: constants.$senaryColor,
              padding: 10,
              borderWidth: 2,
              margin: 20,
            }}>
            <TextInput
              multiline={true}
              numberOfLines={5}
              value={postText}
              onChangeText={text => setPostText(text)}
              maxLength={200}
              placeholder="Write something here..."
              textAlignVertical="top"
              style={{
                color: constants.$secondaryColor,
                fontSize: 15,
                fontFamily: constants.$fontFamily,
              }}></TextInput>
            {/* <Text>{postText.length}/200</Text> */}
            <Text
              style={{
                color: constants.$senaryColor,
                fontSize: 13,
                fontFamily: 'Poppins-Medium',
                alignSelf: 'flex-end',
              }}>
              {postText.length} /{MAX_MESSAGE_LENGTH}
            </Text>
          </View>
          <Text
            style={{
              color: constants.$senaryColor,
              fontSize: 20,
              fontFamily: constants.$fontFamilyMedium,
              left: 20,
              top:'2%',
              
            }}>
            Upload Media
          </Text>

          <View style={{}}>
            <View
              style={{
                backgroundColor: constants.$nonaryColor,
                padding: 10,
                paddingHorizontal:30,
                borderRadius: 30,
                margin: 20,
                top:'12%',
                
                
              }}>
              <Text style={{color: constants.$secondaryColor, fontSize: 13}}>
                {selectedImage
                  ? (selectedImage.split('/')?.pop()?.substring(0, 30) || '') +
                    (selectedImage?.length > 30 ? '...' : '')
                  : 'No photo selected'}
              </Text>
            </View>
            <TouchableOpacity onPress={openImagePicker} style={{ alignSelf: 'center' }}>
              <View
                style={{
                  backgroundColor: 'white',
                  borderRadius: 30,
                  paddingHorizontal: 20,  
                  paddingVertical: 5,    
                  elevation: 3,
                  borderColor: constants.$senaryColor,
                  borderWidth: 2,
                  bottom:'115%',
                  left:'33%',
                }}>
                <Text
                  style={{
                    color: constants.$senaryColor,
                    fontFamily: constants.$fontFamily,
                    fontSize: 15,
                    textAlign: 'center',
                    fontWeight: '100',
                  }}>
                  Upload
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => setSelectedImage('')} style={{ position: 'relative', bottom: '9%', right: '30%', alignSelf:'flex-end' }}>
            <FontAwesomeIcon
              icon={icons.faCircleXmark}
              size={23}
              style={{ color: 'grey' }}
            />
          </TouchableOpacity>
          <Text
            style={{
              color: constants.$textColor1,
              fontFamily: 'Poppins-Italic',
              fontSize: 13,
              left: 30,
              bottom: '7%',
              // paddingBottom:'10%',
              
            }}>
            Maximum upload file size : 100 MB
          </Text>
          <View style={{ bottom: '10%' }}>
            <AppButton
              title="Post"
              onPress={handleButton1Press}
              buttonStyle={styles.btn1}
              textStyle={styles.bt1}
            />
          </View>
        </View>
      </ScrollView>
      <CustomAlert
        visible={showAlert.visible} // Pass the state to control visibility
        title={showAlert.title} // Pass the title from showAlert
        message={showAlert.message} // Pass the message from showAlert
        onClose={() => {
          setShowAlert({visible: false, title: '', message: ''});
          navigation.navigate('Home');
        }} // Close the alert on button press
      />
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
