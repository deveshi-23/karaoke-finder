const API_KEY = "AIzaSyCighfrqMYSuOMBZYyZFIGVazwrU1JewXo";

async function searchKaraoke(query) {

    const container = document.getElementById("results");
    container.innerHTML = "Loading...";
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}+karaoke&type=video&maxResults=5&key=${API_KEY}`;

    try {
    const response = await fetch(url);
    const data = await response.json();

    displayVideos(data.items);;
  } catch (error) {
     
  const container = document.getElementById("results");
  container.innerHTML = "Something went wrong!";
  console.log("Error:", error);

  }
}

searchKaraoke("believer imagine dragons");



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
