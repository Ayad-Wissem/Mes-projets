import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Loading from '../Screens/Loading'
import Home from '../Appscreens/Home'
import Vote from '../Appscreens/Vote'
import Results from '../Appscreens/Results'
import Posts from '../Appscreens/Posts'
import Account from '../Appscreens/Account'
import Route from '../Screens/route'
import {
  HomeScreen,
  LoginScreen,
  RegisterScreen,
  ForgotPasswordScreen,
  Dashboard,
} from '../Screens';
import Validate from'../Appscreens/subMenus/Validate'



const App =() =>{
  // const[isConnected, setConnected] = useState(false)

  // useEffect(()=>{
  //   const token = await AsyncStorage.getItem('token')
  //   if(token){
  //     setConnected(true)
  //   }else{
  //     setConnected(false)
  //   }
  // },[])
  return(Router)
  
}

const Router =createStackNavigator(
  {
    HomeScreen:{
      screen:HomeScreen,
      navigationOptions: ({ navigation }) => ({ headerShown:false, })
    },
    LoginScreen:{
      screen:LoginScreen,
      navigationOptions: ({ navigation }) => ({ headerShown:false, })
    },
    RegisterScreen:{
        screen:RegisterScreen,
        navigationOptions: ({ navigation }) => ({ headerShown:false, })
    },
    ForgotPasswordScreen:{
      screen:ForgotPasswordScreen,
      navigationOptions: ({ navigation }) => ({ headerShown:false, })
    },
    Dashboard:{
      screen:Dashboard,
      navigationOptions: ({ navigation }) => ({ headerLeft:() =>null,headerShown:false })
    },
    Loading:{
      screen:Loading,
      navigationOptions: ({ navigation }) => ({ headerShown:false})
    },
    //////////////////-----App Routes------//////////////////////////////
    Home:{
      screen:Home,
      navigationOptions: ({ navigation }) => ({ headerShown:false})
    },
    Vote:{
      screen:Vote,
      navigationOptions: ({ navigation }) => ({ headerShown:false})
    },
    Results:{
      screen:Results,
      navigationOptions: ({ navigation }) => ({ headerShown:false})
    },
    Posts:{
      screen:Posts,
      navigationOptions: ({ navigation }) => ({ headerShown:false})
    },
    Account:{
      screen:Account,
      navigationOptions: ({ navigation }) => ({ headerShown:false})
    },
    Validation:{
      screen:Validate,
      navigationOptions: ({ navigation }) => ({
     })
  },
  },

  {
    initialRouteName: 'HomeScreen',
  }
);

export default createAppContainer(Router);
