import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import SignIn from './src/screens/SignIn';
import GettingStarted from './src/screens/GettingStarted';
import GettingStarted2 from './src/screens/GettingStarted2';
import SignUp from './src/screens/SignUp';
import ClinicProfile from './src/screens/ClinicProfile';
import UserProfile from './src/screens/UserProfile';
import Approval_page from './src/screens/Approval Page';
import FoodSuggestions from './src/screens/FoodSuggestions';
import PopularClinics from './src/screens/PopularClinics';
import BottomNavBar from './BottomNavBar';
import PetProfile from './src/screens/PetProfile';
import ProfileDetails from './src/screens/ProfileDetails';
import MessagePage from "./src/screens/MessagePage";
import ForumPage from "./src/screens/ForumPage";
import Chat from './src/screens/Chat';
import SettingsPage from './src/screens/SettingsPage';
import ResultsPage from './src/screens/ResultsPage';
import HomePage from './src/screens/HomePage';
import Onboarding from './src/screens/Onboarding';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="GettingStarted" component={GettingStarted} options={{ headerShown: false }}/>
        <Stack.Screen name="GettingStarted2" component={GettingStarted2} options={{ headerShown: false }}/>
        <Stack.Screen name="SignIn" component={SignIn} options={{ headerShown: true }}/>
        <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: true }}/>
        {/* Add more screens here */}
      </Stack.Navigator>
    </NavigationContainer>
  )
  //return <GettingStarted2/>;
  // return <SignUp/>;
  // return <SignIn/>;
  // return <UserProfile/>;
  // return <ClinicProfile/>;
  // return <Approval_page/>;
  // return <BottomNavBar/>;
  // return <PetProfile />;
  // return <UserProfile />;




  //return <FoodSuggestions/>;
  // return <PopularClinics/>;
  // return <BottomNavBar/>;

  // return <ProfileDetails />;
  // return <ForumPage />;
  // return <MessagePage />;

  // return <Chat/>;

  // return <SettingsPage/>;
  // return <ResultsPage/>;

  // return <HomePage/>;


}
