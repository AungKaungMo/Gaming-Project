const testiArray = [
    {customerImage : "../img/cus1.jpg", customerName : "The Rock", CustomerLocation : "New York", rating : "4.5", message : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."},
    {customerImage : "../img/cus2.jpg", customerName : "Mira Jean", CustomerLocation : "Washinton, UK", rating : "5.5", message : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."},
    {customerImage : "../img/cus3.jpg", customerName : "Nijiro Murakami", CustomerLocation : "Japan, Tokyo", rating : "4.0", message : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."},
    {customerImage : "../img/cus4.jpg", customerName : "Miyoshi AA", CustomerLocation : "Japan, Tokyo", rating : "5.0", message : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."},
  ];
$(document).ready(function() {
    $("#slideBtn").click(function () {
        $(".resBar").addClass("resBarAdd");
      });
      $("#close").click(function () {
        $(".resBar").removeClass("resBarAdd");
      });
      
    preparingCustomerReviews();
})

window.addEventListener("load",()=> {

    let changeJsonCusArray = JSON.parse(localStorage.getItem('customersArray'));
    if(changeJsonCusArray == null){
      return;
    }
    for(let i=0; i< changeJsonCusArray.length; i++){
      reviewAllForOne(changeJsonCusArray,i);
     }
  })

function preparingCustomerReviews(){
    for(let i=0; i< testiArray.length; i++){
     reviewAllForOne(testiArray,i);
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
    )
  }
  