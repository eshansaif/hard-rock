
document.getElementById("search").addEventListener("click",function(){
    
    const inputLyricsValue = document.getElementById("input-lyrics").value;
    fetch(`https://api.lyrics.ovh/suggest/${inputLyricsValue}`)
    .then(res => res.json())
    .then(data => {
        // console.log(data);
        let allData = data.data;
        allData = allData.slice(0,10);
        displayData(allData);
    })
    .catch(error => console.log(error));   
})


//display songs and details
function displayData(allData) {
    const songDiv = document.getElementById("song-div");
    songDiv.innerHTML = "";
    for (let i = 0; i < allData.length; i++) {
        const song = allData[i];
        // console.log(song);
        const div = document.createElement("div");
        
        div.innerHTML = 
        `<div class="single-result row align-items-center my-3 p-3">
        <div class="col-md-3">
            <img class="img-fluid" src="${song.album.cover}" alt="Album Title"/>
        </div>
        <div class="col-md-6">
            <h3 title="Get and Listen the Song" class="lyrics-name"><a target="_blank" href="${song.link}">${song.title}</a></h3>
            <p class=" lead"><span class="">Album:</span> <span class="desc" title="Find all song of This Album"><a href="${song.album.tracklist}">${song.album.title}</a></span></p>
            <p  class="author lead" ><span class="">Artist:</span> <span class="desc" title="Find More song of This artist"><a target="_blank" href="${song.artist.link}">${song.artist.name}</a></span></p>
        </div>
        <div class="col-md-3 text-md-right text-center">
            <a href="#show-lyrics" id="get-lyrics-btn" onclick="getLyrics('${song.artist.name}','${song.title}')" class="btn btn-success">Get Lyrics</a>
        </div>
    </div>`;
        songDiv.appendChild(div); 
    }   
}

// Get lyrics for song
async function getLyrics(artist, songTitle) {
    const res = await fetch(`https://api.lyrics.ovh/v1/${artist}/${songTitle}`);
    // const res = await fetch(`https://private-anon-32a8828e28-lyricsovh.apiary-proxy.com/v1/${artist}/${songTitle}`); /**or */
    const data = await res.json();
  
     if (data.error) {
        document.getElementById("show-lyrics").innerHTML = data.error;
        alert(data.error);
        return data.error;
     } else {
          const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, '<br>');

          document.getElementById("show-lyrics").innerHTML = `
          <button class="btn go-back">&lsaquo;</button>
          <h2 class="text-success mb-4">${songTitle} - ${artist}</h2>
          <pre class="lyric text-white">
                ${lyrics}
          </pre>
          `;
    }
  }
  