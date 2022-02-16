$(function () {
  var searchHistory;
  var bitcoinPrice;

  $("#rando-btn").on("click", function () {
    var product = $("#searchForProductInput").val().trim();
    if (product) {
      getProducts(product);
      $("#searchForProductInput").val("");
    } else {
      showModalError("Please enter a product!");
    }
  });

  $(".modal-close").on("click", function () {
    $(".modal").removeClass("is-active");
  });

  function showModalError(msg) {
    $("#error-content p").text(msg);
    $("#modal-error").addClass("is-active");
  }

  function convertUSDTOBTC(price) {
    var newprice = price / bitcoinPrice;
    return newprice.toFixed(10);
  }

  function getProducts(product, newSearch = true) {
    const settings = {
      async: true,
      crossDomain: true,
      method: "GET",
      headers: {
        "x-rapidapi-host": "axesso-walmart-data-service.p.rapidapi.com",
        "x-rapidapi-key": "d8d2f7e79fmsh47084dabaa26026p1daedajsn3f84abdcfea8",
      },
    };

    var apiURL = `https://axesso-walmart-data-service.p.rapidapi.com/wlm/walmart-search-by-keyword?keyword=${product}&page=1&type=text&sortBy=best_match`;

    fetch(apiURL, settings).then(function (response) {
      if (response.ok) {
        if (newSearch) {
          searchHistory.unshift({ product });
          displaySearchHistory(product);
          saveSearchHistory();
        }
        response.json().then(function (data) {
          var products =
            data.item.props.pageProps.initialData.searchResult.itemStacks[0];
          for (var i = 0; i < 8; i++) {
            var price = products.items[i].price;
            var item = products.items[i];
            if (price > 0) {
              displayProductCards(item);
            }
          }
        });
      } else {
        showModalError(response.statusText);
      }
    });
  }

  function getBitcoinPrice() {
    const settings = {
      async: true,
      crossDomain: true,
      method: "GET",
      headers: {
        "x-rapidapi-host": "coingecko.p.rapidapi.com",
        "x-rapidapi-key": "4652da77a0msh7a2f0759d2e237dp1cf962jsn08149038d679",
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

  function displayProductCards(item) {
    var price = item.price;
    var image = item.image;
    var name = item.name;
    var BTC = convertUSDTOBTC(price);
    console.log("Name: " + name);
    console.log("Price: " + price);
    console.log("Image: " + image);
    console.log("BTC: " + BTC);
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
    // get button name value attribute
    var product = $(this).attr("name");
    if (product) {
      getProducts(product, false);
    }
  });

  loadProductSearches();
  getBitcoinPrice();
});
