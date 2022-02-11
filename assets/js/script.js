$(function () {
  $("#rando-btn").on("click", function () {
    getBitcoinPrice();
  });

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
        console.log(data.bitcoin.usd);
        $("#bitcoin-Price").text(data.bitcoin.usd);
      });
  }
});

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
