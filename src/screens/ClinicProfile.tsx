import React, { useState, Component } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
  TouchableOpacity,
  Image,
  Button,
  Platform,
  FlatList,
  Alert,
  StyleProp,
  ViewStyle,
  TextStyle,
  ImageBackground,
  Modal
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { faMobileScreenButton } from '@fortawesome/free-solid-svg-icons';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import { faCircleArrowDown } from '@fortawesome/free-solid-svg-icons';
import { BackgroundImage } from 'react-native-elements/dist/config';
import ModalDropdown from 'react-native-modal-dropdown';



const ClinicProfile = () => {

    const [isDropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };

    const handleIconPress = () => {
        Alert.alert('Google Map API to be implemented :>')
      };  

    return(
        <SafeAreaView style = {{backgroundColor: 'orange'}}>
            <View>
                <View style = {styles.icon}>
                <FontAwesomeIcon icon={faArrowLeft} size = {30} style = {{color: '#ff8700',}} />
                <FontAwesomeIcon icon={faGear} size = {30} style = {{color: '#ff8700',}}/>
                </View>
                
                <View>
                    <ImageBackground source = {require('../img/image_29.png')} resizeMode = 'stretch'
                    style = {{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 410,
                        height: 410,
                        left: '0.3%',
                        position: 'relative',
                        padding: 20,
                        bottom: 90
                    }}
                    ></ImageBackground>
                </View>
            </View>
        <ScrollView>
                <View style = {{
                    backgroundColor: 'white',
                    borderTopStartRadius:50, 
                    borderTopEndRadius:50,
                    flex: 1,
                    shadowColor: 'black',
                    shadowOffset: {
                        width: -2,
                        height: 10,
                        },
                    shadowOpacity: 1,
                    shadowRadius: 3,
                    elevation: 1000,
                    top: 150
                    }}>
                
                <Text
                    style = {{color: 'black', fontSize: 30, fontFamily: 'Poppins-Bold', marginTop: 30, marginLeft: 20}}>
                    Cornerstone Animal Hospital and Veterinary Supply
                </Text>

                <View style = {{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View style = {{flexDirection: 'row', margin: 10, justifyContent: 'flex-start'}}>
                <FontAwesomeIcon icon={faMobileScreenButton} size = {23} style = {{
                    color: '#FF8D4D'
                }}/>
                <Text style = {{color: '#ff8d4d', fontSize: 18, fontFamily: 'Poppins-Medium', marginLeft: 7}}>
                    0917 633 8278
                </Text>
                </View>

                <View style = {{flexDirection: 'row', margin: 10, justifyContent: 'flex-start'}}>
                <FontAwesomeIcon icon={faClock} size = {23} style = {{
                    color: '#FF8D4D'
                }} />
                <Text style = {{color: '#ff8d4d', fontSize: 18, fontFamily: 'Poppins-Medium', textDecorationLine: 'underline', marginLeft: 6, marginRight: 6}}>
                    Store Hours
                </Text>

                <View style = {styles.drop}>
                    <TouchableOpacity onPress={toggleDropdown}>
                        <FontAwesomeIcon icon={faCircleArrowDown} size = {23} style = {{
                            color: '#FF8D4D'
                    }}/>
                    </TouchableOpacity>
                    {isDropdownOpen && (
                    <View style={styles.dropdown}>
                    <Text>Monday -- 8:00 AM to 6:00 PM</Text>
                    <Text>Tuesday -- CLOSED</Text>
                    <Text>Wednesday -- 8:00 AM to 6:00 PM</Text>
                    <Text>Thursday -- 8:00 AM to 6:00 PM</Text>
                    <Text>Friday -- 8:00 AM to 6:00 PM</Text>
                    <Text>Saturday -- 8:00 AM to 6:00 PM</Text>
                    <Text>Sunday -- 8:00 AM to 6:00 PM</Text>
                    </View>
                )}
                </View>
            </View>
        </View>

                <View style = {{flexDirection: 'row', margin: 10, justifyContent: 'flex-start'}}>
                <FontAwesomeIcon icon={faPhone} size = {23} style = {{
                    color: '#FF8D4D'
                }} />
                <Text style = {{color: '#ff8d4d', fontSize: 18, fontFamily: 'Poppins-Medium', marginLeft: 7}}>
                    (033) 503-29-12
                </Text>
                </View>

                <Text style = {{color: 'grey', fontSize: 24, marginLeft: 10, marginTop: 10}}>
                    Services
                </Text>
            <View style = {{flexDirection: 'row', justifyContent: 'space-evenly', margin: 10}}>
                <Text style = {{
                    display: 'flex',
                    justifyContent:'flex-start',
                    color: 'black', 
                    textAlign: 'center', 
                    backgroundColor:'#f1d5c5',
                    width: 100, 
                    opacity: 0.5, 
                    borderRadius: 20, 
                    padding: 10,
                    margin: 10,
                    fontFamily: 'Poppins-Medium',
                    }} >
                    Grooming
                </Text>

                <Text style = {{
                    display: 'flex',
                    justifyContent:'flex-start',
                    color: 'black', 
                    textAlign: 'center', 
                    backgroundColor:'#f1d5c5',
                    width: 100, 
                    opacity: 0.5, 
                    borderRadius: 20, 
                    padding: 10,
                    margin: 10,
                    fontFamily: 'Poppins-Medium'
                    }} >
                    Surgery
                </Text>

                <Text style = {{
                    display: 'flex',
                    justifyContent:'flex-start',
                    color: 'black', 
                    textAlign: 'center', 
                    backgroundColor:'#f1d5c5',
                    width: 100, 
                    opacity: 0.5, 
                    borderRadius: 20, 
                    padding: 10,
                    margin: 10,
                    fontSize: 12,
                    fontFamily: 'Poppins-Medium'
                    }} >
                    Consultation
                </Text>

                <Text style = {{
                    display: 'flex',
                    justifyContent:'flex-start',
                    color: 'black', 
                    textAlign: 'center', 
                    backgroundColor:'#f1d5c5',
                    width: 100, 
                    opacity: 0.5, 
                    borderRadius: 20, 
                    padding: 10,
                    margin: 10,
                    fontFamily: 'Poppins-Medium'
                    }} >
                    Pharmacy
                </Text>
            </View>

                <View>
                <Image source = {require('../img/Line_23.png')} resizeMode='stretch'
                style = {{justifyContent: 'center', alignItems: 'center',  margin: 10, width: 1000}}/>
                </View>

            <Text style = {{color: 'black', marginLeft: 10, fontSize: 20}}>
            Veterinary services, grooming for dogs and cats and pet supplies.
            </Text>

            <Text style = {{color: '#ff8d4d', 
            marginLeft: 10, 
            fontFamily: 'Poppins-Medium',
            fontSize: 28,
            padding: 10}}>

            Location
            </Text>
            <TouchableOpacity onPress={handleIconPress}>
            <View style = {{height: 500}}>
                <Image source = {require('../img/image_30.png')} resizeMode='stretch'
                style = {{height: 200, width: 500, justifyContent: 'center', alignItems: 'center', right: 40}}/>
            </View>
            </TouchableOpacity>

            </View>
        </ScrollView>
    </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    icon: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 30,
        zIndex: 1
    },
    container:{
        flex: 1, 
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 0.9
    },
    content: {
        backgroundColor: '#ff8d4d',
        padding: 20,
        borderRadius: 30,
        margin: 50,
        color: 'white'
    },
    drop: {
        // flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center'
    },
    dropdown:{
        marginTop: 10,
        backgroundColor: 'white',
        borderWidth: 2,
        padding: 10,
        borderRadius: 5,
        position: 'absolute',
        width: 250,
        right: 5,
        zIndex: 5,
        top: 14,
        elevation: 20,
        borderColor: 'orange',

    }
});

export default ClinicProfile;