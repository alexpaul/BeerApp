import React, { Component } from 'react'
import { View, 
         Text, 
         StyleSheet, 
         ScrollView,
         AsyncStorage,
         TouchableHighlight, 
         Button, 
         FlatList, 
       } from 'react-native'

const beers = []

export default class FavoritesScreen extends Component {
  constructor() {
    super() 
    console.log('constructor')
    this.state = {
      favorites: [],
    }
  }

  componentDidMount() {
    super.componentDidMount
    console.log('componentDidMount')
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
        })
      }
    })
  }

  componentWillMount() {
    super.componentWillMount
    console.log('componentWillMount')
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

  static navigationOptions = ({navigation}) => ({
    title: 'Favorites', 
    headerStyle: {backgroundColor: 'powderblue'},
  })

  render() {
    const lineSeperator = <View style={{backgroundColor:'lightgray', height: 0.5}}/>
    const { favorites } = this.state 

    return(
      <View style={styles.container}>
        <FlatList
          data={this.state.favorites}
          renderItem={({item}) => <TouchableHighlight 
                                    style={styles.item}
                                    onPress={() => this.props.navigation.navigate('Detail', {
                                      beer: item,
                                    })}
                                    underlayColor='white'
                                  >
                                    <Text style={styles.itemText}>{item.name}</Text>
                                  </TouchableHighlight>
        }
          
          ItemSeparatorComponent={() => lineSeperator}
          ListEmptyComponent={() => <View style={styles.emptyList}>
                                      <Text style={styles.emptyText}>List is empty</Text>
                                    </View>}
          keyExtractor={(item, index) => `${item.id}`}
          //keyExtractor={(item, index) => `${index}`}
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
    height: 80, 
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