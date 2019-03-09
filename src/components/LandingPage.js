import React, { Component } from 'react';
import { StyleSheet,SafeAreaView } from "react-native";
import SearchBar from './SearchBar/SearchBar'
import SearchResults from './SearchResults/SearchResults'



export default class LandingPage extends Component{
    render(){
        return (
            <SafeAreaView style={styles.container}>
                <SearchBar/>
                <SearchResults/>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: '#fff',
    }
});