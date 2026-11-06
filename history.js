window.onload = function () {

    displayTransactions();

}

function displayTransactions() {
    let transactions =
    JSON.parse(
        localStorage.getItem("transactions")
    ) || [];
    let output = "";
    let revenue = 0;

    transactions.forEach(function(item,index){
        //calculate total revenue
        revenue += item.amount;
        output += `
        <tr>
            <td>${index + 1}</td>
            <td>${item.movieTitle}</td>
            <td>${item.customer}</td>
            <td>${item.method}</td>
            <td>${item.amount}</td>
        </tr>
        `;
    });

    document.getElementById(
        "transactionTable"
    ).innerHTML = output;

    document.getElementById(
        "totalMovies"
    ).innerHTML =

    "Movies Purchased : " +
    transactions.length;

    document.getElementById(
        "totalRevenue"
    ).innerHTML =

    "Total Revenue : RM" +
    revenue;
}