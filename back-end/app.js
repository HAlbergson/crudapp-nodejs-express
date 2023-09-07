import express from "express";
import fs from "fs/promises";
import cors from "cors";

const app = express();
const port = 3333;

app.use(express.json());
app.use(cors());

app.listen(port, () => {
  console.log(`Dis shit runnin' on http://localhost:${port}`);
});

app.get("/", (req, res) => {
  res.send("Wow!!");
});

app.get("/artists", async (req, res) => {
  const data = await fs.readFile("back-end/data.json");
  const artists = JSON.parse(data);
  // const sortedArtists = artists.sort((a, b) => a.name.localeCompare(b.name));
  res.json(artists);
});

app.get("/artists/:id", async (req, res) => {
  const id = Number(req.params.id);
  console.log(id);

  const data = await fs.readFile("back-end/data.json");
  const artists = JSON.parse(data);

  let artist = artists.find((artist) => artist.id === id);

  await fs.writeFile("back-end/data.json", JSON.stringify(artists));

  res.json(artist);
});

app.post("/artists", async (req, res) => {
  const newArtist = req.body;
  newArtist.id = new Date().getTime();

  const data = await fs.readFile("back-end/data.json");
  const artists = JSON.parse(data);
  artists.push(newArtist);
  await fs.writeFile("back-end/data.json", JSON.stringify(artists));
  res.json(artists);
});
app.put("/artists/:id", async (req, res) => {
  const id = Number(req.params.id);
  console.log(id);

  const data = await fs.readFile("back-end/data.json");
  const artists = JSON.parse(data);

  let artistToUpdate = artists.find((artist) => artist.id === id);

  const body = req.body;
  artistToUpdate.name = body.name;
  artistToUpdate.birthday = body.birthday;
  artistToUpdate.genres = body.genres;
  artistToUpdate.labels = body.labels;
  artistToUpdate.website = body.website;
  artistToUpdate.image = body.image;
  artistToUpdate.shortDescription = body.shortDescription;

  await fs.writeFile("back-end/data.json", JSON.stringify(artists));
  res.json(artists);
});

app.delete("/artists/:id", async (req, res) => {
  const id = Number(req.params.id);
  console.log(id);

  const data = await fs.readFile("back-end/data.json");
  let artists = JSON.parse(data);

  artists = artists.filter((artist) => artist.id !== id);

  await fs.writeFile("back-end/data.json", JSON.stringify(artists));
  res.json(artists);
});
