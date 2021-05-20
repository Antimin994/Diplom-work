/*  Category Sort by Link   */

function cityBag() {
 sessionStorage.clear();
 sessionStorage.setItem("key1", "purpose");
 sessionStorage.setItem("key2", "город");
 sessionStorage.setItem("title", "Городские рюкзаки");
 sessionStorage.setItem("par", 1);
}

function tourismBag() {
  sessionStorage.clear();
  sessionStorage.setItem("key1", "purpose");
  sessionStorage.setItem("key2", "туризм");
  sessionStorage.setItem("title", "Туристические рюкзаки");
  sessionStorage.setItem("par", 1);
}

function sportBag() {
  sessionStorage.clear();
  sessionStorage.setItem("key1", "purpose");
  sessionStorage.setItem("key2", "спорт");
  sessionStorage.setItem("title", "Спортивные рюкзаки");
  sessionStorage.setItem("par", 1);
}

/*function acessories() {

}*/

function topGoods() {
  sessionStorage.clear();
  sessionStorage.setItem("key1", "top");
  sessionStorage.setItem("key2", "true");
  sessionStorage.setItem("title", "ТОП");
  sessionStorage.setItem("par", 1);
}



const searchField = document.querySelector('.searchField');
const searchLink = document.querySelector('#searchLink');
console.log(searchField);
console.log(searchLink);
searchField.addEventListener('input', function() {
console.log(searchField.value);
});

searchLink.addEventListener('click', function() {
   sessionStorage.removeItem("search");
   sessionStorage.setItem("search", searchField.value);
   sessionStorage.setItem("par", 2);
});


function catalog() {

  var par = sessionStorage.getItem("par");
  sessionStorage.removeItem("par");
  console.log(par);

//sort block

  const todoList = document.querySelector('.todo-list');
  const categoryTitle = document.querySelector('.category-title');
  let searchText = sessionStorage.getItem("search");

  const typeBox = document.querySelectorAll('.typeBox');
  const purposeBox = document.querySelectorAll('.purposeBox');
  const sizeBox = document.querySelectorAll('.sizeBox');
  const mwBox = document.querySelectorAll('.mwBox');
  const fRange = document.querySelector('#fRange');
  const sRange = document.querySelector('#sRange');

/*     Double range       */

 var inputLeft = document.getElementById("input-left");
 var inputRight = document.getElementById("input-right");

 var thumbLeft = document.querySelector(".slider > .thumb.left");
 var thumbRight = document.querySelector(".slider > .thumb.right");
 var range = document.querySelector(".slider > .range");

 function setLeftValue() {
 	var _this = inputLeft,
 		min = parseInt(_this.min),
 		max = parseInt(_this.max);

 	_this.value = Math.min(parseInt(_this.value), parseInt(inputRight.value) - 1);

 	var percent = ((_this.value - min) / (max - min)) * 100;

 	thumbLeft.style.left = percent + "%";
 	range.style.left = percent + "%";
 }
 setLeftValue();

 function setRightValue() {
 	var _this = inputRight,
 		min = parseInt(_this.min),
 		max = parseInt(_this.max);

 	_this.value = Math.max(parseInt(_this.value), parseInt(inputLeft.value) + 1);

 	var percent = ((_this.value - min) / (max - min)) * 100;

 	thumbRight.style.right = (100 - percent) + "%";
 	range.style.right = (100 - percent) + "%";
 }
 setRightValue();

 inputLeft.addEventListener("input", setLeftValue);
 inputRight.addEventListener("input", setRightValue);

 inputLeft.addEventListener("mouseover", function() {
 	thumbLeft.classList.add("hover");
 });
 inputLeft.addEventListener("mouseout", function() {
 	thumbLeft.classList.remove("hover");
 });
 inputLeft.addEventListener("mousedown", function() {
 	thumbLeft.classList.add("active");
 });
 inputLeft.addEventListener("mouseup", function() {
 	thumbLeft.classList.remove("active");
 });

 inputRight.addEventListener("mouseover", function() {
 	thumbRight.classList.add("hover");
 });
 inputRight.addEventListener("mouseout", function() {
 	thumbRight.classList.remove("hover");
 });
 inputRight.addEventListener("mousedown", function() {
 	thumbRight.classList.add("active");
 });
 inputRight.addEventListener("mouseup", function() {
 	thumbRight.classList.remove("active");
 });


filterResponse();
inputLeft.addEventListener('change', filterResponse);
inputRight.addEventListener('change', filterResponse);
for (var i = 0; i < typeBox.length; i++) {typeBox[i].addEventListener('change', filterResponse);}
for (var i = 0; i < purposeBox.length; i++) {purposeBox[i].addEventListener('change', filterResponse);}
for (var i = 0; i < sizeBox.length; i++) {sizeBox[i].addEventListener('change', filterResponse);}
for (var i = 0; i < mwBox.length; i++) {mwBox[i].addEventListener('change', filterResponse);}


function filterResponse() {

  let searchObject = {};

  let priceArr = [];
  let minPrice = Number(inputLeft.value);
  let maxPrice = Number(inputRight.value);
  fRange.textContent = minPrice;
  sRange.textContent = maxPrice;
  priceArr.push([minPrice, maxPrice]);


  let typeArr = [];
  typeBox[0].checked === true ? typeArr.push('рюкзак') : typeArr;
  typeBox[1].checked === true ? typeArr.push('сумка') : typeArr;
  typeBox[2].checked === true ? typeArr.push('кошелек') : typeArr;
  typeBox[3].checked === true ? typeArr.push('аксессуар') : typeArr;

  let purposeArr = [];
  purposeBox[0].checked === true ? purposeArr.push('город') : purposeArr;
  purposeBox[1].checked === true ? purposeArr.push('спорт') : purposeArr;
  purposeBox[2].checked === true ? purposeArr.push('туризм') : purposeArr;
  purposeBox[3].checked === true ? purposeArr.push('школа') : purposeArr;

  let sizeArr = [];
  sizeBox[0].checked === true ? sizeArr.push([0, 20]) : sizeArr;
  sizeBox[1].checked === true ? sizeArr.push([20, 50]) : sizeArr;
  sizeBox[2].checked === true ? sizeArr.push([50, 80]) : sizeArr;
  sizeBox[3].checked === true ? sizeArr.push([80, 150]) : sizeArr;

  let mwArr = [];
  mwBox[0].checked === true ? mwArr.push('мужской') : mwArr;
  mwBox[1].checked === true ? mwArr.push('женский') : mwArr;
  mwBox[2].checked === true ? mwArr.push('унисекс') : mwArr;
  mwBox[3].checked === true ? mwArr.push('детский') : mwArr;

 searchObject = {"price" : priceArr, "capacity" : sizeArr, "type" : typeArr, "purpose" : purposeArr, "sex" : mwArr};


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


    if (par == 1) {
      categoryTitle.textContent = sessionStorage.getItem("title");
      var filteredData = answerData.filter(function(item) {
         var flag = false;
         var param = sessionStorage.getItem("key1");
         var value = sessionStorage.getItem("key2");
         console.log(value);
           if (item[param] === value) {
             flag = true;
           }

        console.log(flag);

        return flag;
       });
    }

    else if (par == 2) {
      var filteredData = answerData.filter(function(item) {
         var flag = false;
         console.log(searchText);
         item['name'].includes(searchText) ? flag = true : flag = false;

        return flag;
       });
    }

    else {
      var keys = Object.keys(searchObject);

     var filteredData = answerData.filter(function(item) {
       console.log(item);
       console.log(keys);
       for (var i = 0; i < keys.length; i++) {
           var key = keys[i];
           var flag = true;

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
    }


      par = 0;


         console.log(filteredData);

         function renderList (list) {
          list.forEach((item, indx) => {
          console.log(item);
          let todoItem = `
          <div class='todo-item'>
            <img class="item-img" src="${item.image}">
            <div class="itemDesc">
            <h4 class="item-type">${item.name}</h4>
            <p class="item-type">Товар: ${item.type}<br>Тип: ${item.purpose}<br>Пол: ${item.sex}<br>
            <span class="item-value">Объем: ${item.capacity} л</span><br>
            <span class="item-value">Цена: ${item.price} грн</span></p>
            <button value="${item.number}" class="btn-goods">В корзину</button>
            </div>
          </div>`;

          todoList.innerHTML += todoItem
        })
        }

        todoList.innerHTML = "";
        renderList(filteredData);
        addToBasket(filteredData);


     }
     show();
}

}


/*        Basket        */

function addToBasket (dataArr) {
  let btnGoods = document.querySelectorAll('.btn-goods');
   var valueArr = [];
  for (var i = 0; i < btnGoods.length; i++) {
    btnGoods[i].addEventListener('click', function(event) {
      console.log(event.target.value);
      var basketObject = dataArr.filter(function(item) {
        if (item.number == event.target.value) {
          return true;
        }
      });
      valueArr.push(basketObject[0].number);
     var getValueArr = JSON.parse(localStorage.getItem("basket"));

     /*getValueArr.forEach(function(item, i, getValueArr) {
       valueArr.push(item);
     });*/



      localStorage.setItem("basket", JSON.stringify(valueArr));
    })
  }
}

function showBasket() {
  basketBox = document.querySelector('.basket-box')
  basketArr = JSON.parse(localStorage.getItem ("basket"));
  console.log(basketArr);


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
     var filteredData = answerData.filter(function(item) {
        var flag = false;
        for (var i = 0; i < basketArr.length; i++) {
          if (item.number == basketArr[i]) {
            flag = true;
          }
        }
        return flag;
      });

      console.log(filteredData);

      function renderList (list) {
       list.forEach((item, indx) => {
       console.log(item);
       let todoItem = `
       <div class='basket-item'>
         <div class="basket-item-name">
         <h3 class="item-type">${item.name}</h3>
         <h5 class="item-type">Товар: ${item.type}<br>Тип: ${item.purpose}<br>Пол: ${item.sex}</h5>
         <img class="item-img" src="${item.image}">
         </div>
         <div class="addNumber">
         <div class="goods-counter">
         <button value="${item.number}" class="minusGood">-</button>
         <h4 class="isNumber">1</h4>
         <button value="${item.number}" class="plusGood">+</button>
         </div>
         <button value="${item.number}" class="removeGood">Удалить</button>
         </div>
       </div>`;

       basketBox.innerHTML += todoItem
     })
     }

     basketBox.innerHTML = "";
     renderList(filteredData);

     let minusGood = document.querySelectorAll('.minusGood');
     let plusGood = document.querySelectorAll('.plusGood');
     let removeGood = document.querySelectorAll('.removeGood');
     let numOfGoods = document.querySelectorAll('.isNumber');
     let priceBox = document.querySelector('#cancelPrice');
     let cancelPrice = Number(priceBox.textContent);


     filteredData.forEach(function(item, i, filteredData) {

       cancelPrice += item.price *  numOfGoods[i].textContent;
       priceBox.textContent = cancelPrice;
       minusGood[i].addEventListener('click', function () {
         numOfGoods[i].textContent <= 0 ? numOfGoods[i].textContent = 0 : numOfGoods[i].textContent--;
         cancelPrice -= item.price;
         priceBox.textContent = cancelPrice;
       })
       plusGood[i].addEventListener('click', function() {
         numOfGoods[i].textContent++;
         cancelPrice += item.price;
         priceBox.textContent = cancelPrice;
       })
       removeGood[i].addEventListener('click', function() {
         this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode);
         delete filteredData[i];
         cancelPrice -= item.price *  numOfGoods[i].textContent;
         priceBox.textContent = cancelPrice;
       })
     });

  }
  show();

  let deleteBasket = document.querySelector('#deleteBasket');
  let buyGoods = document.querySelector('#buyGoods');
  console.log(deleteBasket);

  deleteBasket.addEventListener('click', function() {
    delete filteredData;
    localStorage.clear();
    basketBox.innerHTML = "";
    priceBox.textContent = 0;
  });

  buyGoods.addEventListener('click', function() {
    var delayPopup = 3000;
    setTimeout(function() {
      var closePopup = document.getElementById('bg_popup').style.display='block';
      closePopup.style.display='block';
      closePopup.onclick(function() {
        document.getElementById('bg_popup').style.display='none'; return false;
      })
    }, delayPopup);
    localStorage.clear();


  })

}
