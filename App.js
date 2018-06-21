import React from 'react';

// import third party libraries 
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation'
import { Ionicons } from 'react-native-vector-icons'

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

const TabStack = createBottomTabNavigator(
  {
    Search: HomeNavStack, 
    Favorites: FavoritesNavStack, 
  }, 
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Search') {
          iconName = `ios-search${focused ? '' : '-outline'}`;
        } else if (routeName === 'Favorites') {
          iconName = `ios-heart${focused ? '' : '-outline'}`;
        }

        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return <Ionicons name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    },
  }
)

export default class App extends React.Component {
  render() {
    return (
      <TabStack/>
    );
  }
}

