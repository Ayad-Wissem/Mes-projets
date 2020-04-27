import React, { Component } from '../../node_modules/react';
import { View, StyleSheet, Text, ScrollView, Platform, SafeAreaView, TextInput, Image, Dimensions, ImageBackground, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon1 from 'react-native-vector-icons/Octicons';
import { theme } from '../core/theme';
import Swiper from 'react-native-swiper'
import CustomWidget from "./subMenus/customWidget"
import AsyncStorage from '@react-native-community/async-storage';

//import { TextInput } from 'react-native-paper';
class Home extends Component {
  constructor() {
    super();
    this.state = {
      TextInputDisableStatus: true,
      token:"",
      data: [
        {
          "title": "Les Poulets partagés",
          "description": "les poulets il y a pas mieux comme bouffe"
        },
        {
          "title": "Les Jardins partagés",
          "description": "la vie est belle"
        }
      ],
      category:[
        {
          "title":"Poulet",
        },{
          "title":"Poulet",
        },{
          "title":"Patate",
        },
      ]
    }
  }
  componentDidMount =  async ()=>{
    const value = await AsyncStorage.getItem('token')

    const maire = await AsyncStorage.getItem('maire')
    //alert(maire)
      try {
        if(value !== null) {
          // value previously stored
          this.setState({token:value})
        }
        } catch(e) {
        // error reading value
        alert(e)
        }
        //console.warn(maire)
  }

  // state={
  //   data:[
  //     {
  //       "title":"Les Poulets partagés",
  //       "description":"les poulets il y a pas mieux comme bouffe"
  //     },
  //     {
  //       "title":"Les Jardins partagés",
  //       "description":"la vie est belle"
  //     }
  //   ]
  // }
  onPressButton = () => {
    this.setState({ TextInputDisableStatus: false })
  }
  render() {
    const image = { uri: "https://reactjs.org/logo-og.png" };
    const WINDOW_HEIGHT = Dimensions.get("window").height
    const WINDOW_WIDTH = Dimensions.get("window").width
    return (
      <View style={{ flex: 1 }}>
        <View style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          height: Platform.OS === 'ios' ? 100 : 70,
          backgroundColor: "#fff",
          zIndex: 1000,
          elevation: 1000,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowOpacity: 0.29,
          shadowRadius: 4.65,
          elevation: 7,
        }}>

          <SafeAreaView
            //header
            style={{
              //  flex:1,
              // justifyContent: 'center',
              alignItems: 'center',
              //  right:Platform.OS == "android"? Dimensions.get("window").width/29: 7,
              flexDirection: "row"
            }}
          >
            <View style={{
              height: 40,

            }}>
              <TextInput
                borderColor='transparent'
                placeholder="Rechercher un projet"
                underlineColorAndroid='transparent'
                style={{ color: "#9E9E9E", backgroundColor: this.state.TextInputDisableStatus ? '#FFF' : '#C0C0C0', borderWidth: 0, borderBottomWidth: 0, marginTop: Platform.OS === 'ios' ? 9 : 20, marginLeft: 40, fontSize: 16, paddingLeft: 12, paddingRight: 12, marginHorizontal: 17, width: 262, height: Platform.OS === 'ios' ? 32 : 40 }}
              />
              <Icon style={{ position: 'absolute', top: Platform.OS === 'ios' ? 13 : 26, left: 20 }} size={25} name={'ios-search'} color="grey" />
            </View>
            <View style={{ alignContent: "center", justifyContent: "center", top: Platform.OS === 'ios' ? null : 10, flexDirection: "row" }}>
              <Image style={{ top: 9, width: 25, height: 25 }} source={require("../assets/images/Base/message.png")}></Image>
              <Icon1 style={{ top: Platform.OS === 'ios' ? 7 : 8, left: 20 }} size={25} name={'bell'} color="#9E9E9E" />
            </View>

          </SafeAreaView>
        </View>
        <ScrollView style={{
          //marginTop: Platform.OS === 'ios' ? 120 : 80,
        }}
        >
          <View style={{ marginTop: Platform.OS === 'ios' ? 120 : 80, }}>
            <Text style={{ marginLeft: 12, marginBottom: 12, color: theme.colors.otherTitle, fontWeight: "bold", fontSize: 18 }}>Le Projet</Text>
            <View>
              <Swiper style={{ height: WINDOW_HEIGHT / 2 }}>
                {this.state.data.map((o, i) => {
                  return (
                    <ImageBackground borderRadius={12} source={image} style={styles.image}>
                      <View style={styles.card2}>
                        <View style={styles.centered} >
                          <View style={{ justifyContent: "center", flex: 1, alignItems: "center" }}>
                            <Text style={{ color: "white", fontWeight: "bold", fontSize: 18 }}>{o.title}</Text>
                            <Text style={{ color: "white", fontSize: 14, top: 34 }}>{o.description}</Text>
                          </View>
                        </View>
                        <TouchableOpacity>
                          <View style={{ borderRadius: 23, backgroundColor: "#67b5c9", color: "white", fontWeight: "bold", fontSize: 18, alignSelf: "center", paddingHorizontal: 50, paddingVertical: 20 }}>
                            <Text style={{ color: "white" }}>
                              Voter
                       </Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                    </ImageBackground>
                  )
                })}
              </Swiper>
            </View>
            
            {/* <CustomWidget/> */}
          </View>
          <View>
              <Text style={{ marginLeft: 12, marginBottom: 12, color: theme.colors.otherTitle, fontWeight: "bold", fontSize: 18 }}>Catégorie</Text>
    
               <View style={{ flexDirection: "row",   flexWrap:"wrap", justifyContent:"center"}}>
               {this.state.category.map((o, i) => {
                return(
                <View >
                  <ImageBackground blurRadius={4} borderRadius={12} source={image} style={styles.image2}>
                    <View style={styles.card6}>
                    <View style={styles.centered} >
                          <View style={{ justifyContent: "center",  alignItems: "center" }}>
                            <Text style={{ color: "white", fontWeight: "bold", fontSize: 18 }}>{o.title}</Text>
                          </View>
                        </View>
                    </View>
                  </ImageBackground>
                </View>
                )})}
                   <ImageBackground blurRadius={4} borderRadius={12} source={image} style={styles.image2}>
                     <View style={styles.custom}/>
                    <View style={styles.card6}>
                    <View style={styles.centered} >
                          <View style={{ justifyContent: "center",  alignItems: "center" }}>
                            <Text style={{ color: "white", fontWeight: "bold", fontSize: 18 }}>Poulet</Text>
                          </View>
                        </View>
                    </View>
                  </ImageBackground>
              </View>
            </View>
        </ScrollView>

      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  header: {
    //justifyContent: 'center',
    //alignItems: 'center',
    //marginTop:Platform.OS === 'ios' ? 15 : 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#3df",
    borderRadius: 12,
  },
  wrapper: {
  },
  slide1: {
    flex: 1,
    //  justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB'
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5'
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9'
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  },
  separator: {
    justifyContent: "center",
    alignSelf: "center",
    marginBottom: 10,
    borderWidth: 0.5,
    width: "90%",
    borderColor: Platform.OS === 'ios' ? '#a1a1a1' : "#232423",
  },

  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    marginHorizontal: 60,
    marginTop: 12,
    shadowColor: "#000",
    marginBottom: 53,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
  },
  image2: {
    marginHorizontal:12,
   // marginTop: 8,
   shadowColor: "#000",
   marginBottom: 23,
   shadowOffset: {
     width: 0,
     height: 5,
   },
   shadowOpacity: 0.34,
   shadowRadius: 6.27,

   elevation: 10,
 },
  image2: {
     marginHorizontal:12,
    // marginTop: 8,
    shadowColor: "#000",
    marginBottom: 23,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
  },
  text: {
    color: "grey",
    fontSize: 30,
    fontWeight: "bold"
  },
  card2: {
    // backgroundColor: "#fff",
    // marginBottom: 23,
    marginHorizontal: 7,
    marginVertical: 12,

    padding: 29,

    shadowColor: "grey",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // elevation: 0.5,
    borderRadius: 8,
    height: 350,

  },
  custom:{
    backgroundColor:"#3df",
    opacity:0.1,
  },
  card6: {
   
    shadowColor: "grey",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // elevation: 0.5,
    borderRadius: 8,
    height: 150,
    width: 150,
  },
  card: {
    backgroundColor: "#fff",
    marginBottom: 23,
    marginLeft: '2%',
    padding: 29,
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
    height: 102,
    marginLeft: 26,
    marginRight: 26
  },
  centered: {
    flex: 1,
    alignSelf:"center",
    justifyContent: "center"
  },
  btnText: {

    marginLeft: 7,
    color: 'grey',
    fontSize: 15,
    width: (Dimensions.get('window').width / 2) - 25,
    justifyContent: "center"
  },

  btnTextHolder: {
    borderRadius: 12,

  },

});
export default Home


