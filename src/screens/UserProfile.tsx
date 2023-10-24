import React, {useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faUser} from '@fortawesome/free-regular-svg-icons';
import {faLock} from '@fortawesome/free-solid-svg-icons';
import {faCircleCheck} from '@fortawesome/free-solid-svg-icons';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import {faCirclePlus} from '@fortawesome/free-solid-svg-icons';

const UserProfile = () => {
  const [name] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSaveProfile = () => {
    // Validate input fields before saving the profile
    if (
      name === '' ||
      currentPassword === '' ||
      newPassword === '' ||
      confirmPassword === ''
    ) {
      alert('All fields are required');
    } else if (newPassword !== confirmPassword) {
      alert('New password and confirm password do not match');
    } else {
      alert('Profile updated successfully');
    }
  };
  return (
    <View style={styles.container}>
      <View>
        <ImageBackground
          source={require('./assets/bg.png')}
          style={styles.bgImage}
        />
      </View>
      <TouchableOpacity style={styles.back}>
        <FontAwesomeIcon icon={faArrowLeft} style={styles.back} size={25} />
        <Text style={styles.backText}>Edit User Profile</Text>
        <View />
      </TouchableOpacity>
      <View>
        <Image
          source={require('./assets/userIcon.png')}
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
      <View style={styles.inputContainer}>
        <FontAwesomeIcon icon={faUser} style={styles.icon} />
        <FontAwesomeIcon icon={faLock} style={styles.icon1} />
        <FontAwesomeIcon icon={faLock} style={styles.icon2} />
        <FontAwesomeIcon icon={faCircleCheck} style={styles.icon3} />
        <Text style={styles.input}>Kristina V. Celis</Text>
        <View style={styles.ChangePassword} />
        <Text style={styles.ChangePassword}>Change Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Current Password"
          secureTextEntry
          value={currentPassword}
          onChangeText={text => setCurrentPassword(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="New Password"
          secureTextEntry
          value={newPassword}
          onChangeText={text => setNewPassword(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          secureTextEntry
          value={confirmPassword}
          onChangeText={text => setConfirmPassword(text)}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleSaveProfile}
            accessible={true}
            accessibilityRole="button">
            <Text style={styles.buttonText}>Save Changes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => console.log('Cancel Changes')}
            accessible={true}
            accessibilityRole="button">
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  back: {
    color: 'orange',
    position: 'absolute',
    top: 20,
    marginLeft: 15,
    paddingRight: 30,
    flexDirection: 'row',
  },
  backText: {
    fontSize: 18,
    fontFamily: 'Poppins-Regular ',
    left: 45,
    fontWeight: 'bold',
    marginBottom: 20,
    top: 20,
    color: 'orange',
    paddingHorizontal: 8,
  },
  profileImage: {
    width: 150,
    height: 150,
    marginTop: 55,
    alignSelf: 'center',
    marginBottom: 45,
    position: 'relative',
  },
  arrowAdd: {
    color: 'orange',
    position: 'absolute',
    top: 75,
    right: 69,
    marginBottom: 90,
    paddingVertical: 40,
    // flexDirection: 'row',
  },
  bgImage: {
    // ...StyleSheet.absoluteFillObject,
    // resizeMode: 'cover',
    position: 'relative',
    // zIndex: 100,
    flex: 1,
    // resizeMode: 'cover',
    width: '100%',
    // top: 50,
    // left: '40%',
    justifyContent: 'center',
    zIndex: 99999,
  },
  icon: {
    color: 'orange',
    position: 'absolute',
    top: 10,
    marginLeft: 40,
    paddingRight: 30,
    flexDirection: 'row',
  },
  icon1: {
    color: 'orange',
    position: 'absolute',
    top: 10,
    paddingVertical: 137,
    marginLeft: 46,
    flexDirection: 'row',
    fill: 'white',
  },
  icon2: {
    color: 'orange',
    position: 'absolute',
    top: 10,
    paddingVertical: 196,
    marginLeft: 46,
    flexDirection: 'row',
  },
  icon3: {
    color: 'orange',
    position: 'absolute',
    top: 10,
    paddingVertical: 259,
    marginLeft: 46,
    flexDirection: 'row',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 0,
    // width: 840,
  },
  ChangePassword: {
    fontSize: 25,
    fontFamily: 'Poppins-Regular ',
    left: 10,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'orange',
    paddingHorizontal: 8,
  },
  inputContainer: {
    marginBottom: 50,
    alignContent: 'center',
    left: 1,
    right: 8,
    // lineHeight: 400,
  },
  input: {
    height: 40,
    alignContent: 'center',
    left: 20,
    right: 20,
    borderBottomWidth: 2,
    borderBottomColor: 'orange',
    marginLeft: 20,
    marginBottom: 20,
    paddingHorizontal: 40,
    paddingVertical: 10,
    width: 300,
    fontSize: 16,
    fontFamily: 'Poppins-Regular ',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center',
    right: -50,
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 70,
    borderRadius: 40,
  },
  saveButton: {
    backgroundColor: 'orange',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 40,
  },
  cancelButton: {
    backgroundColor: 'gray',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 40,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'Poppins-Regular ',
    textAlign: 'center',
    textDecorationStyle: 'solid',
  },
});

export default UserProfile;
function alert(_arg0: string) {
  throw new Error('Function not implemented.');
}
