import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, TextInput, ScrollView, Dimensions, ImageBackground, Image, Platform, LayoutAnimation, UIManager } from 'react-native';
import { theme } from '../../core/theme';

import Icon from 'react-native-vector-icons/Ionicons';
import ViewMoreText from 'react-native-view-more-text';
import {
    LineChart,
} from "react-native-chart-kit";
import { Button } from 'react-native-paper';
import { HeaderTitle } from 'react-navigation-stack';
import AsyncStorage from '@react-native-community/async-storage';
import PopUp from "../subMenus/popup";

class InfosProject extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            users_id: null,
            //sondages:[this.props.value] ,
            icon: "ios-arrow-down",
            button: null,
            // "expand": false,
            height: 30,
            sondage: [],
            data: [
                {
                    "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry Lorem Ipsum has been the industrys standard dummy text ever since the 15 when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting,",
                    // "expand": false
                },
            ],
            stepProjet: [
                {
                    "title": "Réaliser et faire vivre un jardin fait appel a de nombreuses étapes",
                    "description": "1 - Aménager le terrain et l'équiper",
                    // "expand": false
                },
            ],
        }

        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true);
        }
    }
    componentDidMount = async () => {
        const sondage = await AsyncStorage.getItem('gd')
        const id = await AsyncStorage.getItem('users_id')
        const result = await AsyncStorage.getItem('maire')
        if (result == 0) {
            this.setState({ height: 0 })
        }
        // const { setParams } = this.props.navigation;
        // setParams({ height: this.state.height });
        this.props.navigation.setParams({
            height: this.state.height
        });
        // this.props.navigation.setParams({ height: this.props.height });
        bal = this.props.height
        //console.warn(id)
        await fetch('http://2274a3f6.ngrok.io/api/sondages/' + sondage, {
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
                    sondage: [...prevState.sondage, {
                        id: resData.id,
                        titre: resData.titre,
                        users_id: resData.users_id,
                        description: resData.description,
                        category: resData.category,
                        date: resData.date,
                        hour: resData.hour,
                        media: resData.media,
                        status: resData.status,
                    }],
                }
                ))
                //console.warn(this.state.sondage[0].users_id)
            }).catch((error) => {
                this.setState({
                    error: 'Error retrieving data',
                });
            });
        await fetch('http://2274a3f6.ngrok.io/api/getuser/' + this.state.sondage[0].users_id, {
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
    }

    navigat() {
        this.props.navigation.goBack()
    }
    // static navigationOptions = ({ navigation }) => {
    //     const { state } = props.navigation
    //     return {
    //       headerTitle: 'New Task',
    //       headerRight: () => (<Button title="Modifier" onPress={() => navigation.navigate("Modifier")} />),
    //     }
    //   }

    static navigationOptions =  ({ navigation })  => {
        // const { state } = async()=> navigation;
        // console.warn(state.params.height)
        //  console.log(title)
        return {
            headerRight: () => (
                <TouchableOpacity style={{height:navigation.state.height}} onPress={() =>
                    navigation.navigate("Modifier", { sondage: navigation.state.sondage })
                }>
                    {/* {console.warn("\nDEBUG", params)} */}
                    <View style={{ backgroundColor: "##fff", borderRadius: 22, paddingRight: 23 }}>
                        <Text style={{ color: "blue", fontSize: 17 }}> Modifier </Text>
                    </View>
                </TouchableOpacity>
            ),
        }
    }

    _setNavigationParams() {
        let title = 'Détail';
        let id = 1;

        this.props.navigation.setParams({
            title: title,
            id,
            //    headerRight, 
        });
    }

    componentWillMount() {
        this._setNavigationParams();

    }

    // setHeaderRight = () => {
    //     //console.log("setHeaderRight", this.state.secureTextEntry);
    //     return (
    // <TouchableOpacity onPress={() => 
    //     // navigation.navigat()
    //     navigation.navigate("Modifier")
    //     }>
    //     <View style={{ backgroundColor: "##fff", borderRadius: 22, paddingRight: 23 }}>
    //         <Text style={{ color: "blue", fontSize: 17 }}> Modifier </Text>
    //     </View>
    // </TouchableOpacity>
    //     );
    //   };

    // componentDidMount() {
    //     this.props.navigation.setParams({
    //       headerRight: this.setHeaderRight()
    //     });
    //   }


    renderViewMore(onPress) {
        return (
            <Text style={{ marginTop: 23, color: "#dc904f" }} onPress={onPress}>Voir Plus</Text>
        )
    }
    renderViewLess(onPress) {
        return (
            <Text style={{ marginTop: 23, color: "#dc904f" }} onPress={onPress}>Voir Moins</Text>
        )
    }
    changeLayout = (i) => {
        const data1 = this.state.data.length;
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        let newChild = { "newChild": true }
        this.setState({
            data: [
                ...this.state.data,
                newChild
            ],
            icon: "ios-arrow-up",
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
        let newData = this.state.data
        newData[i].expand = !newData[i].expand
        this.setState({ data: newData })
    };
    navigat() {
        this.props.navigation.goBack()
    }

    render() {
        const image = { uri: "https://reactjs.org/logo-og.png" };

        const WINDOW_HEIGHT = Dimensions.get("window").height
        const WINDOW_WIDTH = Dimensions.get("window").width
        return (
            <ScrollView showsVerticalScrollIndicator={false}>
                {this.state.sondage.map((o, i) => {
                    return (
                        <View>
                            <View >
                                <ImageBackground borderRadius={12} source={image} style={styles.image}>
                                    <View style={styles.card2}>
                                        <TouchableOpacity style={{ alignSelf: 'flex-end', right: -18, top: -23 }}>
                                            <Icon size={33} color={"#fff"} name="md-share" />
                                        </TouchableOpacity>
                                        <View style={styles.centered} >
                                            <View style={{ justifyContent: "center", flex: 1, alignItems: "center" }}>
                                                <Text style={{ color: "white", fontWeight: "bold", fontSize: 18 }}>{o.titre}</Text>
                                            </View>
                                            <View style={{ flexDirection: "row", justifyContent: "space-between", marginHorizontal: 5, top: 14 }}>
                                                <View style={{ flexDirection: "column", marginHorizontal: 22 }}>
                                                    <Text style={{ color: "white" }}>125</Text>
                                                    <Text style={{ right: 12, color: "grey" }}>Votants</Text>
                                                </View>
                                                <View style={{ flexDirection: "column", marginHorizontal: 22 }}>
                                                    <Text style={{ color: "white" }}>5j</Text>
                                                    <Text style={{ right: 30, color: "grey" }}>Temps restant</Text>
                                                </View>
                                                <View style={{ flexDirection: "column", marginRight: -12 }}>
                                                    <Text style={{ color: "white" }}>14</Text>
                                                    <Text style={{ right: 22, color: "grey" }}>Partages</Text>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                </ImageBackground>
                            </View>

                            <TouchableOpacity style={styles.card3}>
                                <Text style={{ marginLeft: 8, top: Platform.OS === 'ios' ? -13 : -10, color: theme.colors.otherTitle, fontWeight: "bold", fontSize: 18 }}>A Propos</Text>
                                <View style={styles.separator} />
                                <View style={{ flexDirection: "column" }}>
                                    <View style={{ flexDirection: "row" }}>
                                        <Image style={{ marginRight: 12, width: 22, height: 22 }} source={require("../../assets/Category.png")} />
                                        <Text style={{ fontSize: 12, color: "#7b839c", fontWeight: "bold", top: 5 }}>Catégorie:</Text>
                                        <Text style={{ fontSize: 12, color: "#7b839c", marginLeft: 5, top: 5 }}>{o.category}</Text>
                                    </View>
                                    <View style={{ flexDirection: "row", marginVertical: 5 }}>
                                        <Image style={{ marginRight: 12, width: 22, height: 22 }} source={require("../../assets/Initiateur.png")} />
                                        <Text style={{ fontSize: 12, color: "#7b839c", fontWeight: "bold", top: 5 }}>Initiateur du projet:</Text>
                                        <Text style={{ fontSize: 12, color: "#7b839c", marginLeft: 5, top: 5 }}>{this.state.name}</Text>
                                    </View>
                                    <View style={{ flexDirection: "row", }}>
                                        <Image style={{ marginRight: 12, width: 22, height: 22 }} source={require("../../assets/locate.png")} />
                                        <Text style={{ fontSize: 12, color: "#7b839c", fontWeight: "bold", top: 5 }}>Lieux:</Text>
                                        <Text style={{ fontSize: 12, color: "#7b839c", marginLeft: 5, top: 5 }}>Paname</Text>
                                    </View>
                                    <View style={{ flexDirection: "row", marginVertical: 5, justifyContent: "space-between" }}>

                                        <Image style={{ marginRight: 12, width: 22, height: 22 }} source={require("../../assets/Date.png")} />
                                        <View style={{ alignSelf: "flex-start", left: -53 }}>
                                            <Text style={{ fontSize: 12, color: "#7b839c", fontWeight: "bold", }}>Date de début</Text>
                                            <Text style={{ fontSize: 12, color: "#7b839c", marginLeft: 5, }}>{o.date}</Text>
                                        </View>
                                        <View style={{ alignSelf: "flex-end" }}>
                                            <Text style={{ fontSize: 12, color: "#7b839c", fontWeight: "bold", left: Platform.OS == "android" ? 3 : null }}>Date de fin</Text>
                                            <Text style={{ fontSize: 12, color: "#7b839c", }}>10/20/2020</Text>
                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>
                    )
                })}
                {this.state.sondage.map((o, i) => {
                    return (
                        <View style={{
                            shadowColor: "grey",
                            shadowOffset: {
                                width: 0,
                                height: 2,
                            },
                            shadowOpacity: 0.25,
                            shadowRadius: 3.84,
                            elevation: 2.5, backgroundColor: "white", marginHorizontal: 23, padding: 29, marginBottom: 23, borderRadius: 12
                        }}>
                            <View style={styles.btnTextHolder}>

                                <TouchableOpacity activeOpacity={0.8}
                                // onPress={() => this.changeLayout(i)} 
                                // onPress={() => this.renderViewMore()} 
                                >
                                    <View style={{ marginBottom: -10, flexDirection: "row", justifyContent: "space-between" }}>

                                        <Text style={{ marginLeft: 8, top: Platform.OS === 'ios' ? -13 : -10, color: theme.colors.otherTitle, fontWeight: "bold", fontSize: 18 }}>Description</Text>
                                        <Icon color={"grey"} size={17} name={this.state.icon} style={{ alignSelf: 'flex-end', height: Dimensions.get("window").height / 30, top: -9 }} />
                                    </View>
                                    <View style={styles.separator} />
                                    <ViewMoreText
                                        numberOfLines={2}
                                        afterExpand={() => this.changeLayout(i)}
                                        renderViewMore={this.renderViewMore}
                                        renderViewLess={this.renderViewLess}
                                        afterCollapse={() => this.changeLayout(i)}
                                        textStyle={{ color: "#7b839c" }}
                                    >
                                        <Text>{o.description}</Text>
                                    </ViewMoreText>
                                    {/* <View style={{flexDirection:"column"}}>
                                        <View style={{flexDirection:"row"}}>
                                            
                                        </View> 
                                    </View> */}
                                    {/* <Text style={{ left: 3, color: "grey" }} numberOfLines={2}>{o.description}</Text> */}
                                </TouchableOpacity>
                            </View>
                        </View>
                    )
                })
                }
                {this.state.stepProjet.map((o, i) => {
                    return (
                        <View>
                        <View style={{
                            shadowColor: "grey",
                            shadowOffset: {
                                width: 0,
                                height: 2,
                            },
                            shadowOpacity: 0.25,
                            shadowRadius: 3.84,
                            elevation: 2.5, backgroundColor: "white", marginHorizontal: 23, padding: 29, marginBottom: 23, borderRadius: 12
                        }}>
                            <View style={styles.btnTextHolder}>

                                <TouchableOpacity activeOpacity={0.8}>
                                    <View style={{ marginBottom: -10, flexDirection: "row", justifyContent: "space-between" }}>

                                        <Text style={{ marginLeft: 8, top: Platform.OS === 'ios' ? -13 : -10, color: theme.colors.otherTitle, fontWeight: "bold", fontSize: 18 }}>Les étapes du projet</Text>
                                        <Icon color={"grey"} size={17} name={this.state.icon} style={{ alignSelf: 'flex-end', height: Dimensions.get("window").height / 30, top: -9 }} />
                                    </View>
                                    <View style={styles.separator} />
                                    <ViewMoreText
                                        numberOfLines={2}
                                        afterExpand={() => this.changeLayout(i)}
                                        renderViewMore={this.renderViewMore}
                                        renderViewLess={this.renderViewLess}
                                        afterCollapse={() => this.changeLayout(i)}
                                        textStyle={{ justifyContent: "space-between", color: "#7b839c" }}
                                    >
                                        <Text >{o.title}{"\n"}{'\n'}</Text>
                                        <Text style={{ top: 12 }}>{o.description}</Text>
                                    </ViewMoreText>
                                </TouchableOpacity>
                            </View>
                            
                        </View>
                        <PopUp backName={"annuler"} functionBack={()=>this.navigat()} naviga={this.props} id={i+1}/>
                        </View>
                    )
                })
                }
                    
            </ScrollView>
        )
    }

}
const styles = StyleSheet.create({
    planeIcon: {
        color: "blue"
    },
    button: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 32,
        marginLeft: Dimensions.get('window').width / 8,
        marginRight: Dimensions.get('window').width / 8,
        //marginHorizontal:this.wind
    },
    separator: {
        justifyContent: "center",
        alignSelf: "center",
        marginBottom: 10,
        borderWidth: 0.5,
        width: "90%",
        borderColor: Platform.OS === 'ios' ? '#a1a1a1' : "#232423",
    },
    card3: {
        backgroundColor: "#fff",
        color: "black",
        marginBottom: 13,
        marginLeft: '2%',
        padding: 29,
        width: '89%',
        shadowColor: "grey",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        marginTop: 10,
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 2.5,
        borderRadius: 8,
        height: 182,
        marginLeft: 23,
        marginRight: 32
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
        marginHorizontal: 7,
        marginTop: 12
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
        height: 250,
    },
    footer: {
        position: 'absolute',
        height: 40,
        left: 0,
        top: Dimensions.get("window").height - 40,
        width: Dimensions.get("window").width,
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

})
export default InfosProject


