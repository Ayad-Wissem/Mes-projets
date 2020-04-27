
import React, {Component } from 'react';
import { View,StyleSheet,Text, ScrollView, Platform, SafeAreaView, TextInput, Image,TouchableOpacity,KeyboardAvoidingView,Button,FlatList} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {theme} from '../../core/theme';
import { Divider } from 'react-native-elements';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
//import { MenuProvider } from 'react-native-popup-menu';
import RNPickerSelect from 'react-native-picker-select';
import imagePicker from 'react-native-image-picker'
class Step1 extends Component{
    state = {
        data: [
          {
            "title": "Médias",
            "description":"Veuillez joindre vos documents officiels",
            "photo": null,
          }
        ],
      }
     var = [
        { label: 'Utilité publique', value: 'Util' },
        { label: 'Environnemental', value: 'Environ' },
        { label: 'Culturel', value: 'Culture' },
        { label: 'Social', value: 'Social' },
    ]
    addPhoto = (i) => {
      const options1 = {
        noData: true
      };
      imagePicker.launchImageLibrary(options1, response => {
        console.log("response", response)
        if (response.uri) {
          let newData = this.state.data
          newData[i].photo = response
          this.setState({data: newData})
        }
      })
    }
render(){
    return(
        <ScrollView style={{flex: 1}}>
                    
                <TouchableOpacity style={styles.card}>
                          <Text style={{top:Platform.OS === 'ios' ? -13 : -10, color:theme.colors.otherTitle, fontWeight:"bold",fontSize:18}}>Votre Projet*</Text>
                          <Divider/>
                          <TextInput placeholder="Tapez le nom de votre projet" style={{top:Platform.OS === 'ios' ? 13 : 0}}/>
                </TouchableOpacity>
                <View style={styles.card}>
                          <Text style={{top:Platform.OS === 'ios' ? -13 : -10, color:theme.colors.otherTitle, fontWeight:"bold",fontSize:18}}>Catégorie</Text>
                          <Divider/>
               <View>
               <RNPickerSelect
                  onValueChange={(value) => console.log(value)}
                  items={this.var}
              />
            </View>
                </View>
                <TouchableOpacity style={styles.card3}>
                          <Text style={{top:Platform.OS === 'ios' ? -13 : -10, color:theme.colors.otherTitle, fontWeight:"bold",fontSize:18}}>Description*</Text>
                          <Divider />
                          <TextInput
                           multiline={true}
                           numberOfLines={4}
                           placeholder="Présentez votre projet en quelques lignes..." style={{top:Platform.OS === 'ios' ? 13 : 5, width:'100%', height:'85%'}}/>
                      </TouchableOpacity>
        {this.state.data.map((o, i) => {
                return (
                  <View style={styles.card4}>
                    {console.log("je suis i\n\n\n", i)}
                    <View style={{ flexDirection: "row" }}>
                      <Text style={{ top: Platform.OS === 'ios' ? -13 : -10, color: theme.colors.otherTitle, fontWeight: "bold", fontSize: 18 }}>{o.title}</Text>
                      <Image style={{ top: Platform.OS === 'ios' ? -12 : -9, width: 10, height: 10 }} source={require("../../assets/images/Base/info.png")}></Image>
                    </View>
                    <Divider />
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                      <Text style={{ top: Platform.OS === 'ios' ? 13 : 13, color: "grey" }}>{o.description}</Text>
                      <TouchableOpacity onPress={() => this.addPhoto(i)}>
                        <Image style={{ top: Platform.OS === 'ios' ? 13 : 13, width: 20, height: 20 }} source={require("../../assets/images/Base/galerie.png")}></Image>
                      </TouchableOpacity>
                    </View>
                    <View>
                      {o.photo && (
                        <Image source={{ uri: o.photo.uri }}
                          style={{ width: 300, height: 300, marginTop: 23, borderRadius: 12 }}
                        />
                      )}
                    </View>
                  </View>
                )
              })}
        </ScrollView>
        )
    }
}
const buttonTextStyle = {
    marginTop:12,
    backgroundColor:"##fff", 
    borderRadius:22, 
    paddingHorizontal:30, 
    paddingVertical:4, 
    borderColor:"#3df", 
    borderWidth:1,
  };
  const styles = StyleSheet.create({
    button: {
      marginTop:12,
      backgroundColor:"#3df", 
      borderRadius:22, 
      paddingHorizontal:30, 
      paddingVertical:4, 
      borderColor:"#fff", 
      borderWidth:1,
    },
    container: {
      justifyContent: 'center',
      alignItems: 'center'
    },
   card:{
      backgroundColor:"#fff",
      marginBottom:23,
      marginLeft:'2%',
      padding:29,
      width:'89%',
      shadowColor: "grey",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 2.5,
      borderRadius:8,
      height:102,
      marginLeft:26,
      marginRight:26
   },
  
   card2:{
    backgroundColor:"#fff",
    marginBottom:23,
    marginLeft:'2%',
    padding:29,
    width:'89%',
    shadowColor: "grey",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2.5,
    borderRadius:8,
    height:185,
    marginLeft:26,
    marginRight:26
  },
  
  card3:{
    backgroundColor:"#fff",
    marginBottom:23,
    marginLeft:'2%',
    padding:29,
    width:'89%',
    shadowColor: "grey",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2.5,
    borderRadius:8,
    height:235,
    marginLeft:26,
    marginRight:26
  },
  card4: {
    backgroundColor: "#fff",
    marginBottom: 13,
    marginLeft: '2%',
    padding: 29,
    width: '89%',
    shadowColor: "grey",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    marginTop: 20,
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2.5,
    borderRadius: 8,
    height: 422,
    marginLeft: 23,
    marginRight: 32
  },
  
  
    header:{
      //justifyContent: 'center',
      //alignItems: 'center',
      //marginTop:Platform.OS === 'ios' ? 15 : 15,
      fontSize:16,
      borderWidth:1,
      borderColor:"#3df",
      borderRadius:12,
    }
  });
export default Step1
