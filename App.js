import React from 'react';

// import third party libraries 
import { createStackNavigator } from 'react-navigation'

// import screens 
import MainScreen from './screens/MainScreen'
import DetailScreen from './screens/DetailScreen'

const RootStack = createStackNavigator({
  Home: MainScreen,
  Detail: DetailScreen
})

export default class App extends React.Component {
  render() {
    return (
      <RootStack/>
    );
  }
}

