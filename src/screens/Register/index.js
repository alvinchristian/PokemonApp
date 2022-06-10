import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  StyleSheet,
} from 'react-native';
import React from 'react';
import {Formik} from 'formik';
import Input from '../../components/Input';
import {Colors} from '../../helpers/Colors';
import Button from '../../components/Button';
import auth from '@react-native-firebase/auth';
import FlashMessage, {showMessage} from 'react-native-flash-message';
import * as yup from 'yup';

export default function Register({navigation}) {
  // const getImage = async () => {
  //   launchImageLibrary({includeBase64: true, quality: 1}, response => {
  //     console.log('Response = ', response);
  //     if (response.didCancel || response.error) {
  //       showMessage({
  //         message: 'Failed to Select Photo!',
  //         type: 'danger',
  //         backgroundColor: Colors.failed, // background color
  //         color: Colors.black, // text color
  //       });
  //     } else {
  //       setPhoto({
  //         filePath: response,
  //         fileData: response.data,
  //         fileUri: response.uri,
  //       });
  //       console.log(response.uri);
  //     }
  //   });
  // };

  let registerSchema = yup.object().shape({
    name: yup.string().required('Please Enter Your Name!'),
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

  const register = async values => {
    try {
      await auth().createUserWithEmailAndPassword(
        values.email,
        values.password,
      );
      const update = {
        displayName: values.name,
        // photoURL: values.photo,
      };
      await auth().currentUser.updateProfile(update);
      showMessage({
        message: 'Register Successfull!',
        type: 'success',
        backgroundColor: Colors.success, // background color
        color: Colors.white, // text color
      });
      setTimeout(() => {
        navigation.replace('Login');
      }, 3000);
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        showMessage({
          message: 'That Email Address is Already in Use!',
          type: 'danger',
          backgroundColor: Colors.danger, // background color
          color: Colors.white, // text color
        });
      }
    }
  };

  return (
    <Formik
      initialValues={{name: '', email: '', password: ''}}
      validationSchema={registerSchema}
      onSubmit={values => register(values)}>
      {({handleChange, handleBlur, handleSubmit, values, errors}) => (
        <SafeAreaView style={styles.Container}>
          <StatusBar backgroundColor={Colors.light} barStyle={'dark-content'} />
          <ScrollView
            contentContainerStyle={styles.Box}
            showsVerticalScrollIndicator={false}>
            <Text style={styles.Title}>REGISTER</Text>
            <View style={styles.Card}>
              <Input
                icon={'account-outline'}
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                value={values.name}
                placeholder={'Name'}
                error={errors.name}
              />
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
              <Button caption={'Register'} onPress={handleSubmit} />
            </View>
            <View style={styles.Navigation}>
              <Text style={styles.Text}>Already have an account?</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={{...styles.Text, color: Colors.info}}>
                  {' '}
                  Login!
                </Text>
              </TouchableOpacity>
            </View>
            <FlashMessage position="top" />
          </ScrollView>
        </SafeAreaView>
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: Colors.light,
  },
  Box: {
    flexGrow: 1,
    alignItems: 'center',
  },
  Title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 25,
    color: Colors.black,
    marginVertical: '10%',
  },
  Card: {
    backgroundColor: Colors.dark,
    width: '90%',
    borderRadius: 30,
    alignItems: 'center',
    paddingVertical: '10%',
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
