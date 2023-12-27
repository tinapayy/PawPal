import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Dimensions, LogBox, Platform, Text, View } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

import {
  HomeIcon as HomeSolid,
  ChatBubbleOvalLeftEllipsisIcon as ChatBubbleLeftSolid,
  PlusCircleIcon as PlusCircleSolid,
  ChatBubbleLeftRightIcon as ForumSolid,
  UserIcon as UserSolid
} from 'react-native-heroicons/solid';

import Homesamp from './screens/Homesamp';
import Detailsamp from './screens/Detailsamp';
import ClinicProfile from './src/screens/ClinicProfile';
import ForumPage from './src/screens/ForumPage';
import PetProfile from './src/screens/PetProfile';
import ProfileDetails from './src/screens/ProfileDetails';
import MessagePage from './src/screens/MessagePage';
import HomePage from './src/screens/HomePage';


import SignIn from './src/screens/SignIn';
import GettingStarted from './src/screens/GettingStarted';
import GettingStarted2 from './src/screens/GettingStarted2';
import SignUp from './src/screens/SignUp';
import ClinicDetails from './src/screens/ClinicDetails';
import UserProfile from './src/screens/UserProfile';

import PopularClinics from './src/screens/PopularClinics';
import Chat from './src/screens/Chat';
import SettingsPage from './src/screens/SettingsPage';
import ResultsPage from './src/screens/ResultsPage';
import Onboarding from './src/screens/Onboarding';
import FoodAdvisable from './src/screens/FoodAdvisable';
import FoodRestricted from './src/screens/FoodRestricted';
import ChoosePet from './src/screens/ChoosePet';
import NewMessage from './src/screens/NewMessage';

// import Slider from './src/components/slider';
// import slidePet from './src/components/slider';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const android = Platform.OS === 'android';

const menuIcons = (route, focused) => {
  let icon;

  if (route.name === 'home') {
    icon = focused ? <HomeSolid size="30" color={'#FF8D4D'} /> : <HomeSolid size="30" strokeWidth={2} color="#5A2828" />;
  } else if (route.name === 'favourite') {
    icon = focused ? <ChatBubbleLeftSolid size="30" color={'#FF8D4D'} /> : <ChatBubbleLeftSolid size="30" strokeWidth={2} color="#5A2828" />;
  } else if (route.name === 'cart') {
    icon = focused ? <PlusCircleSolid size="30" color={'#FF8D4D'} /> : <PlusCircleSolid size="30" strokeWidth={2} color="#5A2828" />;
  } else if (route.name === 'ca') {
    icon = focused ? <ForumSolid size="30" color={'#FF8D4D'} /> : <ForumSolid size="30" strokeWidth={2} color="#5A2828" />;
  } else if (route.name === 'car') {
    icon = focused ? <UserSolid size="30" color={'#FF8D4D'} /> : <UserSolid size="30" strokeWidth={3} color="#5A2828" />;
  }

  let buttonClass = focused ? "bg-white" : "";
  return (
    <View key={route.name} className={"flex items-center rounded-full p-3 shadow " + buttonClass}>
      {icon}
    </View>
  );
};

function HomeTabs() {
  return (
    <Tab.Navigator screenOptions={({ route }) => ({
      headerShown: false,
      tabBarShowLabel: false,
      tabBarIcon: ({ focused }) => menuIcons(route, focused),
      tabBarStyle: {
        marginBottom: 0,
        height: 75,
        alignItems: 'center',
        backgroundColor: 'white',
      },
      tabBarItemStyle: {
        marginTop: android ? 10 : 0,
      }
    })}>
      <Tab.Screen name="home" component={HomePage} />
      <Tab.Screen name="favourite" component={MessagePage} />
      <Tab.Screen name="cart" component={Homesamp} />
      <Tab.Screen name="ca" component={ForumPage} />
      <Tab.Screen name="car" component={ProfileDetails} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        contentStyle: { backgroundColor: 'white' }
      }}>
        <Stack.Screen name="Home" options={{ headerShown: false }} component={HomeTabs} />
        <Stack.Screen name="Product" options={{ headerShown: false }} component={Homesamp} />
        <Stack.Screen
          name="GettingStarted"
          component={GettingStarted}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="GettingStarted2"
          component={GettingStarted2}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="UserProfile"
          component={UserProfile}
          options={{ headerShown: true}}
        // component={HomeTabs}
        />
        <Stack.Screen
          name="PetProfile"
          component={PetProfile}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="ClinicDetails"
          component={ClinicDetails}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="SignIn"
          component={SignIn}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="HomePage"
          component={HomePage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ProfileDetails"
          component={ProfileDetails}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="SettingsPage"
          component={SettingsPage}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="ChoosePet"
          component={ChoosePet}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="ForumPage"
          component={ForumPage}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="PopularClinics"
          component={PopularClinics}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="MessagePage"
          component={MessagePage}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="Chat"
          component={Chat}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="NewMessage"
          component={NewMessage}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="FoodAdvisable"
          component={FoodAdvisable}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="FoodRestricted"
          component={FoodRestricted}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="ResultsPage"
          component={ResultsPage}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="ClinicProfile"
          component={ClinicProfile}
          options={{ headerShown: true }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}