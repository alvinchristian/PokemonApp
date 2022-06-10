import {
  SafeAreaView,
  ImageBackground,
  StyleSheet,
  StatusBar,
} from 'react-native';
import React from 'react';
import Header from '../../components/Header';
import List from '../../components/Dashboard/List';
import {Colors} from '../../helpers/Colors';

export default function Dashboard({navigation}) {
  return (
    <SafeAreaView style={styles.Container}>
      <StatusBar backgroundColor={Colors.black} barStyle={'light-content'} />
      <Header navigation={navigation} page={'Dashboard'} />
      <ImageBackground
        resizeMode="contain"
        style={styles.ImageBackground}
        source={require('../../assets/Images/pokeball_header.png')}
      />
      <List navigation={navigation} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: Colors.black,
    alignItems: 'center',
  },
  ImageBackground: {
    position: 'absolute',
    width: '100%',
    height: '50%',
    opacity: 0.1,
  },
});
