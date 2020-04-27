import React, { memo, useState, useEffect } from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import BackButton from '../components/BackButton';
import { theme } from '../core/theme';
import { emailValidator, passwordValidator } from '../core/utils';
import AsyncStorage from '@react-native-community/async-storage';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });
  // const [token, setToken] = useState({ value: ''});

  const _onLoginPressed = async () => {
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);
    await fetch('http://2274a3f6.ngrok.io/api/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ "email": email.value, "password": password.value })
    }).then(res => res.json())
      .then( async resData => {
        if (emailError || passwordError) {
          setEmail({ ...email, error: emailError });
          setPassword({ ...password, error: passwordError });
          return;
          // navigation.navigate('Loading');
        };
        if (resData.message == "identifiants invalides") {
          alert(resData.message)
        } else {
          // setToken({value:resData.User.token})
          try {
            await AsyncStorage.setItem('token', resData.User.token)
            await AsyncStorage.setItem('maire', JSON.stringify(resData.User.maire) )
            navigation.navigate('Loading');
            // console.warn(resData.User.token)
          } catch(e) {
            console.log("erreur",e)
          }
          //  console.warn(resData.User.token)
            
        }
      }).catch(error => {
        alert(error);
        // return { name: "network error", description: "" };
      });
      // console.warn(token.value)
      // await AsyncStorage.setItem('@storage_Key', token.value)
  }
  return (
    <Background>
      <BackButton goBack={() => navigation.navigate('HomeScreen')} />
      <Logo />
      <Header>Bienvenue.</Header>

      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={text => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />

      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={text => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />

      <View style={styles.forgotPassword}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ForgotPasswordScreen')}
        >
          <Text style={styles.label}>Mot de passe oublié?</Text>
        </TouchableOpacity>
      </View>

      <Button color={theme.colors.primary} mode="contained" onPress={_onLoginPressed}>
        Connexion
      </Button>

      <View style={styles.row}>
        <Text style={styles.label}>Vous n'avez pas de compte? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}>
          <Text style={styles.link}>S'enregistrer</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  label: {
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
});

export default memo(LoginScreen);
