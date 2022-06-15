import {View, Text, Image, StyleSheet} from 'react-native';
import React, {useCallback} from 'react';
import auth from '@react-native-firebase/auth';
import RoundedButton from '../components/RoundedButton';
import {Colors} from '../helpers/Colors';

export default function Header({navigation, page}) {
  const name = auth().currentUser?.displayName;

  const logout = useCallback(async () => {
    await auth().signOut();
    navigation.replace('Login');
  }, []);

  return (
    <View style={styles.Container}>
      <View style={styles.Box}>
        <View>
          <Text style={styles.Greet}>Hello,</Text>
          <Text style={styles.Name}>{name}</Text>
        </View>
        <View style={styles.Right}>
          {page == 'Dashboard' ? (
            <RoundedButton
              iconName={'bag-personal'}
              onPress={() => navigation.navigate('Bag')}
            />
          ) : null}
          {page == 'Bag' ? (
            <RoundedButton
              iconName={'keyboard-backspace'}
              onPress={() => navigation.navigate('Dashboard')}
            />
          ) : null}
          <RoundedButton
            iconName={'exit-to-app'}
            onPress={logout}
            marginHorizontal={20}
          />
          <Image
            style={styles.Image}
            source={require('../assets/Images/user.png')}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  Container: {
    zIndex: 1,
    width: '90%',
    justifyContent: 'center',
    marginVertical: '5%',
  },
  Box: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  Right: {
    marginLeft: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  Greet: {
    fontFamily: 'Poppins-Reguler',
    color: Colors.white,
    fontSize: 14,
  },
  Name: {
    fontFamily: 'Poppins-Bold',
    color: Colors.white,
    fontSize: 18,
  },
  Image: {
    width: 45,
    height: 45,
    borderRadius: 50,
  },
});
