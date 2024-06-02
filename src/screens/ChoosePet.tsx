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
            profilePicture: 'faCirclePlus',
            name: 'Add Pet',
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
      <View style={styles.cardContent}>
        <Text style={[styles.name, item.id === 0 && styles.addPetText]}>
          {item.name}
        </Text>
      </View>
      {item.id === 0 ? (
        <FontAwesomeIcon
          icon={icons.faCirclePlus}
          color={constants.$primaryColor}
          size={55}
          style={{top: '15%'}}
        />
      ) : (
        <Image
          source={{uri: item.profilePicture}}
          style={styles.photo}
          resizeMode="cover"
        />
      )}
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
      <Image
        source={require('../images/pawpal_forum.png')}
        style={styles.pawLogo}
      />
      <View style={styles.back}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesomeIcon
            icon={icons.faArrowLeft}
            style={styles.backIcon}
            size={25}
          />
        </TouchableOpacity>
        <Text style={styles.backText}>Choose Pet</Text>
      </View>
      <Text style={styles.text}>Customize and choose between your pets</Text>
      <View style={styles.cardContainer}>
        <FlatList
          data={users}
          renderItem={renderUserCard}
          keyExtractor={item => item.id.toString()}
          numColumns={2}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: '5%',
  },
  pawLogo: {
    resizeMode: 'contain',
    width: '45%',
    top: '5%',
    left: '4%',
    alignSelf: 'center',
    zIndex: 5,
  },
  back: {
    flexDirection: 'row',
    // marginBottom: '2%',
    alignItems: 'flex-start',
    top: '-30%',
  },
  backIcon: {
    color: constants.$senaryColor,
  },
  backText: {
    fontSize: 20,
    fontFamily: constants.$fontFamilyBold,
    color: constants.$secondaryColor,
    marginLeft: '5%',
  },
  text: {
    fontFamily: constants.$fontFamily,
    fontSize: 18,
    textAlign: 'center',
    marginTop: '5%',
    marginBottom: '5%',
    letterSpacing: 0.25,
    color: constants.$secondaryColor,
  },
  cardContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    marginTop: '5%',
    width: 140,
    margin: '3%',
    paddingVertical: '5%',
    borderRadius: 10,
    borderColor: constants.$quinaryColor,
    borderWidth: 2,
    backgroundColor: constants.$tertiaryColor,
    alignItems: 'center',
    elevation: 3,
  },
  cardContent: {
    alignContent: 'center',
    paddingBottom: '10%',
  },
  addPetText: {
    color: constants.$secondaryColor,
    fontSize: 18,
  },
  photo: {
    width: 75,
    height: 75,
    borderRadius: 50,
    marginTop: 8,
  },
  name: {
    fontSize: 18,
  },
});

export default ChoosePet;
