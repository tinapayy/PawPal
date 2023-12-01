import * as React from 'react';
<<<<<<< Updated upstream
=======
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { createNativeStackNavigator } from "@react-navigation/native-stack";

>>>>>>> Stashed changes
import SignIn from './src/screens/SignIn';
import GettingStarted from './src/screens/GettingStarted';
import GettingStarted2 from './src/screens/GettingStarted2';
import SignUp from './src/screens/SignUp';
import ClinicProfile from './src/screens/ClinicProfile';
import UserProfile from './src/screens/UserProfile';
import Approval_page from './src/screens/Approval Page';
import FoodSuggestions from './src/screens/FoodAdvisable';
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
<<<<<<< Updated upstream


export default function App() {
  // return <GettingStarted/>;
  // return <GettingStarted2/>;
  // return <SignUp/>;
  // return <SignIn/>;
  // return <UserProfile/>;
  // return <ClinicProfile/>;
  // return <Approval_page/>;
  // return <BottomNavBar/>;
  // return <PetProfile />;
  // return <UserProfile />;





  return <FoodSuggestions/>;
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
=======
import Onboarding from './src/screens/Onboarding';
import FoodAdvisable from './src/screens/FoodAdvisable';
import FoodRestricted from './src/screens/FoodRestricted';


const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="FoodAdvisable" component={FoodAdvisable} />
        <Stack.Screen name="FoodRestricted" component={FoodRestricted} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
>>>>>>> Stashed changes
