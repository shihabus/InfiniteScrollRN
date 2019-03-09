import React, { Component } from 'react';
import { TextInput, TouchableOpacity, View, StyleSheet, Dimensions, Keyboard } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import IonicIcon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux'
import { fetchImages, clearFetch } from '../../actions'
import Loader from './Loader'
import ErrorAlert from './ErrorAlert'

class SearchBar extends Component {
    state = {
        query: '',
        page: 1,
        showClear: false
    }

    render() {
        return (
            <View style={styles.searchBarContainer}>
                <TextInput
                    placeholder='Search image'
                    style={styles.textInputSearch}
                    underlineColorAndroid={'transparent'}
                    onChangeText={query => this.setState({ query })}
                    value={this.state.query}
                />
                {
                    this.props.showClearFetch &&
                    <TouchableOpacity onPress={() => {
                        this.props.clearFetch()
                        this.setState({ query: '' })
                    }}>
                        <IonicIcon name="ios-close-circle" size={20} color="lightgray" />
                    </TouchableOpacity>
                }
                {
                    this.props.error ?
                        <View>
                            <TouchableOpacity onPress={() => {
                                this.props.fetchImages(this.state.page, this.state.query)
                                Keyboard.dismiss()
                            }}>
                                <ErrorAlert />
                            </TouchableOpacity>
                        </View> :
                        this.props.loading ?
                            <View>
                                <Loader />
                            </View> :
                            <TouchableOpacity
                                style={styles.textSearchButton}
                                onPress={() => {
                                    this.props.fetchImages(this.state.page, this.state.query)
                                    Keyboard.dismiss()
                                }}
                            >
                                <FontAwesome name="search" size={20} color="#0920C0" />
                            </TouchableOpacity>
                }
            </View>
        )
    }
}

const mapStateToProps = ({ fetchResults }) => {
    return { error, loading, query, showClearFetch } = fetchResults
}

export default connect(mapStateToProps, { fetchImages, clearFetch })(SearchBar);

const styles = StyleSheet.create({
    searchBarContainer: {
        width: Dimensions.get('window').width - 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 45,
        borderWidth: .5,
        margin: 5,
        borderColor: '#000',
        borderRadius: 5,
    },
    textInputSearch: {
        flex: 8,
        borderRadius: 5,
        marginRight: 10,
        height: 40,
        paddingLeft: 10
    },
    textSearchButton: {
        flex: 1,
        // backgroundColor: '#0920C0',
        alignItems: 'center',
        justifyContent: 'center',
        height: 40
    }
})