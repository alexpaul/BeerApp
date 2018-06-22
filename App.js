import React from 'react';
import { Animated } from 'react-native'

// import third party libraries 
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation'
import { Ionicons } from 'react-native-vector-icons'
import TimerMixin from 'react-timer-mixin'

// import screens 
import MainScreen from './screens/MainScreen'
import DetailScreen from './screens/DetailScreen'
import FavoritesScreen from './screens/FavoritesScreen'

// import custom components 
import FadeView from './components/FadeView'

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
  constructor() {
    super() 
    this.state = {
      isStopAnimating: false 
    }
  }

  componentDidMount() {
    super.componentDidMount
    setTimeout(() => {
      this.setState({
        isStopAnimating: true
      })
    }, 2000);
  }

  render() {
    const { isStopAnimating } = this.state 
    return (isStopAnimating) ? <TabStack/> : <FadeView/>
    //return <FadeView />
  }
}

