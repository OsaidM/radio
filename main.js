const stationLinks = document.querySelectorAll('#stations a');
const radioPlayer = document.getElementById('radioPlayer');
let currentlyPlaying;
stationLinks.forEach(link => {
  const stationUrl = link.getAttribute('href');
  if (!(stationUrl.includes("http") || stationUrl.includes("https"))) {
    link.classList.add("disabled");
  }
});
// Add event listeners to station links
stationLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    // first check if the channel is active
    if (!e.target.classList.contains("disabled")) {
      // check if the current song is not null which means not the initial visit of the page
      // then remove selected style on the current channel to be set to the next one
      if (currentlyPlaying != null) {
        currentlyPlaying.target.classList.remove("active");
      }
      const stationUrl = e.target.getAttribute('href');
      radioPlayer.src = stationUrl;
      // to wait until the radioPlayer to set the url before playing as sometimes it startes before updating the url on the page (slow DOM update)
      setTimeout(() => {
        radioPlayer.play();
      }, 800)
      e.target.classList.add("active");
      currentlyPlaying = e;
    }
  });
});
