let reviews =
JSON.parse(
    localStorage.getItem("reviews")
) || []; //retrieve existing reviews

let editIndex = -1;

function saveReview(){ //create and update

    let title =
    document.getElementById("movieTitle").value; 

    let rating =
    document.getElementById("rating").value;

    let review =
    document.getElementById("reviewText").value;

    if(title == "" || review == ""){ //prevent empty submissions

        alert("Please fill all fields");

        return;
    }

    let reviewData = {

        title:title,

        rating:rating,

        review:review

    };

    if(editIndex == -1){
        //create new review
        reviews.push(reviewData);

    }
    else{
        //replace old review
        reviews[editIndex] = reviewData;

        editIndex = -1;
    }

    //local storage for every review added
    localStorage.setItem(
        "reviews",
        JSON.stringify(reviews)

    );

    displayReviews();

    clearForm();
}

function displayReviews(){//read

    let output = "";

    reviews.forEach(function(item,index){

        output += `

        <div class="review-card">

            <h3>${item.title}</h3>

            <p>Rating:${item.rating} ⭐</p>

            <p>${item.review}</p>

            <button onclick="editReview(${index})">
                Edit
            </button>

            <button onclick="deleteReview(${index})">
                Delete
            </button>

        </div>

        <hr>

        `;
    });

    document.getElementById(
        "reviewContainer"
    ).innerHTML = output;
}

function editReview(index){

    let item = reviews[index];
    //update title
    document.getElementById("movieTitle").value =
    item.title;
    //update rating
    document.getElementById("rating").value =
    item.rating;
    //update review
    document.getElementById("reviewText").value =
    item.review;

    editIndex = index;
}

function deleteReview(index){//delete

    reviews.splice(index,1);

    localStorage.setItem(//update local storage

        "reviews",

        JSON.stringify(reviews)

    );

    displayReviews();
}

function clearForm(){

    document.getElementById(
        "movieTitle"
    ).value = "";

    document.getElementById(
        "rating"
    ).value = "1";

    document.getElementById(
        "reviewText"
    ).value = "";
}

window.onload =
displayReviews;