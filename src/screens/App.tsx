import React from "react";
import PawPalApp from './src/screens/ClinicDetails'
import ClinicProfile from './src/screens/ClinicProfile'
import CarouselExample from "./src/screens/HomePage"
import MyCarousel from "./src/screens/HomePage"
import HomePage from "./src/screens/HomePage"
import CreatePost from "./src/screens/CreatePost";
import Apps from "./src/screens/PopularClinics";
import FoodSuggestions from "./src/screens/FoodSuggestions";
import PopularClinics_Sprint4 from "./src/screens/PopularClinics_Sprint4";
import SettingsPage_Sprint4 from "./src/screens/SettingsPage_Sprint4";
import ProfileDetails_Sprint4 from "./src/screens/ProfileDetails_Sprint4";
import HomePage_Sprint4 from "./src/screens/HomePage_Sprint4";
import Prompt_sprint4 from "./src/screens/prompt_sprint4";
import ProfileDetails from "./src/screens/ProfileDetails";
import SettingsPage from "./src/screens/SettingsPage";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import ForumPage from "./src/screens/ForumPage";
import FoodRestricted from "./src/screens/FoodRestricted";
import FoodRestrictionPrompt from "./src/screens/FoodRestrictionPrompt";
import FoodAdvisable from "./src/screens/FoodAdvisable";

const Stack = createStackNavigator();

export default function App() {
  // return(
  //   <NavigationContainer>
  //     <Stack.Navigator>
  //       <Stack.Screen name = "PopularClinics" component = {Apps} options = {{ headerShown: false}}/>
  //       <Stack.Screen name = "ForumPage" component = {ForumPage} options = {{ headerShown: false}}/>
  //       <Stack.Screen name = "ProfileDetails" component = {ProfileDetails} options = {{ headerShown: false}}/>
  //       <Stack.Screen name = "FoodSuggestions" component = {FoodSuggestions} options = {{ headerShown: false}}/>
  //       <Stack.Screen name = "ClinicProfile" component = {ClinicProfile} options = {{ headerShown: false}}/>
  //       <Stack.Screen name = "SettingsPage" component = {SettingsPage} options = {{ headerShown: false}}/>
  //       <Stack.Screen name = "HomePage" component = {HomePage} options = {{ headerShown: false}}/>
  //       <Stack.Screen name = "FoodRestricted" component = {FoodRestricted} options = {{ headerShown: false}}/>
  //       <Stack.Screen name = "FoodAdvisable" component = {FoodAdvisable} options = {{ headerShown: false}}/>

  //     </Stack.Navigator>
  //   </NavigationContainer>
  // )
  // return <PawPalApp/>;
  // return <ClinicProfile/>;
  // return <MyCarousel/>;
  // return <HomePage/>;
  // return <CreatePost/>;
  // return <Apps/>;
  // return <FoodSuggestions/>;
  // return <PopularClinics_Sprint4/>;
  // return <SettingsPage_Sprint4/>;
  // return <ProfileDetails_Sprint4/>;
  // return <HomePage_Sprint4/>;
  // return <Prompt_sprint4/>;
  return <FoodRestricted/>;
  // return <FoodAdvisable/>;

}