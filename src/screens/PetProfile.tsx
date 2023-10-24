import React, {useState} from 'react';
import {RadioButton} from 'react-native-paper';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faArrowLeft,
  faUser,
  faPaw,
  faCalendar,
  faWeight,
  faPalette,
  faVenusMars,
  faCirclePlus,
} from '@fortawesome/free-solid-svg-icons';

const PetProfile = () => {
  const [petName, setPetName] = useState('');
  const [breed, setBreed] = useState('');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [color, setColor] = useState('');
  const [] = useState('');
  const [checked, setChecked] = useState('null');

  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity>
          <FontAwesomeIcon icon={faArrowLeft} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.backText}>Edit Pet Profile</Text>
      </View>
      <View>
        <Image
          source={require('./assets/UserIcon1.png')}
          style={styles.profileImage}
        />
        <TouchableOpacity style={styles.arrowAdd}>
          <FontAwesomeIcon icon={faCirclePlus} style={styles.arrowAdd} />
        </TouchableOpacity>
      </View>
      <View style={styles.formContainer}>
        <View style={styles.iconInputRow}>
          <FontAwesomeIcon icon={faUser} style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Pet Name"
            value={petName}
            onChangeText={text => setPetName(text)}
          />
        </View>
        <View style={styles.iconInputRow}>
          <FontAwesomeIcon icon={faPaw} style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Breed"
            value={breed}
            onChangeText={text => setBreed(text)}
          />
        </View>
        <View style={styles.iconInputRow}>
          <FontAwesomeIcon icon={faCalendar} style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Age"
            value={age}
            onChangeText={text => setAge(text)}
          />
        </View>
        <View style={styles.iconInputRow}>
          <FontAwesomeIcon icon={faWeight} style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Weight"
            value={weight}
            onChangeText={text => setWeight(text)}
          />
        </View>
        <View style={styles.iconInputRow}>
          <FontAwesomeIcon icon={faPalette} style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Color"
            value={color}
            onChangeText={text => setColor(text)}
          />
        </View>
        <View style={styles.iconInputRow}>
          <FontAwesomeIcon icon={faVenusMars} style={styles.malInput} />
          <Text style={styles.malefeminput}>Sex</Text>
          <View style={styles.radioButton} />
          {/* <RadioButton.Item
            label="Male"
            value="Male"
            status={checked === 'Male' ? 'checked' : 'unchecked'}
            onPress={() => setChecked('Male')}
          />
          <View>
            <View style={styles.radioButton} />
            <Text style={styles.input}>Male</Text>
            <RadioButton.Item
              label="Female"
              value="Female"
              status={checked === 'Female' ? 'checked' : 'unchecked'}
              onPress={() => setChecked('Female')}
              color="orange"
            />
          </View>
          <View style={styles.radioButton} />
          <Text style={styles.input}>Male</Text>
        </View> */}
          <RadioButton
            value="Male"
            status={checked === 'Male' ? 'checked' : 'unchecked'}
            onPress={() => setChecked('Male')}
            color="orange"
            uncheckedColor="gray"
          />
          <Text style={styles.maleinput}>Male</Text>
          <View style={{marginLeft: -20}} />
          <RadioButton
            value="Female"
            status={checked === 'Female' ? 'checked' : 'unchecked'}
            onPress={() => setChecked('Female')}
            color="orange"
            uncheckedColor="gray"
          />
          <Text style={styles.maleinput}>Female</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 70,
            left: 40,
          }}>
          <TouchableOpacity
            style={styles.saveButton}
            onPress={() => console.log('Save Changes')}
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
  maleinput: {
    flex: 1,
    alignItems: 'center',
    right: 15,
    paddingVertical: 10,
    color: 'gray',
    // position: 'absolute',
    top: -1,
    // marginLeft: 30,
    // // marginRight: 10,
    // paddingRight: 30,
    paddingLeft: 15,
    flexDirection: 'row',
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
  },
  malefeminput: {
    flex: 1,
    alignItems: 'center',
    left: 50,
    color: 'gray',
    // position: 'absolute',
    top: -1,
    // right: 100,
    // marginLeft: 30,
    marginRight: 30,
    // paddingRight: 30,
    flexDirection: 'row',
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
  },
  malInput: {
    flex: 1,
    alignItems: 'center',
    left: 40,
    color: 'orange',
    // position: 'absolute',
    top: 10,
    // marginLeft: 30,
    // // marginRight: 10,
    // paddingRight: 30,
    flexDirection: 'row',
    marginBottom: 20,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  backIcon: {
    color: 'orange',
    flexDirection: 'row',
    position: 'absolute',
    top: -89,
    left: 10,
    paddingRight: 30,
  },
  backText: {
    fontSize: 20,
    fontFamily: 'Poppins-Regular',
    color: 'orange',
    fontWeight: 'bold',
    marginLeft: 19,
    top: -95,
    left: 25,
  },
  profileImage: {
    top: -20,
    width: 150,
    height: 150,
    borderRadius: 75,
    alignSelf: 'center',
    marginBottom: 20,
  },
  arrowAdd: {
    color: 'orange',
    position: 'absolute',
    top: 37,
    bottom: 0,
    right: 62,
    paddingRight: 30,
    marginBottom: 90,
    paddingVertical: 40,
    // flexDirection: 'row',
  },
  formContainer: {
    marginTop: 30,
  },
  iconInputRow: {
    //adjust length of input
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    marginBottom: 10,
    right: 5,
    left: 25,
    width: 300,
  },
  icon: {
    color: 'orange',
    position: 'absolute',
    top: 10,
    marginLeft: 30,
    // marginRight: 10,
    paddingRight: 30,
    flexDirection: 'row',
  },
  input: {
    flex: 1,
    height: 40,
    borderBottomWidth: 2,
    borderBottomColor: 'orange',
    marginLeft: 20,
    // marginBottom: 20,
    paddingHorizontal: 40,
    paddingVertical: 10,
    width: 50,
    padding: 20,
    alignContent: 'center',
  },
  radioButton: {
    // borderRadius: 12,
    // borderColor: '#ffa500',
    // alignItems: 'center',
    // backgroundColor: 'orange',
    justifyContent: 'space-between',
    right: 30,
    // left: 300,
  },
  // radioButtonContainer: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   marginBottom: 40,
  // },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // alignItems: 'center',
    marginTop: 20,
    borderRadius: 40,
  },
  saveButton: {
    backgroundColor: 'orange',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 40,
  },
  cancelButton: {
    backgroundColor: 'gray',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 40,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    // paddingHorizontal: 10,
  },
});

export default PetProfile;
