import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Colors} from '../helpers/Colors';

const Button = ({caption, onPress}) => {
  return (
    <TouchableOpacity style={styles.Container} onPress={onPress}>
      <Text style={styles.Text}>{caption}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  Container: {
    backgroundColor: Colors.white,
    width: '40%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    marginTop: 20,
  },
  Text: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: Colors.black,
  },
});

export default Button;
