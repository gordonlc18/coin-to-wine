$(function () {
  var searchHistory;
  var bitcoinPrice;

  $("#rando-btn").on("click", function () {
    var product = $("#searchForProductInput").val().trim();

    if (product) {
      // Need to fetch the product information from api
      // For now I will set price to something random but will need to get price from product info

      convertUSDTOBTC(8.32);
      // searchHistory.unshift({ product });
      $("#searchForProductInput").val("");
    } else {
      alert("Please enter a product");
    }

    // Will comment this out for now
    // saveSearchHistory();
    // displaySearchHistory(product);
  });

  function convertUSDTOBTC(price) {
    var newprice = price / bitcoinPrice;
    $("#bitcoin-Price").text("BTC " + newprice.toFixed(10));
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
      displaySearchHistory(product);
    });
  }

  function displaySearchHistory(product) {
    // Need to append search history items to list here
  }

  // This line here will dynamically display past search history but I will comment out for now
  //  loadProductSearches()
  getBitcoinPrice();
});

// Google shopping scraper only allows thirty requests per month for free!!!!
// const settings = {
// 	"async": true,
// 	"crossDomain": true,
// 	"url": "https://google-shopping-scraper.p.rapidapi.com/scrape",
// 	"method": "POST",
// 	"headers": {
// 		"content-type": "application/json",
// 		"x-rapidapi-host": "google-shopping-scraper.p.rapidapi.com",
// 		"x-rapidapi-key": "b27e1aaebdmsh5e18b202a907fe1p1cc241jsn89e10075c08e"
// 	},
// 	"processData": false,
// 	"data": {
// 		"query": "iphone case",
// 		"country": "us"
// 	}
// };

// $.ajax(settings).done(function (response) {
// 	console.log(response);
// });
