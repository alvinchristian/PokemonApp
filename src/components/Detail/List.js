import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import React, {useState, useCallback} from 'react';
import {firebase} from '@react-native-firebase/database';
import {showMessage} from 'react-native-flash-message';
import {SvgUri} from 'react-native-svg';
import Data from './Data';
import RoundedButton from '../RoundedButton';
import {Colors} from '../../helpers/Colors';

export default function List({data, navigation}) {
  const [catchButton, setCatchButton] = useState(false);
  const [catchedPokemons, setCatchedPokemons] = useState([]);

  const myDB = firebase
    .app()
    .database(
      'https://pokemonapp-binar-default-rtdb.asia-southeast1.firebasedatabase.app/',
    );

  const catchPokemon = useCallback(() => {
    if (Math.random() < 0.25) {
      try {
        myDB
          .ref('/pokebag/' + data.id)
          .set(data)
          .then(() => {
            showMessage({
              message: 'Pokemon Caught!',
              type: 'success',
              backgroundColor: Colors.success, // background color
              color: Colors.white, // text color
            });
          });
      } catch (error) {
        console.log(error);
      }
    } else {
      showMessage({
        message: 'Pokemon Run!',
        type: 'danger',
        backgroundColor: Colors.danger, // background color
        color: Colors.white, // text color
      });
    }
  }, []);

  // const catched = useCallback(() => {
  //   myDB
  //     .ref('pokebag/')
  //     .once('value')
  //     .then(snapshot => {
  //       setCatchedPokemons(Object.values(snapshot.val()));
  //       catchedPokemons.filter(it => {
  //         it.name != data.name ? setCatchButton(false) : setCatchButton(true);
  //         console.log(it.name != data.name);
  //       });
  //     });
  // });

  return (
    <View style={styles.Container}>
      <View style={styles.Header}>
        <RoundedButton
          iconName={'keyboard-backspace'}
          onPress={() => navigation.navigate('Dashboard')}
        />
        <SvgUri
          style={styles.Image}
          width={200}
          height={180}
          uri={data.sprites.other.dream_world.front_default}
        />
        <RoundedButton
          iconName={'bag-personal'}
          onPress={() => navigation.navigate('Bag')}
        />
      </View>
      <TouchableOpacity
        onPress={catchPokemon}
        disabled={catchButton}
        style={styles.Button2}>
        <Text style={styles.ButtonText}>Catch</Text>
      </TouchableOpacity>
      <ScrollView contentContainerStyle={styles.Card}>
        <Text style={styles.Name}>{data.name}</Text>
        <Data data={data} object={'types'} object2={'type'} />
        <Text style={styles.Title}>About</Text>
        <Text style={styles.Text2}>Height : {data?.height}</Text>
        <Text style={styles.Text2}>Weight : {data?.weight}</Text>
        <Text style={styles.Text2}>Species : {data.species?.name}</Text>
        <Text style={styles.Title}>Abilities</Text>
        <Data data={data} object={'abilities'} object2={'ability'} />
        <Text style={styles.Title}>Moves</Text>
        <Data data={data} object={'moves'} object2={'move'} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
  },
  Header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  Button2: {
    alignSelf: 'center',
    backgroundColor: Colors.white,
    width: 100,
    height: 40,
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
  },
  ButtonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 13,
    color: Colors.black,
  },
  Card: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 30,
    paddingVertical: 15,
    alignItems: 'center',
  },
  Name: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    color: Colors.black,
    textTransform: 'capitalize',
  },
  Title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    color: Colors.black,
    marginTop: 20,
  },
  Text2: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: Colors.black,
    textTransform: 'capitalize',
  },
});
