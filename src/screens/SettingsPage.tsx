import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';

import {
  Cog6ToothIcon as CogIcon,
  UserIcon as User,
  BuildingOfficeIcon as ClinicIcon,
  TrashIcon as Trash,
  ArrowRightOnRectangleIcon as ExitIcon,
} from 'react-native-heroicons/solid';

const grh = require('../images/grh.png');
import LogOutModal from './LogoutModal';
import DeleteAccountModal from './DeleteAccountModal';
import { NavigationContainer, useNavigation } from "@react-navigation/native";

function SettingsPage() {
  const navigation = useNavigation();
  const [deleteAccountModal, setDeleteAccountModal] = useState(false);
  const [logoutModal, setLogoutModal] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headertextandicon}>
          <CogIcon size={40} color="#fff" strokeWidth={3} />
          <Text style={styles.headerText}>Settings</Text>
        </View>
        <Image source={grh} style={styles.headerimg} />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <User size={30} color="#FF8700" strokeWidth={3} />
          <Text style={styles.buttonText}>Edit User Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}
        onPress={() => {
          navigation.navigate ('ClinicDetails');
        }}>
          <ClinicIcon size={30} color="#FF8700" strokeWidth={3} />
          <Text style={styles.buttonText}>Edit Clinic Details</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}
                          onPress={() => setDeleteAccountModal(true)}>
          <Trash size={30} color="#FF8700" strokeWidth={3} />
          <Text style={styles.buttonText}>Delete Account</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonlogout}
                          onPress={() => setLogoutModal(true)}>
          <ExitIcon size={30} color="#FFF" strokeWidth={3} />
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
    backgroundColor: 'white',

  },
  header: {
    height: 150,
    backgroundColor: '#FF8D4D',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  headertextandicon: {
    marginLeft: 30,
    paddingRight: 30,
    marginRight: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    paddingLeft: 10,
    fontSize: 35,
    fontWeight: 'bold',
    color: '#5A2828',
  },
  headerimg: {
    marginTop: 35,
    marginRight: 30,
    width: 100,
    height: 150,
  },

  buttonContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 50,
  },
  button: {
    flexDirection: 'row',
    backgroundColor: 'white',
    width: 350,
    margin: 15,
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
    position: 'relative',
    elevation: 5,
  },
  buttonlogout: {
    flexDirection: 'row',
    backgroundColor: '#FFAC4E',
    width: 350,
    margin: 15,
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
    position: 'relative',
    elevation: 10,
  },
  buttonText: {
    marginLeft: 10,
    fontSize: 20,
    fontWeight: "300",
    paddingVertical: 10,
    color: '#FF8700',
  },
  buttonlogoutText: {
    marginLeft: 10,
    fontSize: 20,
    paddingVertical: 10,
    fontWeight: "300",
    color: '#FFF',
  },
});

export default SettingsPage;
