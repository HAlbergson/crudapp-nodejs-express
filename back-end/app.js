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

app.post("/artists", async (req,res) =>{
  
})