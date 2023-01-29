
$(document).ready(function() {
  addCusReviews();
})
function addCusReviews() {

  let result ;
  let uploadCusArray = [];
  let addArray = {};
    $("#upload").click(function() {
     $("#openFile").click();
    })
 
    document.getElementById("openFile").addEventListener("change",function() {
     const file = this.files[0];
 
       if(file){
         const reader = new FileReader();
         reader.onload = function() {
            result = reader.result;
           $("#uploadImage").attr('src',result);
         }
         reader.readAsDataURL(file);
       }
    })
 
    let cusDetailsArray = ['customerName','CustomerLocation','rating','message'];
    $("#uploadAll").click(function() {
 
      if($(`#${cusDetailsArray[0]}`).val() == ''|| $(`#${cusDetailsArray[1]}`).val() == '' || $(`#${cusDetailsArray[2]}`).val() == '' || $(`#${cusDetailsArray[3]}`).val() == '' ||  $("#openFile")[0].files.length == 0){
        alert("you need to fill the information first");
        return;
      }
      addArray.customerImage = result;
      
 
        for(let i=0; i< cusDetailsArray.length; i++){
         //  localStorage.setItem(cusDetailsArray[i],$(`#${cusDetailsArray[i]}`).val());
         addArray[cusDetailsArray[i]] = $(`#${cusDetailsArray[i]}`).val();
          $(`#${cusDetailsArray[i]}`).val('') ;
        }
 
        uploadCusArray.push(addArray);
       let jsonCustomerArray = JSON.stringify(uploadCusArray);
       localStorage.setItem('customersArray', jsonCustomerArray);
 result = '';
        $("#uploadImage").attr('src','../img/cus2.jpg');
       reviewAllForOne(uploadCusArray, uploadCusArray.length - 1);
    })
    
 }