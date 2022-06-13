import {SafeAreaView, Animated, StatusBar, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import {showMessage} from 'react-native-flash-message';
import {Colors} from '../../helpers/Colors';

export default function Splash({navigation}) {
  const opacity = useState(new Animated.Value(1))[0];

  const fadeOut = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0,
          duration: 1000,
          delay: 500,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
      {
        iterations: 2,
      },
    ).start();
  };

  useEffect(() => {
    fadeOut();
    setTimeout(() => {
      auth().onAuthStateChanged(user => {
        try {
          if (user) {
            setTimeout(() => {
              navigation.replace('Dashboard');
            }, 3000);
            showMessage({
              message: 'Hello, Welcome!',
              type: 'success',
              backgroundColor: Colors.success, // background color
              color: Colors.white, // text color
            });
          } else {
            navigation.replace('Login');
          }
        } catch (error) {
          console.log(error);
        }
      });
    }, 5000);
  }, []);

  return (
    <SafeAreaView style={styles.Container}>
      <StatusBar backgroundColor={Colors.white} barStyle={'dark-content'} />
      <Animated.Image
        style={{...styles.Image, opacity}}
        source={require('../../assets/Images/pokeball.png')}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Image: {
    width: '80%',
    height: 200,
    resizeMode: 'center',
  },
});
