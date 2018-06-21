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

**Saving an item with AsyncStorage**  
```javascript
AsyncStorage.setItem(`${beerProp.id}`, JSON.stringify(beerProp), (err, result) => {
  if(err) {
    console.log('there was an error: ' + err)
  } else {
    alert(beerProp.name + 'added to Favorites' + ' with id: ' + beerProp.id)
  }
})
```

**Retrieving an item with AsynStorage**  
```javascript 
async retrieveItem(key) {
  try {
    const retrievedItem = await AsyncStorage.getItem(key)
    const item = JSON.parse(retrievedItem)
    return item 
  } catch(error) {
    console.log(error.message)
    return 
  }
}
```

<p align="center">
  <img src="" width="277" height="602" />
</p> 

