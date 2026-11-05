window.onload = function () {
    displayTransactions();
}

function displayTransactions() {

    let transactions =
        JSON.parse(localStorage.getItem("transactions")) || [];

    let output = "";
    let revenue = 0;

    transactions.forEach(function (item) {

        revenue += item.amount;

        output += `
            <p>
                Movie: ${item.movieTitle}
                <br>
                Customer: ${item.customer}
                <br>
                Payment: ${item.method}
                <br>
                Amount: RM${item.amount}
            </p>
            <hr>
        `;
    });

    document.getElementById("transactionList").innerHTML = output;

    document.getElementById("totalRevenue").innerHTML =
        "Total Revenue: RM" + revenue;
}