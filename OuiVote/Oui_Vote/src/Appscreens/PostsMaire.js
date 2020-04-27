import React, { Component } from '../../node_modules/react';
import { View, StyleSheet, Text, ScrollView, Platform, SafeAreaView, TextInput, Image, TouchableOpacity, KeyboardAvoidingView, Button, FlatList } from 'react-native';
import { theme } from '../core/theme';
import { Divider } from 'react-native-elements';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
//import { MenuProvider } from 'react-native-popup-menu';
import Step1 from './subMenus/Step1'
import { CheckBox } from 'native-base'
import DatePicker from 'react-native-datepicker'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import RNPickerSelect from 'react-native-picker-select';
import imagePicker from 'react-native-image-picker'
import AsyncStorage from '@react-native-community/async-storage';
import { NavigationActions, StackActions } from 'react-navigation'

class PostsMaire extends Component {
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

    //   const resetAction = StackActions.reset({
    //     index: 0,
    //     key: null,
    //     actions: [NavigationActions.navigate({ routeName: 'Projet' })]
    // })
    // // console.warn(this.props.navigation.token)
    // const result = await  AsyncStorage.getItem('maire')
    // if(result == 0){
    //   this.props.navigation.dispatch(resetAction, {token:this.props.navigation.token})
    // }
    // console.warn(result)
    //const value = await AsyncStorage.getItem('city')
    // this.setState(prevState => ({
    //   cities: [...prevState.cities, {label:'Select',value:'0'}],
    // }))
    await fetch('http://2274a3f6.ngrok.io/api/sondage/categories', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        //'Authorization': 'Bearer ' + value
      }
    }).then(res => res.json())
      .then(async (resData) => {
        // console.warn(resData.categories[0])
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
  submit =  async () => {
    let newData = this.state.data
    newData[0].photo = null
    const value = await AsyncStorage.getItem('user_id')
    await fetch('http://2274a3f6.ngrok.io/api/user/'+value+'/sondage', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ "titre": this.state.nameProject, "category": this.state.category, "description":this.state.description, "date":this.state.date, "hour":this.state.time, "campagne":this.state.two, "media": this.state.data[0].img})
    }).then(res => res.json())
    .then( async (resData) => {
       //console.warn(resData)
        alert("Votre Sondage a bien été publié")
        this.setState({
          isComplete: true,
          nameProject: "",
          category: 0,
          description: "",
          date: "01/10/2019",
          time: "12:00",
          text: "",
        })
        this.navigat()
      
   }).catch((error) => {
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
      <ProgressSteps isComplete={this.state.isComplete} activeStep={this.state.steps}>

        <ProgressStep label="Etape 1" nextBtnTextStyle={styles.button}>
          <ScrollView style={{ flex: 1 }}>

            <TouchableOpacity style={styles.card}>
              <Text style={{ top: Platform.OS === 'ios' ? -13 : -10, color: theme.colors.otherTitle, fontWeight: "bold", fontSize: 18 }}>Votre Projet*</Text>
              <Divider />
              <TextInput value={this.state.nameProject} onChangeText={(value) => this.setState({ nameProject: value })} placeholder="Tapez le nom de votre projet" style={{ top: Platform.OS === 'ios' ? 13 : 0 }} />
            </TouchableOpacity>
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
                value={this.state.description} onChangeText={(value) => this.setState({ description: value })}
                multiline={true}
                numberOfLines={4}
                placeholder="Présentez votre projet en quelques lignes..." style={{ top: Platform.OS === 'ios' ? 13 : 5, width: '100%', height: '85%' }} />
            </TouchableOpacity>
            {this.state.data.map((o, i) => {
              return (
                <View style={styles.card4}>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={{ top: Platform.OS === 'ios' ? -13 : -10, color: theme.colors.otherTitle, fontWeight: "bold", fontSize: 18 }}>{o.title}</Text>
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
              )
            })}
          </ScrollView>
        </ProgressStep>
        <ProgressStep label="Etape 2" nextBtnTextStyle={styles.button} previousBtnTextStyle={buttonTextStyle}>
          <View>
            <TouchableOpacity style={styles.card2}>
              <Text style={{ top: Platform.OS === 'ios' ? -13 : -10, color: theme.colors.otherTitle, fontWeight: "bold", fontSize: 18 }}>Votre Campagne</Text>
              <Divider />
              <View style={{ flexDirection: "row" }}>
                <CheckBox size={45} onPress={() => this.onePressed()} checked={this.state.one} style={{ top: 10, left: 3 }} />
                <Text style={{ top: 12, left: 10, color: "grey" }}>Scrutin a un tour</Text>
              </View>
              <View style={{ flexDirection: "row", marginTop: 8 }}>
                <CheckBox onPress={() => this.twoPressed()} checked={this.state.two} style={{ top: 10, left: 3 }} />
                <Text style={{ top: 12, left: 10, color: "grey" }}>Scrutin a deux tours</Text>
              </View>
            </TouchableOpacity>
          </View>
        </ProgressStep>
        <ProgressStep label="Etape 3" nextBtnTextStyle={styles.button} onSubmit={() => this.submit()} previousBtnTextStyle={buttonTextStyle}>
          <View>
            <Text style={{ marginLeft: 32, marginBottom: 21, color: theme.colors.otherTitle, fontWeight: "bold", fontSize: 18 }}>Planification du projet</Text>
            <View style={{ flexDirection: "row" }}>
              <View style={styles.card2}>
                <Text style={{ top: Platform.OS === 'ios' ? -13 : -10, color: theme.colors.otherTitle, fontWeight: "bold", fontSize: 18 }}>Date</Text>
                <Divider />
                <View>
                  <View>
                    <DatePicker
                      style={{ width: 200 }}
                      date={this.state.date}
                      mode="date"
                      placeholder="Selectionnez la date"
                      format="DD-MM-YYYY"
                      minDate="2020-05-01"
                      maxDate={this.state.dateToday}
                      confirmBtnText="Confirmer"
                      cancelBtnText="Annuler"
                      customStyles={{
                        dateIcon: {
                          position: 'absolute',
                          left: 0,
                          top: 19,
                          marginLeft: 0
                        },
                        dateInput: {
                          marginLeft: 36,
                          marginTop: 33
                        }
                      }}
                      onDateChange={(date) => { this.setState({ date: date }), console.log(this.state.date) }}
                    />
                  </View>
                  <View style={{ bottom: 82 }}>
                    <View>
                      <TouchableOpacity style={{ top: 72, alignSelf: 'flex-end' }}
                        title="Show Date Picker"
                        onPress={() => this.showDatePicker()}>
                        <Text>
                          {this.state.time}
                        </Text>
                      </TouchableOpacity>
                      <Text style={{ marginTop: "18%", alignSelf: 'flex-end', right: "19%" }} >à</Text>
                      <DateTimePickerModal
                        confirmTextIOS="Confirmer"
                        cancelTextIOS="Annuler"
                        headerTextIOS="Sélectionnez l'heure"
                        isVisible={this.state.setDatePickerVisibility}
                        mode="time"
                        is24Hour={true}
                        locale="fr_FR"
                        onConfirm={this.handleConfirm}
                        onCancel={this.hideDatePicker}
                      />
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </ProgressStep>
      </ProgressSteps>
    )
  }
}
const buttonTextStyle = {
  marginTop: 12,
  backgroundColor: "##fff",
  borderRadius: 22,
  paddingHorizontal: 30,
  paddingVertical: 4,
  borderColor: "#3df",
  borderWidth: 1,
};
const styles = StyleSheet.create({
  button: {
    marginTop: 12,
    backgroundColor: "#3df",
    borderRadius: 22,
    paddingHorizontal: 30,
    paddingVertical: 4,
    borderColor: "#fff",
    borderWidth: 1,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center'
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
    height: 135,
    marginLeft: 26,
    marginRight: 26
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
    marginLeft: 26,
    marginRight: 26
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
export default PostsMaire


