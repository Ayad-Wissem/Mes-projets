import React, { memo } from 'react';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import Paragraph from '../components/Paragraph';
import { View } from 'react-native';
import { theme } from '../core/theme';

const HomeScreen = ({ navigation }) => (

  <Background>
    <View style={{marginBottom:122, alignContent:"center"}}>
    <View style={{marginLeft:12}}>
    <Logo />
    </View>
    <Header>Votre voie compte!</Header>
    </View>
  
    <Button color={theme.colors.primary} mode="contained" onPress={() => navigation.navigate('LoginScreen')}>
      Connexion
    </Button>
    <Button
      mode="outlined"
      color={theme.colors.other}
      onPress={() => navigation.navigate('RegisterScreen')}
    >
      S'enregistrer
    </Button>
  </Background>
);

export default memo(HomeScreen);
