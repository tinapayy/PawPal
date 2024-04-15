import React, { useState, useRef } from 'react';
import { ScrollView, SafeAreaView, Alert, StyleProp, ViewStyle, TextStyle, Switch } from 'react-native';
import { View, Text, Dimensions, ImageBackground, TouchableOpacity, StyleSheet, TextInput, Image } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import * as icons from '../imports/icons/icons';
import { useNavigation } from '@react-navigation/native';
// import * as icons from '../imports/icons/icons';
import { buttonMixin } from '../components/buttonMixin';
import { alignmentMixin } from '../components/alignmentMixin';
import constants from '../styles/constants';
import { chatMixins } from '../components/chatMixins';

const NewMessage = () => {
    const navigation = useNavigation();
    return (
        <SafeAreaView>
            <ScrollView>
                <View style={{ width: Dimensions.get('window').width, height: Dimensions.get('window').height }}>
                    <ImageBackground source={require('../images/header.png')}
                        style={{ width: '100%', height: '50%', }}>

                        <View style={{ flexDirection: 'row', margin: 30 }}>
                            <TouchableOpacity
                                onPress={() => navigation.navigate("MessagePage")}>
                                <FontAwesomeIcon icon={icons.faArrowLeft} size={25} color={constants.$tertiaryColor}
                                    style={{
                                        color: constants.$secondaryColor,
                                        left: '2%',
                                        top: '3%'
                                    }} />
                            </TouchableOpacity>
                            <Text style=
                                {{
                                    color: constants.$tertiaryColor,
                                    fontFamily: constants.$fontFamilySemiBold,
                                    fontSize: 24,
                                    left: '25%',
                                    top: '-1%',
                                    // color:constants.$tertiaryColor,
                                }}>
                                New Message
                            </Text>
                        </View>

                        <View style={{
                            backgroundColor: constants.$tertiaryColor,
                            borderRadius: 20,
                            borderColor: constants.$primaryColor,
                            elevation: 2,
                            width: '80%',
                            alignSelf: 'center',
                            top: '5%'
                        }}>
                            <TextInput placeholder='To: Type a name or Clinic' style={{ fontSize: 15, color: constants.$primaryColor, fontFamily: constants.$fontFamilyExtraLight, left: '5%' }}>
                            </TextInput>
                        </View>

                        <Text style={{ color: constants.$secondaryColor, fontFamily: constants.$fontFamilySemiBold, fontSize: 20, top: '15%', left: '7%' }}>
                            Suggested
                        </Text>


                        {/* hardcoded part , clinics or user you can send messages */}

                        <View style={{ left: '10%', top: '25%', }}>
                            <TouchableOpacity>
                                <View style={{ flexDirection: 'row', marginBottom: '5%', }}>
                                    <Image source={require('../images/user1.jpg')}
                                        style={{ height: 50, width: 50, borderRadius: 50 }} />
                                    <Text style={{ color: constants.$secondaryColor, fontFamily: constants.$fontFamilyRegular, fontSize: 15, top: '2%', left: '20%' }}>
                                        Cornerstone Animal Hospital
                                    </Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity>
                                <View style={{ flexDirection: 'row', marginBottom: '5%', }}>
                                    <Image source={require('../images/user2.jpg')}
                                        style={{
                                            height: 50, width: 50,
                                            borderRadius: 50
                                        }} />
                                    <Text style={{ color: constants.$secondaryColor, fontFamily: constants.$fontFamilyRegular, fontSize: 15, top: '2%', left: '20%' }}>
                                        Labrod Veterinary Clinic
                                    </Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity>
                                <View style={{ flexDirection: 'row', marginBottom: '5%' }}>
                                    <Image source={require('../images/user1.jpg')}
                                        style={{ height: 50, width: 50, borderRadius: 50 }} />
                                    <Text style={{ color: constants.$secondaryColor, fontFamily: constants.$fontFamilyRegular, fontSize: 15, top: '2%', left: '20%' }}>
                                        Kristina Celis
                                    </Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity>
                                <View style={{ flexDirection: 'row', marginBottom: '5%', }}>
                                    <Image source={require('../images/user2.jpg')}
                                        style={{
                                            height: 50, width: 50,
                                            borderRadius: 50
                                        }} />
                                    <Text style={{ color: constants.$secondaryColor, fontFamily: constants.$fontFamilyRegular, fontSize: 15, top: '2%', left: '20%' }}>
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