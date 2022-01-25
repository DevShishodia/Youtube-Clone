let ACCESS_KEY = 'AIzaSyCPfIgH-jfvkyVxQUIj9ce4wlAhGsa0ngs';
let VIDEO_API = "https://www.googleapis.com/youtube/v3/videos?";
let CHANNEL_API = "https://www.googleapis.com/youtube/v3/channels?";

const content_container = document.querySelector(".content-ctn");

fetch(
  VIDEO_API +
    new URLSearchParams({
      key: ACCESS_KEY,
      part: "snippet",
      chart: "mostPopular",
      maxResults: 62,
      regionCode: "IN",
    })
)
  .then((res) => res.json())
  .then((data) => {
    data.items.forEach((item) => {
      get_channel(item);
    });
  })
  .catch((error) => console.log(error));

const get_channel = (video_data) => {
  fetch(
    CHANNEL_API +
      new URLSearchParams({
        key: ACCESS_KEY,
        part: "snippet",
        id: video_data.snippet.channelId,
      })
  )
    .then((res) => res.json())
    .then((data) => {
 
      video_data.channelThumbnail =
        data.items[0].snippet.thumbnails.default.url;
      create_content_card(video_data);
    });
};
const create_content_card = (data) => {
  content_container.innerHTML += `
    <div class="video" onclick="location.href = 'https://youtube.com/watch?v=${data.id}'">
            <img src="${data.snippet.thumbnails.high.url}" class="thumbnail" alt="">
            <div class="content">
                <img src="${data.channelThumbnail}" class="channel-icon" alt="">
                <div class="info">
                    <h4 class="title">${data.snippet.title}</h4>
                    <p class="channel-name" ${data.snippet.channelTitle}></p>
                </div>
            </div>
        </div>
    `;
};

const searchInput = document.querySelector(".search-bar");

const searchBtn = document.querySelector(".search-btn");

let searchLink = "https://www.youtube.com/results?search_query=";

searchBtn.addEventListener("click", () => {
  if (searchInput.value.length) {
    location.href = searchLink + searchInput.value;
  }
});