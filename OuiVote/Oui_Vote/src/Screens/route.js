import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import React, {Component } from '../../node_modules/react';
import { NavigationContainer } from '@react-navigation/native';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    Button,
    TouchableOpacity
  } from 'react-native';
  import { createStackNavigator } from '@react-navigation/stack';
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
//   import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
//import {createStackNavigator, createDrawerNavigator, createAppContainer} from 'react-navigation-stack'
  //import Icon from 'react-native-ionicons'
  import { MaterialCommunityIcons } from 'react-native-vector-icons';
  //import storage from '../core/storage'
  import AsyncStorage from '@react-native-community/async-storage';

const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();
class Route extends Component{

      

render(){
    // const HomeStack1 = createStackNavigator({
    //     Compte: { screen:Account },
    //     Validation: { screen: Validate },
    //     Acceuil:{screen:Home},
    //   });
  return (
    <NavigationContainer>
         <Tab.Navigator
      initialRouteName="Home"
        
    >      <Stack.Navigator>
    <Stack.Screen name="Home" component={Account} />
    <Stack.Screen name="Notifications" component={Validate} />
    <Stack.Screen name="Profile" component={Home} />
  </Stack.Navigator>

       {/* <Tab.Screen
        name="Vote"
        component={Vote}
        options={{
          tabBarLabel: 'Vote',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
        />
       <Tab.Screen
        name="Résultats"
        component={Results}
        options={{
          tabBarLabel: 'Résultats',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
        /> */}
      </Tab.Navigator>
    </NavigationContainer>
  );
}};

export default Route