import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import SignIn from './SignIn';
import GettingStarted from './GettingStarted';
import GettingStarted2 from './GettingStarted2';
import SignUp from './SignUp';
import ClinicProfile from './ClinicProfile';
import ClinicDetails from './ClinicDetails';
import UserProfile from './UserProfile';
import Approval_page from './Approval Page';
import FoodSuggestions from './FoodAdvisable';
import PopularClinics from './PopularClinics';
// import BottomNavBar from './BottomNavBar';
import PetProfile from './PetProfile';
import ProfileDetails from './ProfileDetails';
import MessagePage from './MessagePage';
import ForumPage from './ForumPage';
import Chat from './Chat';
import SettingsPage from './SettingsPage';
import ResultsPage from './ResultsPage';
import HomePage from './HomePage';
import Onboarding from './Onboarding';
import FoodRestricted from './FoodRestricted';
import FoodAdvisable from './FoodAdvisable';


const Stack = createStackNavigator();


export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
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
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="PetProfile"
                    component={PetProfile}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="ClinicDetails"
                    component={ClinicDetails}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="SignIn"
                    component={SignIn}
                    options={{ headerShown: true }}
                />
                <Stack.Screen
                    name="FoodAdvisable"
                    component={FoodAdvisable}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="FoodRestricted"
                    component={FoodRestricted}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
