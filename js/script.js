let gamesArray, gameDisplayArray, sellProductsArray;
const testiArray = [
  {
    customerImage: "../img/cus1.jpg",
    customerName: "The Rock",
    CustomerLocation: "New York",
    rating: "4.5",
    message:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
  },
  {
    customerImage: "../img/cus2.jpg",
    customerName: "Mira Jean",
    CustomerLocation: "Washinton, UK",
    rating: "5.5",
    message:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
  },
  {
    customerImage: "../img/cus3.jpg",
    customerName: "Nijiro Murakami",
    CustomerLocation: "Japan, Tokyo",
    rating: "4.0",
    message:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
  },
  {
    customerImage: "../img/cus4.jpg",
    customerName: "Miyoshi AA",
    CustomerLocation: "Japan, Tokyo",
    rating: "5.0",
    message:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
  },
];
$(document).ready(function () {
  fetch("http://localhost:3001/gameDetails")
    .then((res) => res.json())
    .then((data) => {
      gamesArray = data;
      let atext = "<a href='../html/shop.html'>";
      let aclose = "</a>";
      addingGameProducts(gamesArray, "gridContainer", atext, aclose, "");
      filterItems("gridContainer", "gameTypeBtn");
    });

  fetch("http://localhost:3001/gameBuyDetails")
    .then((res) => res.json())
    .then((data) => {
      gameDisplayArray = data;
      getUserClickGame();
    });

  fetch("http://localhost:3001/productDetails")
    .then((res) => res.json())
    .then((data) => {
      sellProductsArray = data;
      let d = "data-bs-target='#exampleModalToggle' data-bs-toggle='modal'";
      addingGameProducts(sellProductsArray, "gridProductContainer", "", "", d);
      filterItems("gridProductContainer", "productTypeBtn");
      getUserClickGame();
    });

  $("#slideBtn").click(function () {
    $(".resBar").addClass("resBarAdd");
  });
  $("#close").click(function () {
    $(".resBar").removeClass("resBarAdd");
  });

  let concatClassName, concatClassVideo;
  let vidArr = ["firstVd", "secondVd", "thirdVd"];
  $(".vdPlayBtn").click(function (e) {
    for (let i = 0; i < vidArr.length; i++) {
      $($(`.${vidArr[i]}`))[0].pause();
      document
        .getElementsByClassName("videoContainer")
        [i].classList.remove("videoContainerOpen");
    }

    concatClassName = e.target.id + "VideoContainer";
    concatClassVideo = e.target.id + "Vd";
    $(`.${concatClassName}`).addClass("videoContainerOpen");
    $(`.${concatClassVideo}`)[0].play();
  });
  $(".videoClose").click(function () {
    $(`.${concatClassName}`).removeClass("videoContainerOpen");
    $(`.${concatClassVideo}`)[0].pause();
  });

  filterItems("miniNews", "buttonGp");
  slide();
  preparingCustomerReviews();

  choosePaymentCard();
  confirmBuy();
});

function slide() {
  let count = 0;
  const slideChooseImg = document.getElementsByClassName("slideChooseImg");
  $("#slideNext").click(function () {
    slideChooseImg[count].classList.remove("imgActive");
    slideChooseImg[++count].classList.add("imgActive");
  });
  $("#slidePrev").click(function () {
    slideChooseImg[count].classList.remove("imgActive");
    slideChooseImg[--count].classList.add("imgActive");
  });
}
function choosePaymentCard() {
  const card = document.getElementsByClassName("card");
  for (let i = 0; i < card.length; i++) {
    card[i].addEventListener("click", () => {
      for (let j = 0; j < card.length; j++) {
        card[j].classList.remove("cardActive");
      }
      card[i].classList.add("cardActive");
    });
  }
}
function confirmBuy() {
  $(".buyBtnModal button").click(function () {
    if ($(".left input").val() == "" || $(".right input").val() == "") {
      alert("you need to fll the all information first");
      // return;
    } else {
      $(".buyBtnModal button").attr("data-bs-toggle", "modal");
    }
  });
}
function localStorageForGame() {
  $(".buyImg").attr("src", `${localStorage.getItem("img")}`);
  $("#slideImage1").attr("src", `${localStorage.getItem("img1")}`);
  $("#slideImage2").attr("src", `${localStorage.getItem("img2")}`);
  $("#slideImage3").attr("src", `${localStorage.getItem("img3")}`);
  $("#slideChooseImg1").attr("src", `${localStorage.getItem("img1")}`);
  $("#slideChooseImg2").attr("src", `${localStorage.getItem("img2")}`);
  $("#slideChooseImg3").attr("src", `${localStorage.getItem("img3")}`);
  $(".gameNaming").text(`${localStorage.getItem("name")}`);
  $(".payPrice").text(`${localStorage.getItem("price")}`);
}

function filterItems(con, typeBtn) {
  var $grid = $(`.${con}`).isotope({
    // options
  });
  // filter items on button click
  $(`.${typeBtn}`).on("click", "button", function () {
    var filterValue = $(this).attr("data-filter");
    reset();
    $(this).addClass("currentBtn");
    $grid.isotope({ filter: filterValue });
  });

  var filterBtn = $(`.${typeBtn}`).find("button");

  function reset() {
    filterBtn.each(function () {
      $(this).removeClass("currentBtn");
    });
  }
}

function addingGameProducts(arr, container, aOne, aTwo, data) {
  for (let i = 0; i < arr.length; i++) {
    $(`.${container}`).append(
      ` <div class="gameContainerBox ${arr[i].gameType}">
           <div class="gameImage">
               <img src="${arr[i].gameImage}">
           </div>
           <div class="gameTitle mt-3 mb-4">
               <div class="h4 mb-0">${arr[i].gameName}</div>
               <i class="fa-solid fa-fire"></i>
               <span>${arr[i].popular}</span>
           </div>
           <div class="p gameDetails">
               ${arr[i].gameDetails}
           </div>
           <div class="priceAndBuy mt-3">
               <div class="p fw-bold">${arr[i].price}</div>
               <div class="cart">
               ${aOne}
                   <i class="fa-solid fa-cart-shopping buyGame" ${data} buy-game-data="${arr[i].gameName}"></i>
                  ${aTwo}
               </div>
           </div>`
    );
  }
}

function getUserClickGame() {
  const buyGame = $(".buyGame");
  buyGame.click(function () {
    let dataGameName = $(this).attr("buy-game-data");

    for (let i = 0; i < gameDisplayArray.length; i++) {
      if (dataGameName == gameDisplayArray[i].name) {
        localStorage.setItem("img", gameDisplayArray[i].img);
        localStorage.setItem("img1", gameDisplayArray[i].img1);
        localStorage.setItem("img2", gameDisplayArray[i].img2);
        localStorage.setItem("img3", gameDisplayArray[i].img3);
        localStorage.setItem("name", gameDisplayArray[i].name);
        localStorage.setItem("price", gameDisplayArray[i].price);
        return;
      }
    }

    for (let i = 0; i < sellProductsArray.length; i++) {
      if (dataGameName == sellProductsArray[i].gameName) {
        $(".buyImg").attr("src", `${sellProductsArray[i].gameImage}`);
        $(".gameNaming").text(`${sellProductsArray[i].gameName}`);
        $(".payPrice").text(`${sellProductsArray[i].price}`);

        return;
      }
    }
  });
}

window.addEventListener("load", () => {
  localStorageForGame();
  let changeJsonCusArray = JSON.parse(localStorage.getItem("customersArray"));
  if (changeJsonCusArray == null) {
    return;
  }
  for (let i = 0; i < changeJsonCusArray.length; i++) {
    reviewAllForOne(changeJsonCusArray, i);
  }
});

function preparingCustomerReviews() {
  for (let i = 0; i < testiArray.length; i++) {
    reviewAllForOne(testiArray, i);
  }
}

function reviewAllForOne(array, index) {
  $("#customerTesti").append(
    `<div class="customerContainer swiper-slide">
      <div class="topHeaderCusDetails ">
          <div class="imgCus mt-3">
          <div class=customerImageContainer>
              <img src="${array[index].customerImage}">
              </div>
              <div class="nameAndLocation">
              <span>${array[index].customerName}</span><br>
              <span class="location">${array[index].CustomerLocation}</span>
          </div>
          </div>
          <div class="rate mt-4">
              <span>${array[index].rating}</span>
              <i class="fa-solid fa-star text-light"></i>
          </div>
      </div>
  
      <div class="reviewDetails mb-4">
          <div class="p mt-4">
             ${array[index].message}
          </div>
      </div>
  </div>`
  );
}
