import React, {Component } from '../../node_modules/react';
import { View,StyleSheet,Text} from 'react-native';

class Vote extends Component{
  render(){
    return(
      <View style={styles.centered}>
      <Text>Vote</Text>
      
    </View>
    )
  }
 
}
const styles = StyleSheet.create({
  centered:{
    flex:1,
    alignItems:"center",
    justifyContent:"center"
  }
})
export default Vote


