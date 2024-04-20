import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ViewStyle } from 'react-native';
const grh = require('../images/grh.png');
import LogOutModal from './LogoutModal';
import DeleteAccountModal from './DeleteAccountModal';
import { useNavigation } from '@react-navigation/native';
import { onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_AUTH } from '../../firebase.config';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import * as icons from '../imports/icons/icons';
import constants from '../styles/constants';
import {buttonMixin} from '../components/buttonMixin';
import { alignmentMixin } from '../components/alignmentMixin';
import {useNavigateTo} from '../components/navigation';

function SettingsPage() {
  const navigation = useNavigation();
  const auth = FIREBASE_AUTH;

  onAuthStateChanged(auth, user => {
    if (!user) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'GettingStarted2' }] as any,
      });
    }
  });

  const [deleteAccountModal, setDeleteAccountModal] = useState(false);
  const [logoutModal, setLogoutModal] = useState(false);
  const ProfileDetails = useNavigateTo('ProfileDetails');
  const EditUserProfile = useNavigateTo('EditUserProfile');
  const ChoosePet = useNavigateTo('ChoosePet');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headertextandicon}>
          <icons.CogIcon size={40} color="#fff" strokeWidth={3} />
          <Text style={styles.headerText}>Settings</Text>
        </View>
        <Image source={grh} style={styles.headerimg} />
      </View>
      <TouchableOpacity
        onPress={ProfileDetails}>
        <FontAwesomeIcon
          icon={icons.faArrowLeft}
          size={27}
          style={{ color: 'brown', left: 15, flex: 1, bottom: '500%' }}
        />
      </TouchableOpacity>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={EditUserProfile}>
          <icons.User size={30} color="#FF8700" strokeWidth={3} />
          <Text style={styles.buttonText}>Edit User Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={ChoosePet}>
          <icons.ClinicIcon size={30} color="#FF8700" strokeWidth={3} />
          <Text style={styles.buttonText}>Edit Pet Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setDeleteAccountModal(true)}>
          <icons.Trash size={30} color="#FF8700" strokeWidth={3} />
          <Text style={styles.buttonText}>Delete Account</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonlogout}
          onPress={() => setLogoutModal(true)}>
          <icons.ExitIcon size={30} color="#FFF" strokeWidth={3} />
          <Text style={styles.buttonlogoutText}>Log Out</Text>
        </TouchableOpacity>
      </View>

      <LogOutModal
        modalVisible={logoutModal}
        setModalVisible={setLogoutModal}
      />
      <DeleteAccountModal
        modalVisible={deleteAccountModal}
        setModalVisible={setDeleteAccountModal}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: constants.$backgroundColor,
  },
  header: {
    ...alignmentMixin.alignment1,
    height: 150,
    backgroundColor: constants.$senaryColor,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  } as ViewStyle,
  headertextandicon: {
    ...alignmentMixin.alignment1,
    marginLeft: '10%',
    paddingRight: '10%',
    marginRight: '15%',
  } as ViewStyle,
  headerText: {
    paddingLeft: '3%',
    fontSize: 35,
    fontWeight: 'bold',
    color: constants.$secondaryColor,
  },
  headerimg: {
    marginTop: '8%',
    marginRight: '6%',
    width: 100,
    height: '100%',
  },

  buttonContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10%',
  },
  button: {
    ...alignmentMixin.alignment1,
    ...buttonMixin.settingsButton,
    justifyContent: undefined,
    backgroundColor: constants.$backgroundColor,
  } as ViewStyle,
  buttonlogout: {
    ...alignmentMixin.alignment1,
    ...buttonMixin.settingsButton,
    justifyContent: undefined,
    backgroundColor: constants.$primaryColor,
  } as ViewStyle,
  buttonText: {
    ...buttonMixin.buttonText,
    ...buttonMixin.settingsButtonText,
    color: constants.$senaryColor,
  } as ViewStyle,
  buttonlogoutText: {
    ...buttonMixin.buttonText,
    ...buttonMixin.settingsButtonText,
  } as ViewStyle,
});

export default SettingsPage;