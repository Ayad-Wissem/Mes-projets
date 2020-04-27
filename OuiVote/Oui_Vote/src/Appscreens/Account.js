import React, { Component } from '../../node_modules/react';
import { View, StyleSheet, Text, ScrollView, Platform, SafeAreaView, TextInput, Image, TouchableOpacity, KeyboardAvoidingView, Button, TouchableHighlight, ImageBackground, Dimensions } from 'react-native';
import { StackActions, NavigationActions } from "react-navigation"
import Icon from 'react-native-vector-icons/Ionicons';
import { theme } from '../core/theme';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

class Account extends Component {

  constructor (props){
    super(props)
    this.state = {
      email:"",
      token:"",
      name: "",
      email: '',
      error: '',
      data: [
        {
          name: ""
        }
      ]
    }
  }
  
  componentDidMount =  async ()=>{
    const value = await AsyncStorage.getItem('token')
      try {
        if(value !== null) {
          // value previously stored
          this.setState({token:value})
        }
        } catch(e) {
        // error reading value
        alert(e)
        }
        const headers = {
          'Authorization': 'Bearer ' + value
        };
        await fetch('http://2274a3f6.ngrok.io/api/user', {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + value
          }
        }).then(res => res.json())
        .then( async (resData) => {
          await AsyncStorage.setItem('city', resData.citie_id.toString())
         await AsyncStorage.setItem('user_id', resData.id.toString())
           //console.warn(resData.id)
          this.setState({
            email: resData.email,
            name: resData.name
          });
        }).catch((error) => {
          this.setState({
            error: 'Error retrieving data',
          });
        });
  }

  navigat() {
    this.props.navigation.navigate('Validation')
  }

  goHome = async () => {
    try {
      await AsyncStorage.setItem('token', '')
      const resetAction = StackActions.reset({
        index: 0,
        key: null,
        actions: [NavigationActions.navigate({ routeName: 'HomeScreen' })]
      })
      this.props.navigation.dispatch(resetAction)
    } catch (e) {
      console.log("erreur", e)
    }
  }

  render() {
    // const WINDOW_HEIGHT= Dimensions.get("window").height
    // const WINDOW_WIDTH = Dimensions.get("window").width
    return (
      <View style={{ flex: 1 }}>
        <ScrollView showsVerticalScrollIndicator={false} style={{
          // marginTop:Platform.OS === 'ios' ? 100 : 70, 
        }}
        >
          <View >
            <View style={{
              marginTop: 22,
              alignItems: 'center',
            }}
            >

              <View style={styles.card3}>
                <ImageBackground style={{
                  marginTop: -22,
                  width: "109%",
                  height: 110,
                  marginLeft: -28,
                  marginBottom: 23,
                  borderRadius: 23
                }} source={require("../assets/images/Base/account.png")}>
                  {/* {this.state.data.map((o, i) => { */}
                    {/* return( */}
                    <TouchableOpacity style={styles.card1}>
                      <Text style={{ top: Platform.OS === 'ios' ? 1 : 2, color: theme.colors.otherTitle, fontWeight: "bold", fontSize: 18 }}>{this.state.name}</Text>
                      <TextInput placeholder="@Poulet" style={{ top: Platform.OS === 'ios' ? 3 : -9, left: Platform.OS === 'ios' ? 0 : -7 }} />
                    </TouchableOpacity>
                  {/* )})} */}
                </ImageBackground>
              </View>

              <View style={styles.card2}>
                <View>

                  <TouchableOpacity style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 13 }}>
                    <Icon color="grey" size={25} name={'md-person'} />
                    <Text style={{ left: -32, top: Platform.OS === 'ios' ? 4 : 2, color: "grey", fontSize: 15 }}>Informations Personnelles</Text>
                    <Icon color="grey" size={25} name={'ios-arrow-forward'} />
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => this.navigat()} style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 13 }}>
                    <Icon color="grey" size={25} name={'md-checkmark-circle'} />
                    <Text style={{ left: -52, top: Platform.OS === 'ios' ? 4 : 2, color: "grey", fontSize: 15 }}>Valider votre compte</Text>
                    <Icon color="grey" size={25} name={'ios-arrow-forward'} />
                  </TouchableOpacity>

                  <TouchableOpacity style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 13 }}>
                    <Icon color="grey" size={25} name={'ios-settings'} />
                    <Text style={{ left: -82, top: Platform.OS === 'ios' ? 4 : 2, color: "grey", fontSize: 15 }}>Paramètres</Text>
                    <Icon color="grey" size={25} name={'ios-arrow-forward'} />
                  </TouchableOpacity>
                  <TouchableOpacity style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 13 }}>
                    <Icon color="grey" size={25} name={'md-notifications-outline'} />
                    <Text style={{ left: -32, top: Platform.OS === 'ios' ? 4 : 2, color: "grey", fontSize: 15 }}>Gestions des notifications</Text>
                    <Icon color="grey" size={25} name={'ios-arrow-forward'} />
                  </TouchableOpacity>
                  <TouchableOpacity style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 13 }}>
                    <Icon color="grey" size={25} name={'logo-ionic'} />
                    <Text style={{ left: -82, top: Platform.OS === 'ios' ? 4 : 2, color: "grey", fontSize: 15 }}>Règlement</Text>
                    <Icon color="grey" size={25} name={'ios-arrow-forward'} />
                  </TouchableOpacity>
                  <TouchableOpacity style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 13 }}>
                    <Icon color="grey" size={25} name={'ios-information-circle-outline'} />
                    <Text style={{ left: -82, top: Platform.OS === 'ios' ? 4 : 2, color: "grey", fontSize: 15 }}>A Propos</Text>
                    <Icon color="grey" size={25} name={'ios-arrow-forward'} />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => this.goHome()} style={styles.footer}>
                    <Icon color="grey" size={25} name={'ios-log-out'} />
                    <Text style={{ left: -82, top: Platform.OS === 'ios' ? 4 : 2, color: "grey", fontSize: 15 }}>Déconnexion</Text>
                    <Icon color="grey" size={25} name={'ios-arrow-forward'} />
                  </TouchableOpacity>
                </View>
              </View>

            </View>
          </View>

        </ScrollView>
      </View>
    )
  }
}
const styles = StyleSheet.create({

  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 13,
    top: Dimensions.get('window').height/4.5,
  },
  card2: {

    backgroundColor: "#fff",
    marginLeft: '2%',
    padding: 29,
    marginBottom: 12,
    width: '89%',
    shadowColor: "grey",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2.5,
    borderRadius: 8,
    height: Platform.OS === 'ios' ? 520 : 490,
    marginLeft: 26,
    marginRight: 26
  },
  card3: {
    backgroundColor: "#fff",
    padding: 29,
    marginBottom: 12,
    width: Platform.OS === 'ios' ? '90%' : '87%',
    shadowColor: "grey",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2.5,
    borderRadius: 8,
    height: Platform.OS === 'ios' ? 125 : 125,
    marginLeft: 26,
    marginRight: 26
  },
  card1: {
    marginLeft: '2%',
    marginBottom: 12,
    padding: 29,
    width: '89%',

    borderRadius: 8,
    height: 102,
    marginLeft: 26,
    marginRight: 26
  },
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
})
export default Account


