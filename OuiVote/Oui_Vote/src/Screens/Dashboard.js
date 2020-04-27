import React,{useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity
} from 'react-native';

import Navigator from'../Routes/AppRoutes'
import PopUp from '../Appscreens/subMenus/popup'
import InfoProject from '../Appscreens/subMenus/ProjectInfo'
import Modify from '../Appscreens/Mofified'
import Icon from 'react-native-vector-icons/Ionicons';
import Icon1 from 'react-native-vector-icons/Octicons';
import Home from '../Appscreens/Home'
import Vote from '../Appscreens/Vote'
import Results from '../Appscreens/Results'
import Posts from '../Appscreens/Posts'
import Homescreen from '../Screens/HomeScreen'
import PostsMaire from '../Appscreens/PostsMaire'
// import Projects from '../Appscreens/Projects'
import Account from '../Appscreens/Account'
import {theme} from '../core/theme'
import Validate from'../Appscreens/subMenus/Validate'
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import {createStackNavigator, createDrawerNavigator} from 'react-navigation-stack'
//import Icon from 'react-native-ionicons'
import Storage1 from '../core/storage'
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import AsyncStorage from '@react-native-community/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createAppContainer } from 'react-navigation';


const res = "";
const fg = async(res)=> {
  const result=await  AsyncStorage.getItem('maire')
    rese = JSON.stringify(result);
    return res
    //alert(JSON.stringify((res));
  }
  fg()
 //console.warn(Storage1("dfg"))
  
const HomeStack = createStackNavigator({
  Compte: { screen:Account },
  Validation: { screen: Validate },
  Acceuil:{screen:Home},
});
const AppStack = createStackNavigator({
  Acceuil:{
    screen:Home,
    navigationOptions:{
      headerShown:false
  }
  },
  
});

const ResultStack = createStackNavigator({
  Sondages: { 
    screen:Results 
  },
  Détail: { 
    screen:InfoProject ,
  },
  Modifier:{
    screen:Modify,
  }
});

const PropStack = createStackNavigator({
  Proposez:{
    screen: Posts
  },
  Scrutin: {
    screen:PostsMaire
  },
}
);

const Props = createStackNavigator({
  Scrutin: {
    screen:PostsMaire
  },
  Projet:{
      screen:Posts
  }
});

const Dashboard  = createMaterialBottomTabNavigator(
{
Acceuil:{
  screen:AppStack,
  navigationOptions: {
    tabBarIcon: ({ tintColor }) => (
      <View>
        <Icon style={[{color: tintColor}]} size={25} name={'ios-home'} />
      </View>
    ),
  }
},

Voter:{
  screen:Vote,
  navigationOptions: {
    tabBarIcon: ({ tintColor }) => (
      <View>
        <Icon style={[{color: tintColor}]} size={25} name={'ios-megaphone'} />
        <Icon ios="ios-add" android="md-add" />
      </View>
    ),
  }
},

Résultats:{
  screen:ResultStack,
  navigationOptions: {
    tabBarIcon: ({ tintColor }) => (
      <View>
        <Icon style={[{color: tintColor}]} size={25} name={'ios-stats'} />
      </View>
    ),
  }
},
Proposer:{
  screen:PropStack,
  navigationOptions: {
    tabBarIcon: ({ tintColor }) => (
      <View>
        <Icon1 style={[{color: tintColor}]} size={25} name={'pencil'} />
      </View>
    ),
  }
},
Compte:{
  screen:HomeStack,
  navigationOptions: {
    tabBarIcon: ({ tintColor }) => (
      <View>
        <Icon style={[{color: tintColor}]} size={25} name={'ios-person'} />
      </View>
    ),
  }
},

  },
{
  shifting: true,
  activeTintColor: theme.colors.other,
  inactiveTintColor: theme.colors.other,
  barStyle: {
    //height: 55,
    backgroundColor:theme.colors.other
  },
},
);
function App() {
  // const[isConnected, setConnected] = useState(false)

  // useEffect(()=>{
  //   const token = await AsyncStorage.getItem('token')
  //   if(token){
  //     setConnected(true)
  //   }else{
  //     setConnected(false)
  //   }
  // },[])
  Pla
  return  Dashboard

  
}
// export default class AppTabBar extends Component {

// }

export default Dashboard