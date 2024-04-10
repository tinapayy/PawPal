import React, {useState, useEffect} from 'react';
import {NavigationContainer, ParamListBase} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Dimensions, LogBox, Platform, Text, View} from 'react-native';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import {RouteProp} from '@react-navigation/native';
import * as icons from '../Pawpal/src/imports/icons/icons';
import * as import_screens from '../PawPal/src/imports/import_screens/import_screens';
import {getDocs, collection} from 'firebase/firestore';
import {FIREBASE_AUTH, FIREBASE_DB} from './firebase.config';
import constants from '../PawPal/src/styles/constants';
// import Slider from './src/components/slider';
// import slidePet from './src/components/slider';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const android = Platform.OS === 'android';

const menuIcons = (
  route: RouteProp<ParamListBase, keyof ParamListBase>,
  focused: boolean,
) => {
  let icon;

  //navigation routes and corresponding icons
  if (route.name === 'Home') {
    icon = focused ? (
      <icons.HomeSolid size="30" color={constants.$senaryColor} />
    ) : (
        <icons.HomeSolid size="30" strokeWidth={2} color={constants.$secondaryColor} />
    );
  } else if (route.name === 'Chat') {
    icon = focused ? (
      <icons.ChatBubbleLeftSolid size="30" color={constants.$senaryColor} />
    ) : (
        <icons.ChatBubbleLeftSolid size="30" strokeWidth={2} color={constants.$secondaryColor} />
    );
  } else if (route.name === 'Create Post') {
    icon = focused ? (
      <icons.PlusCircleSolid size="30" color={constants.$senaryColor} />
    ) : (
        <icons.PlusCircleSolid size="30" strokeWidth={2} color={constants.$secondaryColor} />
    );
  } else if (route.name === 'Forum') {
    icon = focused ? (
      <icons.ForumSolid size="30" color={constants.$senaryColor} />
    ) : (
        <icons.ForumSolid size="30" strokeWidth={2} color={constants.$secondaryColor} />
    );
  } else if (route.name === 'Profile Details') {
    icon = focused ? (
      <icons.UserSolid size="30" color={constants.$senaryColor} />
    ) : (
        <icons.UserSolid size="30" strokeWidth={3} color={constants.$secondaryColor} />
    );
  }

  let buttonClass = focused ? 'bg-white' : '';
  return (
    <View
      key={route.name}
      className={'flex items-center rounded-full p-3 shadow ' + buttonClass}>
      {icon}
    </View>
  );
};

function HomeTabs() {
  const auth = FIREBASE_AUTH;
  const db = FIREBASE_DB;

  const [userType, setUserType] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'user'));
        querySnapshot.forEach(doc => {
          if (doc.data().userId === auth.currentUser?.uid) {
            setUserType(doc.data().userType);
          }
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarIcon: ({focused}) => menuIcons(route, focused),
        tabBarStyle: {
          marginBottom: 0,
          height: 75,
          alignItems: 'center',
          backgroundColor: 'white',
        },
        tabBarItemStyle: {
          marginTop: android ? 10 : 0,
        },
      })}>
        {/* bottom navigation bars and corresponding screens*/}
      <Tab.Screen name="Home" component={import_screens.HomePage} />
      <Tab.Screen name="Chat" component={import_screens.MessagePage} />
      <Tab.Screen name="Create Post" component={import_screens.CreatePost} />
      <Tab.Screen name="Forum" component={import_screens.ForumPage} />
      <Tab.Screen
        name="Profile Details"
        component={userType === 'petOwner' ? import_screens.ProfileDetails : import_screens.ClinicProfile}
      />
    </Tab.Navigator>
  );
}

//navigation stack

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          contentStyle: {backgroundColor: 'white'},
        }}>
        {/* <Stack.Screen name="Home" options={{ headerShown: false }} component={HomeTabs} />
        <Stack.Screen name="Product" options={{ headerShown: false }} component={Homesamp} /> */}
        <Stack.Screen
          name="GettingStarted"
          component={import_screens.GettingStarted}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="GettingStarted2"
          component={import_screens.GettingStarted2}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SignUp"
          component={import_screens.SignUp}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AddUserProfile"
          component={import_screens.AddUserProfile}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Add New Pet Profile"
          component={import_screens.AddPetProfileSignUp}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AddClinicDetails"
          component={import_screens.AddClinicDetails}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="EditClinicDetails"
          component={import_screens.EditClinicDetails}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SignIn"
          component={import_screens.SignIn}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="HomePage"
          component={HomeTabs}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ProfileDetails"
          component={import_screens.ProfileDetails}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SettingsPage"
          component={import_screens.SettingsPage}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="EditUserProfile"
          component={import_screens.EditUserProfile}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Add Pet Profile"
          component={import_screens.AddPetProfile}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Edit Pet Profile"
          component={import_screens.EditPetProfile}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ChoosePet"
          component={import_screens.ChoosePet}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ForumPage"
          component={import_screens.ForumPage}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="PopularClinics"
          component={import_screens.PopularClinics}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="MessagePage"
          component={import_screens.MessagePage}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Chat"
          component={import_screens.Chat}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="NewMessage"
          component={import_screens.NewMessage}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="FoodAdvisable"
          component={import_screens.FoodAdvisable}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="FoodRestricted"
          component={import_screens.FoodRestricted}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ResultsPage"
          component={import_screens.ResultsPage}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ClinicProfile"
          component={import_screens.ClinicProfile}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ClinicProfileforCards"
          component={import_screens.ClinicProfileforCards}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SettingsPage_Clinic"
          component={import_screens.SettingsPage_Clinic}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ApprovalPage"
          component={import_screens.Approval_page}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AdminForumPage"
          component={import_screens.AdminForumPage}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

LogBox.ignoreLogs(['ReactImageView: Image source "null" doesn\'t exist']);
