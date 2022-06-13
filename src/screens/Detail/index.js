import {
  SafeAreaView,
  ImageBackground,
  StyleSheet,
  StatusBar,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Header from '../../components/Header';
import List from '../../components/Detail/List';
import {BackgroundColors} from '../../helpers/Colors';

export default function Detail({route, navigation}) {
  const idPokemon = route.params.idPokemon;
  const [pokemon, setPokemon] = useState([]);
  const [background, setBackground] = useState('');

  const getPokemon = async () => {
    try {
      const res = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${idPokemon}/`,
      );
      const data = res.data;
      setPokemon(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (pokemon != false) {
      setBackground(pokemon.types[0].type.name);
    } else {
      getPokemon();
    }
  }, [pokemon]);

  return (
    <SafeAreaView
      style={{
        ...styles.Container,
        backgroundColor: BackgroundColors[background],
      }}>
      <StatusBar
        backgroundColor={BackgroundColors[background]}
        barStyle={'light-content'}
      />
      <Header navigation={navigation} />
      <ImageBackground
        resizeMode="contain"
        style={styles.ImageBackground}
        source={require('../../assets/Images/pokeball_card.png')}
      />
      {pokemon != false ? (
        <List data={pokemon} navigation={navigation} />
      ) : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    alignItems: 'center',
  },
  ImageBackground: {
    position: 'absolute',
    width: '100%',
    height: '50%',
    left: 100,
  },
});
