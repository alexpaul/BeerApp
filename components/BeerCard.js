import React, { Component } from 'react'
import { View, 
         Image, 
         Text,
         StyleSheet 
} from 'react-native'

export default class BeerCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      beer: {}
    }
  }

  render() {
    const { beer } = this.props
    return(
      <View style={styles.container}>
        <Image
          source={{uri:beer.image_url}}
          style={{height: 80, width: 80}}
          resizeMode='contain'
        />
        <Text 
          style={styles.nameText}
          numberOfLines={0}
        >
          {beer.name}
        </Text>
      </View> 
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'flex-start', 
    height: '100%', 
    width: '100%', 
    backgroundColor: '#fff',
  }, 
  nameText: {
    padding: 10, 
    fontSize: 17, 
    marginLeft: 10, 
    width: '80%'
  }
})