import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

const CustomAlert = ({visible, title, message, onClose}) => {
  if (!visible) return null;

  return (
    <View style={styles.overlay}>
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.message}>{message}</Text>
        <TouchableOpacity onPress={onClose}>
          <Text style={styles.closeButton}>Close</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#ff6464',
  },
  message: {
    fontSize: 16,
    marginBottom: 20,
  },
  closeButton: {
    color: 'white',
    alignSelf: 'flex-end',
    backgroundColor: 'orange',
    borderRadius: 20,
    width: 60,
    height: 30,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});

export default CustomAlert;
