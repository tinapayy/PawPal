// data.js
const petData = [
  {
    id: 1,
    name: 'Buddy',
    breed: 'Labrador',
    color: 'Golden',
    age: '2 months',
    sex: 'Male',
    weight: '2 kg',
    height: '200cm',
    petPicture: require('../images/forum_dog.jpg'),
  },
  {
    id: 2,
    name: 'Yan',
    breed: 'Labrador',
    color: 'Golden',
    age: '2 months',
    sex: 'Male',
    weight: '2 kg',
    height: '200cm',
    petPicture: require('../images/forum_cat1.jpg'),
  },
  {
    id: 3,
    name: 'Bubbly',
    breed: 'Labrador',
    color: 'Golden',
    age: '2 months',
    sex: 'Male',
    weight: '2 kg',
    height: '200cm',
    petPicture: require('../images/forum_dog.jpg'),
  },
  // ... other pet data
];

const ownerData = {
  id: 1,
  username: 'Kristina V. Celis',
  profilePicture: require('../images/userIcon3.png'),
  title: 'Pet Owner',
  description: 'Lorem Ipsum is simply dummy text of the printing. The quick brown fox jumped over the lazy dog near the riverbank.',
};

export { petData, ownerData };
