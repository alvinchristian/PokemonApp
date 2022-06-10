import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import React, {useEffect, useState, useMemo} from 'react';
import {SvgUri} from 'react-native-svg';
import {BackgroundColors, Colors} from '../../helpers/Colors';
import {firebase} from '@react-native-firebase/database';

export default function List({navigation}) {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);

  const myDB = firebase
    .app()
    .database(
      'https://pokemonapp-binar-default-rtdb.asia-southeast1.firebasedatabase.app/',
    );

  const getPokebag = useMemo(() => {
    myDB
      .ref('pokebag/')
      .orderByChild('id')
      .once('value')
      .then(snapshot => {
        setPokemons(Object.values(snapshot.val()));
        pokemons != false ? setLoading(false) : setLoading(true);
      });
  }, [pokemons]);

  useEffect(() => {
    getPokebag;
  }, []);

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('Detail', {idPokemon: item.id})}
        style={{
          ...styles.Card,
          backgroundColor: BackgroundColors[item.types[0].type.name],
        }}>
        <Text style={styles.Id}>{item.id}</Text>
        <SvgUri
          width={80}
          height={60}
          uri={item.sprites.other.dream_world.front_default}
        />
        <Text style={styles.Name} numberOfLines={1}>
          {item.name}
        </Text>
        <ImageBackground
          resizeMode="contain"
          source={require('../../assets/Images/pokeball_card.png')}
          style={styles.ImageBackground}></ImageBackground>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.Container}>
      {loading ? (
        <ActivityIndicator size={50} color="#4D96FF" />
      ) : (
        <>
          <Text style={styles.Title}>Pokebag</Text>
          <FlatList
            contentContainerStyle={styles.Box}
            data={pokemons.sort((a, b) => a.id - b.id)}
            numColumns={3}
            showsVerticalScrollIndicator={false}
            renderItem={renderItem}
            keyExtractor={(item, index) => item.id}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    width: '100%',
    backgroundColor: Colors.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  Title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    marginTop: 20,
    paddingHorizontal: 20,
    color: Colors.black,
    borderBottomWidth: 2,
  },
  Box: {
    width: '100%',
    paddingVertical: 20,
  },
  Card: {
    width: 110,
    height: 150,
    margin: 5,
    borderRadius: 20,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  Id: {
    fontFamily: 'Poppins-Bold',
    fontSize: 14,
    color: Colors.black,
  },
  Name: {
    fontFamily: 'Poppins-Reguler',
    fontSize: 12,
    textTransform: 'capitalize',
    color: Colors.black,
  },
  ImageBackground: {
    position: 'absolute',
    width: 60,
    height: 80,
    left: 60,
    top: -15,
  },
});
