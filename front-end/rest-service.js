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
  const updateArtist = {
    name,
    birthdate,
    activeSince,
    genres,
    labels,
    website,
    image,
    shortDescription,
  };
  const artistJSON = JSON.stringify(updateArtist);
  const response = await fetch(`${endpoint}/artists/${id}`, {
    headers: headers,
    method: "PUT",
    body: artistJSON,
  });
  return response;
}
// async function delelteArtist(name, birthdate, activeSince, genres, labels, website, image, shortDescription) {
//   const newArtist = {
//     name,
//     birthdate,
//     activeSince,
//     genres,
//     labels,
//     website,
//     image,
//     shortDescription,
//   };
//   const artistJSON = JSON.stringify(newArtist);
//   const response = await fetch(`${endpoint}/artists`, {
//     headers: {
//       "Content-Type": "application/json",
//     },
//     method: "DELETE",
//     body: artistJSON,
//   });
//   return response;
// }
export { getArtists, createArtist, updateArtist };
