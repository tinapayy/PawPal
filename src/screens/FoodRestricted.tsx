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
} from 'react-native';
import {SegmentedButtons} from 'react-native-paper';
import {ArrowLeftIcon as BackIcon} from 'react-native-heroicons/solid';
import {useNavigation} from '@react-navigation/native';

interface FoodItemDetails {
  restriction: string;
}
interface FoodItem {
  key: string;
  name: string;
  imageUrl: any;
  description: string;
  details?: FoodItemDetails;
}
const FoodRestricted = () => {
  const navigation = useNavigation();
  const [value, setValue] = React.useState('');
  const [selectedItem, setSelectedItem] = React.useState<FoodItem | null>(null);
  const [isModalVisible, setIsModalVisible] = React.useState(false);

  const alcoholImage = require('../images/alcohol.jpg');
  const caffeineImage = require('../images/caffeine.jpg');
  const chocoImage = require('../images/chocolate.jpg');
  const garlicImage = require('../images/garlic.jpg');
  const onionImage = require('../images/onions.png');
  const grapesImage = require('../images/grapes.jpg');
  const gumImage = require('../images/gum.jpg');
  const nutsImage = require('../images/nuts.jpg');

  const foodData: FoodItem[] = [
    {
      key: 'alcohol',
      name: 'Alcohol',
      imageUrl: alcoholImage,
      description: 'A psychoactive beverage.',
      details: {
        restriction:
          "Alcohol is toxic to cats and dogs because their bodies process it differently than humans. Pets lack certain enzymes that are necessary to metabolize alcohol, leading to more severe and rapid effects.",
      },
    },
    {
      key: 'caffeine',
      name: 'Caffeine',
      imageUrl: caffeineImage,
      description: 'A stimulant found in coffee, tea.',
      details: {
        restriction:
          'Caffeine is harmful to cats and dogs because they are much more sensitive to its effects than humans. Pets metabolize caffeine more slowly, leading to a buildup of the substance in their system, which can result in toxicity.',
      },
    },
    {
      key: 'chocolate',
      name: 'Chocolate',
      imageUrl: chocoImage,
      description: 'A decadent treat derived from cacao beans.',
      details: {
        restriction:
          'Chocolate is toxic to cats and dogs due to the presence of substances called theobromine and caffeine, both of which belong to the methylxanthine class of chemicals.',
      },
    },
    {
      key: 'garlic',
      name: 'Garlic',
      imageUrl: garlicImage,
      description: 'A pungent bulb used in cooking.',
      details: {
        restriction:
          'Garlic is considered toxic to cats and dogs. It belongs to the Allium family, which also includes onions and shallots, and contains compounds that can damage red blood cells and lead to a condition called hemolytic anemia.',
      },
    },
    {
      key: 'onion',
      name: 'Onion',
      imageUrl: onionImage,
      description: 'An edible bulb with layers of pungent.',
      details: {
        restriction:
          'Onions are toxic to cats and dogs due to the presence of substances called thiosulphates. These compounds can cause damage to red blood cells, leading to a condition known as hemolytic anemia.',
      },
    },
    {
      key: 'grapes',
      name: 'Grapes',
      imageUrl: grapesImage,
      description: 'A bite-sized fruits grown in clusters on vines.',
      details: {
        restriction:
          'Grapes and raisins are known to be toxic to both cats and dogs, although the exact mechanism of toxicity is not fully understood. The toxic dose can vary widely among animals.',
      },
    },
    {
      key: 'gum',
      name: 'Gum',
      imageUrl: gumImage,
      description: 'A chewable confection.',
      details: {
        restriction:
          'Gum, especially sugar-free gum, can be harmful to cats and dogs due to the presence of a sugar substitute called xylitol. Ingesting xylitol can be particularly dangerous for dogs.',
      },
    },
    {
      key: 'nuts',
      name: 'Nuts',
      imageUrl: nutsImage,
      description: 'An edible seeds encased in a hard shell.',
      details: {
        restriction:
          "While some nuts are safe for cats and dogs in moderation, others can be harmful or even toxic. It's important to be aware of which nuts are safe and which ones should be avoided: Almonds, Walnuts, Macadamia Nuts, Pecans, and Brazil Nuts",
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
    if (value === 'Advisable') {
      navigation.navigate('FoodAdvisable');
    }
  };

  return (
    <SafeAreaView style={styles.bigcontainer}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate('HomePage')}>
        <BackIcon size="24" color="white" strokeWidth={3} />
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
          style={styles.segmentedBtn}
          value={value}
          onValueChange={handleSegmentChange}
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
          contentContainerStyle={styles.container3}
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
                Restriction: {selectedItem?.details?.restriction}
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
  },
  modalTitle: {
    fontSize: 30,
    color: '#5a2828',
    fontFamily: 'Poppins-Regular',
    marginBottom: 20,
  },
  modalText: {
    fontSize: 18,
    color: '#5a2828',
    fontFamily: 'Poppins-Regular',
    marginBottom: 10,
    textAlign: 'center',
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 30,
    color: '#5a2828',
    top: 50,
    marginTop: 0,
    alignSelf: 'center',
  },
  foodImage: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
    borderRadius: 20,
  },
  segmentedBtn: {
    width: 330,
    alignSelf: 'center',
  },
  closeButton: {
    backgroundColor: '#ff8700',
    borderRadius: 20,
    padding: 10,
    elevation: 3,
    width: 80,
    marginTop: 20,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 15,
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
  },
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
  headerImage: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    resizeMode: 'contain',
    top: -275,
    zIndex: -1,
  },
  backButton: {
    top: -9,
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
    top: 180,
    position: 'absolute',
    height: 600,
  },
  container3: {
    padding: 16,
  },
  card: {
    width: '50%',
    position: 'relative',
    padding: 5,
    height: 160,
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
    color: 'white',
    position: 'relative',
    top: 10,
    height: 33,
    marginLeft: 10,
    marginTop: -5,
  },
  textbox: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    height: 80,
    position: 'relative',
    overflow: 'hidden',
    top: 70,
    bottom: 0,
  },
  label: {
    color: '#fff',
    fontSize: 20,
    elevation: 1,
    fontFamily: 'Poppins-SemiBold',
  },
  description: {
    color: '#fff',
    fontSize: 14,
    elevation: 3,
  },
  bigcontainer: {
    top: 20,
  },
  header: {},
});

export default FoodRestricted;