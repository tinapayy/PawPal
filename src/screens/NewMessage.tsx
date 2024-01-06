import React, {useState, useRef} from 'react';
import { ScrollView, SafeAreaView, Alert, StyleProp, ViewStyle, TextStyle, Switch } from 'react-native';
import { View, Text, Dimensions, ImageBackground, TouchableOpacity, StyleSheet, TextInput, Image } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigation } from '@react-navigation/native';

const NewMessage = () => {
    const navigation = useNavigation();
    return(
        <SafeAreaView>
            <ScrollView>
                <View style = {{width: Dimensions.get('window').width, height: Dimensions.get('window').height}}>
                <ImageBackground source ={require('../images/header.png')}
                style = {{width: '100%', height: '50%', }}>
                    
                <View style = {{flexDirection: 'row', margin: 30}}>
                    <TouchableOpacity
                    onPress={() => navigation.navigate("MessagePage")}>
                    <FontAwesomeIcon icon={faArrowLeft} size = {30}
                    style = {{
                        color: '#5a2828',
                        left: 10,
                        top: 5
                    }} />
                    </TouchableOpacity>
                    <Text style = 
                    {{color: '#5a2828', 
                    fontFamily: 'Poppins-SemiBold', 
                    fontSize: 30,
                    left: 50
                    }}>
                        New Message
                    </Text>
                </View>

                <View style = {{backgroundColor: '#d9d9d9', borderRadius: 40, width: '90%', alignSelf: 'center', top: 20}}>
                    <TextInput placeholder='To: Type a name or Clinic' style = {{color: '#5a2828', fontSize: 15, fontFamily: 'Poppins-Regular', left: 20}}>
                    </TextInput>
                </View>

                <Text style = {{color: '#5a2828', fontFamily: 'Poppins-SemiBold', fontSize: 20, top: '40%', left: '7%'}}>
                    Suggested
                </Text>

                <View style = {{left: '10%', top: '45%',}}>
                    <TouchableOpacity>
                    <View style = {{flexDirection: 'row', marginBottom: 20,  }}>
                    <Image source={require('../images/user1.jpg')}
                    style = {{height: 50, width: 50, borderRadius: 50}}/>
                    <Text style = {{color: '#5a2828', fontFamily: 'Poppins-Regular', fontSize: 15, top: 10, left: 20}}>
                    Cornerstone Animal Hospital
                    </Text>
                    </View>
                    </TouchableOpacity>

                    <TouchableOpacity>
                    <View style = {{flexDirection: 'row', marginBottom: 20, }}>
                        <Image source={require('../images/user2.jpg')}
                        style = {{height: 50, width: 50,  
                        borderRadius: 50}}/>
                        <Text style = {{color: '#5a2828', fontFamily: 'Poppins-Regular', fontSize: 15, top: 10, left: 20}}>
                        Labrod Veterinary Clinic
                        </Text>
                    </View>
                    </TouchableOpacity>

                    <TouchableOpacity>
                    <View style = {{flexDirection: 'row', marginBottom: 20}}>
                        <Image source={require('../images/user1.jpg')}
                        style = {{height: 50, width: 50, borderRadius: 50}}/>
                        <Text style = {{color: '#5a2828', fontFamily: 'Poppins-Regular', fontSize: 15, top: 10, left: 20}}>
                        Kristina Celis
                        </Text>
                    </View>
                    </TouchableOpacity>

                    <TouchableOpacity>
                    <View style = {{flexDirection: 'row', marginBottom: 20, }}>
                        <Image source={require('../images/user2.jpg')}
                        style = {{height: 50, width: 50,  
                        borderRadius: 50}}/>
                        <Text style = {{color: '#5a2828', fontFamily: 'Poppins-Regular', fontSize: 15, top: 10, left: 20}}>
                        Iloilo Veterinary Clinic
                        </Text>
                    </View>
                    </TouchableOpacity>
                </View>
               
                </ImageBackground>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default NewMessage;