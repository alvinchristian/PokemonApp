import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Animated,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import React, {useState, useCallback, useMemo} from 'react';
import {firebase} from '@react-native-firebase/database';
import {showMessage} from 'react-native-flash-message';
import Data from './Data';
import RoundedButton from '../RoundedButton';
import {BackgroundColors, Colors} from '../../helpers/Colors';

export default function List({data, navigation}) {
  const [disable, setDisable] = useState(false);
  const [caption, setCaption] = useState('Catch');
  const [color, setColor] = useState(Colors.white);
  const [loading, setLoading] = useState(true);
  const [bubbleAnimaiton, setBubbAnimation] = useState(new Animated.Value(1));
  const [bubbleAnimaitonOpacity, setBubbleAnimationOpacity] = useState(
    new Animated.Value(1),
  );

  const myDB = firebase
    .app()
    .database(
      'https://pokemonapp-binar-default-rtdb.asia-southeast1.firebasedatabase.app/',
    );

  const fadeOut = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(bubbleAnimaitonOpacity, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(bubbleAnimaitonOpacity, {
          toValue: 1,
          duration: 2000,
          delay: 2000,
          useNativeDriver: true,
        }),
      ]),
      {
        iterations: 1,
      },
    ).start();
  };

  const run = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(bubbleAnimaiton, {
          toValue: 400,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(bubbleAnimaitonOpacity, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(bubbleAnimaiton, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(bubbleAnimaitonOpacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
      {
        iterations: 1,
      },
    ).start();
  };

  const catched = useMemo(() => {
    setLoading(true);
    myDB.ref('pokebag/').on('value', snapshot => {
      if (snapshot.val() != null) {
        const res = Object.values(snapshot.val());
        res.filter(it => {
          if (it.name === data.name) {
            setColor(Colors.placeholder);
            setCaption('Catched');
            setDisable(true);
          }
        });
      }
      setLoading(false);
    });
  }, [data]);

  const catchPokemon = useCallback(() => {
    if (Math.random() < 0.5) {
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
            fadeOut();
            setDisable(true);
            setCaption('Catched');
            setColor(Colors.placeholder);
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
      run();
    }
  }, []);

  return (
    <View style={styles.Container}>
      {loading ? (
        <ActivityIndicator size={50} color="#4D96FF" />
      ) : (
        <>
          <View style={styles.Header}>
            <RoundedButton
              iconName={'keyboard-backspace'}
              onPress={() => navigation.navigate('Dashboard')}
            />
            <Animated.Image
              style={{
                ...styles.Image,
                transform: [{translateX: bubbleAnimaiton}],
                opacity: bubbleAnimaitonOpacity,
              }}
              source={{uri: data.sprites.other.home.front_default}}
            />
            <RoundedButton
              iconName={'bag-personal'}
              onPress={() => navigation.navigate('Bag')}
            />
          </View>
          <TouchableOpacity
            onPress={catchPokemon}
            disabled={disable}
            style={{
              ...styles.Button2,
              backgroundColor: color,
            }}>
            <Text style={styles.ButtonText}>{caption}</Text>
          </TouchableOpacity>
          <ScrollView contentContainerStyle={styles.Card}>
            <Text style={styles.Name}>{data.name}</Text>
            <View style={styles.Wrap}>
              {data.types?.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={{
                    ...styles.Box,
                    backgroundColor: BackgroundColors[item.type.name],
                  }}>
                  <Text style={styles.Text}>{item.type.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <Text style={styles.Title}>About</Text>
            <Text style={styles.Text2}>Height : {data?.height}</Text>
            <Text style={styles.Text2}>Weight : {data?.weight}</Text>
            <Text style={styles.Text2}>Species : {data.species?.name}</Text>
            <Text style={styles.Title}>Abilities</Text>
            <Data data={data} object={'abilities'} object2={'ability'} />
            <Text style={styles.Title}>Moves</Text>
            <Data data={data} object={'moves'} object2={'move'} />
          </ScrollView>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  Image: {
    width: 200,
    height: 200,
    resizeMode: 'center',
  },
  Button2: {
    alignSelf: 'center',
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
