import * as React from 'react';
import { SafeAreaView, FlatList, ScrollView, ImageBackground, Text, StyleSheet, View, Image, Dimensions, TouchableOpacity } from 'react-native';
import { SegmentedButtons } from 'react-native-paper';
import {ArrowLeftIcon as BackIcon} from 'react-native-heroicons/solid';
import { LinearGradient } from 'react-native-svg';

const FoodSuggestions = () => {
const appleImage = require('../images/apple.jpg');
const broccoliImage = require('../images/broccoli.jpg');
const chickenImage = require('../images/chicken.jpg');
const carrotImage = require('../images/carrots.jpg');
const salmonImage = require('../images/salmon.jpg');
const bananasImage = require('../images/bananas.jpg');
const eggsImage = require('../images/eggs.jpg');
const breadImage = require('../images/bread.jpg');

const foodData = [
  {
    key: 'apple',
    name: 'Apple',
    imageUrl: appleImage,
    description: 'A nutritious and delicious fruit.',
  },
  {
    key: 'broccoli',
    name: 'Broccoli',
    imageUrl: broccoliImage,
    description: 'A green vegetable packed with vitamins.',
  },
  {
    key: 'chicken',
    name: 'Chicken',
    imageUrl: chickenImage,
    description: 'A nutritious and delicious fruit.',
  },
  {
    key: 'carrot',
    name: 'Carrot',
    imageUrl: carrotImage,
    description: 'A nutritious and delicious fruit.',
  },
  {
    key: 'salmon',
    name: 'Salmon',
    imageUrl: salmonImage,
    description: 'A nutritious and delicious fruit.',
  },
  {
    key: 'banana',
    name: 'Banana',
    imageUrl: bananasImage,
    description: 'A nutritious and delicious fruit.',
  },
  {
    key: 'eggs',
    name: 'Eggs',
    imageUrl: eggsImage,
    description: 'A nutritious and delicious fruit.',
  },
  {
    key: 'bread',
    name: 'Bread',
    imageUrl: breadImage,
    description: 'A nutritious and delicious fruit.',
  },
  // Add more food items with local image paths here
];


  const [value, setValue] = React.useState('');
  const _goBack = () => console.log('Went back');
  return (
    <SafeAreaView style={styles.bigcontainer}>
    <TouchableOpacity style={styles.backButton} onPress={_goBack}>
          <BackIcon size="24" color="white" strokeWidth={3}/>
        </TouchableOpacity>
    <View style={styles.header}>
      <Image
        source={require('../images/PawpalHeader.png')}
        style={styles.headerImage}
      />
    </View>
    <Text style={styles.text}>Food Suggestions</Text>
    <SafeAreaView style={styles.container}>
      <SegmentedButtons
        value={value}
        onValueChange={setValue}
        buttons={[
          {
            value: 'Advisable',
            label: 'Advisable',

          },
          {
            value: 'Restricted',
            label: 'Restricted',
          },
        ]}
      />
        </SafeAreaView>
    <View style={styles.scrollContainer}>
    <FlatList
      data={foodData}
      numColumns={2} // Set the number of columns to 2
      contentContainerStyle={styles.container3}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <ImageBackground source={item.imageUrl} style={styles.image} />
          <View style={styles.textbox}>
            <Text style={[styles.label, styles.textOverlay]}>{item.name}</Text>
            <Text style={[styles.description, styles.textOverlay]}>{item.description}</Text>
            </View>
          </View>
      )}
    />
    </View>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    top: -720,
    width: 380,
    alignSelf: 'center',
  },
  container2: {
    alignItems: 'center',
    top: -700,
    width: 400,
    alignSelf: 'center',
  },
  headerImage:{
    width: Dimensions.get('window').width, 
    height: Dimensions.get('window').height, 
    resizeMode: 'contain', 
    top: -275,
    zIndex: -1
  },
  backButton:{
    top:12,
    left: 10,
  },
  text: {  
    fontSize: 24,
    fontFamily: 'Poppins-SemiBold',
    top: -730,
    letterSpacing: 0.25,
    color: '#5A2828',
    alignSelf: 'center',
  },
  scrollContainer: {
    top: 250,
    position: 'absolute',
    height:600
  },
  container3: {
    padding: 16,
    
  },
  card: {
    width: '50%', // Each card takes up 50% of the container's width
    position: 'relative', // To position the text overlay
    padding: 5,
    height: 160,
  },
  image: {
    width: '100%',
    height: 150,
    flex:1,
  },
  textOverlay: {
    color: 'white',
    position: 'relative',
    top: 10,
    height: 33,
    marginLeft: 10,
    marginTop:-5,

    },
  textbox: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    height:80,
    position: 'relative',
    overflow: 'hidden',



  },
  // textOverlay: {
  //   position: 'absolute',
  //   overflow: 'hidden',
  //   width: '100%',
  //   height: '100%',
  //   padding: 10,
  //   justifyContent: 'flex-end',
  // },
  label: {
    color: '#fff',
    fontSize: 20,
    elevation: 1,
    fontFamily: 'Poppins-SemiBold',
  },
  description: {
    color: '#fff',
    fontSize: 14,
    elevation: 30
  },
});

export default FoodSuggestions;