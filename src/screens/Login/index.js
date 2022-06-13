import {
  View,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  Image,
  StatusBar,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import {Formik} from 'formik';
import * as yup from 'yup';
import auth from '@react-native-firebase/auth';
import {showMessage} from 'react-native-flash-message';
import Input from '../../components/Input';
import Button from '../../components/Button';
import {Colors} from '../../helpers/Colors';

export default function Login({navigation}) {
  const [loading, setLoading] = useState(false);

  let loginSchema = yup.object().shape({
    email: yup
      .string()
      .email('Invalid email!')
      .required('Please Enter Your Email!'),
    password: yup
      .string()
      .required('Please Enter Your Password!')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
        'Must Contain 8 Characters, One Uppercase, One Lowercase and One Number!',
      ),
  });

  const login = useCallback(async values => {
    try {
      await auth().signInWithEmailAndPassword(values.email, values.password);
      setLoading(true);
    } catch (error) {
      switch (error.code) {
        case 'auth/user-not-found':
          showMessage({
            message: 'User Not Found!',
            type: 'danger',
            backgroundColor: Colors.danger, // background color
            color: Colors.white, // text color
          });
          break;
        case 'auth/wrong-password':
          showMessage({
            message: 'Password Incorrect!',
            type: 'danger',
            backgroundColor: Colors.danger, // background color
            color: Colors.white, // text color
          });
          break;
        case 'auth/too-many-requests':
          showMessage({
            message: 'Too Many Request, Please Try Again Later!',
            type: 'danger',
            backgroundColor: Colors.danger, // background color
            color: Colors.white, // text color
          });
          break;
      }
    }
  }, []);

  return (
    <Formik
      initialValues={{email: '', password: ''}}
      validationSchema={loginSchema}
      onSubmit={values => login(values)}>
      {({handleChange, handleBlur, handleSubmit, values, errors}) => (
        <SafeAreaView style={styles.Container}>
          <StatusBar backgroundColor={Colors.light} barStyle={'dark-content'} />
          {loading ? (
            <ActivityIndicator size={50} color="#4D96FF" />
          ) : (
            <ScrollView contentContainerStyle={styles.Box}>
              <Text style={styles.Title}>LOGIN</Text>
              <Image
                style={styles.Image}
                source={require('../../assets/Images/pokemon.png')}
              />
              <View style={styles.Card}>
                <Input
                  icon={'email-outline'}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  placeholder={'Email'}
                  error={errors.email}
                />
                <Input
                  icon={'lock-outline'}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  placeholder={'Password'}
                  error={errors.password}
                  secureTextEntry={true}
                />
                <Button caption={'Login'} onPress={handleSubmit} />
              </View>
              <View style={styles.Navigation}>
                <Text style={styles.Text}>Don't have an account? </Text>
                <TouchableOpacity
                  onPress={() => navigation.replace('Register')}>
                  <Text style={{...styles.Text, color: Colors.info}}>
                    Register!
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          )}
        </SafeAreaView>
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: Colors.light,
    justifyContent: 'center',
  },
  Box: {
    flexGrow: 1,
    alignItems: 'center',
  },
  Title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 25,
    color: Colors.black,
    marginTop: '5%',
  },
  Card: {
    backgroundColor: Colors.dark,
    width: '90%',
    borderRadius: 30,
    alignItems: 'center',
    paddingVertical: '10%',
  },
  Image: {
    width: '80%',
    height: 200,
    resizeMode: 'center',
    marginBottom: '5%',
  },
  Navigation: {
    flexDirection: 'row',
    marginVertical: '15%',
  },
  Text: {
    fontFamily: 'Poppins-Reguler',
    color: Colors.black,
    fontSize: 12,
  },
});
