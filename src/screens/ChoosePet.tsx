import React, {useState, useEffect} from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import * as icons from '../imports/icons/icons';
import {useNavigation} from '@react-navigation/native';
import {
  FIREBASE_AUTH,
  FIREBASE_DB,
  FIREBASE_STORAGE,
} from '../../firebase.config';
import {getDocs, collection, getDoc, doc} from 'firebase/firestore';
import constants from '../styles/constants';
import {buttonMixin} from '../components/buttonMixin';
import {alignmentMixin} from '../components/alignmentMixin';
import LoadingScreen from '../components/loading';

interface User {
  id: number;
  petId: string;
  name: string;
  profilePicture: any;
}

const ChoosePet = () => {
  const navigation = useNavigation();

  const auth = FIREBASE_AUTH;
  const db = FIREBASE_DB;
  const [loading, setLoading] = useState(true);

  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'user'));
        const oldUsers: User[] = [
          {
            id: 0,
            petId: '',
            name: 'Add Pet',
            profilePicture: 'faCirclePlus',
          },
        ];
        const newUsers: User[] = [];
        for (const petDoc of querySnapshot.docs) {
          if (petDoc.data().userId === auth.currentUser?.uid) {
            const petIds = petDoc.data().pet;
            for (const petId of petIds) {
              const petDoc = await getDoc(doc(db, 'pet', petId.toString()));
              if (petDoc.exists()) {
                newUsers.push({
                  id: newUsers.length + 1,
                  petId: petDoc.data().petId,
                  name: petDoc.data().name,
                  profilePicture: petDoc.data().petPicture,
                });
              }
            }
          }
        }
        setUsers([...oldUsers, ...newUsers]);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Sort the users array in descending order based on id
  const sortedUsers = [...users].sort((a, b) => b.id - a.id);

  const renderUserCard = ({item}: {item: User}) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => handleUserSelection(item.id, item.petId)}>
      {item.id === 0 ? (
        <FontAwesomeIcon icon={icons.faCirclePlus} size={90} color="#F87000" />
      ) : (
        <Image
          source={{uri: item.profilePicture}}
          style={styles.photo}
          resizeMode="cover"
        />
      )}
      <Text style={styles.name}>{item.name}</Text>
    </TouchableOpacity>
  );

  const handleUserSelection = (userId: number, petId: string) => {
    if (userId !== 0) {
      navigation.navigate('Edit Pet Profile', {petId: petId});
    } else {
      navigation.navigate('Add Pet Profile');
    }
  };

  if (loading) {
    return <LoadingScreen />;
  }
  
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Choose Pet</Text>
      <FlatList
        data={users}
        renderItem={renderUserCard}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: '5%',
  },
  text: {
    fontFamily: constants.$fontFamily,
    fontSize: 30,
    textAlign: 'center',
    marginTop: '20%',
    letterSpacing: 0.25,
    color: constants.$secondaryColor,
  },
  card: {
    marginTop: '20%',
    flex: 1,
    margin: '3%',
    padding: '4%',
    borderRadius: 8,
    backgroundColor: constants.$quinaryColor,
    alignItems: 'center',
  },
  photo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: constants.$fontWeightBold,
  },
});

export default ChoosePet;
