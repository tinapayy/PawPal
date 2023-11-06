import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const ClinicCard = ({ clinicInfo, isOpen, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={{ borderWidth: 1, borderColor: 'gray', padding: 10 }}>
        <Text style={{ fontWeight: 'bold' }}>{clinicInfo.name}</Text>
        <Text>{clinicInfo.location}</Text>
        <Text>{isOpen ? 'Open Now' : 'Closed'}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ClinicCard;
