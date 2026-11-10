let watchlist =
JSON.parse(
    localStorage.getItem("watchlist")
) || []; //retrieve saved movies from local storage

function displayWatchlist(){ //read operation

    let output = "";

    watchlist.forEach(function(movie,index){

        output += `

        <div class="movie-card">

            <img src="${movie.poster}">

            <h3>${movie.title}</h3>

            <p>${movie.genre}</p>

            <p>${movie.rating}</p>

            <button onclick="deleteMovie(${index})"> 
                Delete
            </button>

        </div>

        `;
    });

    document.getElementById(
        "watchlistContainer"
    ).innerHTML = output;
}

function deleteMovie(index){//delete operation

    watchlist.splice(index,1);

    localStorage.setItem(
        "watchlist",
        JSON.stringify(watchlist)//save updated
    );

    displayWatchlist();
}

//event handling
window.onload =
displayWatchlist;