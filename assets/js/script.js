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



const setting = {
	"async": true,
	"crossDomain": true,
	// "url": "https://axesso-walmart-data-service.p.rapidapi.com/wlm/walmart-search-by-keyword?keyword=Lego%20Star%20Wars&page=1&type=text&sortBy=best_match",
    "method": "GET",
	"headers": {
		"x-rapidapi-host": "axesso-walmart-data-service.p.rapidapi.com",
		"x-rapidapi-key": "b27e1aaebdmsh5e18b202a907fe1p1cc241jsn89e10075c08e"
	}
};

var inputText=document.getElementById("searchForProductInput").value;
console.log(inputText);

var walmart_product = inputText;




// var apiUrl = "https://axesso-walmart-data-service.p.rapidapi.com/wlm/walmart-search-by-keyword?keyword=" + walmart_product + "&page=1&type=text&sortBy=best_match";
// fetch(apiUrl, setting)
//     .then(function(response) {
//         if (response.ok) {
//             response.json().then(function(data) {
//                 var test = data.item.props.pageProps.initialData.searchResult.itemStacks[0];
//                 for (var i = 0; i < test.items.length; i++) {
//                     var test2 = test.items[i].price;
//                     var test3 = test.items[i].name;
//                     console.log("price: " + test2 + ", name: " + test3);
//                 }
//                 console.log(data.item.props.pageProps.initialData.searchResult.itemStacks[0]);    
//             });
//         } else {
//             alert("Error: " + response.statusText)
//         }
//     })
//     .catch(function(error) {
//         alert("Unable to connect to Google Auth");
//     });
                

// $.ajax(setting).done(function (response) {
// 	console.log(response);
// });
