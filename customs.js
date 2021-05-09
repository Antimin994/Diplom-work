//sort block

  const todoList = document.querySelector('.todo-list');
  const lowerPrice = document.querySelector('#lower');
  const higherPrice = document.querySelector('#higher');
  const typeBox = document.querySelectorAll('.typeBox');
  const purposeBox = document.querySelectorAll('.purposeBox');
  const sizeBox = document.querySelectorAll('.sizeBox');
  //const searchInput = document.querySelector('.searchInput');
  const mwBox = document.querySelectorAll('.mwBox');
  const fRange = document.querySelector('#fRange');
  const sRange = document.querySelector('#sRange');

lowerPrice.addEventListener('change', filterResponse);
higherPrice.addEventListener('change', filterResponse);
for (var i = 0; i < typeBox.length; i++) {typeBox[i].addEventListener('change', filterResponse);}
for (var i = 0; i < purposeBox.length; i++) {purposeBox[i].addEventListener('change', filterResponse);}
for (var i = 0; i < sizeBox.length; i++) {sizeBox[i].addEventListener('change', filterResponse);}
for (var i = 0; i < mwBox.length; i++) {mwBox[i].addEventListener('change', filterResponse);}


function filterResponse() {

  let searchObject = {};

  let priceArr = [];
  let minPrice = Number(lowerPrice.value);
  let maxPrice = Number(higherPrice.value);
  fRange.textContent = minPrice;
  sRange.textContent = maxPrice;
  priceArr.push([minPrice, maxPrice]);


  let typeArr = [];
  typeBox[0].checked === true ? typeArr.push('backpack') : typeArr;
  typeBox[1].checked === true ? typeArr.push('bag') : typeArr;
  typeBox[2].checked === true ? typeArr.push('wallet') : typeArr;
  typeBox[3].checked === true ? typeArr.push('acessory') : typeArr;

  let purposeArr = [];
  purposeBox[0].checked === true ? purposeArr.push('city') : purposeArr;
  purposeBox[1].checked === true ? purposeArr.push('sport') : purposeArr;
  purposeBox[2].checked === true ? purposeArr.push('tourism') : purposeArr;
  purposeBox[3].checked === true ? purposeArr.push('school') : purposeArr;

  let sizeArr = [];
  sizeBox[0].checked === true ? sizeArr.push([0, 20]) : sizeArr;
  sizeBox[1].checked === true ? sizeArr.push([20, 50]) : sizeArr;
  sizeBox[2].checked === true ? sizeArr.push([50, 80]) : sizeArr;
  sizeBox[3].checked === true ? sizeArr.push([80, 150]) : sizeArr;

  let mwArr = [];
  mwBox[0].checked === true ? mwArr.push('man') : mwArr;
  mwBox[1].checked === true ? mwArr.push('woman') : mwArr;
  mwBox[2].checked === true ? mwArr.push('unisex') : mwArr;
  mwBox[3].checked === true ? mwArr.push('child') : mwArr;

 searchObject = {"price" : priceArr, "capacity" : sizeArr, "type" : typeArr, "purpose" : purposeArr, "sex" : mwArr};

  /* if (typeBox[0].checked === true) typeArr.push('backpack');
   if (typeBox[1].checked === true) typeArr.push('bag');
   if (typeBox[2].checked === true) typeArr.push('wallet');
   if (typeBox[3].checked === true) typeArr.push('acessory');*/



  console.log(priceArr);
  console.log(typeArr);
  console.log(purposeArr);
  console.log(sizeArr);
  console.log(mwArr);
  console.log(searchObject);




  //request block

  var answerData;

   async function readJson() {
    try {
     let response = await fetch('./goods.json');
     let items = await response.json();
     answerData = items;
     return items;
    } catch(err) {
     alert(err);
  }

   }

     const show = async () => {
         await readJson();
         console.log(answerData);


         var keys = Object.keys(searchObject);

        var filteredData = answerData.filter(function(item) {
          console.log(item);
          console.log(keys);
          for (var i = 0; i < keys.length; i++) {
              var key = keys[i];
              var flag = false;

              for (var j = 0; j < searchObject[key].length; j++) {
              if ((searchObject[key][j].length === 2) && (Number.isInteger(searchObject[key][j][0]) === true) && (Number.isInteger(searchObject[key][j][1]) === true) && (item[key] <= searchObject[key][j][1]) && (item[key] >= searchObject[key][j][0])) {
                flag = true;
                break;
              }
              flag = item[key] === searchObject[key][j];
              if (flag === true) break;
              }

              console.log(flag);

              if (flag === false) {
                  break;
              }

          }
          return flag;
         });

         console.log(filteredData);


     }
     show();

}










  /*renderList(data);

  function renderList (list) {
   list.forEach((item, indx) => {
   console.log(item);
   let todoItem = `
   <div class='todo-item todo-item-${item.id}'>
     <div class="completed completed-${item.completed}">
       <h3 class="todo-item-title" data-userId='${item.userId}'>${indx+1} ${item.title}</h3>
     </div>
   </div>`;

   todoList.innerHTML += todoItem
 })
 }

  var newArr = data;




   /*function filterField() {

   newArr = data;

   let completed = isCompleted.checked;
   filtersToParams(completed, 'checkbox');
   console.log('completed -->  ', completed);
   console.log(newArr)

   let completed = isCompleted.checked;
   filtersToParams(completed, 'checkbox');
   console.log('completed -->  ', completed);
   console.log(newArr)

   let searchText = searchInput.value;
   filtersToParams(searchText, 'search');
   console.log('SearchInput -->  ', searchText);

   let selectNumber = selectField.value;
   console.log('SearchField -->  ', selectField.value);
   filtersToParams(selectNumber, 'select');

   let selectNumber = selectField.value;
   console.log('SearchField -->  ', selectField.value);
   filtersToParams(selectNumber, 'select');


   isCompleted.checked == true ? checkHash = `isCompleted=${isCompleted.checked}&` : checkHash = '';
   selectField.value == '1' ? sortHash = '&sort=acs' : sortHash = '&sort=sca';

   history.pushState({}, '', '?' + checkHash + 'search=' + searchInput.value + sortHash);
}


 isCompleted.addEventListener('click', (event) => {
     let completed = isCompleted.checked;
     filtersToParams(completed, 'checkbox');
     filterField();
 });

 searchInput.addEventListener('input', (event) => {
     let searchText = event.target.value;
     filtersToParams(searchText, 'search');
     filterField();
 });

selectField.addEventListener('click', (event) => {
     let selectNumber = selectField.value;
     filtersToParams(selectNumber, 'select');
     filterField();
 });


 function filtersToParams(searchParam, field) {
   let isCompletedArr = newArr.filter((item) => {

     switch(field) {
       case 'checkbox':
             if(searchParam == true) {
               return searchParam == item.completed
             } else {
               return item
             }
       case 'search':
             return item['title'].includes(searchParam) ? item : false

       case 'select':

             function dynamicSort(property) {
             var sortOrder = 1;
             if(property[0] === "-") {
             sortOrder = -1;
             property = property.substr(1);
             }
             return function (a,b) {
             if(sortOrder == -1){
             return b[property].localeCompare(a[property]);
             }else{
             return a[property].localeCompare(b[property]);
             }
             }
             }

             if (searchParam === '1'){
             newArr.sort(dynamicSort("title"));
             } else if (searchParam === '2') {
             newArr.sort(dynamicSort("-title"));
             }

       default : return item

     }


   });
   todoList.innerHTML = "";
   renderList(isCompletedArr);
   newArr = isCompletedArr;
 }
*/
