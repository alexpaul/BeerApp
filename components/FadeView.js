import React, { Component } from 'react'
import { View, 
         StyleSheet, 
         Text, 
         Animated, 
       } from 'react-native'

export default class FadeView extends Component {
  constructor() {
    super()
    this.state = {
      fadeScale: new Animated.Value(1)
    }
  }

  componentDidMount() {
    super.componentDidMount
    this.animateView() 
  }

  animateView() {
    const { fadeScale } = this.state 
    fadeScale.setValue(1)
    Animated.timing(
      fadeScale, 
      {
        toValue: 0, 
        duration: 4000, 
      }
    ).start() 
  }

  render() {
    const { fadeScale } = this.state 
    return (
      <Animated.View
        style={{
          flex: 1, 
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'tomato',
          opacity: fadeScale
        }}
      >
        <Text style={styles.fadeText}>Beer and Food</Text>
      </Animated.View>
    )
  }
}

const styles = StyleSheet.create({
  fadeText: {
    fontSize: 40, 
    color: 'white', 
    fontWeight: '900'
  }
})
