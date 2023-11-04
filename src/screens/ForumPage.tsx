/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TextInput, Image, TouchableOpacity} from 'react-native';
import { Card, Avatar, IconButton } from 'react-native-paper';
// import Video from 'react-native-video';

const userPosts = [
  {
    id: 1,
    username: 'Kristina V. Celis',
    postTime: 'Just Now',
    profilePicture: require('../images/userIcon.png'), // profile icon
    content: 'When your puppy\'s growth slows, you should start switching to adult food. first user post. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    image: require('../images/forum_dog.jpg'), // post image
    // video: require('../images/dog_vid2.mp4'),
  },
  {
    id: 2,
    username: 'Lee Ji Eun',
    postTime: '1 hour ago',
    profilePicture: require('../images/userIcon3.png'), // Path to profile icon
    content: 'The more you know about your pet\'s health and nutrition needs, the better you\'ll be able to take care of them.',
    image: require('../images/forum_cat.jpg'), // Path to post image
  },
  {
   id: 3,
    username: 'Katniss Everdeen',
    postTime: '30 minutes ago',
    profilePicture: require('../images/userIcon2.png'),
    content: 'Show your love to your pets by giving them the best food and best bath.',
    image: require('../images/forum_dog.jpg'),
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
    content: 'Tonight, on October 1, 2023, we are saddened to inform that our dearly beloved campus dog — ISKA, was involved in a fatal road accident along the highway and was declared dead on arrival at the veterinary clinic.',
    image: require('../images/forum_iska.jpg'),
  },
];

const ForumPage = () => {
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [comment, setComment] = useState<string>('');

  const handleCommentToggle = () => {
    setShowCommentInput(!showCommentInput);
  };

  const handleCommentChange = (text: string) => {
    setComment(text);
  };

  const handlePostComment = (postId: number) => {
    console.log(`Post comment: ${comment} for post ID: ${postId}`);
    setComment('');
    setShowCommentInput(false);
  };

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.header}
      >
        <View>
        <Image source={require('../images/pawpal_forum.png')} style={styles.imageHeader} />
        </View>
        <TouchableOpacity>
        <View>
        <Image source={require('../images/dog_food.png')} style={styles.imageHeader1} />
        <Text style={styles.headerText}>Food Suggestions</Text>
        </View>
        </TouchableOpacity>
      </View>
      {userPosts.map((post) => (
        <Card key={post.id} style={styles.card}>
          <Card.Content style={styles.cardContent}>
            <View style={styles.userInfo}>
              <Avatar.Image size={50} source={post.profilePicture} style={styles.userIcon} />
              <View style={styles.userInfoText}>
                <Text style={styles.userName}>{post.username}</Text>
                <Text style={styles.postTime}>{post.postTime}</Text>
              </View>
            </View>
            <Text style={styles.postText}>{post.content}</Text>
            <View style={styles.postImageContainer}>
              <Image source={post.image} style={styles.image} />
            </View>
            <View style={styles.commentButtonContainer}>
              {showCommentInput && (
                <View style={styles.commentInputContainer}>
                  <TextInput
                    style={styles.commentInput}
                    placeholder="Write a comment..."
                    value={comment}
                    onChangeText={handleCommentChange}
                  />
                  <IconButton
                    icon="send"
                    style={styles.commentButton}
                    // placeholder="Post"
                    size={24}
                    onPress={() => handlePostComment(post.id)}
                  />
                </View>
              )}
              {!showCommentInput && (
                <IconButton
                  icon="send"
                  style={styles.commentButton}
                  size={24}
                  onPress={handleCommentToggle}
                />
              )}
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
    // position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // margin: 'auto',
    // marginTop: 5,
    bottom: 5,
    left: 30,
  },
  imageHeader: {
    width: 150,
    height: 70,
    bottom: 5,
    objectFit: 'contain',
    // marginRight: -100,
    paddingHorizontal: 10,
    // borderRadius: 25,
    position: 'relative',
    // justifyContent: 'center',
  },
  imageHeader1: {
    // width: 50,
    // height: 50,
    // borderRadius: 25,
    position: 'relative',
    bottom: 5,
    top: 20,
    left: -70,
  },
  headerText: {
    fontSize: 14,
    left: -40,
    // fontWeight: 'bold',
    // marginLeft: 12,
  },
  card: {
    margin: 19,
    // borderBlockColor: '#F87000',
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
    // marginTop: 8,
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
  commentButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  commentInputContainer: {
    flex: 1,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#F87000',
    borderRadius: 15,
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
  },
  commentInput: {
    flex: 1,
    fontFamily: 'Poppins',
    fontSize: 14,
    marginRight: 16,
    borderWidth: 1,
    borderColor: '#ffffff',
    borderRadius: 5,
    padding: 8,
  },
  postCommentButton: {
    color: '#007BFF',
  },
  commentButton: {
    backgroundColor: 'transparent !important',
    borderRadius: 5,
    padding: 8,
    // marginRight: 8,
    // color: '#F87000',
    color: '#000',
    borderColor: '#000',
    borderStartColor: '#000',
    borderBlockColor: '#000',
  },
});

export default ForumPage;
