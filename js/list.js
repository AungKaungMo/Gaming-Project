let localArrayForFav = [];
let localObjForFav = {};

let localArrayForBought = [];
let localObjForBought = {};

$(document).ready(function () {
  $(".addingFavList").click(function () {
    storage(localArrayForFav, localObjForFav, "listBox", "favListCount");
    localStorage.setItem("favarray", JSON.stringify(localArrayForFav));
    deleteItems(localArrayForFav, "favarray", "favListCount");
  });
  //function htl yw apyin mr yw deleteItems() ko khw htr tae atwat 2 khr aloke loke ml
  //dr so array ka 2 khan pyt twr late ml
  deleteItems(localArrayForFav, "favarray", "favListCount");

  $(".addingBoughtList").click(function () {
    storage(
      localArrayForBought,
      localObjForBought,
      "boughtBox",
      "shopListCount"
    );
    localStorage.setItem("boughtArray", JSON.stringify(localArrayForBought));
    deleteItems(localArrayForBought, "boughtArray", "shopListCount");
  });
  deleteItems(localArrayForBought, "boughtArray", "shopListCount");
});

window.addEventListener("load", () => {
  //loading localfavarray
  let parseArray = JSON.parse(localStorage.getItem("favarray"));
  if (parseArray == null) {
    return;
  }
  localArrayForFav = parseArray;
  for (let i = 0; i < localArrayForFav.length; i++) {
    addList(
      "listBox",
      localArrayForFav[i].localId,
      localArrayForFav[i].localImage,
      localArrayForFav[i].localName,
      localArrayForFav[i].localPrice
    );
  }
  $(".favListCount").text(localArrayForFav.length);

  // loading localBoughtArray
  let parseArray2 = JSON.parse(localStorage.getItem("boughtArray"));
  if (parseArray2 == null) {
    return;
  }
  localArrayForBought = parseArray2;
  for (let i = 0; i < localArrayForBought.length; i++) {
    addList(
      "boughtBox",
      localArrayForBought[i].localId,
      localArrayForBought[i].localImage,
      localArrayForBought[i].localName,
      localArrayForBought[i].localPrice
    );
  }
  $(".shopListCount").text(localArrayForBought.length);
});

function storage(array, arrayObject, appendingListBox, count) {
  //Preventing for next click
  if (array.length > 0) {
    for (let i = 0; i < array.length; i++) {
      if (array[i].localName == localStorage.getItem("name")) {
        return;
      }
    }
  }

  arrayObject.localName = localStorage.getItem("name");
  arrayObject.localImage = localStorage.getItem("img");
  arrayObject.localPrice = localStorage.getItem("price");
  arrayObject.localId = array.length + 1;
  array.push(arrayObject);
  $(`.${count}`).text(array.length);
  addList(
    appendingListBox,
    array.length,
    localStorage.getItem("img"),
    localStorage.getItem("name"),
    localStorage.getItem("price")
  );
}

function deleteItems(arrayName, localStorageArrayName, count) {
  $(".bin").click(function () {
    let clickTargetId = $(this).parent().parent().parent().attr("id");
    for (let i = 0; i < arrayName.length; i++) {
      if (clickTargetId == arrayName[i].localId) {
        arrayName.splice(i, 1);
        $(this).parent().parent().parent().remove();
        localStorage.setItem(
          `${localStorageArrayName}`,
          JSON.stringify(arrayName)
        );
        $(`.${count}`).text(arrayName.length);
      }
    }
  });
}
function addList(appendingListBox, length, image, name, price) {
  $(`.${appendingListBox}`).append(
    `<div class="favBox mt-3 text-light" id="${length}">
        <div class="favBoxContainer d-flex">
          <div class="image ms-2 ">
            <img src="${image}" width="100%" height="100%" style= "object-fit: cover;">
          </div>
          <div class="textContainer ms-3">
            <h5>${name}</h5>
            <p class="m-0">One of the best ranking game in 1023.</p>
            <p class="fw-bold mt-1">${price}</p>
          </div>
          <div class="trashIcon ms-4 mt-4">
            <i class="fa-solid fa-trash bin"></i>
          </div>
        </div>
        <div class="endShadow"></div>
      </div>`
  );
}
