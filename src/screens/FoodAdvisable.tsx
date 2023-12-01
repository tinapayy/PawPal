import * as React from "react";
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
} from "react-native";
import { SegmentedButtons } from "react-native-paper";
import { ArrowLeftIcon as BackIcon } from "react-native-heroicons/solid";
import { NavigationContainer, useNavigation } from "@react-navigation/native";

interface FoodItemDetails{
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
    const [value, setValue] = React.useState("");
    const [selectedItem, setSelectedItem] = React.useState<FoodItem | null>(null);
    const [isModalVisible, setIsModalVisible] = React.useState(false);

    const appleImage = require("../images/apple.jpg");
    const broccoliImage = require('../images/broccoli.jpg');
    const chickenImage = require('../images/chicken.jpg');
    const carrotImage = require('../images/carrots.jpg');
    const salmonImage = require('../images/salmon.jpg');
    const bananasImage = require('../images/bananas.jpg');
    const eggsImage = require('../images/eggs.jpg');
    const breadImage = require('../images/bread.jpg');

    const foodData: FoodItem[] = [
        {
            key: "apple",
            name: "Apple",
            imageUrl: appleImage,
            description: "A nutritious and delicious fruit.",
            details: {
                glutenFree: true,
                containsSodium: true,
                amountOfSugar: "10g",
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
                amountOfSugar: "1.7g",
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
                amountOfSugar: "0g",
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
                amountOfSugar: "4.7g",
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
                amountOfSugar: "0g",
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
                amountOfSugar: "12g",
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
                amountOfSugar: "1.1g",
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
                amountOfSugar: "5g",
            },
        },
    ];

    const _goBack = () => console.log("Went back");

    const handleItemPress = (item: FoodItem) => {
        setSelectedItem(item);
        setIsModalVisible(true);
    };

    const closeModal = () => {
        setIsModalVisible(false);
        setSelectedItem(null);
    };

    const handleSegmentChange = (value: React.SetStateAction<string>) => {
        setValue(value);
        if (value === 'Restricted') {
          navigation.navigate('FoodRestriction');
        }
      };


    return (
        <SafeAreaView style={styles.bigcontainer}>
            <TouchableOpacity style={styles.backButton} onPress={_goBack}>
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
                    value={value}
                    onValueChange={handleSegmentChange}
                    buttons={[
                        { value: "Advisable", label: "Advisable" },
                        { value: "Restricted", label: "Restricted" },
                    ]}
                />
            </SafeAreaView>

            <View style={styles.scrollContainer}>
                <FlatList
                    data={foodData}
                    numColumns={2}
                    contentContainerStyle={styles.container3}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.card}
                            onPress={() => handleItemPress(item)}
                        >
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

            {/* Modal for displaying detailed information */}
            <Modal
                animationType="slide"
                transparent={false}
                visible={isModalVisible}
                onRequestClose={closeModal}
            >
                <ImageBackground
                    source={require('../images/real_bg.png')}
                    style={styles.backgroundImage1}
                    >
                <Text style={styles.title}>Food Contents</Text>
                <View style={styles.modalContainer}>
                    <Text style={styles.modalTitle}>{selectedItem?.name}</Text>
                    {isModalVisible && (
                        <Image
                            source={selectedItem?.imageUrl}
                            style={styles.foodImage}
                        />
                    )}
                    <View style ={styles.infoContainer}>
                    <Text style={styles.modalText}>
                        Gluten-free: {selectedItem?.details?.glutenFree ? "Yes" : "No"}
                    </Text>
                    <Text style={styles.modalText}>
                        Contains Sodium:{" "}
                        {selectedItem?.details?.containsSodium ? "Yes" : "No"}
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
    contentContainer:{
        flex:1,
        width:'100%',
    },
    backgroundImage1: {
        flex: 1,
        width: '100%',
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        margin:20,
        // width:'80%',
        // borderColor: "#9999",
    },
    modalTitle: {
        fontSize: 30,
        color: "#5a2828",
        fontFamily: "Poppins-Regular",
        marginBottom: 20,
    },
    modalText: {
        fontSize: 18,
        color: "#5a2828",
        fontFamily: "Poppins-Regular",
        marginBottom: 10,
    },
    title:{
        fontFamily: "Poppins-Bold",
        fontSize:30,
        // textTransform:"uppercase",
        color: "#5a2828",
        // textDecorationStyle:'solid',
        top: 50,
        marginTop: 0,
        alignSelf: 'center',
    },
    foodImage: {
        width: 200,
        height: 200, // Adjust the height of the image based on your design
        resizeMode: 'cover',
        borderRadius: 20,
    },
    closeButton: {
        backgroundColor: "#ff8700",
        borderRadius: 20,
        padding: 10,
        elevation: 20,
        width: 80,
        marginTop: 20,
    },
    closeButtonText: {
        color: "white",
        fontSize: 15,
        fontFamily: "Poppins-Regular",
        textAlign: "center",
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
        zIndex: -1
    },
    backButton: {
        top: 12,
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
        height: 600
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
    infoContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        // color: '#5A2828',
        padding: 20,
        borderRadius: 10,
        marginVertical: 20,
        // height:50,
        // width: '80%',
        // borderBlockColor: '#ff4',
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
        // top:'(100% - 80px)',
        // top: 'calc(100% - 80px)',
        // alignSelf: 'flex-end',
        // alignSelf:'bottom',
        top:80,
        bottom:0,
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
    bigcontainer:{
    },
    header: {
    },
});

export default FoodAdvisable;