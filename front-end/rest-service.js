const endpoint = "http://localhost:3333/artists";

async function getData() {
  const response = await fetch(`${endpoint}`);
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
  const response = await fetch("", {
    method: "POST",
    body: artistJSON,
  });
  return response;
}

export { getData, createArtist };
