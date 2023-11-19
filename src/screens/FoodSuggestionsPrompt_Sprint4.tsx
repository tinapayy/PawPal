import React, { useState, useRef } from 'react';
import { ScrollView, SafeAreaView } from 'react-native';
import { View, Text, Dimensions, ImageBackground, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { color } from 'react-native-elements/dist/helpers';

const FoodSuggestionsPrompt_sprint4 = () => {
    const [promptVisible, setPromptVisible] = useState(true);

    const handleOkPress = () => {
        // Add your logic for OK button press here
        console.log('OK button pressed');
        // Optionally, you can set the prompt to disappear here
        setPromptVisible(false);
    };

    const handleCancelPress = () => {
        // Add your logic for Cancel button press here
        console.log('Cancel button pressed');
        // Set the prompt to disappear when "Cancel" is pressed
        setPromptVisible(false);
    };

    return (
        <SafeAreaView>
            <View style={{ backgroundColor: 'white', borderRadius: 20, margin: 60, padding: 70, elevation: 20, top: '50%' }}>
                <View>
                    <Text style={{ fontSize: 30, color: '#5a2828', fontFamily: 'Poppins-Bold', bottom: '100%', right: '25%' }}>
                        Apple
                    </Text>
                    <View style={{ width: 250, height: 3, backgroundColor: '#5a2828', alignSelf: 'center', bottom: '80%' }} />
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: 20, color: '#ff8700', fontFamily: 'Poppins-Regular', right: '120%' }}>
                        Gluten-free
                    </Text>
                    <FontAwesomeIcon icon={faCircleCheck} size={18} style={{ color: 'green' }} />
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: 17, color: '#ff8700', fontFamily: 'Poppins-Regular', right: '120%' }}>
                        Contains sodium
                    </Text>
                    <FontAwesomeIcon icon={faCircleCheck} size={18} style={{ color: 'green' }} />
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: 17, color: '#ff8700', fontFamily: 'Poppins-Regular', right: '120%' }}>
                        Amount of sugar
                    </Text>
                    <Text style={{ fontSize: 17, color: '#5a2828', fontFamily: 'Poppins-Regular' }}>
                        10g
                    </Text>
                </View>

                <View style={{ flexDirection: 'row', top: '30%', justifyContent: 'space-around' }}>
                    <TouchableOpacity style={{ backgroundColor: '#ff8700', borderRadius: 20, padding: 10, elevation: 20, width: 80 }} onPress={handleOkPress}>
                        <Text style={{ color: 'white', fontSize: 15, fontFamily: 'Poppins-Regular', textAlign: 'center' }}>OK</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ backgroundColor: 'white', borderRadius: 20, padding: 10, elevation: 20, left: '70%' }} onPress={handleCancelPress}>
                        <Text style={{ color: '#ff8700', fontSize: 15, fontFamily: 'Poppins-Regular', }}>Cancel</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </SafeAreaView>
    );
};

export default FoodSuggestionsPrompt_sprint4;