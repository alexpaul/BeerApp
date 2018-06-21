import React from 'react';

// import third party libraries 
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation'

// import screens 
import MainScreen from './screens/MainScreen'
import DetailScreen from './screens/DetailScreen'
import FavoritesScreen from './screens/FavoritesScreen'

const FavoritesNavStack = createStackNavigator({
  Favorite: FavoritesScreen, 
  Detail: DetailScreen
})

const HomeNavStack = createStackNavigator({
  Home: MainScreen,
  Detail: DetailScreen
})

const TabStack = createBottomTabNavigator({
  Search: HomeNavStack, 
  Favorites: FavoritesNavStack, 
})

export default class App extends React.Component {
  render() {
    return (
      <TabStack/>
    );
  }
}

