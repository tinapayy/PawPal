import { faMessage } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Card, Avatar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const userPosts = [
  {
    id: 1,
    username: 'Kristina V. Celis',
    postTime: 'Just Now',
    profilePicture: require('../images/userIcon.png'), 
    content:
      "When your puppy's growth slows, you should start switching to adult food. first user post. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    image: require('../images/forum_dog.jpg'), 
  },
  {
    id: 2,
    username: 'Lee Ji Eun',
    postTime: '1 hour ago',
    profilePicture: require('../images/userIcon3.png'), 
    content:
      "The more you know about your pet's health and nutrition needs, the better you'll be able to take care of them.",
    image: require('../images/forum_cat.jpg'), 
  },
  {
    id: 3,
    username: 'Katniss Everdeen',
    postTime: '30 minutes ago',
    profilePicture: require('../images/userIcon2.png'),
    content:
      'Show your love to your pets by giving them the best food and best bath.',
    image: require('../images/forum_dog1.jpg'),
  },
  {
    id: 4,
    username: 'Olivia Rodrigo',
    postTime: '1 day ago',
    profilePicture: require('../images/userIcon5.png'),
    content: 'Spent wonderful time with my cats today. They are so cute!',
    image: require('../images/forum_cat1.jpg'),
  },
  {
    id: 5,
    username: 'Louis Partridge',
    postTime: 'October 1, 2023',
    profilePicture: require('../images/userIcon4.png'),
    content:
      'Tonight, on October 1, 2023, we are saddened to inform that our dearly beloved campus dog — ISKA, was involved in a fatal road accident along the highway and was declared dead on arrival at the veterinary clinic.',
    image: require('../images/forum_iska.jpg'),
  },
];

const ForumPage = () => {
  const navigation = useNavigation();
  function calculateMargin(length: number): number {
  return length * 2;
}

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.header}>
        <View>
          <Image
            source={require('../images/pawpal_forum.png')}
            style={styles.imageHeader}
          />
        </View>
        <TouchableOpacity
          onPress={() => {
            console.log('Message icon pressed');
            navigation.navigate('FoodAdvisable');
          }}
        >
          <View>
            <Image
              source={require('../images/dog_food.png')}
              style={styles.imageHeader1}
            />
            <Text style={styles.headerText}>Food Suggestions</Text>
            
          </View>
        </TouchableOpacity>
      </View>
      {userPosts.map((post) => (
        <Card key={post.id} style={styles.card}>
          <Card.Content style={styles.cardContent}>
            <View style={styles.userInfo}>
              <Avatar.Image
                size={50}
                source={post.profilePicture}
                style={styles.userIcon}
              />
              <View style={styles.userInfoText}>
                <Text style={styles.userName}>{post.username}</Text>
                <View style={styles.message}>
                  <TouchableOpacity style={styles.messageIcon} 
                  onPress={() => {
                      console.log('Message icon pressed'); 
                      navigation.navigate('MessagePage');
                    }}
                  >
                  <FontAwesomeIcon
                  icon={faMessage}
                  style={[styles.messageIcon, { marginLeft: calculateMargin(post.username.length) }]}
                  size={17}
                  />
                  </TouchableOpacity>
                  </View>
                  <Text style={styles.postTime}>{post.postTime}</Text>
                  </View>
              </View>
            <Text style={styles.postText}>{post.content}</Text>
            <View style={styles.postImageContainer}>
              <Image source={post.image} style={styles.image} />
            </View>
          </Card.Content>
        </Card>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  video: {
    width: '100%',
    height: 200,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    bottom: 5,
    left: 30,
  },
  imageHeader: {
    width: 150,
    height: 70,
    bottom: 5,
    objectFit: 'contain',
    paddingHorizontal: 10,
    position: 'relative',
  },
  imageHeader1: {
    position: 'relative',
    bottom: 5,
    top: 20,
    left: -90,
  },
  headerText: {
    fontSize: 14,
    left: -57,
  },
  card: {
    margin: 19,
  },
  cardContent: {
    flexDirection: 'column',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  userInfoText: {
    marginLeft: 12,
    fontFamily: 'Poppins',
  },
  message: {
    marginLeft: 'auto',
    position: 'absolute',
  },
  messageIcon: {
    color: '#F87000',
    top: 2,
    left: 50,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  postTime: {
    fontSize: 12,
    color: 'gray',
  },
  postText: {
    fontSize: 14,
    textAlign: 'justify',
    fontFamily: 'Poppins',
    color: '#000',
    top: 8,
    bottom: 8,
  },
  postImageContainer: {
    marginTop: 8,
    alignItems: 'center',
    marginBottom: 8,
  },
  image: {
    width: 300,
    height: 150,
    resizeMode: 'cover',
    borderRadius: 20,
    top: 8,
  },
});

export default ForumPage;
