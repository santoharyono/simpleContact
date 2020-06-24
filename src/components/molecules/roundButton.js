import React from 'react';
import {TouchableOpacity, StyleSheet, Text} from 'react-native';

const RoundButton = ({onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Text style={styles.textIcon}>+</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 50,
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
    height: 70,
    width: 70,
  },
  textIcon: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default RoundButton;
