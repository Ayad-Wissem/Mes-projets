import React, { Component } from "react";
import { Text, TouchableOpacity, View, Dimensions, StyleSheet } from "react-native";
import Modal from "react-native-modal";
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-community/async-storage';
class PopUp extends Component {
    state = {
        isModalVisible: false,
        naviga: this.props.naviga,
        pour:false,
        contre:false,
        abstiens:false,
        vote:"",
        id: this.props.id
    };

    componentDidMount = async () => {
        
    }
    // .navigate('Validation')
    pour = () =>{
        this.setState({vote: "pour", contre:!this.state.contre, abstiens:!this.state.abstiens, pour:true, isModalVisible: !this.state.isModalVisible });
        setTimeout(() => {
            this.voteFinal()
            //console.warn(this.state.vote)
          }, 1000);
        
   }   
     
    contre = () =>{
        this.setState({vote: "contre", pour:!this.state.pour, abstiens:!this.state.abstiens, contre:true, isModalVisible: !this.state.isModalVisible });
        setTimeout(() => {
            this.voteFinal()
            //console.warn(this.state.vote)
          }, 1000);
    }
    abstiens = () =>{
        this.setState({vote: "null", contre:!this.state.contre, pour:!this.state.pour, abstiens:true, isModalVisible: !this.state.isModalVisible });
        setTimeout(() => {
            this.voteFinal()
            //console.warn(this.state.vote)
          }, 1000);
    }
   
    voteFinal= async()=>{
      const sondageId = this.props.id
      
      const userId = await AsyncStorage.getItem('users_id')
      await fetch('http://2274a3f6.ngrok.io/api/vote/sondages/' + sondageId + '/user/' + userId, {
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              //'Authorization': 'Bearer ' + value
          },
          body: JSON.stringify({ "vote": this.state.vote})
      }).then(res => res.json())
          .then(async (resData) => {
              if(resData.error){
                  alert("Vous aves déja voter pour ce projet")
              }
              if(resData.Success){
                alert("Merci pour votre vote",this.state.vote)
            }
             //console.warn(resData)
            // console.warn(this.state.vote)
                  // await AsyncStorage.setItem('titre', resData[i].titre)
                  //await AsyncStorage.setItem('users_id', JSON.stringify(resData[i].users_id))
          }
          )
    }

    _toggleModal = () =>
        this.setState({ isModalVisible: !this.state.isModalVisible });
    navigat() {
        this.state.naviga.navigation.navigate('Détail')
    }
    render() {
        return (
            
            <View style={{ flex: 1, }}>
                {/* {console.warn(this.state.vote)} */}
                <View>
                    <View style={styles.button}>
                        <TouchableOpacity onPress={() => this.props.functionBack()
                        }>
                            <View style={{ backgroundColor: "##fff", borderRadius: 22, paddingHorizontal: 25, paddingVertical: 12, borderColor: "#3df", borderWidth: 1 }}>
                                <Text style={{ color: "grey" }}> {this.props.backName}  </Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this._toggleModal} >
                            <View style={{ backgroundColor: "#3df", borderRadius: 22, paddingHorizontal: 25, paddingVertical: 12 }}>
                                <Text style={{ color: "#fff" }}> Voter</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <Modal isVisible={this.state.isModalVisible} style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#2c3776", width: "90%", marginHorizontal: 20, borderRadius: 23, marginVertical: Dimensions.get("window").width / 2 }}>
                        {/* <View style={{flexDirection:"row"}}> */}
                        <View style={{ justifyContent: "center", marginBottom: Dimensions.get("window").height / 20 }}>
                            <Text style={{ color: "white", fontWeight: "bold", fontSize: 23 }} >Je vote</Text>
                        </View>
                        <View style={{ alignSelf: 'flex-end', bottom: Dimensions.get("window").height / 10, marginRight: 12 }}>
                            <TouchableOpacity onPress={this._toggleModal}>
                                <Icon color="white" size={35} name={'ios-close'} />
                            </TouchableOpacity>
                            {/* <Icon name="ios-expand"/> */}
                            {/* </View> */}
                        </View>
                        <TouchableOpacity style={{ paddingHorizontal: 23, backgroundColor: "#0db5c9", paddingVertical: 12, borderRadius: 12, width: "90%", alignItems: "center", marginBottom: 17 }} onPress={()=>this.pour()} >
                            <View >
                                <Text style={{ fontWeight: "bold", color: "#fff" }}>Pour</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ paddingHorizontal: 23, backgroundColor: "#5f70f6", paddingVertical: 12, borderRadius: 12, width: "90%", alignItems: "center", marginBottom: 17 }} onPress={()=>this.contre()} >
                            <View style={{}}>
                                <Text style={{ fontWeight: "bold", color: "#fff" }}>Contre</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ paddingHorizontal: 23, backgroundColor: "#4a5062", paddingVertical: 12, borderRadius: 12, width: "90%", alignItems: "center", marginBottom: 17 }} onPress={()=>this.abstiens()} >
                            <View >
                                <Text style={{ fontWeight: "bold", color: "#fff" }}>Je m'abstiens</Text>
                            </View>
                        </TouchableOpacity>
                    </Modal>
                </View>

                {/* <Text>{'Mounted: ' + console.warn(this.state.naviga)}</Text> */}
            </View>
        );
    }
}
export default PopUp
const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 32,
        marginLeft: Dimensions.get('window').width / 8,
        marginRight: Dimensions.get('window').width / 8,
        //marginHorizontal:this.wind
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
        marginTop: 12
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