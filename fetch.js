let currentMovie = null;

function buttonClicked() {

    let movieTitle =
    document.getElementById("searchData").value;

    fetch(`https://www.omdbapi.com/?t=${encodeURIComponent(movieTitle)}&apikey=fffa4ed2`)

    .then(response => response.json())

    .then(data => {

        if(data.Response == "False"){

            document.getElementById("movieResult").innerHTML =
            "Movie Not Found";

            return;
        }

        currentMovie = {

            title:data.Title,
            genre:data.Genre,
            rating:data.imdbRating,
            year:data.Year,
            poster:data.Poster
        };

        localStorage.setItem(
            "selectedMovie",
            JSON.stringify(currentMovie)
        );

        document.getElementById("movieResult").innerHTML = `

            <img src="${data.Poster}" width="200">

            <h3>${data.Title}</h3>

            <p>Genre : ${data.Genre}</p>

            <p>Rating : ${data.imdbRating}</p>

            <button onclick="goPayment()">
                Rent Movie (RM10)
            </button>

        `;
    });
}

function goPayment(){

    location.href = "payment.html";

}
