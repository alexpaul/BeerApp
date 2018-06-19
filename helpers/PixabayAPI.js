export function searchPhotosByCity(city) {
  const apiKey = '7356354-cf6b7d8c17846a6f4898a2636'
  const searchURL = 'https://pixabay.com/api/?key=' + apiKey + '&q=' + city
  return fetch(searchURL)
    .then((response) => response.json())
    .then((jsonData) => {
      const photos = jsonData['hits']
      return photos
    })
    .catch((err) => console.log(err))
}