import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  ImageBackground,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import React, {useEffect, useState, useMemo, useCallback} from 'react';
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
    setLoading(true);
    if (pokemons != false) {
      setLoading(false);
    } else {
      myDB
        .ref('pokebag/')
        .orderByChild('id')
        .once('value')
        .then(snapshot => {
          if (snapshot.val() != null) {
            const res = Object.values(snapshot.val());
            setPokemons(res);
          }
        });
    }
  }, [pokemons]);

  const removePokemon = useCallback(async id => {
    await myDB.ref(`/pokebag/${id}`).remove();
  }, []);

  const renderItem = ({item}) => {
    return (
      <View style={styles.ItemContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Detail', {idPokemon: item.id})}
          style={{
            ...styles.Card,
            backgroundColor: BackgroundColors[item.types[0].type.name],
          }}>
          <Text style={styles.Id}>{item.id}</Text>
          <Image
            style={styles.Image}
            source={{
              uri: item.sprites.other.home.front_default,
            }}
          />
          <Text style={styles.Name} numberOfLines={1}>
            {item.name}
          </Text>
          <ImageBackground
            resizeMode="contain"
            source={require('../../assets/Images/pokeball_card.png')}
            style={styles.ImageBackground}></ImageBackground>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.Button}
          onPress={() => removePokemon(item.id)}>
          <Text style={styles.Text}>Delete</Text>
        </TouchableOpacity>
      </View>
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
  ItemContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  Button: {
    width: '80%',
    height: 25,
    backgroundColor: Colors.danger,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  Text: {
    fontFamily: 'Poppins-Reguler',
    fontSize: 12,
    color: Colors.white,
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
  Image: {
    width: 90,
    height: 75,
    resizeMode: 'center',
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
