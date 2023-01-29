let targetInputValue ;
$(document).ready(function() {

    document.getElementById("searchInput").addEventListener("keyup",(e)=> {
        $("#searchItemsContainer").html('');
         targetInputValue = e.target.value.toLowerCase();
        if(targetInputValue.length == 0){
            return;
        }
        forGame();
        forProducts();
    })
});
// window.addEventListener('load',()=>{
//     localStorageForGame();
// })
function forGame() {
    let a = '<a href="../html/shop.html">';
    let aEnd = '</a>';
    allForOne(gamesArray, a, aEnd, '');
        $(".searchProductsImage").click(function() {
           let gettingImage = $(this).attr('src');
           for(let i=0; i< gameDisplayArray.length; i++){
            if(gettingImage == gameDisplayArray[i].img){
                localStorage.setItem('img', gameDisplayArray[i].img);
                localStorage.setItem('img1', gameDisplayArray[i].img1);
                localStorage.setItem('img2', gameDisplayArray[i].img2);
                localStorage.setItem('img3', gameDisplayArray[i].img3);
                localStorage.setItem('name', gameDisplayArray[i].name);
                localStorage.setItem('price', gameDisplayArray[i].price);
                return;
            }
           }
        })
    
}
function forProducts() {
    let btnData = "data-bs-target='#exampleModalToggle' data-bs-toggle='modal'";
    allForOne(sellProductsArray, '', '',btnData);

    $(".searchProductsImage").click(function() {
        let gettingImage = $(this).attr('src');
        
    for(let i=0; i< sellProductsArray.length; i++){
        if(gettingImage == sellProductsArray[i].gameImage){
         
          $(".buyImg").attr("src",`${sellProductsArray[i].gameImage}`);
          $(".gameNaming").text(`${sellProductsArray[i].gameName}`);
          $(".payPrice").text(`${sellProductsArray[i].price}`);
          choosePaymentCard();
          confirmBuy();
          return;
        }
      }
    })
}
function allForOne(chooseOneArray,aLinkOne,aLinkTwo,btnData) {
 
    const filteringProducts = chooseOneArray.filter((product) => {
        return product.gameName.toLowerCase().includes(targetInputValue);
    })
    if(filteringProducts.length > 0){
        for(let i=0; i< filteringProducts.length; i++){
            $("#searchItemsContainer").append(
                `  <div class="m-auto searchProductGames">
                <div class="productGameGp d-flex justify-content-between py-2">
                  <div class="leftGp ms-4 d-flex">
                    <div class="searchProduct">
                 ${aLinkOne}
                      <img src="${filteringProducts[i].gameImage}" class="searchProductsImage" ${btnData} width="100%", height="100%" style="border-radius: 10px; object-fit: cover">
                ${aLinkTwo}
                    </div>
                    <div class="searchProductDetails mt-2 ms-3">
                      <h5>${filteringProducts[i].gameName} <span class="fs-6" style="opacity: 0.8;">  (${filteringProducts[i].price})</span> </h5>
                      <p>${filteringProducts[i].gameDetails}</p>
                    </div>
                  </div>
                  <div class="rightGp me-4">
                   <div>
                    <i class="fa-solid fa-trash mt-4 fs-4 deleteProduct"></i>
</div>  
                  </div>
                </div>
              </div>`
            )
        }

        $(".deleteProduct").click(function() {
            $(this).parent().parent().parent().parent().remove();
        })
    }
}
