let currentMovie = null;

function buttonClicked() {// DOM manipulation
    let movieTitle = document.getElementById("searchData").value;

    // Error Handling 
    if (movieTitle.trim() === "") { // check if search box is empty
        document.getElementById("movieResult").innerHTML = 
            "<p>Please enter a movie title.</p>"; //if it is empty, it will show this
        return;
    }

    //Sending request to OMDb API to use movie titles
    fetch(`https://www.omdbapi.com/?t=${encodeURIComponent(movieTitle)}&apikey=fffa4ed2`)
        //convert api into javascript object
        .then(response => response.json())
        // Response process
        .then(data => {
            // Error Handling 
            if (data.Response === "False") {
                document.getElementById("movieResult").innerHTML = //dom manipulation
                    `<p>${data.Error || "Movie Not Found."}</p>`;
                return;
            }
            //movie information from API
            currentMovie = {
                title: data.Title,
                genre: data.Genre,
                rating: data.imdbRating,
                year: data.Year,
                poster: data.Poster
            };

            //local storage for current selected movie
            localStorage.setItem(
                "selectedMovie",
                JSON.stringify(currentMovie)
            );

            // Suggestion Logic
            let recommendation = getRecommendationByGenre(data.Genre);

            //display result (dom manipulation)
            document.getElementById("movieResult").innerHTML = `
                <div class="movie-card">
                    <img src="${data.Poster !== "N/A" ? data.Poster : "placeholder.jpg"}" width="200" alt="${data.Title}">
                    <h3>${data.Title}</h3>
                    <p><strong>Genre:</strong> ${data.Genre}</p>
                    <p><strong>Rating:</strong> ${data.imdbRating} / 10</p>
                    <p><strong>Year:</strong> ${data.Year}</p>
                    <p><strong>Recommendation:</strong> ${recommendation}</p>
                    <br>
                    <button onclick="addWatchlist()">Add To Watchlist</button>
                    <button onclick="goPayment()">Rent Movie (RM10)</button>
                </div>
            `;
        })
        // Error Handling 
        .catch(function (error) {
            document.getElementById("movieResult").innerHTML =
                "<p>Unable to connect to OMDb API. Please check your network connection.</p>";
            console.error("API Error:", error);
        });
}

//Recommend suggestion
function getRecommendationByGenre(genreString) {
    if (!genreString || genreString === "N/A") {
        return "No specific recommendation available for this title.";
    }

    let genre = genreString.toUpperCase();

    //Recommendations
    if (genre.includes("HORROR") || genre.includes("THRILLER")) {
        return "Recommended for fans of spine-chilling suspense and thrillers!";
    } 
    else if (genre.includes("COMEDY")) {
        return "Recommended for viewers looking for lighthearted humor and entertainment.";
    } 
    else if (genre.includes("ANIMATION") || genre.includes("FAMILY")) {
        return "Recommended for family movie night and children viewing.";
    } 
    else if (genre.includes("DOCUMENTARY")) {
        return "Recommended for audience interested in real-world events and educational content.";
    } 
    else if (genre.includes("ACTION") || genre.includes("ADVENTURE")) {
        return "Recommended for adrenaline lovers seeking high-octane excitement!";
    } 
    else if (genre.includes("ROMANCE")) {
        return "Recommended for fans of heartwarming romantic stories.";
    } 
    else if (genre.includes("DRAMA")) {
        return "Recommended for viewers who enjoy deep storytelling and emotional narrative.";
    } 
    else {
        return "Recommended movie based on your general search interest.";
    }
}

// Suggest movie using dropdown
function suggestByCategory() {
    let selectedCategory = document.getElementById("genreSelect").value;
    let resultDiv = document.getElementById("movieResult");

    let genreSuggestions = {
        "Action": "Mission Impossible",
        "Comedy": "Grown ups",
        "Drama": "The Drama",
        "Horror": "The Conjuring",
        "Animation": "Spirited Away",
        "Documentary": "Our Planet",
        "Sci-Fi": "Avatar"
    };

    //If user dont choose from dropdown
    if (selectedCategory === "") { //error handling
        resultDiv.innerHTML = "<p>Please select a category to view a recommendation.</p>";
        return;
    }

    // Check if category exists
    let suggestedTitle = genreSuggestions[selectedCategory];

    if (suggestedTitle) {
        document.getElementById("searchData").value = suggestedTitle; //dom manipulation
        buttonClicked();
    } else { //if category does not exist
        resultDiv.innerHTML = `<p>No recommendation currently available for <strong>${selectedCategory}</strong>.</p>`;
    }
}

function goPayment() {
    location.href = "payment.html";
}

function addWatchlist() {
    if (!currentMovie) {
        alert("No movie selected!"); //error handling
        return;
    }

    let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
    
    // Avoid duplicate additions
    let exists = watchlist.some(movie => movie.title === currentMovie.title);
    if (exists) {
        alert("This movie is already in your watchlist!");
        return;
    }

    //add into watchlist
    watchlist.push(currentMovie);

    //local storage of waitlisted movies
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
    alert("Movie added to watchlist!");//error handling
}