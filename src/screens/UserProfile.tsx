/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {
  View,
  TextInput,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faUser,
  faLock,
  faArrowLeft,
  faCirclePlus,
  faCheckCircle,
} from '@fortawesome/free-solid-svg-icons';

const UserProfile = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <ImageBackground
      source={require('../images/real_bg.png')}
      style={styles.backgroundImage1}
    >
      <View style={styles.container}>
        <View style={styles.back}>
          <TouchableOpacity>
            <FontAwesomeIcon
              icon={faArrowLeft}
              style={styles.backIcon}
              size={25}
            />
          </TouchableOpacity>
          <Text style={styles.backText}>Edit User Profile</Text>
        </View>
        <View style={styles.profileContainer}>
          <Image
            source={require('../images/userIcon.png')}
            style={styles.profileImage}
          />
          <TouchableOpacity style={styles.arrowAdd}>
            <FontAwesomeIcon
              icon={faCirclePlus}
              style={styles.arrowAdd}
              size={25}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.formContainer}>
          <View style={styles.iconInputRow}>
            <FontAwesomeIcon icon={faUser} style={styles.icon} />
            <View style={styles.iconInputRow}>
            <Text style={styles.inputName}>Kristina V. Celis</Text>
          </View>
          </View>
          <View style={styles.changePassword} />
          <Text style={styles.changePassword}>Change Password</Text>
          <View style={styles.iconInputRow}>
            <FontAwesomeIcon icon={faLock} style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Current Password"
              secureTextEntry
              value={currentPassword}
              onChangeText={(text) => setCurrentPassword(text)}
            />
          </View>
          <View style={styles.iconInputRow}>
            <FontAwesomeIcon icon={faLock} style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="New Password"
              secureTextEntry
              value={newPassword}
              onChangeText={(text) => setNewPassword(text)}
            />
          </View>
          <View style={styles.iconInputRow}>
            <FontAwesomeIcon icon={faCheckCircle} style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              secureTextEntry
              value={confirmPassword}
              onChangeText={(text) => setConfirmPassword(text)}
            />
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.saveButton}
              onPress={() => console.log('Save Changes')}
              accessible={true}
              accessibilityRole="button"
            >
              <LinearGradient
                colors={['#FFAC4E', '#FF6464']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.gradientBackground}
              >
                <Text style={styles.buttonSave}>Save Changes</Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => console.log('Cancel Changes')}
            accessible={true}
            accessibilityRole="button"
            >
            <Text style={styles.buttonTextCancel}>Cancel</Text>
          </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage1: {
    flex: 1,
    width: '100%',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  back: {
    flexDirection: 'row',
    marginBottom: 40,
    top: 30,
  },
  backIcon: {
    color: '#FF8D4D',
    flexDirection: 'row',
    position: 'absolute',
    top: -69,
    left: 10,
    paddingRight: 30,
  },
  backText: {
    fontSize: 20,
    fontFamily: 'Poppins-Regular',
    color: '#5A2828',
    fontWeight: 'bold',
    marginLeft: 30,
    top: -70,
    left: 25,
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    alignSelf: 'center',
    marginBottom: 20,
  },
  arrowAdd: {
    color: '#FF8D4D',
    position: 'absolute',
    top: 45,
    right: 65,
    paddingRight: 30,
    marginBottom: 90,
    paddingVertical: 40,
  },
  formContainer: {
    marginTop: 20,
    marginLeft: -20,
  },
  iconInputRow: {
    //adjust length of input
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    marginBottom: 10,
    // right: 100,
    left: 0,
    // paddingRight: 15,
    width: 350,
  },
  icon: {
    color: '#FF8D4D',
    position: 'absolute',
    top: 15,
    marginLeft: 65, //move icons
    // marginRight: 10,
    paddingRight: 10,
    flexDirection: 'row',
    alignContent: 'center',
  },
  inputLabel: {
    color: '#FF8D4D',
    marginBottom: 8,
    // fontSize: 18,
  },
  input: {
    flex: 1,
    fontSize: 20,
    height: 45,
    borderBottomWidth: 2,
    borderBottomColor: '#FF8D4D',
    marginLeft: 60,
    // marginBottom: 20,
    paddingHorizontal: 30,
    // width: 400,
  },
  inputName: {
    flex: 1,
    fontSize: 20,
    height: 40,
    borderBottomWidth: 2,
    top: 10,
    borderBottomColor: '#FF8D4D',
    marginLeft: 60,
    // marginBottom: 20,
    paddingHorizontal: 30,
    // width: 400,
    color: '#5A2828',
  },
  changePassword: {
    fontSize: 25,
    fontFamily: 'Poppins-Regular',
    left: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#FF8D4D',
    paddingHorizontal: 8,
  },
  saveButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    paddingVertical: 20,
    borderRadius: 40,
  },
  buttonTextCancel: {
    color: '#FF8D4D',
    fontSize: 20,
    fontFamily: 'Poppins-Regular',
    alignSelf: 'center',
  },
   buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // alignItems: 'center',
    marginTop: 20,
    borderRadius: 40,
    // paddingHorizontal: 200,
    // right: 10,
    // left: 10,
  },
  gradientBackground: {
    borderRadius: 20,
    width: 150,
    height: 45,
    position: 'absolute',
    top: 0,
    left: 100,
    // right: -40,
    elevation: 3,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
  },
  buttonSave: {
    // flexDirection: 'row',
    color: '#ffffff',
    fontSize: 20,
    fontFamily: 'Poppins-Regular',
    alignSelf: 'center',
    alignItems: 'center',
    alignContent: 'center',
    top: 8,
  },
  cancelButton: {
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    left: -40,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 40,
    elevation: 3,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
  },
});

export default UserProfile;
