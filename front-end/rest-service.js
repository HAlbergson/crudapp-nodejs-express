const endpoint = "http://localhost:3333";
const headers = { "Content-Type": "application/json" };

async function getArtists() {
  const response = await fetch(`${endpoint}/artists`);
  const data = await response.json();
  return data;
}

async function createArtist(name, birthdate, activeSince, genres, labels, website, image, shortDescription) {
  const newArtist = {
    name,
    birthdate,
    activeSince,
    genres,
    labels,
    website,
    image,
    shortDescription,
  };
  const artistJSON = JSON.stringify(newArtist);
  const response = await fetch(`${endpoint}/artists`, {
    headers: headers,
    method: "POST",
    body: artistJSON,
  });
  return response;
}
async function updateArtist(id, name, birthdate, activeSince, genres, labels, website, image, shortDescription) {
  const artistToUpdate = {
    id,
    name,
    birthdate,
    activeSince,
    genres,
    labels,
    website,
    image,
    shortDescription,
  };
  const artistJSON = JSON.stringify(artistToUpdate);
  const response = await fetch(`${endpoint}/artists/${id}`, {
    headers: headers,
    method: "PUT",
    body: artistJSON,
  });
  return response;
}
async function deleteArtist(id) {
  const response = await fetch(`${endpoint}/artists/${id}`, {
    method: "DELETE",
  });
  return response;
}
async function changeFav(artist) {
  console.log("change favorites clicked");
  const response = await fetch(`${endpoint}/artists/fav/${artist.id}`, {
    method: "PUT",
  });
  if (response.ok) {
    return response;
  } else {
    console.error("Failed to change favorite status. Status: " + response.status);
  }
}

export { getArtists, createArtist, updateArtist, deleteArtist, changeFav };
