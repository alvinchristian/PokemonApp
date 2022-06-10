import {TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Colors} from '../helpers/Colors';

export default function RoundedButton({iconName, onPress, marginHorizontal}) {
  return (
    <TouchableOpacity
      style={{
        ...styles.Button,
        marginHorizontal: marginHorizontal,
      }}
      onPress={onPress}>
      <Icon name={iconName} size={22} color={Colors.black} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  Button: {
    backgroundColor: Colors.white,
    padding: 10,
    borderRadius: 25,
  },
});
