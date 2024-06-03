import React from 'react';
import {View, Text, Modal, StyleSheet, TouchableOpacity} from 'react-native';
import {ArrowRightOnRectangleIcon as ExitIcon} from 'react-native-heroicons/solid';
import {FIREBASE_AUTH} from '../../firebase.config';
import constants from '../styles/constants';
import {alignmentMixin} from '../components/alignmentMixin';

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
    top: '20%',
    backgroundColor: constants.$textColor2,
    margin: '12%',
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
    ...alignmentMixin.alignment1,
    backgroundColor: constants.$backgroundColor,
  },
  contentbody: {
    marginTop: '2%',
    fontSize: 20,
    color: constants.$secondaryColor,
    fontWeight: '400',
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
    borderRadius: 25,
    borderWidth: 2,
    borderColor: constants.$senaryColor,
    left: '90%',
  },
  rejectbutton: {
    backgroundColor: constants.$octonaryColor,
    padding: 10,
    borderRadius: 25,
    left: '70%',
    fontFamily: constants.$fontFamily,
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
    top: '8%',
    color: constants.$textColor2,
    fontSize: 16,
    fontWeight: '500',
    fontFamily: constants.$fontFamily,
  },
});

export default LogOutModal;
