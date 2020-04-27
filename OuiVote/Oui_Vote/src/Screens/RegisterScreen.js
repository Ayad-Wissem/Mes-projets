import React, { memo, useState, SetStateAction } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import BackButton from '../components/BackButton';
import { theme } from '../core/theme';
//import { CheckBox } from 'native-base'
import { CheckBox } from 'react-native-elements'
//import CheckBox from '@react-native-community/checkbox';
import {
  emailValidator,
  passwordValidator,
  nameValidator,
  charteValidator
} from '../core/utils';

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState({ value: '', error: '' });
  const [email, setEmail] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });
  const [isSelected, setSelection] = useState(false);
  const toogle = () => setSelection(!isSelected)


  //   const getState= {
  //   one = false,
  //   setState= ({value}) =>{
  //     one = value
  //   },
  //   setSelectio= ()=> {
  //     one = true;
  //     if( one == true){
  //       one = false;
  //     }
  //   },
  // }
  const _onSignUpPressed = async () => {
    const nameError = nameValidator(name.value);
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);
    const boxError = charteValidator();
    await fetch('http://2274a3f6.ngrok.io/api/register', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ "name": name.value, "email": email.value, "password": password.value 
    })
    }).then((response) => {response.json()
      .then(responseData => {
        // console.warn(response.status)
        if (emailError || passwordError || nameError) {
          setName({ ...name, error: nameError });
          setEmail({ ...email, error: emailError });
          setPassword({ ...password, error: passwordError });

        }
        if (responseData.message == "The given data was invalid.") {
          setEmail({ ...email, error: "L'email est déja utilisée." });
          return;
        }
        if (response.status == 200) {
          alert("Vous etes bien enregistré.\n veuillez vous connecter")
          navigation.navigate('LoginScreen');
        }
      }
      )
    }
    // .catch(error => {
    //   alert(error);
    //   // return { name: "network error", description: "" };
    // });
    // navigation.navigate('LoginScreen');
    )}

  return (
    <Background>
      <BackButton goBack={() => navigation.navigate('HomeScreen')} />
      <Logo />
      <Header
        containerStyle={{
          backgroundColor: '#3D6DCC',
          justifyContent: 'space-around',
        }}>Creer un compte</Header>
      <Text style={styles.label}>
        Nous sommes heureux de vous acceuillir.
          </Text>
      <Text paragraph color="gray" style={styles.text}>
        Votez devient plus simple avec nous
      </Text>
      <TextInput
        label="Name"
        returnKeyType="next"
        value={name.value}
        onChangeText={text => setName({ value: text, error: '' })}
        error={!!name.error}
        errorText={name.error}
      />

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
      <CheckBox
        onPress={toogle}
        checked={isSelected}
        title="J'accepte les CGU et la charte de confidentialité"
      />
      <Button mode="contained" onPress={_onSignUpPressed} style={styles.button}>
        S'enregistrer
      </Button>

      <View style={styles.row}>
        <Text style={styles.label}>Vous avez déja un compte? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
          <Text style={styles.link}>Connexion</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  text: {
    //color: theme.colors.secondary,
    marginBottom: 2
  },
  label: {
    color: theme.colors.secondary,
  },
  button: {
    marginTop: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
});

export default RegisterScreen;
