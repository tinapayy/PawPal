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
import LoadingScreen from '../components/loading';
import { useState } from 'react';


interface FoodItemDetails {
  glutenFree: boolean;
  containsSodium: boolean;
  amountOfSugar: string;
}
interface AdvisableFoodItem {
  key: string;
  name: string;
  imageUrl: any;
  description: string;
  details?: FoodItemDetails;
}

interface RestrictedFoodItem {
  key: string;
  name: string;
  imageUrl: any;
  description: string;
  restriction: string;
}

type FoodItem = AdvisableFoodItem | RestrictedFoodItem;

const FoodAdvisable = () => {
  const navigation = useNavigation();

  const [value, setValue] = React.useState<string>('Advisable');
  const [selectedItem, setSelectedItem] = React.useState<FoodItem | null>(null);
  const [isModalVisible, setIsModalVisible] = React.useState<boolean>(false);
  const [loading, setLoading] = useState(true);

  const appleImage = require('../images/apple.jpg');
  const broccoliImage = require('../images/broccoli.jpg');
  const chickenImage = require('../images/chicken.jpg');
  const carrotImage = require('../images/carrots.jpg');
  const salmonImage = require('../images/salmon.jpg');
  const bananasImage = require('../images/bananas.jpg');
  const eggsImage = require('../images/eggs.jpg');
  const breadImage = require('../images/bread.jpg');
  const alcoholImage = require('../images/alcohol.jpg');
  const caffeineImage = require('../images/caffeine.jpg');
  const chocoImage = require('../images/chocolate.jpg');
  const garlicImage = require('../images/garlic.jpg');
  const onionImage = require('../images/onions.png');
  const grapesImage = require('../images/grapes.jpg');
  const gumImage = require('../images/gum.jpg');
  const nutsImage = require('../images/nuts.jpg');
  const pumpkinImage = require('../images/pumpkin.jpg');
  const turkeyImage = require('../images/turkey.jpg');
  const peasImage = require('../images/peas.jpg');
  const spinachImage = require('../images/spinach.png');
  const oatmealImage = require('../images/oatmeal.jpg');
  const blueberryImage = require('../images/blueberry.jpg');
  const yougurtImage = require('../images/yougurt.jpg');
  const porkImage = require('../images/pork.jpg');
  const cucumberImage = require('../images/cucumber.png');
  const watermelonImage = require('../images/watermelon.jpg');
  const softdrinkImage = require('../images/softdrinks.jpg');
  const avocadoImage = require('../images/avocado.jpg');
  const yeastImage = require('../images/yeast.jpg');
  const cinnamonImage = require('../images/cinammon.png');
  const rawmeatImage = require('../images/rawmeat.jpg');
  const cherryImage = require('../images/cherry.png');

  const foodData: FoodItem[] = [
    {
      key: 'apple',
      name: 'Apple',
      imageUrl: appleImage,
      description: 'Crisp and juicy fruit with a sweet or tart flavor.',
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
      description: 'Nutrient-rich green vegetable with a slightly bitter taste.',
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
      description: 'Versatile meat with a mild flavor and tender texture.',
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
      description: 'Sweet and crunchy root vegetable packed with vitamin A.',
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
      description: 'Rich, flavorful fish with a buttery texture and high omega-3 content.',
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
      description: 'Creamy and sweet tropical fruit with a distinctive curved shape.',
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
      description: 'Versatile and nutritious food rich in protein, commonly used in cooking.',
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
      description: 'Staple food made from dough of flour and water, typically baked.',
      details: {
        glutenFree: false,
        containsSodium: true,
        amountOfSugar: '5g',
      },
    },
    {
      key: 'pumpkin',
      name: 'Pumpkin',
      imageUrl: pumpkinImage,
      description: 'A nutrient-dense squash, rich in vitamins A and C, commonly used in pies and soups.',
      details: {
        glutenFree: false,
        containsSodium: true,
        amountOfSugar: '2.76g',
      },
    },
    {
      key: 'turkey',
      name: 'Turkey',
      imageUrl: turkeyImage,
      description: 'A lean, protein-rich poultry, often enjoyed roasted during holidays.',
      details: {
        glutenFree: true,
        containsSodium: true,
        amountOfSugar: '0g',
      },
    },
    {
      key: 'peas',
      name: 'Peas',
      imageUrl: peasImage,
      description: 'Small, sweet green legumes that are high in fiber and protein.',
      details: {
        glutenFree: true,
        containsSodium: true,
        amountOfSugar: '5.67g',
      },
    },
    {
      key: 'spinach',
      name: 'Spinach',
      imageUrl: spinachImage,
      description: 'A leafy green vegetable, rich in iron and vitamins A, C, and K.',
      details: {
        glutenFree: true,
        containsSodium: true,
        amountOfSugar: '130g',
      },
    },
    {
      key: 'oatmeal',
      name: 'Oatmeal',
      imageUrl: oatmealImage,
      description: 'A whole-grain cereal that is high in fiber and often enjoyed as a warm breakfast.',
      details: {
        glutenFree: true,
        containsSodium: true,
        amountOfSugar: '234g',
      },
    },
    {
      key: 'blueberries',
      name: 'Blueberries',
      imageUrl: blueberryImage,
      description: 'Are small, sweet, and tangy berries rich in antioxidants and vitamins C and K.',
      details: {
        glutenFree: true,
        containsSodium: false,
        amountOfSugar: '148g',
      },
    },
    {
      key: 'yougurt',
      name: 'Yougurt',
      imageUrl: yougurtImage,
      description: 'A creamy dairy product made from fermented milk, high in protein and probiotics.',
      details: {
        glutenFree: true,
        containsSodium: true,
        amountOfSugar: '245g',
      },
    },
    {
      key: 'pork',
      name: 'Pork',
      imageUrl: porkImage,
      description: 'A versatile and widely consumed meat, known for its rich flavor and protein content.',
      details: {
        glutenFree: true,
        containsSodium: true,
        amountOfSugar: '0g',
      },
    },
    {
      key: 'cucumber',
      name: 'Cucumber',
      imageUrl: cucumberImage,
      description: 'Are refreshing, hydrating vegetables often enjoyed raw in salads and sandwiches.',
      details: {
        glutenFree: true,
        containsSodium: true,
        amountOfSugar: '104g',
      },
    },
    {
      key: 'watermelon',
      name: 'Watermelon',
      imageUrl: watermelonImage,
      description: 'A juicy, sweet fruit that is hydrating and rich in vitamins A and C.',
      details: {
        glutenFree: true,
        containsSodium: false,
        amountOfSugar: '152g',
      },
    },
    {
      key: 'alcohol',
      name: 'Alcohol',
      imageUrl: alcoholImage,
      description: 'A psychoactive beverage.',
      restriction:
        'Alcohol is toxic to cats and dogs because their bodies process it differently than humans. Pets lack certain enzymes that are necessary to metabolize alcohol, leading to more severe and rapid effects.',
    },
    {
      key: 'caffeine',
      name: 'Caffeine',
      imageUrl: caffeineImage,
      description: 'A stimulant found in coffee, tea.',
      restriction:
        'Caffeine is harmful to cats and dogs because they are much more sensitive to its effects than humans. Pets metabolize caffeine more slowly, leading to a buildup of the substance in their system, which can result in toxicity.',
    },
    {
      key: 'chocolate',
      name: 'Chocolate',
      imageUrl: chocoImage,
      description: 'A decadent treat derived from cacao beans.',
      restriction:
        'Chocolate is toxic to cats and dogs due to the presence of substances called theobromine and caffeine, both of which belong to the methylxanthine class of chemicals.',
    },
    {
      key: 'garlic',
      name: 'Garlic',
      imageUrl: garlicImage,
      description: 'A pungent bulb used in cooking.',
      restriction:
        'Garlic is considered toxic to cats and dogs. It belongs to the Allium family, which also includes onions and shallots, and contains compounds that can damage red blood cells and lead to a condition called hemolytic anemia.',
    },
    {
      key: 'onion',
      name: 'Onion',
      imageUrl: onionImage,
      description: 'An edible bulb with layers of pungent.',
      restriction:
        'Onions are toxic to cats and dogs due to the presence of substances called thiosulphates. These compounds can cause damage to red blood cells, leading to a condition known as hemolytic anemia.',
    },
    {
      key: 'grapes',
      name: 'Grapes',
      imageUrl: grapesImage,
      description: 'A bite-sized fruits grown in clusters on vines.',
      restriction:
        'Grapes and raisins are known to be toxic to both cats and dogs, although the exact mechanism of toxicity is not fully understood. The toxic dose can vary widely among animals.',
    },
    {
      key: 'gum',
      name: 'Gum',
      imageUrl: gumImage,
      description: 'A chewable confection.',
      restriction:
        'Gum, especially sugar-free gum, can be harmful to cats and dogs due to the presence of a sugar substitute called xylitol. Ingesting xylitol can be particularly dangerous for dogs.',
    },
    {
      key: 'nuts',
      name: 'Nuts',
      imageUrl: nutsImage,
      description: 'An edible seeds encased in a hard shell.',
      restriction:
        "While some nuts are safe for cats and dogs in moderation, others can be harmful or even toxic. It's important to be aware of which nuts are safe and which ones should be avoided: Almonds, Walnuts, Macadamia Nuts, Pecans, and Brazil Nuts",
    },
    {
      key: 'softdrinks',
      name: 'Soft Drinks',
      imageUrl: softdrinkImage,
      description: 'A carbonated beverages often sweetened with sugar.',
      restriction:
        "Soft drinks often contain caffeine and sugar, both of which are harmful to pets. Caffeine is particularly dangerous as it can cause restlessness, rapid breathing, heart palpitations, muscle tremors, and even death in severe cases.",
    },
    {
      key: 'avocado',
      name: 'Avocados',
      imageUrl: avocadoImage,
      description: 'A creamy, nutrient-rich fruits.',
      restriction:
        "Avocados contain a substance called persin, which can cause vomiting and diarrhea in dogs and cats. In large amounts, persin can be toxic, and the pit poses a choking hazard or can cause an intestinal blockage.",
    },
    {
      key: 'yeast',
      name: 'Yeast Dough',
      imageUrl: yeastImage,
      description: 'It rises due to fermentation.',
      restriction:
        "Uncooked yeast dough can expand in a pet’s stomach, leading to bloating and potential stomach rupture. The fermentation process also produces alcohol, which can cause alcohol poisoning in pets.",
    },
    {
      key: 'cherries',
      name: 'Cherries',
      imageUrl: cherryImage,
      description: 'A sweet or tart stone fruits.',
      restriction:
        "Cherry pits, stems, and leaves contain cyanide, which is toxic to pets. Ingestion can cause difficulty breathing, dilated pupils, red gums, and shock. The pits can also cause intestinal blockages.",
    },
    {
      key: 'cinnamon',
      name: 'Cinnamon',
      imageUrl: cinnamonImage,
      description: 'A fragrant spice from tree bark.',
      restriction:
        "While not toxic in small amounts, cinnamon can cause irritation in your pet’s mouth, leading to discomfort and digestive issues. Inhaled cinnamon powder can cause coughing, choking, and breathing difficulties.",
    },
    {
      key: 'rawMeat',
      name: 'Raw Meat',
      imageUrl: rawmeatImage,
      description: 'An uncooked animal flesh.',
      restriction:
        " Raw meat can contain harmful bacteria like Salmonella and E. coli, which can lead to food poisoning in pets. Raw meat diets also pose a risk of nutritional deficiencies and imbalances if not properly managed.",
    },
  ];

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
  };

  const dataToRender =
    value === 'Advisable'
      ? foodData.filter(item => !('restriction' in item)) // Filter out restricted items
      : foodData.filter(item => 'restriction' in item); // Filter only restricted items

      React.useEffect(() => {
        setLoading(false);
      }, []);
    
      if (loading) {
        return <LoadingScreen />;
      }

  return (
    <SafeAreaView style={styles.bigcontainer}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate('HomePage')}>
        <icons.BackIcon size="24" color="white" strokeWidth={3} />
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
          onValueChange={handleSegmentChange}
          style={styles.segmentedBtn}
          buttons={[
            {
              value: 'Advisable',
              label: 'Advisable',
              style: {
                backgroundColor: value === 'Advisable' ? '#ffac4e' : 'white',
              },
            },
            {
              value: 'Restricted',
              label: 'Restricted',
              style: {
                backgroundColor: value === 'Restricted' ? '#ffac4e' : 'white',
              },
            },
          ]}
        />
      </SafeAreaView>

      <View style={styles.scrollContainer}>
        <FlatList
          data={dataToRender}
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
            {selectedItem && 'restriction' in selectedItem ? (
              <View style={styles.infoContainer}>
                <Text style={styles.modalText2}>
                  Restriction: {selectedItem?.restriction}
                </Text>
              </View>
            ) : (
              <View style={styles.infoContainer}>
                <Text style={styles.modalText}>
                  Gluten-free:{' '}
                  {selectedItem?.details?.glutenFree ? 'Yes' : 'No'}
                </Text>
                <Text style={styles.modalText}>
                  Contains Sodium:{' '}
                  {selectedItem?.details?.containsSodium ? 'Yes' : 'No'}
                </Text>
                <Text style={styles.modalText}>
                  Amount of Sugar: {selectedItem?.details?.amountOfSugar}
                </Text>
              </View>
            )}
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
  modalText2: {
    fontSize: 15,
    color: constants.$secondaryColor,
    fontFamily: constants.$fontFamily,
    textAlign: 'justify',
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
    width: '110%',
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
    top: '-81%',
    letterSpacing: 0.25,
    color: constants.$secondaryColor,
    alignSelf: 'center',
  },
  scrollContainer: {
    ...alignmentMixin.alignment,
    width: Dimensions.get('window').width * 0.95,
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
