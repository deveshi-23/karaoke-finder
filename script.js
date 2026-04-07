const API_KEY = "AIzaSyCighfrqMYSuOMBZYyZFIGVazwrU1JewXo";
let allVideos = [];
async function searchKaraoke(query) {

    const container = document.getElementById("results");
    container.innerHTML = "Loading...";
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}+karaoke&type=video&maxResults=5&key=${API_KEY}`;

    try {
    const response = await fetch(url);
    const data = await response.json();

    allVideos = data.items;
    displayVideos(allVideos);
  } catch (error) {
     
  const container = document.getElementById("results");
  container.innerHTML = "Something went wrong!";
  console.log("Error:", error);

  }
}

function displayVideos(videos) {
  const container = document.getElementById("results");
  container.innerHTML = "";

  videos.forEach(video => {
    const title = video.snippet.title;
    const thumbnail = video.snippet.thumbnails.medium.url;
    const videoId = video.id.videoId;

    const card = document.createElement("div");

    card.innerHTML = `
      <h3>${title}</h3>
      <img src="${thumbnail}" />
      <iframe src="https://www.youtube.com/embed/${videoId}"></iframe>
    `;

    container.appendChild(card);
  });
}
function applyFilter() {
  const keyword = document.getElementById("filterInput").value.toLowerCase();

  const filtered = allVideos.filter(video =>
    video.snippet.title.toLowerCase().includes(keyword)
  );

  displayVideos(filtered);
}

function handleSearch() {
  const query = document.getElementById("searchInput").value;
  searchKaraoke(query);
}

function sortAZ() {
  const sorted = [...allVideos].sort((a, b) =>
    a.snippet.title.localeCompare(b.snippet.title)
  );

  displayVideos(sorted);
}

function sortZA() {
  const sorted = [...allVideos].sort((a, b) =>
    b.snippet.title.localeCompare(a.snippet.title)
  );

  displayVideos(sorted);
}