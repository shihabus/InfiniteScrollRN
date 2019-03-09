import React, { Component } from 'react'
import {
  ActivityIndicator,
  StyleSheet,
  View,
} from 'react-native'
import IonicIcon from 'react-native-vector-icons/Ionicons';


export default class ErrorAlert extends Component {
  render() {
    return (
      <View style={styles.container}>
        <IonicIcon name="ios-alert" size={25} color="red"/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    margin: 5,
    paddingRight: 5,
  }
})