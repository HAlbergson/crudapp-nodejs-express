import { getArtists, updateArtist, createArtist, deleteArtist, changeFav } from "./rest-service.js";
import { searchArtistByName, compareGenres, compareName } from "./helpers.js";
window.addEventListener("load", initApp);

let artists;

function initApp() {
  updateGrid();
  document.querySelector("#create-artist-btn").addEventListener("click", showCreateArtistDialog);
  document.querySelector("#form-create-artist").addEventListener("submit", createArtistClicked);
  document.querySelector("#form-update-artist").addEventListener("submit", updateArtistClicked);
  document.querySelector("#form-delete-artist").addEventListener("submit", deleteArtistClicked);
  document.querySelector("#select-filter-by").addEventListener("change", filterChanged);

  document.querySelector("#form-delete-artist .btn-cancel").addEventListener("click", deleteCancelClicked);
  document.querySelector("#form-update-artist .btn-cancel").addEventListener("click", updateCancelClicked);
  document.querySelector("#select-sort-by").addEventListener("change", sortByChanged);

  document.querySelector("#input-search").addEventListener("keyup", inputSearchChanged);
  document.querySelector("#input-search").addEventListener("search", inputSearchChanged);
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
  }
}
async function updateArtistClicked(event) {
  console.log("hvad sker der");
  const form = event.target;
  const name = form.name.value;
  const birthdate = form.birthdate.value;
  const activeSince = form.activeSince.value;
  const genres = form.genres.value;
  const labels = form.labels.value;
  const website = form.website.value;
  const image = form.image.value;
  const shortDescription = form.shortDescription.value;
  const id = form.getAttribute("data-id");
  const response = await updateArtist(id, name, birthdate, activeSince, genres, labels, website, image, shortDescription);
  if (response.ok) {
    updateGrid();
  }
}
async function deleteArtistClicked(event) {
  const id = event.target.getAttribute("data-id"); // event.target is the delete form
  const response = await deleteArtist(id);

  if (response.ok) {
    console.log("succesfully deleted");
    updateGrid();
  }
}
function deleteCancelClicked() {
  document.querySelector("#dialog-delete-artist").close(); // close dialog
}
function updateCancelClicked() {
  document.querySelector("#dialog-update-artist").close(); // close dialog
}
function filterArtistClicked() {
  document.querySelector("#filter-dialog").showModal();
}
async function updateGrid() {
  artists = await getArtists();
  displayArtists(artists);
}

function displayArtists(list) {
  document.querySelector("#artist-grid").innerHTML = "";
  for (const artist of list) {
    const favoriteButtonText = artist.fav ? "Remove from favorites" : "Add to favorites";

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
                <button class="fav-btn">${favoriteButtonText}</button>

            </div>
        </article>`;
    document.querySelector("#artist-grid").insertAdjacentHTML("beforeend", artistHTML);
    document.querySelector("#artist-grid article:last-child .update-btn").addEventListener("click", () => updateClicked(artist));
    document.querySelector("#artist-grid article:last-child .delete-btn").addEventListener("click", () => deleteClicked(artist));
    document.querySelector("#artist-grid article:last-child .fav-btn").addEventListener("click", () => changeFavClicked(artist));
  }
}
function showCreateArtistDialog() {
  document.querySelector("#dialog-create-artist").showModal();
}

function updateClicked(artist) {
  console.log(artist);
  const updateForm = document.querySelector("#form-update-artist");
  updateForm.name.value = artist.name;
  updateForm.birthdate.value = artist.birthdate;
  updateForm.activeSince.value = artist.activeSince;
  updateForm.genres.value = artist.genres;
  updateForm.labels.value = artist.labels;
  updateForm.website.value = artist.website;
  updateForm.image.value = artist.image;
  updateForm.shortDescription.value = artist.shortDescription;
  updateForm.setAttribute("data-id", artist.id);
  document.querySelector("#dialog-update-artist").showModal();
}
async function changeFavClicked(artist) {
  console.log("bliver denne aktiveret?");
  const response = await changeFav(artist);
  console.log(response);
  if (response.ok) {
    updateGrid();
  }
}
function deleteClicked(artist) {
  document.querySelector("#dialog-delete-artist-name").textContent = artist.name;
  document.querySelector("#form-delete-artist").setAttribute("data-id", artist.id);
  document.querySelector("#dialog-delete-artist").showModal();
}

function inputSearchChanged(event) {
  const value = event.target.value;
  const artistShow = searchArtistByName(value);
  console.log(artistShow);
  displayArtists(artistShow);
}

async function sortByChanged() {
  console.log("am i working?");
  const sortField = document.querySelector("#select-sort-by").value;
  const artists = await getArtists();

  if (sortField === "name") {
    artists.sort(compareName);
  } else if (sortField === "genres") {
    artists.sort(compareGenres);
  }

  displayArtists(artists);
}
async function filterChanged() {
  const filterField = document.querySelector("#select-filter-by").value;
  const artists = await getArtists();
  if (filterField === "show-all") {
    displayArtists(artists);
  } else {
    const filteredArtists = artists.filter((artist) => artist.fav === true);
    displayArtists(filteredArtists);
  }
}

export { artists };
