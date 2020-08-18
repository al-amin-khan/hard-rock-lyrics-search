// https://api.lyrics.ovh/suggest/
// https://api.lyrics.ovh/v1/artist/title

var searchInput;

document.getElementById('search-button').addEventListener('click', function (){
  document.getElementById('info').innerHTML = '';
  searchInput = document.getElementById('search-input').value;
  loadSuggest(searchInput);
  loadLyrics(searchInput);
});

function loadSuggest(input){
  const link = 'https://api.lyrics.ovh/suggest/'+input;
  fetch(link)
  .then(response => response.json())
  .then(data => {
    const fetchData = data.data;

    for (let i = 0; i < 10; i++) {
      const title = fetchData[i].album.title;
      const artist = fetchData[i].artist.name;

      const output = `
      <p class="author lead"><strong>${title} </strong> Album by <span>${artist} </span> <button class="btn btn-success">Get Lyrics</button></p>
      `
      const finalText = document.getElementById('info').innerHTML += output;

      const output2 = `
      <div class="single-result row align-items-center my-3 p-3">
          <div class="col-md-9">
              <h3 class="lyrics-name">${title}</h3>
              <p class="author lead">Album by <span>${artist}</span></p>
          </div>
          <div class="col-md-3 text-md-right text-center">
              <button class="btn btn-success">Get Lyrics</button>
          </div>
      </div>
      `;
      document.getElementById('fancy-style').innerHTML += output2;

    }
  })
  document.getElementById('search-input').value = '';
}

function loadLyrics(input){
  const link = 'https://api.lyrics.ovh/suggest/'+input;
  // let title;
  // let artist;
  // let lyricsLink;

  fetch(link)
  .then(response => response.json())
  .then(data => {
    const title = data.data[0].album.title;
    const artist = data.data[0].artist.name;
    const lyricsLink = 'https://api.lyrics.ovh/v1/'+artist+'/'+title;

    document.getElementById('headline').innerHTML = `
    ${artist} - ${title}
    `;
    fetch(lyricsLink)
    .then(response => response.json())
    .then(data => {
      console.log(data.error);
      if (data.error) {
        document.getElementById('lyrics-text').innerHTML = `
        <h4 class="text-center text-danger">${data.error}</h4>
        `;
      }
      else {
        document.getElementById('lyrics-text').innerHTML = data.lyrics;
      }
    })

    .catch((error) => {
      document.getElementById('lyrics-text').innerHTML = `
      <h2 class="text-center text-danger">No Lyrics Found!</h2>
      `;
    });
  })

}
