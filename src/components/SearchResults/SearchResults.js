import React, { Component } from 'react';
import { View, StyleSheet, FlatList, Text } from 'react-native';
import { connect } from 'react-redux'
import ProgressiveImage from './ImageGrid'
import IonicIcon from 'react-native-vector-icons/Ionicons';
import { fetchImages } from '../../actions'
import NetInfo from '../NetworkAlert/OfflineInfo'


class SearchResults extends Component {
  constructor(props) {
    super(props)
    this.state = {
      page: 1,
      data: [],
      loading: false,
      error: null,
      refershing: false,
      query: ''
    }
  }

  fetchImage = () => {
    this.setState({ loading: true })
    fetch(`https://api.shutterstock.com/v2/images/search?query=${this.state.query}&page=${this.state.page}`, {
      method: 'GET',
      headers: {
        Authorization: 'Basic ' + authKey
      }
    })
      .then(res => res.json())
      .then(result => {
        console.log('response', result)
        this.setState({
          data: [...this.state.data, ...result.data],
          error: result.error || null,
          loading: false,
          refershing: false
        })
      })
      .catch(error => {
        this.setState({ error, loading: false, refershing: false })
      })
  }

  handleRefresh = () => {
    this.setState({ page: 1, refershing: true }, () => this.props.fetchImages(this.state.page, this.props.query))
  }

  handleMore = () => {
    this.setState({
      page: this.state.page + 1,
    }, () => this.props.fetchImages(this.state.page, this.props.query))
  }

  ListEmptyComponent = () => {
    return (
      <View style={styles.listEmptyComponent}>
        <IonicIcon name="ios-aperture" size={45} color="#0920C0"/>
        <Text>Image Explorer</Text>
      </View>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <NetInfo/>
        <FlatList
          keyExtractor={item => item.id}
          data={this.props.data}
          renderItem={({ item }) => {
            return (
              <ProgressiveImage
                source={{ uri: item.assets.preview.url }}
                thumbnailURL={item.assets.large_thumb.url === null ? '' : item.assets.large_thumb.url}
                thumbnail={{ uri: item.assets.preview.url }}
                key={item.id} />
            )
          }}
          numColumns={3}
          ListEmptyComponent={this.ListEmptyComponent}
          ListFooterComponent={this.footerComponent}
          onEndReached={this.handleMore}
          onEndReachedThreshold={0}
        />
      </View>
    )
  }
}

const mapStateToProps = ({ fetchResults }) => {
  return { query, data } = fetchResults
}

export default connect(mapStateToProps, { fetchImages })(SearchResults)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  listEmptyComponent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});