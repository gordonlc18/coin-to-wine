
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

//Commented  out this api pull to so that i can refresh other edits without wasting pulls

//const setting = {
// 	"async": true,
// 	"crossDomain": true,
// 	// "url": "https://axesso-walmart-data-service.p.rapidapi.com/wlm/walmart-search-by-keyword?keyword=Lego%20Star%20Wars&page=1&type=text&sortBy=best_match",
//     "method": "GET",
// 	"headers": {
// 		"x-rapidapi-host": "axesso-walmart-data-service.p.rapidapi.com",
// 		"x-rapidapi-key": "b27e1aaebdmsh5e18b202a907fe1p1cc241jsn89e10075c08e"
// 	}
// };

var walmart_product = "soap";



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