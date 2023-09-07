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

export { searchArtistByName };
