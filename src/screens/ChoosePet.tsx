import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

interface User {
    id: number;
    name: string;
    profilePicture: number; // Assuming profilePicture is the require statement for the image
}

const ChoosePet = () => {
    const [users, setUsers] = useState<User[]>([
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
            <Image source={item.profilePicture} style={styles.photo} />
            <Text style={styles.name}>{item.name}</Text>
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
