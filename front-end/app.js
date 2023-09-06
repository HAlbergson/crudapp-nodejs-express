import { getData, createArtist } from "./rest-service.js";

window.addEventListener("load", initApp);

function initApp() {
  updateGrid();
  document.querySelector("#create-artist-btn").addEventListener("click", showCreateArtistDialog);
  document.querySelector("#form-create-artist").addEventListener("submit", createArtistClicked);
}
async function updateGrid() {
  const artists = await getData();
  displayArtists(artists);
}

function displayArtists(list) {
  for (const artist of list) {
    const artistHTML = /*html*/ `
        <article class="grid-item">
            <div class="body">
                <img src=${artist.image}>
                <h2>${artist.name}</h2>
                <p>Birthday: ${artist.birthdate}</p>
                <p>Active since: ${artist.activeSince}</p>
                <p>Genres: ${artist.genres}</p>
                <p>Labels: ${artist.labels}</p>
                <p>Website: ${artist.website}</p>
                <p>Discription: ${artist.shortDescription}</p>
            </div>
            <div class="body">
                <button class="update-btn">Update</button>
                <button class="delete-btn">Delete</button>
            </div>
        </article>`;
    document.querySelector("#artist-grid").insertAdjacentHTML("beforeend", artistHTML);
  }
}
function showCreateArtistDialog() {
  document.querySelector("#dialog-create-champ").showModal();
}
async function createArtistClicked(event) {
  const form = event.target;
  const name = form.name.value;
  const birthdate = form.birthdate.value;
  const activeSince = form.activeSince.value;
  const genres = form.genres.value;
  const labels = form.labels.value;
  const website = form.website.value;
  const image = form.image.value;
  const shortDescription = form.shortDescription.value;

  const response = await createArtist(name, birthdate, activeSince, genres, labels, website, image, shortDescription);
  if (response.ok) {
    updateGrid();
    form.reset();
  }
}
