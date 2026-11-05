window.onload = function(){

    let movie =
    JSON.parse(
        localStorage.getItem("selectedMovie")
    );

    document.getElementById("movieInfo").innerHTML =

    `
        <h3>${movie.title}</h3>

        <p>Price : RM10</p>
    `;
}

function makePayment(){

    let transactions =

    JSON.parse(
        localStorage.getItem("transactions")
    ) || [];

    let movie =

    JSON.parse(
        localStorage.getItem("selectedMovie")
    );

    let transaction = {

    movieTitle:movie.title,

    poster:movie.poster,

    customer:
    document.getElementById("customer").value,

    method:
    document.getElementById("paymentMethod").value,

    amount:10
};

    transactions.push(transaction);

    localStorage.setItem(

        "transactions",

        JSON.stringify(transactions)

    );

    alert("Payment Successful");

    location.href = "history.html";
}