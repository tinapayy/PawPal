import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

interface User {
    id: number;
    name: string;
    profilePicture: number; // Assuming profilePicture is the require statement for the image
}

const ChoosePet = () => {
    const navigation = useNavigation();
    const [users, setUsers] = useState<User[]>([
        {
<<<<<<< Updated upstream
=======
            id: 0, // Change the ID to 0 for the add pet circle
            name: " ",
            profilePicture: require("../images/addpet.png"), // Add your own icon for adding a pet
        },
        {
>>>>>>> Stashed changes
            id: 1,
            name: "Dogzie",
            profilePicture: require("../images/dog1.png"),
        },
        {
            id: 2,
            name: "Meowzi",
            profilePicture: require("../images/cat1.jpg"),
        },
        {
            id: 3,
            name: "Meowzi",
            profilePicture: require("../images/cat1.jpg"),
        },
    ]);

    const renderUserCard = ({ item }: { item: User }) => (
        <TouchableOpacity
            style={styles.card}
            onPress={() => handleUserSelection(item)}
        >
<<<<<<< Updated upstream
            <Image source={item.profilePicture} style={styles.photo} />
            <Text style={styles.name}>{item.name}</Text>
=======
            {item.id === 0 ? (
                <View style={styles.addPetCard}> 
                    <TouchableOpacity onPress={() => handleUserSelection(item)}>
                    <View style={styles.circle}>
                    <FontAwesomeIcon icon={faCirclePlus} size={50} color="#000" style={styles.plusIcon} />
                    </View>
                    </TouchableOpacity>
                    <Text style={styles.name}>{item.name}</Text>
                    <Text style={{ color: '#ff8d4d', fontSize: 18, fontFamily: 'Poppins-Medium', justifyContent: "flex-start" }}>
                        Add Pet
                    </Text>
                </View>
            ) : (
                <TouchableOpacity onPress={() => navigation.navigate('PetProfile')}>
                <View>
                <Image source={item.profilePicture} style={styles.photo} />
                <Text style={styles.name}>{item.name}</Text>
                </View>
                </TouchableOpacity>
            )}
>>>>>>> Stashed changes
        </TouchableOpacity>
    );

    const handleUserSelection = (selectedUser: User) => {
        // Handle user selection here
        console.log("Selected User:", selectedUser);
    };

    return (
        <View style={styles.container}>
            {/* <Image
                source={require("../images/real_bg.png")}
                style={styles.backgroundImage}
            /> */}
            <Text style={styles.text}>Choose Pet</Text>
            <FlatList
                data={users}
                renderItem={renderUserCard}
                keyExtractor={(item) => item.id.toString()}
                numColumns={2} // Adjust the number of columns as needed
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        
    },
    // backgroundImage:{
    //     flex: 1,
    //     // resizeMode: 'cover', 
    //     position: 'relative',
    //     width: '100%',
    //     height: '100%',
    // },
    text:{
        fontFamily: "Poppins-regular",
        fontSize: 30,
        textAlign: "center",
        marginTop:'20%',
        letterSpacing: 0.25,
        color: '#5A2828',

    },
<<<<<<< Updated upstream
=======
    plusIcon: {
        marginBottom: 8,
        alignContent:"center",
    },
    addPetCard:{

    },
    circle: {
        width: 100, 
        length:100,
        aspectRatio: 1,
        borderRadius: 50, 
        backgroundColor: '#ff8d4d', 
        justifyContent: 'center',
        alignItems: 'center',

    },
>>>>>>> Stashed changes
    card: {
        marginTop: '20%',
        flex: 1,
        margin: 8,
        padding: 16,
        borderRadius: 8,
        backgroundColor: "#f0f0f0",
        alignItems: "center",
    },
    photo: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 8,
    },
    name: {
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default ChoosePet;
