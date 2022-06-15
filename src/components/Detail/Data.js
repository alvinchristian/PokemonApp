import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import {Colors} from '../../helpers/Colors';

export default function Data({data, object, object2}) {
  return (
    <View style={styles.Wrap}>
      {data[object]?.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={{
            ...styles.Box,
            backgroundColor: Colors.placeholder,
          }}>
          <Text style={styles.Text}>{item[object2].name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  Wrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  Text: {
    fontFamily: 'Poppins-Reguler',
    fontSize: 12,
    color: Colors.black,
    textTransform: 'capitalize',
  },
  Box: {
    width: 100,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    margin: 5,
  },
});
