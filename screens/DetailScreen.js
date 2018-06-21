import React, { Component } from 'react'
import { View, 
         Text, 
         StyleSheet, 
         Image, 
         ScrollView,
         TouchableHighlight, 
         Button, 
         AsyncStorage,
         FlatList, 
       } from 'react-native'

const beerProp = {}

export default class DetailScreen extends Component {
  constructor(props) {
    super(props)
    const { navigation } = this.props
    beerProp = navigation.getParam('beer', 'no beer')
    this.state = {
      beer: beerProp,
      isLoaded: false,
      favorites: [] 
    }
    console.log('beer name is ' + this.state.beer.name)
  }

  addFavorite = () => {
    alert('Favorite Added')
  }

  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.beer.name}`, 
    headerTitleStyle: {textAlign: 'center', alignSelf: 'center'},
    headerStyle: {backgroundColor: 'powderblue'},
    headerRight: (
      <Button
        onPress={() => {

          AsyncStorage.getAllKeys((error, keys) => {
            console.log('keys ' + keys)
            if(keys === null) {
              AsyncStorage.setItem(`${beerProp.id}`, JSON.stringify(beerProp), (err, result) => {
                if(err) {
                  console.log('there was an error: ' + err)
                } else {
                  alert(beerProp.name + 'added to Favorites' + ' with id: ' + beerProp.id)
                }
              })
            } else {
              const results = keys.filter((key) => key === `${beerProp.id}`)
              console.log(results.length) 
              if(results.length === 0) {
                AsyncStorage.setItem(`${beerProp.id}`, JSON.stringify(beerProp), (err, result) => {
                  if(err) {
                    console.log('there was an error: ' + err)
                  } else {
                    alert(beerProp.name + 'added to Favorites' + ' with id: ' + beerProp.id)
                  }
                })
              } else {
                alert(beerProp.name + ' is already in your favorites')
              }
            }
          })

          // AsyncStorage.setItem(`${beerProp.id}`, JSON.stringify(beerProp), (err, result) => {
          //   if(err) {
          //     console.log('there was an error: ' + err)
          //   } else {
          //     alert(beerProp.name + 'added to Favorites' + ' with id: ' + beerProp.id)
          //   }
          // })


        }}
        title='Favorite'
      />
    )
  })

  render() {
    let { beer } = this.state 
    return(
      <ScrollView contentContainerStyle={styles.container}>
        <Image 
          source={{uri:this.state.beer.image_url}}
          style={styles.detailImage}
        />
        <Text style={styles.detailText}>
          {beer.description}
        </Text>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#fff',
    alignItems: 'center', 
  }, 
  detailImage: {
    marginTop: 20, 
    height: 300, 
    width: 100,
    resizeMode:'contain'
  }, 
  detailText: {
    fontSize: 20, 
    padding: 10, 
  }
})