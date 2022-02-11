$(function () {
  var searchHistory;

  $("#rando-btn").on("click", function () {
    var product = $("#searchForProductInput").val().trim();

    if (product) {
      // Need to fetch the product information from api
      // For now I will set price to ten thow wow but will need to get price from product info
      getBitcoinPrice(10000);

      // Will need this line later
      // searchHistory.unshift({ product });
      $("#searchForProductInput").val("");
    } else {
      alert("Please enter a product");
    }

    // Will comment this out for now
    // saveSearchHistory();
    // displaySearchHistory(product);
  });

  var formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  function getBitcoinPrice(price) {
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
        var bitcoinPrice = data.bitcoin.usd;
        console.log(formatter.format(price / bitcoinPrice));
        $("#bitcoin-Price").text(formatter.format(price / bitcoinPrice));
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
