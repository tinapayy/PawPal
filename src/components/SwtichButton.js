import {View, TouchableOpacity, Text} from 'react-native';
import {useState} from 'react';
import React from "react";  

const SwitchButton = () => {
        const [selectedTab, setSelectedTab] = useState(0);
    return (
        <View style={{flex:1, justifyContent: 'center', alignItems:'center'}}>
            <View 
            style={{
                backgroundColor: 'white',
                justifyContent:'center', 
                width:'80%', 
                height: 55, 
                borderWidth: 0.5, 
                borderRadius: 25,
                flexDirection: 'row',
                alignItems: 'center',
                top: -50
                }}>
                <TouchableOpacity style={{width:"49%", height: 49, elevation:selectedTab == 0? 3 : 0, backgroundColor: selectedTab == 0? 'orange': 'white', borderRadius: 25, justifyContent:'center', alignItems: 'center' }}
                onPress={() => { setSelectedTab(0);}}>
                    <Text style={{color:selectedTab == 0 ?"#fff": "#000", fontSize: 18, fontWeight:'700'}}>Pet Owner</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{width:"49%", height: 49, elevation:selectedTab == 1? 3 : 0, backgroundColor: selectedTab == 1 ?'orange': 'white', borderRadius: 25, justifyContent:'center', alignItems: 'center' }} 
                onPress={() => { setSelectedTab(1);}}>
                    
                    <Text style={{color:selectedTab == 1 ? '#fff': "#000",  fontSize: 18, fontWeight:'700'}}>Clinic or Hospital</Text>
                </TouchableOpacity>                    
        </View>
        </View>

    );
};

export default SwitchButton;