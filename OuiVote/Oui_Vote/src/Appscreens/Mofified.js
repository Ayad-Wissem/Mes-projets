import React, { Component } from '../../node_modules/react';
import { View, StyleSheet, Text, TouchableOpacity, TextInput, KeyboardAvoidingView, Dimensions,Keyboard,TouchableWithoutFeedback } from 'react-native';
import { theme } from '../core/theme'
import { Divider } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import RNPickerSelect from 'react-native-picker-select';
import DatePicker from 'react-native-datepicker'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Header } from 'react-navigation-stack';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import imagePicker from 'react-native-image-picker'
import AsyncStorage from '@react-native-community/async-storage';

class Modify extends Component {
    constructor() {
        super();
        this.inputRefs = {};
        this.state = {
            description:"",
            time: "12:00",
            date: "01/10/2019",
            Category: "patientez...",
            nameProject:"",
            categories:[],
            dateToday: '',
            
            time2: "12:00",
            isDateTimePickerVisible: false,
            setDatePickerVisibility: null,
            data: [
                {

                }
            ],
            TextInputDisableStatus: true,
            heigh:Dimensions.get("window").height + 20,
            sondage1:[]
        }

        

    }
    onPressButton = () => {
        this.setState({ TextInputDisableStatus: false })
    }

    componentDidMount = async () => { 
    //    console.warn(this.props.navigation)
    const sondage = await AsyncStorage.getItem('gd')
    const id = await AsyncStorage.getItem('users_id')
        var datet = 12/9/1993; //Current Date
      
        await fetch('http://2274a3f6.ngrok.io/api/sondage/categories', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    }).then(res => res.json())
      .then(async (resData) => {
        for (i = 0; i < resData.categories.length; i++) {
          this.setState(prevState => ({
            categories: [...prevState.categories, { label: resData.categories[i], value: i }],
          }))
        }
      }).catch((error) => {
        this.setState({
          error: 'Error retrieving data',
        });
      });
      //console.warn(this.state.categories)

        await fetch('http://2274a3f6.ngrok.io/api/getuser/' + id, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }).then(res => res.json())
            .then(async (resData) => {
                //console.warn(resData.name)
                this.setState({
                    name: resData.name
                })
            })
         //console.warn(id)
        await fetch('http://2274a3f6.ngrok.io/api/sondages/'+ sondage, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }).then(res => res.json())
            .then(async (resData) => {
                //console.warn(resData[0].id)

                // this.setState({ sondages: newData })
                this.setState(prevState => ({
                    sondage1: [...prevState.sondage1, {
                        Category: resData.category,
                        date: resData.date,
                        hour: resData.hour,
                        nameProject: resData.titre,
                        description: resData.description,
                    }],
                }
                ))
                this.setState({
                    Category: resData.category,
                    date: resData.date,
                    time: resData.hour,
                    nameProject: resData.titre,
                    description: resData.description,
                })
                //console.warn(this.state.sondage1)
            }).catch((error) => {
                this.setState({
                    error: 'Error retrieving data',
                });
            });
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

    modifier =  async () => {
        let newData = this.state.data
        newData[0].photo = null
        const value = await AsyncStorage.getItem('users_id')
        const sondageValue = await AsyncStorage.getItem('gd')
        await fetch('http://2274a3f6.ngrok.io/api/user/'+value+'/sondages/'+sondageValue, {
          method: 'PUT',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ "titre": this.state.nameProject, "category": this.state.Category, "description":this.state.description, "date":this.state.date, "hour":this.state.time })
        }).then(res => res.json())
        .then( async (resData) => {
           //console.warn(resData)
            alert("Votre Sondage a bien été modifié")
            this.navigat()
          
       }).catch((error) => {
        this.setState({
          error: "Une erreur s'est produite",
        });
      });
    }

setThis(value){
    this.setState({ nameProject: value })
}
    render() {
        const DismissKeyboard=({children})=>(
            <TouchableWithoutFeedback onPress={()=> Keyboard.dismiss()}>
                {children}
            </TouchableWithoutFeedback>
        )
        return (
            <DismissKeyboard>
            <KeyboardAwareScrollView>
                {/* {console.warn(this.props.navigation)} */}
   {this.state.sondage1.map((o,i)=>{return(
                <View style={{flex: 1 }}>
                    <View style={{ marginTop: 22 }}>
                        <TouchableOpacity style={styles.card}>
                            <Text style={{ top: Platform.OS === 'ios' ? -13 : -10, color: theme.colors.otherTitle, fontWeight: "bold", fontSize: 18 }}>Choisissez un titre</Text>
                            <Divider />

                            <TextInput //value={this.state.nameProject} 
                              //onChangeText={value => this.setState({ nameProject: value })}
                              value={this.state.nameProject}
                             onChangeText={(value) => this.setThis(value)} style={{ top: Platform.OS === 'ios' ? 13 : 0 }} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.card2}>
                            <Text style={{ top: Platform.OS === 'ios' ? -13 : -10, color: theme.colors.otherTitle, fontWeight: "bold", fontSize: 18 }}>Choisissez une catégorie</Text>
                            <Divider />
                            <View style={{ marginTop: Platform.OS === 'ios' ? 23 : null }}>
                                <RNPickerSelect
                                    placeholder={{
                                        label: JSON.stringify(this.state.Category) ,
                                        value: null,
                                    }}
                                    value={this.state.Category}
                                    // onValueChange={(value) => console.log(value)}
                                    onValueChange={(value) => {
                                        this.setState({
                                            Category: value,
                                        });
                                    }}
                                    items={this.state.categories}
                                />
                            </View>

                        </TouchableOpacity>
                    </View>
                    <View>
                        <View style={{ flexDirection: "row" }}>
                            <View style={styles.car}>
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
                                            // maxDate={this.state.dateToday}
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
                                        <TouchableOpacity style={{ top: 72, alignSelf: 'flex-end' }}
                                            title="Show Date Picker"
                                            onPress={() => this.showDatePicker()}>
                                            <Text style={{ color: "black" }}>
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

                    <TouchableOpacity style={styles.card3}>
                        <Text style={{ top: Platform.OS === 'ios' ? -13 : -10, color: theme.colors.otherTitle, fontWeight: "bold", fontSize: 18 }}>Description*</Text>
                        <Divider />
                        <TextInput
                            value={this.state.description}
                            onChangeText={(value) => this.setThis(value)}
                            // returnKeyType="done"
                            multiline={true}
                            numberOfLines={4}
                            // onSubmitEditing={()=>{Keyboard.dismiss()}}
                            placeholder="Présentez votre projet en quelques lignes..." style={{ top: Platform.OS === 'ios' ? 13 : 5, width: '100%', height: '85%' }} />
                    </TouchableOpacity>
                    <View style={styles.button}>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()
                        }>
                        <View style={{ backgroundColor: "##fff", borderRadius: 22, paddingHorizontal: 25, paddingVertical: 12, borderColor: "#3df", borderWidth: 1 }}>
                            <Text style={{ color: "grey" }}> Annuler</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>this.modifier()} >
                        <View style={{ backgroundColor: "#3df", borderRadius: 22, paddingHorizontal: 25, paddingVertical: 12 }}>
                            <Text style={{ color: "#fff" }}> Modifier</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                </View>
         )})}
            </KeyboardAwareScrollView>
            </DismissKeyboard>
        )
    }

}
const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom:32,
         marginLeft :Dimensions.get('window').width/8,
         marginRight :Dimensions.get('window').width/8 ,
        //marginHorizontal:this.wind
      },
    car: {
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
    centered: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
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
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 2.5,
        borderRadius: 8,
        height: 122,
        marginLeft: 23,
        marginRight: 32
    },
})
export default Modify


