import {View, TouchableOpacity, Text} from 'react-native';
import {useState} from 'react';
import React from 'react';

const SwitchButton = ({selectedUserType, setSelectedUserType}) => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <View
        style={{
          backgroundColor: 'white',
          justifyContent: 'center',
          width: '80%',
          height: 55,
          borderWidth: 0.7,
          borderRadius: 25,
          flexDirection: 'row',
          alignItems: 'center',
          borderBlockColor: '#5a2828',
          top: -50,
        }}>
        <TouchableOpacity
          style={{
            width: '49%',
            height: 49,
            elevation: selectedUserType === 'petOwner' ? 3 : 0,
            backgroundColor:
              selectedUserType === 'petOwner' ? 'orange' : 'white',
            borderRadius: 23,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => setSelectedUserType('petOwner')}>
          <Text
            style={{
              color: selectedUserType === 'petOwner' ? '#fff' : '#5a2828',
              fontSize: 18,
              fontWeight: '700',
            }}>
            Pet Owner
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: '49%',
            height: 49,
            elevation: selectedUserType === 'clinic' ? 3 : 0,
            backgroundColor: selectedUserType === 'clinic' ? 'orange' : 'white',
            borderRadius: 23,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => setSelectedUserType('clinic')}>
          <Text
            style={{
              color: selectedUserType === 'clinic' ? '#fff' : '#5a2828',
              fontSize: 18,
              fontWeight: '700',
            }}>
            Clinic or Hospital
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SwitchButton;
