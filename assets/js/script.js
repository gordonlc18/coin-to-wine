$(function () {
  var searchHistory;
  var bitcoinPrice;

  $("#rando-btn").on("click", function () {
    var product = $("#searchForProductInput").val().trim();

    if (product) {
      // Need to fetch the product information from api
      // For now I will set price to something random but will need to get price from product info

      convertUSDTOBTC(8.32);
      searchHistory.unshift({ product });
      displaySearchHistory(product);
      $("#searchForProductInput").val("");
    } else {
      alert("Please enter a product");
    }

    saveSearchHistory();
  });

  function convertUSDTOBTC(price) {
    var newprice = price / bitcoinPrice;
    $("#bitcoin-Price").text("BTC " + newprice.toFixed(10));
  }

  function getProducts(product) {
    const settings = {
      async: true,
      crossDomain: true,
      method: "GET",
      headers: {
        "x-rapidapi-host": "",
        "x-rapidapi-key": "",
      },
    };

    var apiURL = "${product}";

    fetch(apiURL, settings)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
      });
  }

  function getBitcoinPrice() {
    const settings = {
      async: true,
      crossDomain: true,
      method: "GET",
      headers: {
        "x-rapidapi-host": "coingecko.p.rapidapi.com",
        "x-rapidapi-key": "b27e1aaebdmsh5e18b202a907fe1p1cc241jsn89e10075c08e",
      },
    };

    var apiURL =
      "https://coingecko.p.rapidapi.com/simple/price?ids=bitcoin&vs_currencies=usd";

    fetch(apiURL, settings)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        bitcoinPrice = data.bitcoin.usd;
        console.log(bitcoinPrice);
      });
  }

  function saveSearchHistory() {
    localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
  }

  function loadProductSearches() {
    searchHistory = JSON.parse(localStorage.getItem("searchHistory"));

    // if nothing in localStorage, create a new object
    if (!searchHistory) {
      searchHistory = [];
    }

    // loop over object properties
    $.each(searchHistory, function (index, product) {
      displaySearchHistory(product.product);
    });
  }

  function displaySearchHistory(product) {
    // Need to append search history items to list here
    var listItem = $("<li>").addClass("searches mb-3");
    var div = $("<div>").addClass("");
    var button = $("<button>")
      .addClass(" button is-responsive is-link has-text-weight-bold")
      .attr("type", "button")
      .attr("name", product)
      .text(product);

    div.append(button);
    listItem.append(div);

    $("#list-SearchHistory").prepend(listItem);
  }

  // When the user clicks on a button in search history list fetch products from past search history(Make another api call)
  $("#list-SearchHistory").on("click", "button", function () {
    /*add code here!!!!!! */
  });

  loadProductSearches();
  getBitcoinPrice();
});
