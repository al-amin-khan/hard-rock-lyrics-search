// https://api.lyrics.ovh/suggest/
// https://api.lyrics.ovh/v1/artist/title

document.getElementById('search-button').addEventListener('click', function (){
  const searchInput = document.getElementById('search-input').value;
  // console.log(searchInput);
  loadSuggest(searchInput);
});

function loadSuggest(input){
  let link = 'https://api.lyrics.ovh/suggest/'+input;
  fetch(link)
  .then(response => response.json())
  .then(data => {
    const fetchData = data.data;

    // const divTag = document.createElement('div');
    // console.log(divTag);
    for (let i = 0; i < fetchData.length; i++) {
      const title = fetchData[i].album.title;
      const artist = fetchData[i].artist.name;

      // const para = document.createElement('p');
      // const paraChild = divTag.appendChild(para);

      const output = `
      <p class="author lead"><strong>${title} </strong> Album by <span>${artist} </span> <button class="btn btn-success">Get Lyrics</button></p>
      `
      const finalText = document.getElementById('info').innerHTML += output;

    }
  })
}

function loadLyrics(artist, title){
  const lyricsLink = 'https://api.lyrics.ovh/v1/'+artist+'/'+title;

  fetch(lyricsLink)
  .then(response => response.json())
  .then(data => {
    document.getElementById('lyrics-text').innerHTML = data;
    console.log(data);
  })
}


loadLyrics('Pentatonix', 'na na na');
