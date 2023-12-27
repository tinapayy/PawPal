import React, { useState } from "react";
import { View, Image, Text, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { useNavigation } from "@react-navigation/native";

interface User {
    id: number;
    name: string;
    profilePicture: any; // Change the type to any or adjust based on your requirements
}


const ChoosePet = () => {
    const navigation = useNavigation();
    const [users, setUsers] = useState<User[]>([
        {
            id: 0, // Change the ID to 0 for the add pet circle
            name: "Add Pet",
            profilePicture: 'faCirclePlus', // Replace with the actual FontAwesome icon name
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
        // Add a new pet after the plus icon
        {
            id: 3,
            name: "New Pet",
            profilePicture: require("../images/dog1.png"), // Replace with the actual image
        },
    ]);
    // Sort the users array in descending order based on id
    const sortedUsers = [...users].sort((a, b) => b.id - a.id);

    const renderUserCard = ({ item }: { item: User }) => (
        <TouchableOpacity
            style={styles.card}
            onPress={() => handleUserSelection(item)}
        >
            {item.id === 0 ? (
                <FontAwesomeIcon icon={faCirclePlus} size={90} color="#F87000" />
            ) : (
                <Image source={item.profilePicture} style={styles.photo} />
            )}
            <Text style={styles.name}>{item.name}</Text>
        </TouchableOpacity>
    );

    const handleUserSelection = (selectedUser: User | { petId: number }) => {
        // If it's not the "Add Pet" item, navigate to the pet profile
        if ('id' in selectedUser) {
            navigation.navigate('PetProfile', { petId: selectedUser.id });
        }
        // Handle other actions if needed
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
    addPetText: {
        marginBottom: 8, // Add space below "Add Pet" text
    },
});

export default ChoosePet;
