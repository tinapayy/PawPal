import * as React from 'react';
import { Appbar } from 'react-native-paper';
import { TouchableOpacity, View, Text, ScrollView, StyleSheet} from 'react-native';

import { UserCircleIcon as UserIcon,
         ArrowLeftIcon as BackIcon,
         CheckCircleIcon as CheckIcon,
         XCircleIcon as XIcon } from 'react-native-heroicons/solid';

const handleCheck = () => {
  console.log('Check button pressed');
};

const handleX = () => {
  console.log('X button pressed');
};


export default function Approval_page (){
  const _goBack = () => console.log('Went back');
  return(
    <View>
      <Appbar.Header>
        <TouchableOpacity onPress={_goBack}>
          <BackIcon size="24" color="#ff8d4d" strokeWidth={3}/>
        </TouchableOpacity>
        <Appbar.Content title="Approval Page" />
      </Appbar.Header>

      <ScrollView>
          <View style={styles.container}>
          <View style={styles.usercontainer}>
              <TouchableOpacity onPress={_goBack}>
                <UserIcon size="60" color="#000000" strokeWidth={3}/>
              </TouchableOpacity>
            <View style={styles.user}>
              <View>
                <Text style={styles.username}>Sample User 1</Text>
              </View>
              <View>
                <Text>3m ago</Text>
              </View>
            </View>
          </View>
          <View style={styles.box}>
            <Text style={styles.forumcontent}>Forum content goes here.</Text>
          </View>
          <View style={styles.choosebuttons}>
            <View style={styles.radioButtonContainer}>
              <TouchableOpacity onPress={() => {}} style={styles.radioButton}>
                <View style={styles.radioButtonIcon} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {}}>
                <Text style={styles.radioButtonText}>Urgent</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.buttons}>
              <TouchableOpacity onPress={_goBack}>
                <CheckIcon size="40" color="#4BD37B" strokeWidth={3}/>
              </TouchableOpacity>
              <TouchableOpacity onPress={_goBack}>
                <XIcon size="40" color="#FF6464" strokeWidth={3}/>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.container}>
          <View style={styles.usercontainer}>
              <TouchableOpacity onPress={_goBack}>
                <UserIcon size="60" color="#000000" strokeWidth={3}/>
              </TouchableOpacity>
            <View style={styles.user}>
              <View>
                <Text style={styles.username}>Sample User 2</Text>
              </View>
              <View>
                <Text>40m ago</Text>
              </View>
            </View>
          </View>
          <View style={styles.box}>
            <Text style={styles.forumcontent}>Forum content goes here.</Text>
          </View>
          <View style={styles.choosebuttons}>
            <View style={styles.radioButtonContainer}>
              <TouchableOpacity onPress={() => {}} style={styles.radioButton}>
                <View style={styles.radioButtonIcon} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {}}>
                <Text style={styles.radioButtonText}>Urgent</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.buttons}>
              <TouchableOpacity onPress={_goBack}>
                <CheckIcon size="40" color="#4BD37B" strokeWidth={3}/>
              </TouchableOpacity>
              <TouchableOpacity onPress={_goBack}>
                <XIcon size="40" color="#FF6464" strokeWidth={3}/>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.container}>
          <View style={styles.usercontainer}>
              <TouchableOpacity onPress={_goBack}>
                <UserIcon size="60" color="#000000" strokeWidth={3}/>
              </TouchableOpacity>
            <View style={styles.user}>
              <View>
                <Text style={styles.username}>Sample User 3</Text>
              </View>
              <View>
                <Text>1h ago</Text>
              </View>
            </View>
          </View>
          <View style={styles.box}>
            <Text style={styles.forumcontent}>Forum content goes here.</Text>
          </View>
          <View style={styles.choosebuttons}>
            <View style={styles.radioButtonContainer}>
              <TouchableOpacity onPress={() => {}} style={styles.radioButton}>
                <View style={styles.radioButtonIcon} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {}}>
                <Text style={styles.radioButtonText}>Urgent</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.buttons}>
              <TouchableOpacity onPress={_goBack}>
                <CheckIcon size="40" color="#4BD37B" strokeWidth={3}/>
              </TouchableOpacity>
              <TouchableOpacity onPress={_goBack}>
                <XIcon size="40" color="#FF6464" strokeWidth={3}/>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.container}>
          <View style={styles.usercontainer}>
              <TouchableOpacity onPress={_goBack}>
                <UserIcon size="60" color="#000000" strokeWidth={3}/>
              </TouchableOpacity>
            <View style={styles.user}>
              <View>
                <Text style={styles.username}>Sample User 4</Text>
              </View>
              <View>
                <Text>2h ago</Text>
              </View>
            </View>
          </View>
          <View style={styles.box}>
            <Text style={styles.forumcontent}>Forum content goes here.</Text>
          </View>
          <View style={styles.choosebuttons}>
            <View style={styles.radioButtonContainer}>
              <TouchableOpacity onPress={() => {}} style={styles.radioButton}>
                <View style={styles.radioButtonIcon} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {}}>
                <Text style={styles.radioButtonText}>Urgent</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.buttons}>
              <TouchableOpacity onPress={_goBack}>
                <CheckIcon size="40" color="#4BD37B" strokeWidth={3}/>
              </TouchableOpacity>
              <TouchableOpacity onPress={_goBack}>
                <XIcon size="40" color="#FF6464" strokeWidth={3}/>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.container}>
          <View style={styles.usercontainer}>
              <TouchableOpacity onPress={_goBack}>
                <UserIcon size="60" color="#000000" strokeWidth={3}/>
              </TouchableOpacity>
            <View style={styles.user}>
              <View>
                <Text style={styles.username}>Sample User 5</Text>
              </View>
              <View>
                <Text>3h ago</Text>
              </View>
            </View>
          </View>
          <View style={styles.box}>
            <Text style={styles.forumcontent}>Forum content goes here.</Text>
          </View>
          <View style={styles.choosebuttons}>
            <View style={styles.radioButtonContainer}>
              <TouchableOpacity onPress={() => {}} style={styles.radioButton}>
                <View style={styles.radioButtonIcon} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {}}>
                <Text style={styles.radioButtonText}>Urgent</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.buttons}>
              <TouchableOpacity onPress={_goBack}>
                <CheckIcon size="40" color="#4BD37B" strokeWidth={3}/>
              </TouchableOpacity>
              <TouchableOpacity onPress={_goBack}>
                <XIcon size="40" color="#FF6464" strokeWidth={3}/>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
    
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 16,
    backgroundColor: '#FFAC4E',
    margin: 8,
    marginBottom: 25,
    position: 'relative',
    borderRadius: 30,
  },
  box: {
    backgroundColor: '#FFAC4E',
    paddingBottom: 25,
    flexDirection: 'row', 
    justifyContent: 'center', 
    alignItems: 'center', 
  },
  forumcontent: {
    fontSize: 20,
    justifyContent: 'center',
  },

  usercontainer: {
    backgroundColor: '#FFAC4E',
    padding: 5,
    margin: 3,
    flexDirection: 'row', 
    justifyContent: 'flex-start', 
    alignItems: 'center', 
  },
  user: {
    flexDirection: 'column',
    backgroundColor: 'ff8d4d',
    marginLeft: 5,
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  choosebuttons: {
    backgroundColor: 'white',
    flexDirection: 'row',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius:30,
  },
  buttons: {
    justifyContent: 'flex-end',
    flexDirection: 'row', 
    marginLeft: 145,
  },
  button: {
    minWidth: 80,
    marginHorizontal: 4, 
    borderRadius: 40,
  },

  radioButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 45,
    marginLeft: 25,
  },
  radioButton: {
    height: 20,
    width: 20,
    backgroundColor: "#F8F8F8",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E6E6E6",
    alignItems: "center",
    justifyContent: "center"
  },
  radioButtonIcon: {
    height: 16,
    width: 16,
    borderRadius: 7,
    backgroundColor: "#FF8700"
  },
  radioButtonText: {
    fontSize: 16,
    marginLeft: 16
  }
});
