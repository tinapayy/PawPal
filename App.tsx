import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import SignIn from './src/screens/SignIn';
import GettingStarted from './src/screens/GettingStarted';
import GettingStarted2 from './src/screens/GettingStarted2';
import SignUp from './src/screens/SignUp';
import ClinicProfile from './src/screens/ClinicProfile';
import ClinicDetails from './src/screens/ClinicDetails';
import UserProfile from './src/screens/UserProfile';
import Approval_page from './src/screens/Approval Page';
import FoodSuggestions from './src/screens/FoodSuggestions';
import PopularClinics from './src/screens/PopularClinics';
import BottomNavBar from './BottomNavBar';
import PetProfile from './src/screens/PetProfile';
import ProfileDetails from './src/screens/ProfileDetails';
import MessagePage from './src/screens/MessagePage';
import ForumPage from './src/screens/ForumPage';
import Chat from './src/screens/Chat';
import SettingsPage from './src/screens/SettingsPage';
import ResultsPage from './src/screens/ResultsPage';
import HomePage from './src/screens/HomePage';
import Onboarding from './src/screens/Onboarding';

//gleez
import FoodAdvisable from './src/screens/FoodAdvisable';
import FoodRestricted from './src/screens/FoodRestricted';
import ChoosePet from './src/screens/ChoosePet';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
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
          name="UserProfile"
          component={UserProfile}
          options={{headerShown: true}}
        />
        <Stack.Screen
          name="PetProfile"
          component={PetProfile}
          options={{headerShown: true}}
        />
        <Stack.Screen
          name="ClinicDetails"
          component={ClinicDetails}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SignIn"
          component={SignIn}
          options={{headerShown: true}}
        />
        <Stack.Screen
          name="HomePage"
          component={HomePage}
          options={{headerShown: false}}
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
  );
}
