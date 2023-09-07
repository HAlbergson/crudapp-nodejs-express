import { artists } from "./app.js";

function searchArtistByName(searchValue) {
  searchValue = searchValue.toLowerCase();
  const results = artists.filter(checkName);
  function checkName(artist) {
    const name = artist.name.toLowerCase();
    return name.includes(searchValue);
  }
  return results;
}
function compareName(artist1, artist2) {
  return artist1.name.localeCompare(artist2.name);
}
function compareGenres(artist1, artist2) {
  return artist1.genres.localeCompare(artist2.genres);
}


export { searchArtistByName, compareGenres, compareName };
