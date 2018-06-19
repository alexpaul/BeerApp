import React, { Component } from 'react'
import { View, 
         Text, 
         StyleSheet, 
         TouchableHighlight, 
         FlatList, 
       } from 'react-native'

// import third party libraries
import { SearchBar } from 'react-native-elements'

// custom functions 
import { searchBeersByFood } from '../helpers/PunkAPI'

const cities = [{key: 'London'}, 
                {key: 'New York'}, 
                {key: 'Chicago'}, 
                {key: 'Miami'}, 
                {key: 'Tokyo'}, 
                {key: 'Cairo'}, 
                {key: 'Beijing'}, 
                {key: 'Stockholm'}, 
                {key: 'Sydney'}, 
                {key: 'Los Angeles'}, 
                {key: 'Berlin'}, 
                {key: 'Paris'}, 
                {key: 'Philadelphia'}, 
                {key: 'Malmo'}, 
                {key: 'Cairns'}, 
               ]

const itemSeperator = <View style={{backgroundColor:'powderblue', height: 0.5}}/>


export default class MainScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      beers: [],
      query: 'salmon', 
    }
  }

  componentDidMount() {
    super.componentDidMount
    this.search(this.state.query)
  }

  static navigationOptions = ({ navigation }) => ({
    title: 'Beer and Food', 
    headerTitleStyle: {textAlign: 'center', alignSelf: 'center'},
    headerStyle: {backgroundColor: 'powderblue'},
  })

  search(keyword) {
    searchBeersByFood(keyword) 
    .then(beers => {
      this.setState({
        beers: beers
      })
    })
  }

  didSelectItem() {
    console.log('item selected')
  }

  filterSearch(word) {
    this.setState({
      query: word, 
      filteredCities: cities.filter((city) => {
        return city.key.includes(word)
      })
    })
  }

  render() {
    const { query } = this.state

    return(
      <View 
        style={styles.container}
      > 
        <SearchBar 
          lightTheme
          autoCapitalize='none'
          autoCorrect={false}
          onChangeText={(searchText) => this.filterSearch(searchText)}
          clearIcon={true}
          value={query}
          returnKeyType='search' // done 
          onSubmitEditing={() => this.search(query)}
        />
        <FlatList
          data={this.state.beers}
          renderItem={({item}) => <TouchableHighlight 
                                    style={styles.item}
                                    onPress={() => this.props.navigation.navigate('Detail', {
                                      beer: item,
                                    })}
                                    underlayColor='white'
                                  >
                                    <Text style={styles.itemText}>{item.name}</Text>
                                  </TouchableHighlight>}
          keyExtractor={item => `${item.id}`}
          ItemSeparatorComponent={() => itemSeperator}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#fff'
  }, 
  item: {
    alignItems: 'flex-start',
    justifyContent: 'center',  
    height: 100, 
  }, 
  itemText: {
    fontSize: 17, 
    padding: 10, 
  },
})