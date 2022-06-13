import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import React, {useEffect, useState, useMemo, useCallback} from 'react';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {BackgroundColors, Colors} from '../../helpers/Colors';

export default function List({navigation}) {
  const [allPokemon, setAllPokemon] = useState([]);
  const [url, setUrl] = useState('https://pokeapi.co/api/v2/pokemon?limit=24');
  const [nextUrl, setNextUrl] = useState('');
  const [prevUrl, setPrevUrl] = useState('');
  const [loading, setLoading] = useState(true);

  const getAllPokemons = useMemo(async () => {
    try {
      setLoading(true);
      setAllPokemon([]);
      const res = await axios.get(url);
      setNextUrl(res.data.next);
      setPrevUrl(res.data.previous);
      getPokemon(res.data.results);
    } catch (error) {
      console.log(error);
    }
  }, [url]);

  const getPokemon = async data => {
    try {
      await data.forEach(async pokemon => {
        const res = await axios.get(pokemon.url);
        setAllPokemon(currentList => [...currentList, res.data]);
      });
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const pagination = useCallback(async url => {
    setUrl(url);
  }, []);

  useEffect(() => {
    getAllPokemons;
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
          resizeMode="center"
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
          <Text style={styles.Title}>Pokedex</Text>
          <FlatList
            contentContainerStyle={styles.Box}
            data={allPokemon.sort((a, b) => a.id - b.id)}
            numColumns={3}
            showsVerticalScrollIndicator={false}
            renderItem={renderItem}
            keyExtractor={(item, index) => item.id}
          />
          <View style={styles.Pagination}>
            {prevUrl && (
              <TouchableOpacity
                style={styles.Button}
                onPress={() => {
                  pagination(prevUrl);
                }}>
                <Icon
                  name="arrow-left-circle-outline"
                  size={20}
                  color={Colors.black}
                />
                <Text style={styles.Text}>Previous</Text>
              </TouchableOpacity>
            )}
            {nextUrl && (
              <TouchableOpacity
                style={styles.Button}
                onPress={() => {
                  pagination(nextUrl);
                }}>
                <Text style={styles.Text}>Next</Text>
                <Icon
                  name="arrow-right-circle-outline"
                  size={20}
                  color={Colors.black}
                />
              </TouchableOpacity>
            )}
          </View>
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
  Image: {
    width: 90,
    height: 75,
    resizeMode: 'center',
  },
  Name: {
    fontFamily: 'Poppins-Reguler',
    fontSize: 12,
    textTransform: 'capitalize',
    color: Colors.black,
  },
  Pagination: {
    flexDirection: 'row',
    width: '30%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  Button: {
    marginVertical: 10,
    marginHorizontal: 20,
    flexDirection: 'row',
  },
  Text: {
    fontFamily: 'Poppins-Bold',
    fontSize: 12,
    color: Colors.black,
    marginHorizontal: 5,
  },
  ImageBackground: {
    position: 'absolute',
    width: 60,
    height: 80,
    left: 60,
    top: -20,
  },
});
