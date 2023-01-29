let localArrayForFav = [];
let localObjForFav = {};
let localArrayForBought = [];
let localObjForBought = {};
$(document).ready(function() {
    $('.addingFavList').click(function() {
        addingDivToContainer("listBox",localObjForFav, localArrayForFav);
         localStorage.setItem('localArrayForFav', JSON.stringify(localArrayForFav));
         deleteGameOrProduct(localArrayForFav, "localArrayForFav");
    })
    $('.addingProductList').click(function() {
        addingDivToContainer("listBox2",localObjForBought, localArrayForBought);
        localStorage.setItem('localArrayForBought', JSON.stringify(localArrayForBought));
        deleteGameOrProduct(localArrayForBought, "localArrayForBought");
    })
    deleteGameOrProduct(localArrayForFav, "localArrayForFav");
    deleteGameOrProduct(localArrayForBought, "localArrayForBought");

})
function addingDivToContainer(appendListBox, addObj, arr) {
    addObj.localName = localStorage.getItem('name');

    const PreventingForNextClick =  arr.find(element => {
        //if name is the same it is the already in favourite
        if (element.localName == addObj.localName) {
          return true;
        }
      });
      if(PreventingForNextClick){
        return;
      }
      addObj.add = true;
      addObj.localId = arr.length;
      addObj.localImage = localStorage.getItem('img');
      addObj.localPrice = localStorage.getItem('price');
      
    addingList(appendListBox, localStorage.getItem('img'), localStorage.getItem('name'), localStorage.getItem('price'), arr.length);

    arr.push(addObj);
    console.log(addObj)
    console.log(arr);
}
function deleteGameOrProduct(arr, arrayName) {
    $('.bin').click(function() {
        console.log("click")
        let clickTargetId = $(this).parent().parent().parent().attr('id');
       
         for(let i = 0; i < arr.length; i++){
     if(clickTargetId == arr[i].localId){
        
        arr.splice(i, 1);
     }
     }
     $(this).parent().parent().parent().remove();
     localStorage.setItem(`${arrayName}`, JSON.stringify(arr));
    });
}

window.addEventListener('load',() =>{
   loadingPrepare("listBox", "localArrayForFav", localArrayForFav);
   loadingPrepare("listBox2", "localArrayForBought", localArrayForBought);
})
function loadingPrepare(appendListBox, arrayName, arr){
    let localArrayParse = JSON.parse(localStorage.getItem(`${arrayName}`))
    if(localArrayParse == null){
        return;
    }
    arr = localArrayParse;
        for(let i = 0; i < localArrayParse.length; i++){
            addingList(appendListBox, localArrayParse[i].localImage, localArrayParse[i].localName, localArrayParse[i].localPrice, localArrayParse[i].localId);
        }
}
function addingList(appendBox, img, nam, pri, count){
    $(`.${appendBox}`).append(
        `<div class="favBox mt-3 text-light" id="${count}">
        <div class="favBoxContainer d-flex">
          <div class="image ms-2 ">
            <img src="${img}" width="100%" height="100%">
          </div>
          <div class="textContainer ms-3">
            <h5>${nam}</h5>
            <p class="m-0">One of the best ranking game in 1023.</p>
            <p class="fw-bold mt-1">${pri}</p>
          </div>
          <div class="trashIcon ms-4 mt-4">
            <i class="fa-solid fa-trash bin"></i>
          </div>
        </div>
        <div class="endShadow"></div>
      </div>`
    )
}