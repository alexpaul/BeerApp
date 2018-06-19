export function searchBeersByFood(food) {
  const searchURL = 'https://api.punkapi.com/v2/beers?food=' + food
  return fetch(searchURL) 
    .then(response => response.json())
    .then(jsonData => {
      return jsonData
    })
    .catch(err => console.log(err))
}