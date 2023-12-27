import React, {useState, useRef} from 'react';
import { ScrollView, SafeAreaView, Alert, StyleProp, ViewStyle, TextStyle, Switch } from 'react-native';
import { View, Text, Dimensions, ImageBackground, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { Image } from 'react-native-elements';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCommentDots } from '@fortawesome/free-solid-svg-icons';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import { faVideo } from '@fortawesome/free-solid-svg-icons';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native';

const CreatePost = () => {
    const navigation = useNavigation();

    const handleButton1Press = () => {
        Alert.alert('Posted successfully!');
      };
    interface AppButtonProps {
    onPress: () => void;
    title: string;
    buttonStyle?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
  }
  const AppButton: React.FC<AppButtonProps> = ({ onPress, title, buttonStyle, textStyle }) => (
    <TouchableOpacity onPress={onPress} style={[buttonStyle]}>
      <Text style={[textStyle]}>{title}</Text>
    </TouchableOpacity>
  );

  const [isPressed, setIsPressed] = useState(false);
  const [isPressedIcon1, setIsPressedIcon1] = useState(false);

  const togglePressedState = () => {
    setIsPressed(!isPressed);
    setIsPressedIcon1 (false);
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

    launchImageLibrary(options, (response) => {
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

    return (
        <SafeAreaView>
            <ScrollView>
                <View style = {{backgroundColor: 'white'}}>
            <View style = {{flexDirection: 'row', justifyContent: 'space-between', margin: 20}}>
                <View style = {{flexDirection: 'row', margin: 15, justifyContent: 'flex-start'}}>
                        <FontAwesomeIcon icon={faCommentDots} size = {25} style = {{color: '#5a2828', top: 5}} />
                        <Text style = {{color: '#5a2828', fontSize: 25, fontFamily: 'Poppins-Bold', left: 10}}>
                            Create Post
                        </Text>
                </View>
                <TouchableOpacity onPress={() => navigation.navigate("HomePage")}>
                  <FontAwesomeIcon icon={faCircleXmark} size = {25} style = {{color: '#cbcbcb', top: 20}} />
                </TouchableOpacity>
            </View>
            <View style = {{width: 350, height: 2, backgroundColor: '#5a2828', alignSelf: 'center', bottom: 25}}/>
            <Text style = {{color: '#ff8700', fontSize: 20, fontFamily: 'Poppins-Medium', left: 20}}>
                Message
            </Text>
            <View style = {{backgroundColor: 'white',  borderRadius: 30, borderColor: '#ff8d4d', padding: 10, borderWidth: 2, margin: 20, height: 90 }}>
                <TextInput multiline = {true} numberOfLines={5} style = {{color: '#5a2828', fontSize: 15, fontFamily: 'Poppins-Regular'}}>
                </TextInput>
            </View>
            <Text style = {{color: '#ff8700', fontSize: 20, fontFamily: 'Poppins-Medium', left: 20}}>
                Upload Media
            </Text>

            <View style = {{flexDirection: 'row', justifyContent: 'space-evenly', backgroundColor: '#d9d9d9', borderRadius: 30, margin: 30}}>
                <TouchableOpacity
                    onPress={togglePressedState}
                    style={{ backgroundColor: isPressed ? '#ff8d4d' : 'transparent', borderRadius: 30, padding: 10, width: 172, alignItems: 'center' }}>
                    <FontAwesomeIcon icon={faImage} size={30} style={{ color: 'white' }} />
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={togglePressedStateIcon1}
                    style={{ backgroundColor: isPressedIcon1 ? '#ff8d4d' : 'transparent', borderRadius: 30, padding: 10,  width: 172, alignItems: 'center' }}>
                    <FontAwesomeIcon icon={faVideo} size={30} style={{ color: 'white' }} />
                </TouchableOpacity>
            </View>

            <View style = {{}}>
            <View style = {{backgroundColor: '#dcdcdc', padding: 10, borderRadius: 30, margin: 20}}>
                <Text style = {{color: '#5a2828', fontSize: 13, }}>
                    dog.png
                </Text>
            </View>
            <TouchableOpacity onPress = {openImagePicker}>
            <View style = {{backgroundColor: '#ff8d4d', borderRadius: 30, padding: 10, margin: 150, flex: 1, bottom: 210, left: 130}}>
                <Text style = {{color: 'white', fontFamily: 'Poppins-Regular', fontSize: 13, textAlign: 'center'}}>
                    Upload
                </Text>
            </View>
            </TouchableOpacity>
            </View>
            <Text style = {{color: '#5a2828', fontFamily: 'Poppins-Regular', fontSize: 13, flex: 1, bottom: 350, left: 30}}>
                Maximum upload file size : 100 MB
            </Text>
            <View style= {{flex: 1, bottom: 400}}>
                <AppButton
                    title = "Post" 
                    onPress={handleButton1Press}
                    buttonStyle = {styles.btn1}
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
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: '20%',
    margin: 70,
    padding: 4,
    borderRadius: 50,
    backgroundColor: '#ff8d4d',
    },
    bt1:{
        color: 'white',
        fontFamily: 'Poppins-SemiBold',
        fontSize: 18,
        textAlign: 'center'
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