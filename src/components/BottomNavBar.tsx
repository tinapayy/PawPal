import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Dimensions, LogBox, Platform, Text, View } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import {HomeIcon as HomeSolid, 
        ChatBubbleOvalLeftEllipsisIcon as ChatBubbleLeftSolid, 
        PlusCircleIcon as PlusCircleSolid,
        ChatBubbleLeftRightIcon as ForumSolid, 
        UserIcon as UserSolid, 
        MagnifyingGlassCircleIcon as MagnifyingGlass,
        ChatBubbleBottomCenterTextIcon as Bubble
     } from 'react-native-heroicons/solid'; 

import Homesamp from '../../screens/Homesamp';
import Detailsamp from '../../screens/Detailsamp';
import ClinicProfile from '../screens/ClinicProfile';  
import ForumPage from '../screens/ForumPage';
import PetProfile from '../screens/PetProfile';  
import ProfileDetails from '../screens/ProfileDetails';
import MessagePage from '../screens/MessagePage';
import HomePage from '../screens/HomePage';
import CreatePost from '../screens/CreatePost';
import ResultsPage from '../screens/ResultsPage';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const android = Platform.OS == 'android';
LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

export default function BottomNavBar(){
    return(
      <NavigationContainer>
      <Stack.Navigator screenOptions={{
        contentStyle: {backgroundColor: 'white'}
      }}>
        <Stack.Screen name="Home" options={{headerShown: false}} component={HomeTabs} />
        <Stack.Screen name="Product" options={{headerShown: false}} component={Homesamp} />
      </Stack.Navigator>
      </NavigationContainer>
    )
  }

  function HomeTabs(){
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
            marginTop: android? 10: 0,
            
          }
        })}
        
        >
        <Tab.Screen name="home" component={HomePage} />
        <Tab.Screen name="favourite" component={ResultsPage} />
        <Tab.Screen name="cart" component={CreatePost} />
        <Tab.Screen name="ca" component={MessagePage}/>
        <Tab.Screen name="car" component={ProfileDetails} />
      </Tab.Navigator>
    )
  }
  
  const menuIcons = (route, focused)=> {
    let icon;
    
  
    if (route.name === 'home') {
      icon =  focused? <HomeSolid size="30" color={'#FF8D4D'} /> : <HomeSolid size="30" strokeWidth={2} color="#5A2828" />
    } else if (route.name === 'favourite') {
      icon =  focused? <MagnifyingGlass size="30" stroke="#5A2828" color={'#FF8D4D'} /> : <MagnifyingGlass size="30" stroke="#5A2828" strokeWidth={2} color="#5A2828" />
    }else if(route.name==='cart'){
      icon =  focused? <PlusCircleSolid size="30" color={'#FF8D4D'} /> : <PlusCircleSolid size="30" strokeWidth={2} color="#5A2828" />
    }else if(route.name==='ca'){
      icon =  focused? <ForumSolid size="30" color={'#FF8D4D'} /> : <ForumSolid size="30" strokeWidth={2} color="#5A2828" />
    }else if(route.name==='car'){
      icon =  focused? <UserSolid size="30" color={'#FF8D4D'} /> : <UserSolid size="30" strokeWidth={3} color="#5A2828" />
    }
 
    let buttonClass = focused? "bg-white": "";
    return (
      <View className={"flex items-center rounded-full p-3 shadow " + buttonClass}>
        {icon}
      </View>
  )
}