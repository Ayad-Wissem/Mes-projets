import React, { Component } from '../../node_modules/react';
import { View, StyleSheet, Text, ScrollView, Platform, SafeAreaView, TextInput, Image, TouchableOpacity, KeyboardAvoidingView, Button, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon1 from 'react-native-vector-icons/Octicons';
import { theme } from '../core/theme';
import { Divider } from 'react-native-elements';
import { CheckBox } from 'native-base'
import RNPickerSelect from 'react-native-picker-select';
import imagePicker from 'react-native-image-picker'
import AsyncStorage from '@react-native-community/async-storage';
import { NavigationActions, StackActions } from 'react-navigation'

class Posts extends Component {
  constructor() {
    super();
    this.state = {
      one: true,
      two: false,
      date: "01/10/2019",
      dateToday: '',
      time: "12:00",
      isDateTimePickerVisible: false,
      setDatePickerVisibility: null,
      isComplete: false,
      steps: 0,
      text: "",
      data: [
        {
          "title": "Médias",
          "description": "Veuillez joindre vos documents officiels",
          "photo": null,
          "img":null
        }
      ],
      categories: [

      ],
      nameProject: "",
      category: undefined,
      description: "",
    }
  }

  componentDidMount = async () => {
    //const value = await AsyncStorage.getItem('city')
    // this.setState(prevState => ({
    //   cities: [...prevState.cities, {label:'Select',value:'0'}],
    // }))
    const resetAction = StackActions.reset({
      index: 0,
      key: undefined,
      actions: [NavigationActions.navigate({ routeName: 'Scrutin' })]
  })
  // console.warn(this.props.navigation.token)
  const result = await  AsyncStorage.getItem('maire')
  if(result == 1){
    this.props.navigation.dispatch(resetAction, {token:this.props.navigation.token})
  }
  //console.warn(result)
    await fetch('http://2274a3f6.ngrok.io/api/sondage/categories', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        //'Authorization': 'Bearer ' + value
      }
    }).then(res => res.json())
      .then(async (resData) => {
        //console.warn(resData)
        for (i = 0; i < resData.categories.length; i++) {
          //console.warn(resData.cities[i].citie, resData.cities[i].id)
          //await AsyncStorage.setItem('city', resData.citie_id.toString())
          // console.warn(resData.categories[i])
          this.setState(prevState => ({
            categories: [...prevState.categories, { label: resData.categories[i], value: i }],
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

  showDatePicker = () => {
    this.setState({ setDatePickerVisibility: true });
  };

  hideDatePicker = () => {
    this.setState({ setDatePickerVisibility: false });
  };

  handleConfirm = date => {
    const formattedDate = date.getHours() + ":" + date.getMinutes()
    this.setState({
      time: formattedDate
    })
    this.hideDatePicker();
  };

  onePressed = () => {
    this.setState({ one: true, two: false })

  }
  twoPressed = () => {
    this.setState({ one: false, two: true })
  }
  submit = async () => {
    let newData = this.state.data
    newData[0].photo = null
    const value = await AsyncStorage.getItem('user_id')
    await fetch('http://2274a3f6.ngrok.io/api/user/'+value+'/projet', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ "titre": this.state.nameProject, "category": this.state.category, "description": this.state.description, "media":this.state.data[0].img })
    }).then(res => res.json())
      .then(async (resData) => {
        //console.warn(resData)
        
        alert("Votre Projet a bien été envoyé a la mairie")
        this.setState({
          nameProject: "",
          category: 0,
          description: "",
          //media:"",
          // date: "01/10/2019",
          // time: "12:00",
          text: "",
        })
        this.navigat()

      }).catch((error) => {
        //alert(error)
        this.setState({
          
          error: "Une erreur s'est produite",
        });
      });

    setTimeout(() => {
      this.setState({ isComplete: false })
      this.setState({ steps: 0 })
    }, 12000)
  }
  handleChange = (event = {}) => {
    const value = event.target && event.target.value;
    var nameProject = this.refs.nameProject._lastNativeText;
    this.setState({ nameProject: value });
    console.log(nameProject)
  }
  componentDidMount() {
    var that = this;
    var datet = new Date().getDate(); //Current Date
    that.setState({
      dateToday: datet
    })
  }
  var = [
    { label: 'Utilité publique', value: 1 },
    { label: 'Environnemental', value: 2 },
    { label: 'Culturel', value: 3 },
    { label: 'Social', value: 4 },
  ]
  addPhoto = (i) => {
    const options1 = {
      noData: true
    };
    imagePicker.launchImageLibrary(options1, response => {
      //console.log("response", response)
      if (response.uri) {
        let newData = this.state.data
        newData[i].photo = response
        newData[i].img = JSON.stringify(response.uri)
        this.setState({ data: newData })
        // this.setState({mediaUri:response.uri})
        // console.log(this.state.mediaUri)
      }

    })
  }

  render() {
    return (
      //header
      <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "height" : null} style={{ flex: 1 }}>
        <ScrollView showsVerticalScrollIndicator={false} style={{

          flex: 1,
          //marginTop:Platform.OS === 'ios' ? 100 : 70, 
        }}
        >
          <View >
            <View style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Text style={{ marginTop: 21, marginBottom: 33, fontSize: 18, color: theme.colors.otherTitle, fontWeight: "bold" }}>Proposez votre projet à la mairie !</Text>
            </View>
            <View >
              <View>
                <TouchableOpacity style={styles.card}>
                  <Text style={{ top: Platform.OS === 'ios' ? -13 : -10, color: theme.colors.otherTitle, fontWeight: "bold", fontSize: 18 }}>Votre Projet*</Text>
                  <Divider />
                  <TextInput onChangeText={(value) => this.setState({nameProject:value})} placeholder="Tapez le nom de votre projet" style={{ top: Platform.OS === 'ios' ? 13 : 0 }} />
                </TouchableOpacity>

                {/* <TouchableOpacity style={styles.card2}>
                    <Text style={{top:Platform.OS === 'ios' ? -13 : -10, color:theme.colors.otherTitle, fontWeight:"bold",fontSize:18}}>Catégorie*</Text>
                    <Divider />
                    <View style={{flexDirection:"row"}}>
                    <CheckBox size={45} checked={false} style={{top:10, left:3}}/>
                    <Text style={{top:12, left:10, color:"grey"}}>Utilité publique</Text>
                    </View>
                    <View style={{flexDirection:"row", marginTop:8}}>
                    <CheckBox checked={false} style={{top:10, left:3}}/>
                    <Text style={{top:12, left:10, color:"grey"}}>Environnemental</Text>
                    </View>
                    <View style={{flexDirection:"row", marginTop:8}}>
                    <CheckBox checked={false} style={{top:10, left:3}}/>
                    <Text style={{top:12, left:10, color:"grey"}}>Culturel</Text>
                    </View>
                    <View style={{flexDirection:"row", marginTop:8}}>
                    <CheckBox checked={false} style={{top:10, left:3}}/>
                    <Text style={{top:12, left:10, color:"grey"}}>Social</Text>
                    </View>
                </TouchableOpacity> */}
                <View style={styles.card}>
                  <Text style={{ top: Platform.OS === 'ios' ? -13 : -10, color: theme.colors.otherTitle, fontWeight: "bold", fontSize: 18 }}>Catégorie</Text>
                  <Divider />
                  <View>
                    <RNPickerSelect
                      value={this.state.category}
                      onValueChange={(value) => this.setState({ category: value })}
                      items={this.var}
                    />
                  </View>
                </View>
                <TouchableOpacity style={styles.card3}>
                  <Text style={{ top: Platform.OS === 'ios' ? -13 : -10, color: theme.colors.otherTitle, fontWeight: "bold", fontSize: 18 }}>Description*</Text>
                  <Divider />
                  <TextInput
                  onChangeText={(value) => this.setState({description:value})}
                    multiline={true}
                    numberOfLines={4}
                    placeholder="Présentez votre projet en quelques lignes..." style={{ top: Platform.OS === 'ios' ? 13 : 5, width: '100%', height: '85%' }} />
                </TouchableOpacity>
                {this.state.data.map((o, i) => {
                  return(
                <View style={styles.card4}>
                  {/* {console.log("je suis i\n\n\n", i)} */}
                  <View style={{ flexDirection: "row" }}>
                    <Text style={o.stylepiece}>{o.title}</Text>
                    <Image style={{ top: Platform.OS === 'ios' ? -12 : -9, width: 10, height: 10 }} source={require("../assets/images/Base/info.png")}></Image>
                  </View>
                  <Divider />
                  <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <Text style={{ top: Platform.OS === 'ios' ? 13 : 13, color: "grey" }}>{o.description}</Text>
                    <TouchableOpacity onPress={() => this.addPhoto(i)}>
                      <Image style={{ top: Platform.OS === 'ios' ? 13 : 13, width: 20, height: 20 }} source={require("../assets/images/Base/galerie.png")}></Image>
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
                )})} 
                <View style={styles.button}>
                  <TouchableOpacity >
                    <View style={{ backgroundColor: "##fff", borderRadius: 22, paddingHorizontal: 40, paddingVertical: 12, borderColor: "#3df", borderWidth: 1 }}>
                      <Text style={{ color: "grey" }}> Annuler </Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={()=>this.submit()}>
                    <View style={{ backgroundColor: "#3df", borderRadius: 22, paddingHorizontal: 40, paddingVertical: 12 }}>
                      <Text style={{ color: "#fff" }}> Envoyer </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    )
  }
}
const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
    marginLeft: Platform.OS === 'ios' ? 62 : 72,
    marginRight: Platform.OS === 'ios' ? 62 : 72
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  card4: {
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
    height: 400,
    marginLeft: 22,
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
    marginLeft: 22,
  },

  card2: {
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
    height: 185,
    marginLeft: 22,

  },

  card3: {
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
    height: 235,
    marginLeft: 22,

  },

  header: {
    //justifyContent: 'center',
    //alignItems: 'center',
    //marginTop:Platform.OS === 'ios' ? 15 : 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#3df",
    borderRadius: 12,
  }
});
export default Posts


