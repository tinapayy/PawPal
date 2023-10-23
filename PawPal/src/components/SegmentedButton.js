import * as React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { SegmentedButtons } from 'react-native-paper';

const MyComponent = () => {
  const [value, setValue] = React.useState('');

  return (
    <SafeAreaView style={styles.container}>
      <SegmentedButtons
        value={value}
        onValueChange={setValue}
        buttons={[
          {
            value: 'PetOwner',
            label: 'Pet Owner',
          },
          {
            value: 'Clinic',
            label: 'Clinic or Hospital',
          },
        ]}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 330,
    top: 100,
    flex: 1,
    alignSelf: 'center',
    position: 'absolute',
    alignItems: 'center',
  },
});

export default MyComponent;