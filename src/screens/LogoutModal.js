import React from 'react';
import {View, Text, Modal, StyleSheet, TouchableOpacity} from 'react-native';

import {ArrowRightOnRectangleIcon as ExitIcon} from 'react-native-heroicons/solid';

import {FIREBASE_AUTH} from '../../firebase.config';

class LogOutModal extends React.Component {
  render() {
    const auth = FIREBASE_AUTH;

    const {modalVisible, setModalVisible} = this.props;

    return (
      <Modal transparent={true} visible={modalVisible}>
        <View style={styles.modalbackground}>
          <View style={styles.modalcontainer}>
            <View style={styles.modalcontentheader}>
              <ExitIcon size={30} color="#FF8700" strokeWidth={3} />
              <Text style={styles.logoutText}>Log Out</Text>
            </View>

            <View style={styles.modalcontentbody}>
              <Text style={styles.contentbody}>
                Are you sure you want to log out?
              </Text>
            </View>

            <View style={styles.modalcontentbuttons}>
              <View style={styles.rejectbutton}>
                <TouchableOpacity
                  onPress={() => setModalVisible(false)} // Close the modal when the button is pressed
                >
                  <Text style={styles.rejectbuttonText}>Cancel</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.confirmbutton}>
                <TouchableOpacity
                  onPress={() => {
                    setModalVisible(false); // Close the modal when the button is pressed
                    auth.signOut().then(() => {
                      console.log('User signed out');
                    });
                  }}>
                  <Text style={styles.confirmbuttonText}>Log Out</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  modalbackground: {
    backgroundColor: '#000000aa',
    flex: 1,
  },
  modalcontainer: {
    backgroundColor: '#fff',
    margin: 50,
    padding: 40,
    borderRadius: 10,
    elevation: 20,
  },
  modaltext: {
    fontSize: 20,
    color: '#333',
  },
  modalcontentheader: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  modalcontentbody: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentbody: {
    marginTop: 10,
    fontSize: 25,
    color: '#5A2828',
    fontWeight: '400',
  },
  logoutText: {
    marginLeft: 10,
    fontSize: 20,
    paddingVertical: 10,
    fontWeight: '300',
    color: '#FF8700',
    fontWeight: '400',
  },

  modalcontentbuttons: {
    backgroundColor: 'white',
    flexDirection: 'row',
    marginTop: 20,
    marginLeft: 30,
    padding: 10,
  },
  confirmbutton: {
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 20,
    margin: 5,
  },
  rejectbutton: {
    backgroundColor: '#FF8700',
    padding: 10,
    borderRadius: 20,
    margin: 5,
  },

  confirmbuttonText: {
    color: '#FF8700',
    fontSize: 20,
    fontWeight: '400',
  },
  rejectbuttonText: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: '400',
  },
});

export default LogOutModal;
