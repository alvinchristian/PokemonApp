import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Colors} from '../helpers/Colors';

const Input = ({
  icon,
  placeholder,
  onChangeText,
  value,
  error,
  secureTextEntry,
}) => {
  const [isSecureText, setIsSecureText] = useState(secureTextEntry);
  return (
    <View style={styles.Container}>
      <View style={styles.Container2}>
        <Icon style={styles.Icon} name={icon} size={20} color={Colors.black} />
        <TextInput
          style={styles.Input}
          placeholder={placeholder}
          onChangeText={onChangeText}
          value={value}
          secureTextEntry={isSecureText}
          placeholderTextColor={Colors.placeholder}
        />
        {placeholder == 'Password' || placeholder == 'Confirm Password' ? (
          <TouchableOpacity
            onPress={() => {
              setIsSecureText(val => !val);
            }}>
            <Icon
              name={isSecureText ? 'eye-outline' : 'eye-off-outline'}
              size={20}
              color={Colors.black}
            />
          </TouchableOpacity>
        ) : null}
      </View>
      <Text style={styles.Text}>{error}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    alignItems: 'center',
    width: '100%',
  },
  Container2: {
    backgroundColor: Colors.white,
    width: '80%',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 25,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  Icon: {
    marginLeft: 10,
    paddingRight: 8,
    borderRightWidth: 2,
    borderColor: Colors.black,
  },
  Input: {
    width: '70%',
    fontFamily: 'Poppins-Reguler',
    marginHorizontal: 5,
    fontSize: 12,
  },
  Text: {
    width: '70%',
    fontFamily: 'Poppins-Reguler',
    fontSize: 12,
    color: Colors.danger,
    marginTop: 5,
    marginBottom: 15,
  },
});

export default Input;
