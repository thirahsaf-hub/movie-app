let watchlist =
JSON.parse(
    localStorage.getItem("watchlist")
) || [];

function displayWatchlist(){

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

function deleteMovie(index){

    watchlist.splice(index,1);

    localStorage.setItem(
        "watchlist",
        JSON.stringify(watchlist)
    );

    displayWatchlist();
}


window.onload =
displayWatchlist;