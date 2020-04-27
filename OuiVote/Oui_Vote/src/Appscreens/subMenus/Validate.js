import React, { Component } from '../../../node_modules/react';
import { View, StyleSheet, Text, Platform, TouchableOpacity, Image, Dimensions, TextInput } from 'react-native';
import { Divider } from 'react-native-elements';
import { theme } from '../../core/theme'
import { ScrollView } from 'react-native-gesture-handler';
import imagePicker from 'react-native-image-picker'
import RNPickerSelect from 'react-native-picker-select';
import AsyncStorage from '@react-native-community/async-storage';
import { cityValidator, pieceValidator, justifyValidator } from '../../core/utils';
class Valitate extends Component {
  navigat() {
    this.props.navigation.goBack()
  }
  // var = [
  //   { label: 'Paris', value: '1' },
  //   { label: 'Ivry', value: '2' },
  //   { label: 'Assinie', value: '3' },
  //   { label: 'Marseille', value: '4' },
  //   { label: 'Bordeaux', value: '5' },
  //   { label: 'Montigny-Beauchamp', value: '6' },
  // ]
  state = {
    validate:false,
    data: [
      {
        "title": "Pièce d'identité",
        "description": "Veuillez joindre vos documents officiels",
        "photo": null,
        "img": "",
        pieceerror:"",
        stylepiece:styles.title,
      },
      {
        "title": "justificatif de domicile",
        "description": "Facture, Electricité etc...",
        "photo": null,
        "img": "",
        justifyerror:"",
        stylepiece:styles.title,
      
      }
    ],
    cities: [

    ],
    button:[
      {
        
      }
    ],
    style:styles.title,
    city: "",
    cityerror:"",

  }

  componentDidMount = async () => {
    const value = await AsyncStorage.getItem('city')
    try {
      if (value !== null) {
        // console.warn(value)

      }
    } catch (e) {
      // error reading value
      alert(e)
    }
    // this.setState(prevState => ({
    //   cities: [...prevState.cities, {label:'Select',value:'0'}],
    // }))
    await fetch('http://2274a3f6.ngrok.io/api/cities', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + value
      }
    }).then(res => res.json())
      .then(async (resData) => {
        for (i = 0; i < resData.cities.length; i++) {
          //console.warn(resData.cities[i].citie, resData.cities[i].id)
          //await AsyncStorage.setItem('city', resData.citie_id.toString())
          this.setState(prevState => ({
            cities: [...prevState.cities, { label: resData.cities[i].citie, value: resData.cities[i].id }],
          }))
          //console.warn(this.state.cities)
          this.setState({
            // email: resData.email,
            // name: resData.name
          });
        }
      }).catch((error) => {
        this.setState({
          error: 'Error retrieving data',
        });
      });

    //console.warn(this.state.city)
    //this.setState({city:value})

    //this.setState({city:value})
    //console.warn(this.state.city)

  }
  addPhoto =(i) => {

    const options1 = {
      noData: true
    };

    imagePicker.launchImageLibrary(options1, response => {
      console.log("response", response)
      if (response.uri) {
        let newData = this.state.data
        newData[i].photo = response
        newData[i].stylepiece = styles.title
        newData[i].img = JSON.stringify(response.uri)
        this.setState({ data: newData,validate: true  })
        
       // this.setState({ data: newData })
        //alert(response.uri.toString())
      }
    })
  }

  validate=async () =>{
    let newData = this.state.data
    newData[0].pieceerror = pieceerror
    newData[0].stylepiece = styles.error
    newData[1].justifyerror = justifyerror
    newData[1].stylepiece = styles.error
    const cityerror = cityValidator(this.state.city)
    const pieceerror = pieceValidator(this.state.data[0].img)
    const justifyerror = justifyValidator(this.state.data[1].img)
    const value = await AsyncStorage.getItem('user_id')
    await fetch('http://2274a3f6.ngrok.io/api/user/'+value, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ "citie_id": this.state.city, "validate": true })
    }).then(res => res.json())
    .then( async (resData) => {
       //console.warn(resData)
      if (cityerror || pieceerror || justifyerror) {
        this.setState({ 
          cityerror:cityerror,
          style:styles.error,
          data:newData
          // data:pieceerror,
          // data:justifyerror
        })
          
      }else{
        let newData = this.state.data
        newData[0].photo  = null
        newData[1].photo  = null
        
        this.setState({ 
          city:"",
          data:newData,
          validate:true
          // data:pieceerror,
          // data:justifyerror
        })
        alert("Félicitation vous etes validé")
        this.navigat()
      }
   }).catch((error) => {
    this.setState({
      error: "Une erreur s'est produite",
    });
  });
   



    //alert(piece)
  }

  render() {
    //   const {photo} = this.state;
    //   const photoc = this.state;
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    const { showAlert } = this.state;
    return (
      <ScrollView>

        <TouchableOpacity style={styles.card2}>
          <Text style={this.state.style}>Selectionnez votre ville</Text>
          <Divider />
          <View style={{ marginTop: Platform.OS === 'ios' ? 23 : null }}>
            <RNPickerSelect
              placeholder={{
                label: 'Choisissez votre ville',
                value: null,
            }}
              value={this.state.city}
              onValueChange={(value) =>
                this.setState({ city: value,cityerror:'',style:styles.title })}
              items={this.state.cities}
            />
          </View>
        </TouchableOpacity>
        <Text style={{ top: Platform.OS === 'ios' ? -13 : -10, color: "red", marginLeft:23}}>{this.state.cityerror}</Text>
        {this.state.data.map((o, i) => {
          return (
            <View style={styles.card}>
              {/* {console.log("je suis i\n\n\n", i)} */}
              <View style={{ flexDirection: "row" }}>
                <Text style={o.stylepiece}>{o.title}</Text>
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
        
        {this.state.button.map((o, i) => {
          return(
          <View style={styles.button}>
            <TouchableOpacity onPress={() => this.navigat()}>
              <View style={{ backgroundColor: "##fff", borderRadius: 22, paddingHorizontal: 40, paddingVertical: 12, borderColor: "#3df", borderWidth: 1 }}>
                <Text style={{ color: "grey" }}> Annuler </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.validate(i)}>
              <View style={{ backgroundColor: "#3df", borderRadius: 22, paddingHorizontal: 40, paddingVertical: 12 }}>
                <Text style={{ color: "#fff" }}> Envoyer </Text>
              </View>
            </TouchableOpacity>

          </View>
        )})}
      </ScrollView >
    )
  }

}
const styles = StyleSheet.create({
  title:{
    top: Platform.OS === 'ios' ? -13 : -10, color: theme.colors.otherTitle, fontWeight: "bold", fontSize: 18 
  },
  error:{
    top: Platform.OS === 'ios' ? -13 : -10, color: "red", fontWeight: "bold", fontSize: 18 ,
    borderColor:"red"
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  text: {
    color: '#fff',
    fontSize: 15
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
    marginLeft: Dimensions.get('window').width / 8,
    marginRight: Dimensions.get('window').width / 8,
    //marginHorizontal:this.wind
  },
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  card: {
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
  card2: {
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
    height: 122,
    marginLeft: 23,
    marginRight: 32
  },
})
export default Valitate


