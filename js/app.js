const itemList = document.querySelector('.item-list');
let itemData = [];

//show cart
(function () {
    const cartInfo = document.getElementById("cart-info");
    const cart = document.getElementById("cart");
    cartInfo.addEventListener("click", function () {
        cart.classList.toggle("show-cart");
    })

})();

//add items to the cart
(function () {
    const cartBtn = document.querySelectorAll(".store-item-icon");
    cartBtn.forEach(function (btn) {
        btn.addEventListener("click", function (event) {
            // console.log(event.target);
            if (event.target.parentElement.classList.contains("store-item-icon")) {
                let fullPath =
                    event.target.parentElement.previousElementSibling.src;
                let pos = fullPath.indexOf("img") + 3;
                let partPath = fullPath.slice(pos);
                const item = {};
                item.img = `img-cart${partPath}`;
                let name = event.target.parentElement.parentElement.nextElementSibling.children[0].children[0].textContent;
                item.name = name;
                let price = event.target.parentElement.parentElement.nextElementSibling.children[0].children[1].textContent;
                // console.log(name);
                let finalPrice = price.slice(1).trim();
                item.price = finalPrice;
                console.log(item);
                console.log("final.price = " + finalPrice);
                console.log("item.price = " + item.price);
                console.log("price = " + price);

                const cartItem = document.createElement("div");
                cartItem.classList.add(
                    "cart-item",
                    "d-flex",
                    "justify-content-between",
                    "text-capitalize",
                    "my-3"
                );
                cartItem.innerHTML = `
                <img src="${item.img}" class="img-fluid rounded-circle" id="item-img" alt="">
                <div class="item-text">
                    <p id="cart-item-title" class="font-weight-bold mb-0">${item.name}</p>
                    <span>$</span>
                    <span id="cart-item-price" class="cart-item-price" class="mb-0">${item.price}</span>
                </div>
                <a href="#" id='cart-item-remove' class="cart-item-remove">
                    <i class="fa fa-trash" id="trashBtn"></i>
                </a>
            </div>
            `;

                //select cart
                const cart = document.getElementById("cart");
                const total = document.querySelector(".cart-total-container");
                cart.insertBefore(cartItem, total);
                alert("item added into the cart");
                showTotals();

                // add event listener to icons 
                handleItem();
            }
        });
    });
    //show totals
    function showTotals() {
        // console.log("hellow");

        const total = [];
        const items = document.querySelectorAll(".cart-item-price");

        items.forEach(function (item) {
            total.push(parseFloat(item.textContent));
        });
        const totalMoney = total.reduce(function (total, item) {

            total += item;
            return total;
        }, 0);

        const finalMoney = totalMoney.toFixed(2);
        console.log("totalMoney = " + totalMoney);
        console.log("finalMoney = " + finalMoney);
        document.getElementById("cart-total").textContent = finalMoney;
        document.querySelector(".item-total").textContent = finalMoney;
        document.getElementById("item-count").textContent = total.length;
    };


})();

function handleItem(textValue) {
    const items = itemList.querySelectorAll('.cart-item');
    items.forEach(function (item) {
        if (item.querySelector('.cart-item-title').textContent === textValue) {
            //delete event listener 
            item.querySelector('.cart-item-remove').addEventListener('click', function () {
                itemList.removeChild(item);
                // console.log(itemData);

                // itemData = itemData.filter(function(item){
                //     return item !== textValue;
                // });

                // console.log(itemData);
            });
        }
    });
};



//filter btns
(function () {
    // select all buttons 
    const filterBtn = document.querySelectorAll('.filter-btn');
    // console.log(filterBtn);
    filterBtn.forEach(function (btn) {
        btn.addEventListener('click', function (event) {
            event.preventDefault();
            const value = event.target.dataset.filter;
            // console.log(value);
            const items = document.querySelectorAll('.store-item');

            items.forEach(function (item) {
                if (value === "all") {
                    item.style.display = "block";
                }
                else {
                    if (item.classList.contains(value)) {
                        item.style.display = "block";
                    }
                    else {
                        item.style.display = "none";
                    }
                }
            })
        })
    })
})();


// search input
(function () {
    // target search box 
    const search = document.getElementById('search-item');
    search.addEventListener('keyup', function () {
        let value = search.value.toLowerCase().trim();
        // console.log(value);
        const items = document.querySelectorAll('.store-item');
        items.forEach(function (item) {
            let type = item.dataset.item;
            // console.log(type);
            // if (type.includes(value)){
            //     item.style.display ="block";
            // }
            // else {
            //     item.style.display ="none";
            // }
            let uzunluq = value.length
            let match = type.slice(0, uzunluq);
            // console.log(value);
            // console.log(match);
            if (value === match) {
                item.style.display = "block"
            }
            else {
                item.style.display = "none";
            }
        });
    });
})();

// lightbox 

(function(){
// all images

let imageList = [];
let counter = 0;

const images = document.querySelectorAll('.store-img');
const container = document.querySelector('.lightbox-container');
const item = document.querySelector('.lightbox-item');
const closeIcon = document.querySelector('.lightbox-close');
const btnLeft = document.querySelector('.btnLeft');
const btnRight = document.querySelector('.btnRight');

//add all images to the array 
 images.forEach(function(img){
     imageList.push(img.src);
 });

//  console.log(imageList);

// open modal
images.forEach(function(img){
    img.addEventListener('click', function(){
        container.classList.add("show");

        // get source 
        let src = event.target.src;
        console.log(src);
        counter = imageList.indexOf(src);
        // console.log(counter);
        // show modal with an image 
        item.style.backgroundImage = `url('${src}')`;
        
        
    });
});
 // close icon 
 closeIcon.addEventListener('click', function(){
     container.classList.remove("show");
 });
// left button
 btnLeft.addEventListener('click', function(){

    counter--;
    if (counter < 0) {
        counter = imageList.length - 1;
    }
    console.log(counter);
    item.style.backgroundImage = `url('${imageList[counter]}')`;  
 });

// right button
 btnRight.addEventListener('click', function(){

    counter++;
    if (counter > imageList.length - 1) {
        counter = 0;
    }
    console.log(counter);
    item.style.backgroundImage = `url('${imageList[counter]}')`;   
 });













})();





































// delete items to the cart, ISHLEYIR ama sehvlik var
// (function () {
//     const delBtn = document.querySelectorAll(".cart-item-remove");
//     delBtn.forEach(function (btn) {
//         btn.addEventListener("click", function (event) {

//             if (event.target.parentElement.classList.contains("cart-item-remove")) {
//                 const child = document.querySelectorAll(".item");
//                 console.log(child);
//                 const parent = document.querySelectorAll(".cart-item");
//                 console.log(parent);


//                 // const child = event.target.parentElement.parentElement;
//                 // console.log(child);
//                 // const parentNodeOfChild = child.parentElement;
//                 // console.log(parentNodeOfChild);
//                 // parentNodeOfChild.removeChild(child);
//                 // console.log("silindi...");
//             }
//         });
//     });

// })();

