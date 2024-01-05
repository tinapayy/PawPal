import * as React from 'react';
import { Appbar } from 'react-native-paper';
import { TouchableOpacity, View, Text, ScrollView, StyleSheet, Dimensions, Image} from 'react-native';

import { UserCircleIcon as UserIcon,
         ArrowLeftIcon as BackIcon,
         CheckCircleIcon as CheckIcon,
         XCircleIcon as XIcon,
         ChatBubbleLeftRightIcon as ForumSolid,
         ChatBubbleBottomCenterTextIcon as Bubble } from 'react-native-heroicons/solid';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faRightFromBracket} from '@fortawesome/free-solid-svg-icons';
import {useNavigation} from '@react-navigation/native';

// const handleCheck = () => {
//   console.log('Check button pressed');
// };

// const handleX = () => {
//   console.log('X button pressed');
// };

const data = [
  {
    id: 1,
    image: require('../images/userIcon2.png'),
    name: "Sample User 1",
    onTime: "3m ago",
    content: "Forum Content Goes Here..."
  },
  {
    id: 2,
    image: require('../images/userIcon2.png'),
    name: "Sample User 2",
    onTime: "40m ago",
    content: "Forum Content Goes Here..."
  },
  {
    id: 3,
    image: require('../images/userIcon2.png'),
    name: "Sample User 3",
    onTime: "54m ago",
    content: "Forum Content Goes Here..."
  },
  {
    id: 4,
    image: require('../images/userIcon2.png'),
    name: "Sample User 4",
    onTime: "1m ago",
    content: "Forum Content Goes Here..."
  },
  {
    id: 5,
    image: require('../images/userIcon2.png'),
    name: "Sample User 5",
    onTime: "30m ago",
    content: "Forum Content Goes Here..."
  },

];

const ForumCard = ({ data, onCheck, onX }) => {
  return (
    <View style={{ paddingTop: 16, backgroundColor: 'white', margin: 8, marginBottom: 25, position: 'relative', borderRadius: 30, elevation: 10 }}>
      <View style={{ backgroundColor: 'white', padding: 5, margin: 3, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
        <View>
          <Image source={data.image} style={{ width: 60, height: 60, borderRadius: 30 }} />
        </View>
        <View style={{ flexDirection: 'column', backgroundColor: 'ff8d4d', marginLeft: 5 }}>
          <View>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{data.name}</Text>
          </View>
          <View>
            <Text>{data.onTime}</Text>
          </View>
        </View>
      </View>
      <View style={{ backgroundColor: 'white', paddingBottom: 25, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 20, justifyContent: 'center' }}>{data.content}</Text>
      </View>
      <View style={{ backgroundColor: '#FFAC4E', flexDirection: 'row', borderBottomLeftRadius: 30, borderBottomRightRadius: 30 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', left: '30%' }}>
          <TouchableOpacity onPress={onCheck}>
            <CheckIcon size="40" color="white" stroke={'#4BD37B'} strokeWidth={2} />
          </TouchableOpacity>
          <TouchableOpacity onPress={onX}>
            <XIcon size="40" color="white" stroke={'#FF6464'} strokeWidth={2} style={{ left: 70 }} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const ApprovalPage = ({ navigation }) => {
  const _goBack = () => console.log('Went back');

  const handleCheck = () => {
    console.log('Check button pressed');
  };

  const handleX = () => {
    console.log('X button pressed');
  };

  return (
    <View style={{ width: Dimensions.get('window').width, height: Dimensions.get('window').height }}>
       <View style = {{flexDirection: 'row', justifyContent: 'space-between', margin: 20}}>
         <View style= {{flexDirection: 'row', right: '3%'}}>
          <TouchableOpacity onPress={() => {
            navigation.navigate('ForumPage');
                  }}>
            <Bubble size="33" color="brown" strokeWidth={0} stroke={"white"} style = {{right: '-5%',top: '15%'}}/>
          </TouchableOpacity>
          <Text style = {{color: '#ff8d4d', fontSize: 28, fontFamily: 'Poppins-SemiBold', left: '110%'}}>
            Approval Page
          </Text>

        </View>
        <TouchableOpacity onPress={() => {
            navigation.navigate('GettingStarted');
                  }}>
          <FontAwesomeIcon icon={faRightFromBracket} size = {30} style= {{color: 'brown', right: '-15%', top: '15%'}}/>
        </TouchableOpacity>

      </View>
      <ScrollView style={{ width: Dimensions.get('window').width, height: Dimensions.get('window').height }}>
        {data.map((item) => (
          <ForumCard key={item.id} data={item} onCheck={handleCheck} onX={handleX} />
        ))}
      </ScrollView>
    </View>
  );
};

export default ApprovalPage;

const styles = StyleSheet.create({
  container: {
    paddingTop: 16,
    backgroundColor: 'white',
    margin: 8,
    marginBottom: 25,
    position: 'relative',
    borderRadius: 30,
    elevation: 10
  },
  box: {
    backgroundColor: 'white',
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
    backgroundColor: 'white',
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
    backgroundColor: '#FFAC4E',
    flexDirection: 'row',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius:30,
  },
  buttons: {
    flexDirection: 'row', 
    justifyContent: 'space-between',
    left: '30%'

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
