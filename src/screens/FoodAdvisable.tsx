import * as React from 'react';
import {
  SafeAreaView,
  FlatList,
  ImageBackground,
  Text,
  StyleSheet,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  Modal,
  ViewStyle,
  TextStyle,
} from 'react-native';
import {SegmentedButtons} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import * as icons from '../imports/icons/icons';
import constants from '../styles/constants';
import {buttonMixin} from '../components/buttonMixin';
import {alignmentMixin} from '../components/alignmentMixin';
import {useNavigateTo} from '../components/navigation';

interface SegmentedButtonsProps {
  value: string;
  onValueChange: (value: string) => void;
  buttons: {value: string; label: string}[];
}
interface FoodItemDetails {
  glutenFree: boolean;
  containsSodium: boolean;
  amountOfSugar: string;
}
interface FoodItem {
  key: string;
  name: string;
  imageUrl: any;
  description: string;
  details?: FoodItemDetails;
}

const FoodAdvisable = () => {
  const navigation = useNavigation();
  const [value, setValue] = React.useState<string>('');
  const [selectedItem, setSelectedItem] = React.useState<FoodItem | null>(null);
  const [isModalVisible, setIsModalVisible] = React.useState<boolean>(false);

  const appleImage = require('../images/apple.jpg');
  const broccoliImage = require('../images/broccoli.jpg');
  const chickenImage = require('../images/chicken.jpg');
  const carrotImage = require('../images/carrots.jpg');
  const salmonImage = require('../images/salmon.jpg');
  const bananasImage = require('../images/bananas.jpg');
  const eggsImage = require('../images/eggs.jpg');
  const breadImage = require('../images/bread.jpg');

  const foodData: FoodItem[] = [
    {
      key: 'apple',
      name: 'Apple',
      imageUrl: appleImage,
      description: 'A nutritious and delicious fruit.',
      details: {
        glutenFree: true,
        containsSodium: true,
        amountOfSugar: '10g',
      },
    },
    {
      key: 'broccoli',
      name: 'Broccoli',
      imageUrl: broccoliImage,
      description: 'A green vegetable packed with vitamins.',
      details: {
        glutenFree: true,
        containsSodium: true,
        amountOfSugar: '1.7g',
      },
    },
    {
      key: 'chicken',
      name: 'Chicken',
      imageUrl: chickenImage,
      description: 'A nutritious and delicious fruit.',
      details: {
        glutenFree: true,
        containsSodium: true,
        amountOfSugar: '0g',
      },
    },
    {
      key: 'carrot',
      name: 'Carrot',
      imageUrl: carrotImage,
      description: 'A nutritious and delicious fruit.',
      details: {
        glutenFree: true,
        containsSodium: true,
        amountOfSugar: '4.7g',
      },
    },
    {
      key: 'salmon',
      name: 'Salmon',
      imageUrl: salmonImage,
      description: 'A nutritious and delicious fruit.',
      details: {
        glutenFree: true,
        containsSodium: true,
        amountOfSugar: '0g',
      },
    },
    {
      key: 'banana',
      name: 'Banana',
      imageUrl: bananasImage,
      description: 'A nutritious and delicious fruit.',
      details: {
        glutenFree: true,
        containsSodium: true,
        amountOfSugar: '12g',
      },
    },
    {
      key: 'eggs',
      name: 'Eggs',
      imageUrl: eggsImage,
      description: 'A nutritious and delicious fruit.',
      details: {
        glutenFree: true,
        containsSodium: true,
        amountOfSugar: '1.1g',
      },
    },
    {
      key: 'bread',
      name: 'Bread',
      imageUrl: breadImage,
      description: 'A nutritious and delicious fruit.',
      details: {
        glutenFree: false,
        containsSodium: true,
        amountOfSugar: '5g',
      },
    },
  ];

  const _goBack = () => console.log('Went back');

  const handleItemPress = (item: FoodItem) => {
    setSelectedItem(item);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setSelectedItem(null);
  };
  const handleSegmentChange = (value: string) => {
    setValue(value);
    if (value === 'Restricted') {
      FoodRestricted;
    }
  };
  const FoodRestricted = useNavigateTo('FoodRestricted');
  const HomePage = useNavigateTo('HomePage');
  return (
    <SafeAreaView style={styles.bigcontainer}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={HomePage}>
        <icons.BackIcon size="24" color="white" strokeWidth={3} />
      </TouchableOpacity>

      <View>
        <Image
          source={require('../images/PawpalHeader.png')}
          style={styles.headerImage}
        />
      </View>

      <Text style={styles.text}>Food Suggestions</Text>

      <SafeAreaView style={styles.container}>
        <SegmentedButtons
          value={value}
          onValueChange={handleSegmentChange}
          style={styles.segmentedBtn}
          buttons={[
            {
              value: 'Advisable',
              label: 'Advisable',
              style: {
                backgroundColor: value === 'Advisable' ? 'white' : 'white',
              },
            },
            {
              value: 'Restricted',
              label: 'Restricted',
              style: {
                backgroundColor: value === 'Restricted' ? 'white' : 'white',
              },
            },
          ]}
        />
      </SafeAreaView>

      <View style={styles.scrollContainer}>
        <FlatList
          data={foodData}
          numColumns={2}
          renderItem={({item}) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() => handleItemPress(item)}>
              <ImageBackground source={item.imageUrl} style={styles.image}>
                <View style={styles.textbox}>
                  <Text style={[styles.label, styles.textOverlay]}>
                    {item.name}
                  </Text>
                  <Text style={[styles.description, styles.textOverlay]}>
                    {item.description}
                  </Text>
                </View>
              </ImageBackground>
            </TouchableOpacity>
          )}
        />
      </View>

      <Modal
        animationType="slide"
        transparent={false}
        visible={isModalVisible}
        onRequestClose={closeModal}>
        <ImageBackground
          source={require('../images/real_bg.png')}
          style={styles.backgroundImage1}>
          <Text style={styles.title}>Food Contents</Text>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>{selectedItem?.name}</Text>
            {isModalVisible && (
              <Image source={selectedItem?.imageUrl} style={styles.foodImage} />
            )}
            <View style={styles.infoContainer}>
              <Text style={styles.modalText}>
                Gluten-free: {selectedItem?.details?.glutenFree ? 'Yes' : 'No'}
              </Text>
              <Text style={styles.modalText}>
                Contains Sodium:{' '}
                {selectedItem?.details?.containsSodium ? 'Yes' : 'No'}
              </Text>
              <Text style={styles.modalText}>
                Amount of Sugar: {selectedItem?.details?.amountOfSugar}
              </Text>
            </View>

            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    width: '100%',
  },
  backgroundImage1: {
    flex: 1,
    width: '100%',
  },
  modalContainer: {
    ...alignmentMixin.align,
    flex: 1,
    margin: '5%',
  } as ViewStyle,
  modalTitle: {
    fontSize: 30,
    color: constants.$secondaryColor,
    fontFamily: constants.$fontFamily,
    marginBottom: '5%',
  },
  modalText: {
    fontSize: 18,
    color: constants.$secondaryColor,
    fontFamily: constants.$fontFamily,
    marginBottom: '3%',
  },
  title: {
    fontFamily: constants.$fontFamilyBold,
    fontSize: 30,
    color: constants.$secondaryColor,
    top: '7%',
    alignSelf: 'center',
  },
  foodImage: {
    width: '70%',
    height: '30%',
    resizeMode: 'cover',
    borderRadius: 20,
  },
  segmentedBtn: {
    width: '80%',
    alignSelf: 'center',
  },
  closeButton: {
    ...buttonMixin.button,
    backgroundColor: constants.$senaryColor,
    padding: '3%',
    marginTop: '6%',
  },
  closeButtonText: {
    ...buttonMixin.buttonText,
  } as TextStyle,
  container: {
    ...alignmentMixin.alignment,
    top: '-81%',
    width: '100%',
  } as ViewStyle,
  headerImage: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    resizeMode: 'contain',
    top: '-35%',
    zIndex: -1,
  },
  backButton: {
    top: '-0.7%',
    left: '3%',
  },
  text: {
    fontSize: 24,
    fontFamily: constants.$fontFamilySemiBold,
    top: '-83%',
    letterSpacing: 0.25,
    color: constants.$secondaryColor,
    alignSelf: 'center',
  },
  scrollContainer: {
     ...alignmentMixin.alignment,
    width: Dimensions.get('window').width*0.95,
    top: '22%',
    position: 'absolute',
    height: '63%',
  } as ViewStyle,
  card: {
    width: '50%',
    position: 'relative',
    padding: '1%',
  },
  infoContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 20,
    borderRadius: 10,
    marginVertical: 20,
  },
  image: {
    width: '100%',
    height: 150,
    flex: 1,
  },
  textOverlay: {
    color: constants.$textColor2,
    position: 'relative',
    top: '14%',
    height: 33,
    marginLeft: '5%',
    marginTop: '-2%',
  },
  textbox: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    height: '53%',
    position: 'relative',
    overflow: 'hidden',
    top: '47%',
  },
  label: {
    color: constants.$textColor2,
    fontSize: 20,
    elevation: 3,
    fontFamily: constants.$fontFamilySemiBold,
  },
  description: {
    color: constants.$textColor2,
    fontSize: 14,
    elevation: 3,
  },
  bigcontainer: {
    top: '2.5%',
  },
});

export default FoodAdvisable;
