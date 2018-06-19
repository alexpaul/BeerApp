import React, { Component } from 'react'
import { View, 
         Text, 
         StyleSheet, 
         Image, 
         ScrollView,
         TouchableHighlight, 
         FlatList, 
       } from 'react-native'

export default class DetailScreen extends Component {
  constructor(props) {
    super(props)
    const { navigation } = this.props
    const beerProp = navigation.getParam('beer', 'no beer')
    this.state = {
      beer: beerProp,
      isLoaded: false, 
    }
    console.log('beer name is ' + this.state.beer.name)
  }

  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.beer.name}`, 
    headerTitleStyle: {textAlign: 'center', alignSelf: 'center'},
    headerStyle: {backgroundColor: 'powderblue'},
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
    //justifyContent: 'center'
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