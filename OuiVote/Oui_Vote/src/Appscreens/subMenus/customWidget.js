import React, { Component } from 'react'
import { View, Image, StatusBar, Dimensions, Text } from 'react-native'
import Swiper from 'react-native-swiper'
const { width, height } = Dimensions.get('window')

const styles = {
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
      }
    
}

export default class extends Component {
  render() {
    return (
        <View style={{ paddingBottom: 45, paddingHorizontal: 20, borderRadius: 23 }}>
        <Swiper paginationStyle={{ bottom: '102%' }} height={300} style={styles.wrapper} showsButtons loop={false}>
          <View testID="Hello" style={styles.slide1}>
            <Text style={styles.text}>Hello Swiper</Text>
          </View>
          <View testID="Beautiful" style={styles.slide2}>
            <Text style={styles.text}>Beautiful</Text>
          </View>
          <View testID="Simple" style={styles.slide3}>
            <Text style={styles.text}>And simple</Text>
          </View>
        </Swiper>
      </View>
    )
  }
}