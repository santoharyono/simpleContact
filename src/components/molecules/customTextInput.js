import React from 'react';
import {TextInput, StyleSheet} from 'react-native';

const CustomTextInput = ({value, placeholder, onChangeText, editable}) => {
  return (
    <TextInput
      value={value}
      placeholder={placeholder}
      onChangeText={onChangeText}
      editable={editable}
      style={styles.input}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#c7c7c7',
    width: '100%',
    borderRadius: 10,
    marginVertical: '5%',
    paddingHorizontal: '5%',
  },
});

export default CustomTextInput;
