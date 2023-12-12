import React, { useState } from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/FontAwesome';

interface User {
    id: number;
    name: string;
    profilePicture: number; // Assuming profilePicture is the require statement for the image
}

const ChoosePet = () => {
    const [users, setUsers] = useState<User[]>([
        {
            id: 0, // Change the ID to 0 for the add pet circle
            name: "Add Pet",
            profilePicture: 'faIconPlus', // Replace with the actual FontAwesome icon name
        },
        {
            id: 1,
            name: "Dogzie",
            profilePicture: require("../images/dog1.png"),
        },
        {
            id: 2,
            name: "Meowzi",
            profilePicture: require("../images/cat1.jpg"),
        },
    ]);

    const renderUserCard = ({ item }: { item: User }) => (
        <TouchableOpacity
            style={styles.card}
            onPress={() => handleUserSelection(item)}
        >
            {item.id === 0 ? (
                <Icon name={item.profilePicture} size={30} color="#000" style={styles.plusIcon} />
            ) : (
                <Image source={item.profilePicture} style={styles.photo} />
            )}
            <Text style={styles.name}>{item.name}</Text>
        </TouchableOpacity>
    );

    const handleUserSelection = (selectedUser: User) => {
        // Handle user selection here
        console.log("Selected User:", selectedUser);
    };

    return (
        <View style={styles.container}>
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

    text: {
        fontFamily: "Poppins-regular",
        fontSize: 30,
        textAlign: "center",
        marginTop: '20%',
        letterSpacing: 0.25,
        color: '#5A2828',
    },
    card: {
        marginTop: '20%',
        flex: 1,
        margin: 8,
        padding: 16,
        borderRadius: 8,
        backgroundColor: "#f0f0f0",
        alignItems: "center",
    },
    plusIcon: {
        marginBottom: 8,
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
