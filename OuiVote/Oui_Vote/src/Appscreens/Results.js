import React, { Component } from '../../node_modules/react';
import { Text, View, StyleSheet, LayoutAnimation, Platform, UIManager, TouchableOpacity, Dimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { theme } from '../core/theme';
import Icon from 'react-native-vector-icons/Ionicons';
import { Divider } from 'react-native-elements';
import Projets from './Projects'
import {
  LineChart,
} from "react-native-chart-kit";
import PopUp from "./subMenus/popup";
import { Button } from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';

class Results extends Component{

  constructor(props) {
    super(props);

    this.state = {
      pressed:false,
      expanded: false,
      icon: "ios-arrow-down",
      props:this.props,
      // expand: [
      //   {
      //     "expandz": false
      //   }
      // ],
      sondages:[
      ],
      id:null,
    }

    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }
  // navigat() {
  //   this.props.navigation
  // }
  navigat() {
    this.props.navigation.navigate('Détail')
}
  componentDidMount = async () => {
    //const value = await AsyncStorage.getItem('city')
    // this.setState(prevState => ({
    //   cities: [...prevState.cities, {label:'Select',value:'0'}],
    // }))
    await fetch('http://2274a3f6.ngrok.io/api/sondages', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        //'Authorization': 'Bearer ' + value
      }
    }).then(res => res.json())
      .then(async (resData) => {
        //console.warn(resData[0].id)
       
    // this.setState({ sondages: newData })
        for (i = 0; i < resData.length; i++) {
          this.setState(prevState => ({
            sondages: [...prevState.sondages, { 
              id:resData[i].id,
              titre: resData[i].titre,  
              users_id: resData[i].users_id,
              description: resData[i].description, 
              category: resData[i].category,
              date: resData[i].date,
              hour: resData[i].hour,
              media: resData[i].media,
              status: resData[i].status,
             }],
          }))
          // await AsyncStorage.setItem('titre', resData[i].titre)
          await AsyncStorage.setItem('users_id', JSON.stringify(resData[i].users_id))
          // await AsyncStorage.setItem('description', resData[i].description)
          // await AsyncStorage.setItem('category', resData[i].category)
          // await AsyncStorage.setItem('date', resData[i].date)
          // await AsyncStorage.setItem('hour', resData[i].hour)
          // await AsyncStorage.setItem('media', resData[i].media)
          // await AsyncStorage.setItem('status', resData[i].status)
          
        }
        
         
      }).catch((error) => {
        this.setState({
          error: 'Error retrieving data',
        });
      });
  }
  // changeLayout = () => {

  //   LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  //   this.setState({ expanded: !this.state.expanded });
  // }
  changeLayout = async(i)=> {
    // let newData = this.state.expand
    const data1 = this.state.sondages.length;
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    // this.setState({ expanded: !this.state.expanded });
    // for(let o = 0;o < data1; o++){
    //   this.setState({ expand:   {
    //     expandz:!this.state.expand[i].expandz
    //   } });
    // }
    let newChild = { "newChild": true }
    this.setState({
      sondages: [
        ...this.state.sondages,
        newChild
      ],
      icon: "ios-arrow-up",
      pressed:true,
      id:i
    })
    if (this.state.icon == "ios-arrow-down") {
      this.setState({
        icon: "ios-arrow-up",
      })
    } else {
      this.setState({
        icon: "ios-arrow-down",
      })
    }
    let newData = this.state.sondages
    newData[i].expand = !newData[i].expand
    this.setState({ sondages: newData})
    await AsyncStorage.setItem('gd', JSON.stringify(i+1) )
    //console.warn(i)
  }

  render() {
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ top: Platform.OS === 'ios' ? 13 : 10, }}>
          <View style={{flexDirection:"row", justifyContent:"space-between", marginRight:12}}>
          <Text style={{ marginLeft: 12, marginBottom: 12, color: theme.colors.otherTitle, fontWeight: "bold", fontSize: 18 }}>Derniers projets</Text>
          <Text style={{ marginLeft: 12, marginBottom: 12, color: "grey", fontSize: 14 }}>3 derniers mois</Text>
          </View>
          {this.state.sondages.map((o, i) => {
            return (
              <View style={styles.container}>
                <View style={styles.btnTextHolder}>
                  <TouchableOpacity activeOpacity={0.8} onPress={() => this.changeLayout(i)} style={styles.Btn}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                      <Text style={styles.btnText}>{o.titre}</Text>
                      <Text style={{ color: "grey", top: Dimensions.get("window").height / 189 }}>{o.status}</Text>
                      <Icon color={"grey"} size={17} name={this.state.icon} style={{ alignSelf: 'flex-end', height: Dimensions.get("window").height / 40 }} />
                    </View>
                  </TouchableOpacity>
                  <View style={{ height: o.expand ? null : 0, overflow: 'hidden' }}>
                    <Divider style={{ marginHorizontal: 12, marginVertical: 10 }} />
                    <Text style={{ marginLeft: 12, marginBottom: 12, color: theme.colors.otherTitle, fontWeight: "bold", fontSize: 18 }}>Le Projet</Text>
                    <Text style={styles.text}>
                      {o.description}
                    </Text>
                    <Text style={{ marginLeft: 12, marginBottom: 12, marginTop: 22, color: theme.colors.otherTitle, fontWeight: "bold", fontSize: 18 }}>Les résultats en temps réel</Text>
                    <Text style={{ left: 12, color: "grey" }}>Tendance de vote</Text>
                    <Projets naviga={this.props} pressed={this.state.pressed} idn={i+1}/>
                    <View>
                      <Text style={{ color: "grey", marginLeft: 23, marginBottom: 23, marginTop: 12 }}>Taux de participation</Text>
                      <LineChart
                        data={{
                          labels: ["5j", "10j", "15j", "20j", "25j", "+30j"],
                          datasets: [
                            {
                              data: [
                                0,
                                100,
                                200,
                                300,
                                100,
                                50
                              ]
                            }
                          ]
                        }}

                        width={Dimensions.get("window").width - 50} // from react-native
                        height={250}
                        // yAxisLabel="$"
                        // yAxisSuffix="k"
                        yAxisInterval={1} // optional, defaults to 1
                        chartConfig={{
                          // backgroundColor: "#fff",
                          backgroundGradientFrom: "#fff",
                          backgroundGradientTo: "#fff",
                          decimalPlaces: 2, // optional, defaults to 2dp
                          // color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                          // labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                          // labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                          style: {
                            borderRadius: 16,
                          },
                          propsForDots: {
                            paddingTop: 12,
                            strokeWidth: "2",
                            stroke: "#fff"
                          }
                        }}
                        bezier
                        style={{
                          marginVertical: 8,
                          borderRadius: 16,
                          paddingTop: 12
                        }}
                      />
                    </View>
                    {/* {console.warn(o.id)} */}
                    {async()=>await AsyncStorage.setItem('gd', i )}
                      <PopUp backName={"En savoir plus"} functionBack={()=>this.navigat()} naviga={this.props} id={i+1}/>
                      
                  </View>
                </View>
              </View>
            )
          })}
        </View>
      </ScrollView>
    )
  }

}
const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
    //  marginLeft :Dimensions.get('window').width/8,
    //  marginRight :Dimensions.get('window').width/8 ,
    // marginHorizontal: Dimensions.get('window').width / 8
  },
  container: {
    // flex: 1,
    marginHorizontal: 12,
    paddingHorizontal: 10,
    paddingBottom: 6,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,

    elevation: 8,
    //justifyContent: 'center',
    backgroundColor: "#fff",
    paddingTop: (Platform.OS === 'ios') ? 5 : 3,
    marginBottom: 23,
    marginTop: 3
  },

  text: {
    fontSize: 15,
    color: 'black',
    paddingHorizontal: 10,
    paddingTop: -2,
    paddingBottom: 7
  },

  btnText: {
    //textAlign: 'center',
    marginLeft: 7,
    color: 'grey',
    fontSize: 15,
    width: (Dimensions.get('window').width / 2) - 25,
    //marginVertical:3,
    justifyContent: "center"
  },

  btnTextHolder: {
    borderRadius: 12,
  },

  Btn: {
    padding: 10,
    //backgroundColor: 'rgba(0,0,0,0.5)'
  }
});
export default Results


