import React from 'react';
import {View, Text, Modal, StyleSheet, TouchableOpacity} from 'react-native';
import * as icons from '../imports/icons/icons';
import {
  deleteUser,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from 'firebase/auth';
import {collection, doc, getDocs, deleteDoc} from 'firebase/firestore';
import {FIREBASE_AUTH, FIREBASE_DB} from '../../firebase.config';
import constants from '../styles/constants';
import {alignmentMixin} from '../components/alignmentMixin';

class DeleteAccountModal extends React.Component {
  render() {
    const auth = FIREBASE_AUTH;
    const db = FIREBASE_DB;

    const {modalVisible, setModalVisible} = this.props;

    const getPassword = async () => {
      let password = '';

      const userSnapshot = await getDocs(collection(db, 'user'));
      for (const userDoc of userSnapshot.docs) {
        if (userDoc.data().userId === auth.currentUser.uid) {
          password = userDoc.data().password;
          await deleteDoc(doc(db, 'user', userDoc.id));
        }
      }

      return password;
    };

    const reauthenticateUser = async currentPassword => {
      const user = auth.currentUser;

      // Create a credential with the user's current email and password
      const credential = EmailAuthProvider.credential(
        user.email,
        currentPassword,
      );

      try {
        // Reauthenticate the user with the provided credential
        await reauthenticateWithCredential(user, credential);
        console.log('User reauthenticated successfully');
        return true; // Reauthentication successful
      } catch (error) {
        console.error('Error reauthenticating user:', error);
        return false; // Reauthentication failed
      }
    };

    return (
      <Modal transparent={true} visible={modalVisible}>
        <View style={styles.modalbackground}>
          <View style={styles.modalcontainer}>
            <View style={styles.modalcontentheader}>
              <icons.Trash size={30} color="#FF8700" strokeWidth={3} />
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
                  onPress={async () => {
                    setModalVisible(false);
                    // Reauthenticate user
                    const isReauthenticated = await reauthenticateUser(
                      await getPassword(),
                    );
                    // Delete the user account if reauthentication is successful
                    if (isReauthenticated) {
                      deleteUser(auth.currentUser)
                        .then(() => {
                          console.log('User deleted');
                        })
                        .catch(error => {
                          console.log(error);
                        });
                    }
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
    top: '15%',
    backgroundColor: constants.$textColor2,
    margin: '12%',
    padding: '10%',
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
    ...alignmentMixin.align,
    backgroundColor: constants.$backgroundColor,
    flexDirection: 'column',
  },
  contentbody: {
    marginTop: '2%',
    fontSize: 18,
    color: constants.$secondaryColor,
    fontWeight: '400',
    lineHeight: 24,
    fontFamily: constants.$fontFamily,
  },
  logoutText: {
    marginLeft: '5%',
    fontSize: 20,
    paddingVertical: 10,
    color: constants.$octonaryColor,
    fontWeight: '400',
    fontFamily: constants.$fontFamily,
  },
  modalcontentbuttons: {
    backgroundColor: constants.$backgroundColor,
    flexDirection: 'row',
    marginTop: 20,
    marginLeft: 30,
    padding: 10,
  },
  confirmbutton: {
    backgroundColor: constants.$textColor2,
    padding: 10,
    borderRadius: 20,
    margin: '2%',
    borderRadius: 25,
    borderWidth: 2,
    borderColor: constants.$senaryColor,
    padding: '7%',
  },
  rejectbutton: {
    backgroundColor: constants.$octonaryColor,
    padding: 10,
    borderRadius: 25,
    margin: '2%',
    fontFamily: constants.$fontFamily,
    padding: '7%',
  },
  confirmbuttonText: {
    ...alignmentMixin.alignment,
    color: constants.$octonaryColor,
    fontSize: 16,
    fontWeight: '500',
    fontFamily: constants.$fontFamily,
  },
  rejectbuttonText: {
    ...alignmentMixin.alignment,
    color: constants.$textColor2,
    fontSize: 16,
    fontWeight: '500',
    fontFamily: constants.$fontFamily,
  },
});

export default DeleteAccountModal;
