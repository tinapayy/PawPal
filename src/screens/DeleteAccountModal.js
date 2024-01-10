import React from 'react';
import {View, Text, Modal, StyleSheet, TouchableOpacity} from 'react-native';

import {TrashIcon as Trash} from 'react-native-heroicons/solid';

import {deleteUser} from 'firebase/auth';
import {FIREBASE_AUTH} from '../../firebase.config';

class DeleteAccountModal extends React.Component {
  render() {
    const auth = FIREBASE_AUTH;

    const {modalVisible, setModalVisible} = this.props;

    return (
      <Modal transparent={true} visible={modalVisible}>
        <View style={styles.modalbackground}>
          <View style={styles.modalcontainer}>
            <View style={styles.modalcontentheader}>
              <Trash size={30} color="#FF8700" strokeWidth={3} />
              <Text style={styles.logoutText}>Delete Account</Text>
            </View>

            <View style={styles.modalcontentbody}>
              <Text style={styles.contentbody}>
                Are you sure you want to delete your account?{'\n'}
                {'\n'}
                If you delete your account, you will permanently lose your
                profile, messages and photos.
              </Text>
            </View>

            <View style={styles.modalcontentbuttons}>
              <View style={styles.rejectbutton}>
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <Text style={styles.rejectbuttonText}>Cancel</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.confirmbutton}>
                <TouchableOpacity
                  onPress={() => {
                    setModalVisible(false);
                    deleteUser(auth.currentUser)
                      .then(() => {
                        console.log('User deleted');
                      })
                      .catch(error => {
                        console.log(error);
                      });
                  }}>
                  <Text style={styles.confirmbuttonText}>Delete</Text>
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
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentbody: {
    marginTop: 10,
    fontSize: 20,
    color: '#5A2828',
    fontWeight: '400',
    lineHeight: 24,
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

export default DeleteAccountModal;