import React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Button,
  Alert,
  Text,
  Image
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import ProgressBarAnimated from 'react-native-progress-bar-animated';
import Geth from 'react-native-geth';

export default class App extends React.Component {

  state = {
    progress: 20,
    progressWithOnComplete: 0,
    progressCustomized: 0,
    pour:0,
    contre:0,
    null:0
  }
  componentDidMount = async () => {
    setTimeout(async () => {
    await this.Sondage()
    }, 1000)
    // const pressed= await this.props.pressed
    // if (pressed) {
    //   this.Sondage()
    //   console.warn("pressed 1")
    // }
    const Eth = async () => {
      const geth = new Geth()
      // start node
      const start = await geth.start()
    
      if (start) {
        console.log('Start :', start)
        // stop node
        const stop = await geth.stop()
        console.log('Stop :', stop)
      }
    }
    
    // Custom Ethereum Network
    const PrivateEth = async () => {
      // Network ID
      const networkID = 1
      // Chain ID
      const chainID = 17
      // genesis.json
      const genesis = `{
        "config": {
          "chainId": ${chainID},
          "homesteadBlock": 0,
          "eip155Block": 0,
          "eip158Block": 0
        },
        "difficulty": "20",
        "gasLimit": "10000000",
        "alloc": {}
      }`
    
      const config = {
        "networkID": networkID, // --networkid / Network identifier (integer, 0=Olympic (disused), 1=Frontier, 2=Morden (disused), 3=Ropsten) (default: 1)
        "maxPeers": 0, // --maxpeers / Maximum number of network peers (network disabled if set to 0) (default: 25)
        "genesis": genesis, // genesis.json file
        "nodeDir": ".private-ethereum", // --datadir / Data directory for the databases and keystore
        "keyStoreDir": "keystore", // --keystore / Directory for the keystore (default = inside the datadir)
        "enodes": "enode://XXXX@X[::]:XXXX" // --bootnodes / Comma separated enode URLs for P2P discovery bootstrap
      }
    
      const geth = new Geth(config)
      // start node
      const start = await geth.start()
    
      if (start) {
        console.warn('Start :', start)
        const stop = await geth.stop()
        console.warn('Stop :', stop)
      }
    }
  }
  componentWillMount() {
    // const pressed=this.props.pressed
    // if (pressed) {
    //   this.Sondage()
    //   console.warn("pressed")
    // }
  }
  Sondage = async () => {
    const sondageId = this.props.idn
    // const gg = await AsyncStorage.getItem('gd')
    await fetch('http://2274a3f6.ngrok.io/api/vote/sondages/' + sondageId + '/pour', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    }).then(res => res.json())
      .then(async (resData) => {
        //console.warn(resData)
        this.setState({
          pour: resData

      })
      })

    await fetch('http://2274a3f6.ngrok.io/api/vote/sondages/' + sondageId + '/contre', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    }).then(res => res.json())
      .then(async (resData) => {
        //console.warn(resData)
        this.setState({
            contre: resData
        })
        //console.warn(resData)
        this.setState({
          name: resData.name
        })
      })

    await fetch('http://2274a3f6.ngrok.io/api/vote/sondages/' + sondageId + '/null', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    }).then(res => res.json())
      .then(async (resData) => {
        //console.warn(resData)
        this.setState({
          null:resData
        })
      })

  }
  increase = (key, value) => {
    this.setState({
      [key]: this.state[key] + value,
    });
  }

  render() {
    const barWidth = Dimensions.get('screen').width - 75;
    return (

      <View style={styles.container}>

            <View>
              <View style={{ backgroundColor: "#d3d5db", borderRadius: 15 }}>
                <ProgressBarAnimated
                  backgroundColor={"#6072fb"}
                  borderWidth={null}
                  width={barWidth}
                  borderRadius={15}
                  height={37}
                  value={this.state.pour}
                  onComplete={() => {
                    Alert.alert('Ce sondage ne peut plus accepter de vote');
                  }}
                /><Text style={{ position: 'absolute', flex: 0, top: 8, left: 24, fontWeight: "bold", fontSize: 18, color: "#fff" }}>{this.state.pour} votants</Text>
              </View>
              <View style={{ marginTop: 22, backgroundColor: "#d3d5db", borderRadius: 15 }}>
                <ProgressBarAnimated
                  backgroundColor={"#5f96fa"}
                  maxValue={100}
                  borderWidth={null}
                  width={barWidth}
                  borderRadius={15}
                  height={37}
                  value={this.state.contre}
                  onComplete={() => {
                    Alert.alert('Ce sondage ne peut plus accepter de vote');
                  }}
                /><Text style={{ position: 'absolute', flex: 0, top: 8, left: 24, fontWeight: "bold", fontSize: 18, color: "#fff" }}>{this.state.contre}  votants</Text>
              </View>
              <View style={{ marginTop: 22, backgroundColor: "#d3d5db", borderRadius: 15 }}>
                <ProgressBarAnimated
                  backgroundColor={"#63afc2"}
                  borderWidth={null}
                  width={barWidth}
                  borderRadius={15}
                  height={37}
                  value={this.state.null}
                  onComplete={() => {
                    Alert.alert('Ce sondage ne peut plus accepter de vote');
                  }}
                /><Text style={{ position: 'absolute', flex: 0, top: 8, left: 24, fontWeight: "bold", fontSize: 18, color: "#fff" }}>{this.state.null}  votants</Text>
              </View>
              <View style={styles.buttonContainer}>
                <View style={styles.buttonInner}>
                  <Button
                    title="actualiser"
                    onPress={
                      //this.increase.bind(this, 'progressWithOnComplete', 10)
                      () => this.Sondage()
                    }
                  />
                </View>
              </View>
            </View>
           
          
            <View style={styles.separator} />
            <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 12 }}>
              <View style={{ flexDirection: "row" }}>
                <Image style={{ top: 3, marginRight: 9, width: 15, height: 10 }} source={require("../assets/blue1.png")}></Image>
                <Text style={{ color: "grey" }}>Pour</Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Image style={{ top: 3, marginRight: 9, width: 15, height: 10 }} source={require("../assets/blue2.png")}></Image>
                <Text style={{ color: "grey" }}>Contre</Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Image style={{ top: 3, marginRight: 9, width: 15, height: 10 }} source={require("../assets/blue3.png")}></Image>
                <Text style={{ color: "grey" }}>Abstention</Text>
              </View>
            </View>
       
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 15,

  },
  buttonContainer: {
    marginTop: 15,
    marginBottom: -23
  },
  separator: {
    marginTop: 30,
    marginBottom: 10,
    borderWidth: 0.5,
    borderColor: '#DCDCDC',
  },
  label: {
    color: '#999',
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 10,
  },
});