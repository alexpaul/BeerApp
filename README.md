## Beer App

A react-native app. The beer-app uses the PunkAPI beer API to query beers based on your food choice. Favorites persist in the app using **AsyncStorage**  

>run ```npm install``` prior to starting the server with ```npm start```

## Packages used 

* react-navigation - general app navigation
* react-native-vector-icons - tab bar icons
* react-native-elements - SearchBar 

## Code Snippets 

**Adding Tab Bar Icons**  
```javascript 
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
```

<p align="center">
  <img src="" width="277" height="602" />
</p> 

