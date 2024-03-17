import React, {useState, useEffect} from 'react';
import {NavigationContainer, ParamListBase} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Dimensions, LogBox, Platform, Text, View} from 'react-native';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import {RouteProp} from '@react-navigation/native';

import {
  HomeIcon as HomeSolid,
  ChatBubbleOvalLeftEllipsisIcon as ChatBubbleLeftSolid,
  PlusCircleIcon as PlusCircleSolid,
  ChatBubbleLeftRightIcon as ForumSolid,
  UserIcon as UserSolid,
  MagnifyingGlassIcon as MagnifyingGlass,
  ChatBubbleBottomCenterTextIcon as Bubble,
} from 'react-native-heroicons/solid';

import * as import_screens from '../PawPal/src/imports/import_screens/import_screens'

import {getDocs, collection} from 'firebase/firestore';
import {FIREBASE_AUTH, FIREBASE_DB} from './firebase.config';

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

  if (route.name === 'home') {
    icon = focused ? (
      <HomeSolid size="30" color={'#FF8D4D'} />
    ) : (
      <HomeSolid size="30" strokeWidth={2} color="#5A2828" />
    );
  } else if (route.name === 'favourite') {
    icon = focused ? (
      <MagnifyingGlass
        size="29"
        stroke="#FF8D4D"
        strokeWidth={2}
        color={'#FF8D4D'}
      />
    ) : (
      <MagnifyingGlass
        size="29"
        stroke="#5A2828"
        strokeWidth={2}
        color="#5A2828"
      />
    );
  } else if (route.name === 'cart') {
    icon = focused ? (
      <PlusCircleSolid size="30" color={'#FF8D4D'} />
    ) : (
      <PlusCircleSolid size="30" strokeWidth={2} color="#5A2828" />
    );
  } else if (route.name === 'ca') {
    icon = focused ? (
      <ForumSolid size="30" color={'#FF8D4D'} />
    ) : (
      <ForumSolid size="30" strokeWidth={2} color="#5A2828" />
    );
  } else if (route.name === 'car') {
    icon = focused ? (
      <UserSolid size="30" color={'#FF8D4D'} />
    ) : (
      <UserSolid size="30" strokeWidth={3} color="#5A2828" />
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
      <Tab.Screen name="home" component={HomePage} />
      <Tab.Screen name="favourite" component={ResultsPage} />
      <Tab.Screen name="cart" component={CreatePost} />
      <Tab.Screen name="ca" component={ForumPage} />
      <Tab.Screen
        name="car"
        component={userType === 'petOwner' ? ProfileDetails : ClinicProfile}
      />
    </Tab.Navigator>
  );
}

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
          component={GettingStarted}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="GettingStarted2"
          component={GettingStarted2}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AddUserProfile"
          component={AddUserProfile}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Add New Pet Profile"
          component={AddPetProfileSignUp}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AddClinicDetails"
          component={AddClinicDetails}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="EditClinicDetails"
          component={EditClinicDetails}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SignIn"
          component={SignIn}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="HomePage"
          component={HomeTabs}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ProfileDetails"
          component={ProfileDetails}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SettingsPage"
          component={SettingsPage}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="EditUserProfile"
          component={EditUserProfile}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Add Pet Profile"
          component={AddPetProfile}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Edit Pet Profile"
          component={EditPetProfile}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ChoosePet"
          component={ChoosePet}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ForumPage"
          component={ForumPage}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="PopularClinics"
          component={PopularClinics}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="MessagePage"
          component={MessagePage}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Chat"
          component={Chat}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="NewMessage"
          component={NewMessage}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="FoodAdvisable"
          component={FoodAdvisable}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="FoodRestricted"
          component={FoodRestricted}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ResultsPage"
          component={ResultsPage}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ClinicProfile"
          component={ClinicProfile}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ClinicProfileforCards"
          component={ClinicProfileforCards}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SettingsPage_Clinic"
          component={SettingsPage_Clinic}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ApprovalPage"
          component={Approval_page}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AdminForumPage"
          component={AdminForumPage}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

LogBox.ignoreLogs(['ReactImageView: Image source "null" doesn\'t exist']);
