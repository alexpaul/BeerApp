import React, { Component } from 'react'
import { View, 
         Text, 
         StyleSheet, 
         ScrollView,
         AsyncStorage,
         RefreshControl, 
         TouchableHighlight, 
         Button, 
         FlatList, 
       } from 'react-native'

// import custom components 
import BeerCard from '../components/BeerCard'

const beers = []

export default class FavoritesScreen extends Component {
  constructor() {
    super() 
    this.state = {
      favorites: [],
      refreshing: false, 
    }
  }

  componentDidMount() {
    super.componentDidMount
    this.fetchFavorites() 
  }

  fetchFavorites() {
    AsyncStorage.getAllKeys((error, keys) => {
      if(error !== null) {
        alert('error retrieving keys')
      } else {
        keys.forEach((id, index) => {
          console.log('key is ' + id + ' index is ' + index)
          key={id}
          this.retrieveItem(id).then((beer) => {     
            beers.push(beer)
            this.setState({
              favorites: beers
            })
          }).catch((error) => {
            console.log('promise is rejected with error: ' + error)
          })
          this.setState({
            refreshing: false
          })
        })
      }
    })
  }

  onRefresh() {
    this.setState({
      refreshing: true
    })
    beers = []
    this.fetchFavorites() 
  }

  async retrieveItem(key) {
    try {
      const retrievedItem = await AsyncStorage.getItem(key)
      const item = JSON.parse(retrievedItem)
      return item 
    } catch(error) {
      console.log(error.message)
      return 
    }
  }

  static navigationOptions = ({ navigation }) => ({
    title: 'Favorites', 
    headerTitleStyle: {textAlign: 'center', alignSelf: 'center', color: 'white', fontSize: 25},
    headerStyle: {backgroundColor: 'tomato'},
  })

  render() {
    const lineSeperator = <View style={{backgroundColor:'tomato', height: 0.5}}/>
    const { favorites } = this.state 
    return(
      <View style={styles.container}>
        <FlatList
          data={this.state.favorites}
          renderItem={({item}) => 
                                  <TouchableHighlight 
                                    style={styles.item}
                                    onPress={() => this.props.navigation.navigate('Detail', {
                                      beer: item,
                                    })}
                                    underlayColor='white'
                                  >
                                    <BeerCard 
                                      beer={item}
                                    />
                                  </TouchableHighlight>
          }
          
          ItemSeparatorComponent={() => lineSeperator}
          ListEmptyComponent={() => <View style={styles.emptyList}>
                                      <Text style={styles.emptyText}>List is empty</Text>
                                    </View>}
          keyExtractor={(item, index) => `${item.id}`}
          refreshControl={<RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this.onRefresh.bind(this)}
                          />
          }
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#fff',
  }, 
  item: {
    flex: 1, 
    alignItems: 'flex-start',
    justifyContent: 'center',
    height: 100, 
  }, 
  itemText: {
    fontSize: 17, 
    padding: 10, 
  }, 
  emptyList: {
    marginTop: 40, 
    height: 44,
    alignItems: 'center', 
    justifyContent: 'center',
  }, 
  emptyText: {
    color: 'red', 
    fontSize: 17, 
  }
})