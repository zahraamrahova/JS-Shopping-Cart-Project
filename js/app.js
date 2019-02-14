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


// delete items to the cart, ISHLEYIR ama sehvlik var
(function () {
    const delBtn = document.querySelectorAll(".cart-item-remove");
    delBtn.forEach(function (btn) {
        btn.addEventListener("click", function (event) {

            if (event.target.parentElement.classList.contains("cart-item-remove")) {
                const child = document.querySelectorAll(".item");
                console.log(child);
                const parent = document.querySelectorAll(".cart-item");
                console.log(parent);
                

                // const child = event.target.parentElement.parentElement;
                // console.log(child);
                // const parentNodeOfChild = child.parentElement;
                // console.log(parentNodeOfChild);
                // parentNodeOfChild.removeChild(child);
                // console.log("silindi...");
            }
        });
    });

})();

