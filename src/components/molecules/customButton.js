import React from 'react';
import {TouchableOpacity, Text} from 'react-native';

const CustomButton = ({title, ...props}) => {
  return (
    <TouchableOpacity {...props}>
      <Text>{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
