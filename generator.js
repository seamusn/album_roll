"use strict";

const buttonEl = document.querySelector("button");
const albumEl = document.querySelector("#album");
const artistEl = document.querySelector("#artist");
const infoEl = document.querySelector("#info");
const descriptionEl = document.querySelector("#description");
const albumCoverEl = document.querySelector("#album-cover");

async function displayAlbum() {
  let album = randomAlbum();

  albumEl.textContent = `${album["Rank"]}. ${album["Album"]}`;
  artistEl.textContent = `${album["Artist"]} (${album["Info"]})`;
  descriptionEl.textContent = album["Description"];
  albumCoverEl.src = "";
  albumCoverEl.src = await get_cover_url(album["Artist"], album["Album"]);
}

function randomAlbum() {
  let index = Math.floor(Math.random() * albums.length);
  return albums[index];
}
displayAlbum();
buttonEl.addEventListener("click", displayAlbum);

async function get_cover_url(artist_name, album_name) {
  try {
    const release_url = encodeURI(
      `https://musicbrainz.org/ws/2/release?query=artist:${artist_name}+recording:${album_name}+country:us or uk`
    );
    console.log(release_url);
    const release_res = await axios.get(release_url);
    let release = release_res.data.releases[0];

    for (const rel of release_res.data.releases) {
      if (rel.title === album_name) {
        release = rel;
      }
      break;
    }

    console.log(release);
    console.log(release_res.data.releases);
    return `https://coverartarchive.org/release/${release.id}/front`;
  } catch (error) {
    console.log(error);
  }
}
