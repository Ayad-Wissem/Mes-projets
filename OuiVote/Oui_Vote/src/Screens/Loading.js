import React, { memo, Component } from 'react';
import { View, MaskedViewIOS, StyleSheet, Animated, Text, Image, Dimensions } from 'react-native';
import { NavigationActions, StackActions } from 'react-navigation'

class Loading extends Component{
componentDidMount(){
  setTimeout(() => {
    const resetAction = StackActions.reset({
      index: 0,
      key: null,
      actions: [NavigationActions.navigate({ routeName: 'Dashboard' })]
  })
  // console.warn(this.props.navigation.token)
  this.props.navigation.dispatch(resetAction, {token:this.props.navigation.token})
  }, 2000);
}


  render(){
    return(
      <View style={styles.centered}>
      <Image source={require('../assets/images/Base/Maquettes-Citoyens-18.png')}
      style={[{width:Dimensions.get('screen').width, height:Dimensions.get('screen').height}]}
      resizeMode="cover"
      ></Image>
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
export default Loading


