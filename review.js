let reviews =
JSON.parse(
    localStorage.getItem("reviews")
) || [];

let editIndex = -1;

function saveReview(){

    let title =
    document.getElementById("movieTitle").value;

    let rating =
    document.getElementById("rating").value;

    let review =
    document.getElementById("reviewText").value;

    if(title == "" || review == ""){

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

function displayReviews(){

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

    document.getElementById("movieTitle").value =
    item.title;

    document.getElementById("rating").value =
    item.rating;

    document.getElementById("reviewText").value =
    item.review;

    editIndex = index;
}

function deleteReview(index){

    reviews.splice(index,1);

    localStorage.setItem(

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