
const settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://coingecko.p.rapidapi.com/simple/price?ids=bitcoin&vs_currencies=usd",
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "coingecko.p.rapidapi.com",
		"x-rapidapi-key": "b27e1aaebdmsh5e18b202a907fe1p1cc241jsn89e10075c08e"
	}
};

$.ajax(settings).done(function (response) {
	console.log(response);
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