import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Home from '../Appscreens/Home'
import Vote from '../Appscreens/Vote'
import Results from '../Appscreens/Results'
import Posts from '../Appscreens/Posts'
import Valitate from '../Appscreens/subMenus/Validate'
import {
    LoginScreen,

  } from '../Screens';
import Account from '../Appscreens/Account'


const AppRoutes = createStackNavigator(
  {
    Account:{
        screen:Account,
        navigationOptions: ({ navigation }) => ({ headerShown:false, })
      },
    Validation:{
      screen:Valitate,
      navigationOptions: ({ navigation }) => ({ headerShown:false, })
    },

  },

  {
    initialRouteName: 'Validation',
  }
);


export default createAppContainer(AppRoutes);
