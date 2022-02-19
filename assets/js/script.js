$(function () {
  var searchHistory;
  var cryptoPrice;
  var selectedCrypto = "bitcoin";
  var cryptoLables = new Map([
    ["bitcoin", "BTC"],
    ["ethereum", "ETH"],
    ["binancecoin", "BNB"],
    ["cardano", "ADA"],
    ["solana", "SOL"],
  ]);
  var errorImgPath =
    "./assets/img/kissclipart-circle-clipart-parenting-logo-school-0c2059ca692ea80c.png";

  //How it all got started
  $("#rando-btn").on("click", function () {
    var product = $("#searchForProductInput").val().trim();
    if (product) {
      getProducts(product.toLowerCase());
      $("#searchForProductInput").val("");
    } else {
      showModalError("Please enter a product!");
    }
  });

  //Listener for drop down menu change
  $("select").change(function () {
    var oldVlaue = selectedCrypto;
    selectedCrypto = this.value;
    var msg = `Warning you just changed the cryocurrency to ${selectedCrypto} from ${oldVlaue}`;
    var warningPath = "./assets/img/warning.jpg";
    getCryptoPrice();
    switchLogo();
    showModalError(msg, "Warning", warningPath);
  });
  //Close the modal window
  $(".modal-card-head button").on("click", function () {
    $(".modal").removeClass("is-active");
  });
// HIDES PRODUCT GALLERY DIV UNTIL SEARCH BUTTON IS CLICKED-LG
  document.getElementById("rando-btn").addEventListener("click", (e) => {
    var x = document.getElementById("productCard");
    if (x.classList.contains("is-hidden")) {
      x.classList.remove("is-hidden");
    // } else {
    //   x.classList.add("is-hidden");
     }
  
  });
  //Showing Modal instead of alert and dynamically populating error message
  function showModalError(msg, title = "Error", srcPath = errorImgPath) {
    $(".modal-card-title").text(title);
    $("#error-content p").text(msg);
    $("#modal-error .image img").attr("src", srcPath);
    $("#modal-error").addClass("is-active");
  }

  //Function for converting us price to bitcoin
  function convertUSDTOBTC(price) {
    var newprice = price / cryptoPrice;
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
  function getCryptoPrice() {
    const settings = {
      async: true,
      crossDomain: true,
      method: "GET",
      headers: {
        "x-rapidapi-host": "coingecko.p.rapidapi.com",
        "x-rapidapi-key": "d8d2f7e79fmsh47084dabaa26026p1daedajsn3f84abdcfea8",
      },
    };

    var apiURL = `https://coingecko.p.rapidapi.com/simple/price?ids=${selectedCrypto}&vs_currencies=usd`;

    fetch(apiURL, settings)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        // console.log(data);
        cryptoPrice = data[selectedCrypto]["usd"];
        // console.log(cryptoPrice);
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

  //function to swtich the logo in the nav
  function switchLogo() {
    var bitcoin = "./assets/img/bitcoin-logo.png";
    var ethereum = "./assets/img/ethereum.jpg";
    var binance = "./assets/img/binance-coin-bnb-logo.png";
    var cardano = "./assets/img/cardano.jpg";
    var solana = "./assets/img/Solana-logo.png";

    $(".navbar img").removeClass();

    if (selectedCrypto === "ethereum") {
      $(".navbar img").addClass("mt-3 ethereum");
      $(".navbar img").attr("src", ethereum);
    } else if (selectedCrypto === "binancecoin") {
      $(".navbar img").addClass("mt-3 bnb");
      $(".navbar img").attr("src", binance);
    } else if (selectedCrypto === "cardano") {
      $(".navbar img").addClass("mt-1 cardano");
      $(".navbar img").attr("src", cardano);
    } else if (selectedCrypto === "solana") {
      $(".navbar img").addClass("mt-3 solana");
      $(".navbar img").attr("src", solana);
    } else {
      $(".navbar img").addClass("ml-2 mt-3 bitcoin");
      $(".navbar img").attr("src", bitcoin);
    }
  }

  //displaying product cards in the product gallery section
  function displayProductCards(item) {
    var price = formatter.format(item.price);
    var image = item.image;
    var name = item.name;
    var BTC = convertUSDTOBTC(item.price);
    var label = cryptoLables.get(selectedCrypto);
    // console.log("Name: " + name);
    // console.log("Price: " + price);
    // console.log("Image: " + image);
    // console.log("BTC: " + BTC);
    // console.log(item);

    var productCard = `
    <article class="card-item col-4 mb-2">
      <div class="card">
        <div class="card-image">
          <figure class="image is-4by3">
            <img src=${image} alt="Product Image">
          </figure>
        </div>
        <div class="card-content">
          <div class="content is-size-6 is-size-7-mobile">
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
              <b>${label}:</b>
              <span>
                ${BTC}
              </span>
            </p>
          </div>
        </div>
      </div>
    </article>`;

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
//  Added function inside this code to allow history list to populate not that product gallery div is hidden-LG
  $("#list-SearchHistory").on("click", "button", function () {
    // get button name value attribute
    var product = $(this).attr("name");
    var x = document.getElementById("productCard");
    if (x.classList.contains("is-hidden")) {
      x.classList.remove("is-hidden");
    // } else {
    //   x.classList.add("is-hidden");`
    }
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
  getCryptoPrice();
});
