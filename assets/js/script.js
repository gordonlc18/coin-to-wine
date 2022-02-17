$(function () {
  var searchHistory;
  var bitcoinPrice;

  //How it all got started
  $("#rando-btn").on("click", function () {
    var product = $("#searchForProductInput").val().trim();
    if (product) {
      getProducts(product);
      $("#searchForProductInput").val("");
    } else {
      showModalError("Please enter a product!");
    }
  });

  //Close the modal window
  $(".modal-close").on("click", function () {
    $(".modal").removeClass("is-active");
  });

  //Showing Modal instead of alert and dynamically populating error message
  function showModalError(msg) {
    $("#error-content p").text(msg);
    $("#modal-error").addClass("is-active");
  }

  //Function for converting us price to bitcoin
  function convertUSDTOBTC(price) {
    var newprice = price / bitcoinPrice;
    return newprice.toFixed(10);
  }

  // Fetching the products from walmarts API
  function getProducts(product) {
    showSpinner();
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
        emptyProductGallery();
        hideSpinner();
        searchHistory.unshift({ product });
        saveSearchHistory();
        emptySearchHistoryContainer();
        loadProductSearches();
        response.json().then(function (data) {
          var products =
            data.item.props.pageProps.initialData.searchResult.itemStacks[0];
          if (products.items.length > 0) {
            for (var i = 0; i < 8; i++) {
              var price = products.items[i].price;
              var item = products.items[i];
              if (price > 0) {
                displayProductCards(item);
              }
            }
          } else {
            searchHistory = arrayRemove(product);
            saveSearchHistory();
            emptySearchHistoryContainer();
            loadProductSearches();
            showModalError(`No Products found with the name ${product}`);
          }
        });
      } else {
        hideSpinner();
        showModalError(response.statusText);
      }
    });
  }

  //Fetching the price of bitcoin from coingecko
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

  function uniq(a) {
    let uniqMap = [];
    let uniqueHistory = [];
    a.forEach((c) => {
      if (!uniqueHistory.includes(c.product)) {
        uniqueHistory.push(c.product);
      }
    });
    uniqueHistory.forEach((product) => {
      uniqMap.unshift({ product });
    });
    return uniqMap;
  }

  // https://love2dev.com/blog/javascript-remove-from-array/
  function arrayRemove(value) {
    for (var i = 0; i < searchHistory.length; i++) {
      var product = searchHistory[i].product;
      if (value === product) {
        searchHistory.splice(i, 1);
      }
    }
    return searchHistory;
  }

  function saveSearchHistory() {
    searchHistory = uniq(searchHistory);
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

  // Create our number formatter.
  var formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  // We will call this function to empty product gallery when searching for new products
  function emptyProductGallery() {
    $(".product-cards-container").empty();
  }

  //displaying product cards in the product gallery section
  function displayProductCards(item) {
    var price = formatter.format(item.price);
    var image = item.image;
    var name = item.name;
    var BTC = convertUSDTOBTC(item.price);
    console.log("Name: " + name);
    console.log("Price: " + price);
    console.log("Image: " + image);
    console.log("BTC: " + BTC);
    console.log(item);

    var productCard = `
    <div class="column">
      <div class="card-item col-4 mb-2">
        <div class="card">
          <div class="card-image">
            <figure class="image is-4by3">
              <img src=${image} alt="Product Image">
            </figure>
          </div>
          <div class="card-content">
            <div class="content is-size-10 is-size-12-mobile">
              <p class="description">
                <b>Product Description:</b> 
                <span>
                  ${name}
                </span>
              </p>
              <p class="price">
                <b>USD Price:</b>
                <span>
                  ${price}
                </span>
              </p>
              <p class="btc">
                <b>BTC:</b>
                <span>
                  ${BTC}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>`;

    $(".product-cards-container").append(productCard);
  }

  //empty search history if no products are found
  function emptySearchHistoryContainer() {
    $("#list-SearchHistory").empty();
  }
  function displaySearchHistory(product) {
    // Append search history items to list here
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
      getProducts(product);
    }
  });

  // https://dev.to/wangonya/displaying-a-css-spinner-on-ajax-calls-with-fetch-api-4ndo
  function showSpinner() {
    $("#spinner").addClass("show");
  }

  function hideSpinner() {
    $("#spinner").removeClass("show");
  }

  // fetching the price of bitcoin and loading search history on page load
  loadProductSearches();
  getBitcoinPrice();
});
