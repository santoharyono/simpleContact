import React from 'react';
import {Image, Text, StyleSheet, TouchableOpacity, View} from 'react-native';

const ItemList = ({name, photo, ...addProps}) => {
  return (
    <TouchableOpacity style={styles.container} {...addProps}>
      <Image
        source={
          photo !== 'N/A'
            ? {uri: photo}
            : require('../../assets/icons/person.png')
        }
        style={styles.image}
      />
      <View style={styles.textContainer}>
        <Text style={styles.text}>{name}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginVertical: 10,
    marginLeft: '5%',
  },
  textContainer: {
    marginLeft: 10,
    justifyContent: 'center',
  },
  text: {
    fontSize: 15,
  },
});
export default ItemList;
