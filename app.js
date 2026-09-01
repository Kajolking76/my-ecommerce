/* =========================================================
🟢 শখের কুঞ্জ - MAIN JAVASCRIPT FILE

এই ফাইল থেকে আপনি ভবিষ্যতে পরিবর্তন করতে পারবেন:

📂 Category
🛍️ Product
💰 Price
🏷️ Product Discount
📦 Stock
🎟️ Coupon
🚚 Delivery Charge

========================================================= */



/* =========================================================
🔵 SECTION 1: WEBSITE SETTINGS

Delivery Charge পরিবর্তন:

বর্তমানে = 120 টাকা

যদি 150 টাকা করতে চান:

const DELIVERY_CHARGE = 150;

========================================================= */

const DELIVERY_CHARGE = 120;


/* Coupon Discount Percentage */

const COUPON_DISCOUNT_PERCENT = 5;



/* =========================================================
🟣 SECTION 2: CATEGORY LIST

নতুন Category যোগ করার নিয়ম:

উদাহরণ:

{
    id:"ring",
    name:"রিং",
    image:"ring.jpg"
}

তারপর products Database-এ:

ring:[...]

যোগ করতে হবে।

========================================================= */

const categories = [

    {
        id:"glass",
        name:"কাচের চুড়ি",
        image:"glass-bangle.jpg"
    },

    {
        id:"pendant",
        name:"Pendant",
        image:"pendant.jpg"
    },

    {
        id:"jhumka",
        name:"Mini Jhumka",
        image:"mini-jhumka.jpg"
    },

    {
        id:"set",
        name:"Pendant Set",
        image:"pendant-set.jpg"
    }

];



/* =========================================================
🛍️ SECTION 3: PRODUCT DATABASE

নতুন Product যোগ করার Example:


{
    id:10,

    name:"নতুন Pendant",

    price:500,

    discount:5,

    image:"pendant.jpg",

    stock:0
}


ব্যাখ্যা:

price:500

মূল দাম = ৳500


discount:10

মানে 10% Discount


stock:5

মানে 5 টি Product Available


stock:0

মানে STOCK OUT


⚠️ প্রতিটি Product-এর id আলাদা হতে হবে।

========================================================= */

const products = {


    /* ==========================================
    💎 কাচের চুড়ি PRODUCTS
    ========================================== */

    glass:[

        {
            id:1,
            name:"12 pcs single box (s-28)",
            price:199,
            discount:0,
            image:"Dadima98.jpg",
            stock:2
        },

        {
            id:2,
            name:"Dadi ma churi (s-26)💞✨",
            price:199,
            discount:0,
            image:"Dadima99.jpg",
            stock:2
        },

        {
            id:3,
            name:"Dadi ma churi (s-26)💞✨",
            price:199,
            discount:0,
            image:"Dadima97.jpg",
            stock:2
        },

        {
            id:4,
            name:"pata bahar (s-26)💞✨",
            price:199,
            discount:0,
            image:"Patabahr1.jpg",
            stock:2
        },

        {
            id:5,
            name:"pata bahar (s-26)💞✨",
            price:199,
            discount:0,
            image:"Patabahr2.jpg",
            stock:2
        },

    ],


    /* ==========================================
    📿 PENDANT PRODUCTS
    ========================================== */

    pendant:[

        {
            id:6,
            name:"Cute Pendant 💕",
            price:110,
            discount:0,
            image:"Pendant5.jpg",
            stock:2
        },

        {
            id:7,
            name:"Cute Pendant 💕",
            price:110,
            discount:0,
            image:"Pendant6.jpg",
            stock:2
        }

    ],


    /* ==========================================
    ✨ MINI JHUMKA PRODUCTS
    ========================================== */

    jhumka:[

        {
            id:8,
            name:"Kashmeri Jhumka🌸",
            price:200,
            discount:25,
            image:"KashmeriJhumka1.jpg",
            stock:2
        },

        {
            id:9,
            name:"Kashmeri Blue stone😍",
            price:200,
            discount:25,
            image:"KashmeriJhumkaBlue.jpg",
            stock:2
        },

        {
            id:10,
            name:"Kashmeri Red stone😍",
            price:200,
            discount:25,
            image:"KashmeriJhumkaRed.jpg",
            stock:2
        }

    ],


    /* ==========================================
    💖 PENDANT SET PRODUCTS
    ========================================== */

    set:[

        {
                id:11,
            name:"Pendant set 💕🦋",
            price:110,
            discount:0,
            image:"Pendant1.jpg",
            stock:3
        },

        {
            id:12,
            name:"Pendant set 💕🦋",
            price:110,
            discount:0,
            image:"Pendant2.jpg",
            stock:3
        },

        {
            id:13,
            name:"Pendant set 💕🦋",
            price:110,
            discount:0,
            image:"Pendant3.jpg",
            stock:3
        },

        {
            id:14,
            name:"Pendant set 💕🦋",
            price:110,
            discount:0,
            image:"Pendant4.jpg",
            stock:3
        }

    ]

};



/* =========================================================
🎟️ SECTION 4: COUPON SYSTEM

বর্তমান Coupon:

SHOKH10 থেকে SHOKH30


নতুন Coupon যোগ করতে:

"NEWCODE",


⚠️ এই Frontend Version Browser-এ ব্যবহৃত Coupon মনে রাখতে পারে।

কিন্তু সত্যিকারের Professional One-Time Coupon System
করতে Backend/Database প্রয়োজন।

========================================================= */

const validCoupons = [

    "SHOKH10",
    "SHOKH11",
    "SHOKH12",
    "SHOKH13",
    "SHOKH14",
    "SHOKH15",
    "SHOKH16",
    "SHOKH17",
    "SHOKH18",
    "SHOKH19",
    "SHOKH20",
    "SHOKH21",
    "SHOKH22",
    "SHOKH23",
    "SHOKH24",
    "SHOKH25",
    "SHOKH26",
    "SHOKH27",
    "SHOKH28",
    "SHOKH29",
    "SHOKH30"

];



/* =========================================================
🟡 SECTION 5: LOCAL DATA

Cart এবং Wishlist Browser-এ Save থাকবে।

========================================================= */

let cart = JSON.parse(
    localStorage.getItem("cart")
) || [];


let favorites = JSON.parse(
    localStorage.getItem("favorites")
) || [];


let appliedCoupon = null;



/* =========================================================
🔵 SECTION 6: HELPER FUNCTIONS
========================================================= */


function saveCart(){

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

}


function saveFavorites(){

    localStorage.setItem(
        "favorites",
        JSON.stringify(favorites)
    );

}


function getAllProducts(){

    return Object.values(products).flat();

}


function findProduct(id){

    return getAllProducts()
    .find(
        product => product.id === id
    );

}



/* =========================================================
💰 SECTION 7: PRODUCT DISCOUNT CALCULATOR

মূল দাম:

price:1000

Discount:

discount:10

Result:

900 টাকা

========================================================= */

function getProductPrice(product){

    return product.price -

    (
        product.price *
        product.discount / 100
    );

}



/* =========================================================
🏠 SECTION 8: HOME CATEGORY RENDER
========================================================= */

function renderCategories(){

    const grid =
    document.getElementById("categoryGrid");


    grid.innerHTML =
    categories.map(category => `

        <div
            class="category-card"
            onclick="openCategory('${category.id}')"
        >

            <img
                src="${category.image}"
                alt="${category.name}"
            >

            <div class="category-info">

                <h3>
                    ${category.name}
                </h3>

                <p>
                    কালেকশন দেখুন →
                </p>

            </div>

        </div>

    `).join("");

}



/* =========================================================
📂 SECTION 9: OPEN CATEGORY
========================================================= */

function openCategory(categoryId){

    const category =
    categories.find(
        item => item.id === categoryId
    );


    document.getElementById(
        "categoryTitle"
    ).innerText =
    category.name;


    renderProducts(
        products[categoryId]
    );


    showPage("productPage");

}



/* =========================================================
🛍️ SECTION 10: PRODUCT RENDER
========================================================= */

function renderProducts(list){

    const grid =
    document.getElementById("productGrid");


    if(!list.length){

        grid.innerHTML = `

            <div class="empty-message">

                কোনো Product পাওয়া যায়নি।

            </div>

        `;

        return;

    }


    grid.innerHTML =
    list.map(product => productCard(product))
    .join("");

}



/* =========================================================
🛍️ PRODUCT CARD TEMPLATE
========================================================= */

function productCard(product){

    const finalPrice =
    getProductPrice(product);


    const isFavorite =
    favorites.includes(product.id);


    const isOut =
    product.stock <= 0;


    return `

        <div class="product">


            <div class="product-image">


                <img
                    src="${product.image}"
                    alt="${product.name}"
                >


                ${
                    product.discount > 0

                    ?

                    `

                    <div class="discount-badge">

                        ${product.discount}% OFF

                    </div>

                    `

                    :

                    ""
                }


                <button

                    class="
                    favorite
                    ${isFavorite ? "active":""}
                    "

                    onclick="
                    toggleFavorite(${product.id})
                    "

                >

                    ${isFavorite ? "♥":"♡"}

                </button>


                ${
                    isOut

                    ?

                    `

                    <div class="stock-out">

                        STOCK OUT

                    </div>

                    `

                    :

                    ""
                }


            </div>



            <div class="product-info">


                <h3>

                    ${product.name}

                </h3>


                ${
                    product.discount > 0

                    ?

                    `

                    <div class="old-price">

                        ৳${product.price}

                    </div>

                    `

                    :

                    ""
                }


                <div class="price">

                    ৳${finalPrice.toFixed(0)}

                </div>


                <div class="product-buttons">


                    <button

                        class="cart-btn"

                        onclick="
                        addToCart(${product.id})
                        "

                        ${isOut ? "disabled":""}

                    >

                        🛒 Cart

                    </button>


                    <button

                        class="buy-btn"

                        onclick="
                        buyNow(${product.id})
                        "

                        ${isOut ? "disabled":""}

                    >

                        Buy Now

                    </button>


                </div>


            </div>


        </div>

    `;

}



/* =========================================================
❤️ SECTION 11: FAVOURITE SYSTEM
========================================================= */

function toggleFavorite(id){

    if(favorites.includes(id)){

        favorites =
        favorites.filter(
            item => item !== id
        );

    }

    else{

        favorites.push(id);

    }


    saveFavorites();


    const visibleProducts =
    document.getElementById("productPage");


    if(!visibleProducts.classList.contains("hidden")){

        const title =
        document.getElementById(
            "categoryTitle"
        ).innerText;


        const category =
        categories.find(
            item => item.name === title
        );


        if(category){

            renderProducts(
                products[category.id]
            );

        }

    }

}



/* =========================================================
❤️ OPEN WISHLIST
========================================================= */

function openWishlist(){

    const grid =
    document.getElementById(
        "wishlistGrid"
    );


    const favoriteProducts =
    getAllProducts()
    .filter(
        product =>
        favorites.includes(product.id)
    );


    if(!favoriteProducts.length){

        grid.innerHTML = `

            <div class="empty-message">

                ♡ আপনার Favourite List খালি।

            </div>

        `;

    }

    else{

        grid.innerHTML =
        favoriteProducts
        .map(
            product => productCard(product)
        )
        .join("");

    }


    showPage("wishlistPage");

}



/* =========================================================
🛒 SECTION 12: ADD TO CART
========================================================= */

function addToCart(id){

    const product =
    findProduct(id);


    if(!product || product.stock <= 0){

        return;

    }


    const existing =
    cart.find(
        item => item.id === id
    );


    if(existing){

        if(existing.quantity < product.stock){

            existing.quantity++;

        }

    }

    else{

        cart.push({

            id:id,

            quantity:1

        });

    }


    saveCart();

    updateCartCount();

    alert(
        "🛒 পণ্যটি Cart-এ যোগ হয়েছে!"
    );

}



/* =========================================================
⚡ SECTION 13: BUY NOW
========================================================= */

function buyNow(id){

    cart = [];

    cart.push({

        id:id,

        quantity:1

    });


    saveCart();

    updateCartCount();

    openCheckout();

}



/* =========================================================
🛒 SECTION 14: CART PAGE
========================================================= */

function openCart(){

    renderCart();

    showPage("cartPage");

}



function renderCart(){

    const list =
    document.getElementById(
        "cartList"
    );


    const summary =
    document.getElementById(
        "cartSummary"
    );


    if(!cart.length){

        list.innerHTML = `

            <div class="empty-message">

                🛒 আপনার Cart খালি।

            </div>

        `;


        summary.innerHTML = "";

        return;

    }


    list.innerHTML =
    cart.map(item => {

        const product =
        findProduct(item.id);


        const price =
        getProductPrice(product);


        return `

            <div class="cart-item">


                <img
                    src="${product.image}"
                    alt="${product.name}"
                >


                <div class="cart-info">


                    <h3>

                        ${product.name}

                    </h3>


                    <div class="cart-price">

                        ৳${price.toFixed(0)}

                    </div>


                    <div
                        class="quantity-controls"
                    >


                        <button
                        onclick="
                        changeQuantity(
                        ${product.id},
                        -1
                        )
                        "
                        >

                            −

                        </button>


                        <span>

                            ${item.quantity}

                        </span>


                        <button
                        onclick="
                        changeQuantity(
                        ${product.id},
                        1
                        )
                        "
                        >

                            +

                        </button>


                    </div>


                    <button
                    class="remove-btn"
                    onclick="
                    removeCartItem(
                    ${product.id}
                    )
                    "
                    >

                        Remove

                    </button>


                </div>


            </div>

        `;

    }).join("");


    const subtotal =
    getCartSubtotal();


    summary.innerHTML = `

        <h3>

            Cart Total

        </h3>


        <div class="bill-row">

            <span>

                Product Total

            </span>

            <span>

                ৳${subtotal.toFixed(0)}

            </span>

        </div>


        <button
        class="checkout-btn"
        onclick="openCheckout()"
        >

            Checkout করুন →

        </button>

    `;

}



/* =========================================================
➕➖ CART QUANTITY
========================================================= */

function changeQuantity(id,change){

    const item =
    cart.find(
        item => item.id === id
    );


    const product =
    findProduct(id);


    if(!item || !product){

        return;

    }


    item.quantity += change;


    if(item.quantity <= 0){

        removeCartItem(id);

        return;

    }


    if(item.quantity > product.stock){

        item.quantity =
        product.stock;

    }


    saveCart();

    renderCart();

    updateCartCount();

}



/* =========================================================
❌ REMOVE CART ITEM
========================================================= */

function removeCartItem(id){

    cart =
    cart.filter(
        item => item.id !== id
    );


    saveCart();

    renderCart();

    updateCartCount();

}



/* =========================================================
💰 CART SUBTOTAL
========================================================= */

function getCartSubtotal(){

    return cart.reduce(
        (total,item) => {

            const product =
            findProduct(item.id);


            return total +

            getProductPrice(product)
            *
            item.quantity;

        },

        0
    );

}



/* =========================================================
🔢 UPDATE CART COUNT
========================================================= */

function updateCartCount(){

    const count =
    cart.reduce(
        (total,item) =>
        total + item.quantity,
        0
    );


    document.getElementById(
        "cartCount"
    ).innerText =
    count;

}



/* =========================================================
🚚 SECTION 15: OPEN CHECKOUT
========================================================= */

function openCheckout(){

    if(!cart.length){

        alert(
            "আপনার Cart খালি!"
        );

        return;

    }


    renderCheckout();

    showPage("checkoutPage");

}



/* =========================================================
📦 CHECKOUT RENDER
========================================================= */

function renderCheckout(){

    const items =
    document.getElementById(
        "checkoutItems"
    );


    items.innerHTML =
    cart.map(item => {

        const product =
        findProduct(item.id);


        return `

            <div class="checkout-product">

                <span>

                    ${product.name}
                    ×
                    ${item.quantity}

                </span>


                <span>

                    ৳${
                        (
                            getProductPrice(product)
                            *
                            item.quantity
                        ).toFixed(0)
                    }

                </span>

            </div>

        `;

    }).join("");


    updateCheckoutBill();

}



/* =========================================================
🎟️ SECTION 16: APPLY COUPON

Coupon:

SHOKH10
থেকে
SHOKH30


Discount:

5%

========================================================= */

function applyCoupon(){

    const input =
    document.getElementById(
        "couponInput"
    );


    const message =
    document.getElementById(
        "couponMessage"
    );


    const code =
    input.value
    .trim()
    .toUpperCase();


    if(!code){

        message.innerText =
        "Coupon Code লিখুন।";

        return;

    }


    if(!validCoupons.includes(code)){

        appliedCoupon = null;

        message.innerText =
        "❌ Invalid Coupon Code";

        updateCheckoutBill();

        return;

    }


    appliedCoupon = code;


    message.innerText =
    "🎉 5% Discount Apply হয়েছে!";


    updateCheckoutBill();

}



/* =========================================================
💵 SECTION 17: CHECKOUT BILL CALCULATOR
========================================================= */

function updateCheckoutBill(){

    const subtotal =
    getCartSubtotal();


    const discount =
    appliedCoupon

    ?

    subtotal *
    COUPON_DISCOUNT_PERCENT /
    100

    :

    0;


    const total =

    subtotal

    -

    discount

    +

    DELIVERY_CHARGE;


    document.getElementById(
        "checkoutSubtotal"
    ).innerText =
    "৳" +
    subtotal.toFixed(0);


    document.getElementById(
        "checkoutDiscount"
    ).innerText =
    "- ৳" +
    discount.toFixed(0);


    document.getElementById(
        "checkoutTotal"
    ).innerText =
    "৳" +
    total.toFixed(0);

}



/* =========================================================
📦 SECTION 18: CONFIRM ORDER

বর্তমানে Demo Version।

পরবর্তী Step-এ:

Google Sheet

এর সাথে Connect করা হবে।

তখন Customer Order:

Google Sheet-এ Save হবে।

========================================================= */

function confirmOrder(){

    const name =
    document.getElementById(
        "customerName"
    ).value.trim();


    const phone =
    document.getElementById(
        "customerPhone"
    ).value.trim();


    const address =
    document.getElementById(
        "customerAddress"
    ).value.trim();


    const district =
    document.getElementById(
        "customerDistrict"
    ).value.trim();


    const division =
    document.getElementById(
        "customerDivision"
    ).value.trim();


    if(
        !name ||
        !phone ||
        !address ||
        !district ||
        !division
    ){

        alert(
            "⚠️ দয়া করে সব প্রয়োজনীয় তথ্য পূরণ করুন।"
        );

        return;

    }


    const subtotal =
    getCartSubtotal();


    const discount =
    appliedCoupon

    ?

    subtotal *
    COUPON_DISCOUNT_PERCENT /
    100

    :

    0;


    const total =

    subtotal

    -

    discount

    +

    DELIVERY_CHARGE;


    const orderId =

    "SK-" +

    Date.now();


    const order = {

        orderId,

        date:
        new Date().toLocaleString(),

        customer:{
            name,
            phone,
            address,
            district,
            division
        },

        products:
        cart,

        subtotal,

        discount,

        deliveryCharge:
        DELIVERY_CHARGE,

        total,

        coupon:
        appliedCoupon ||

        "No Coupon",

        status:
        "Pending"

    };

    fetch("https://script.google.com/macros/s/AKfycbyNXeKR7t3p5nY_ikii_oHZqR3924J6qiWLKUCAF0kywFtiubkJsBrYghwyG2AtD64DRg/exec", {
    method: "POST",
    mode: "no-cors",
    headers: {
        "Content-Type": "text/plain;charset=utf-8"
    },
    body: JSON.stringify(order)
});


    fetch("https://script.google.com/macros/s/AKfycbyNXeKR7t3p5nY_ikii_oHZqR3924J6qiWLKUCAF0kywFtiubkJsBrYghwyG2AtD64DRg/exec", {
    method: "POST",
    mode: "no-cors",
    headers: {
        "Content-Type": "text/plain;charset=utf-8"
    },
    body: JSON.stringify(order)
});


    alert(

        "🎉 অর্ডার সফলভাবে কনফার্ম হয়েছে!\n\n" +

        "Order ID: " +

        orderId +

        "\n\nসর্বমোট: ৳" +

        total.toFixed(0)

    );


    /* ========================================
    Coupon Used

    ⚠️ এই অংশ শুধু Browser-এর জন্য।

    Real One-Time Coupon-এর জন্য
    Google Sheet / Backend ব্যবহার করবো।
    ======================================== */


    cart = [];

    saveCart();

    updateCartCount();

    appliedCoupon = null;

    goHome();

}



/* =========================================================
👤 SECTION 19: CUSTOMER ACCOUNT
========================================================= */

function openAccount(){

    showPage("accountPage");

}



/* =========================================================
🔐 LOGIN
========================================================= */

function loginCustomer(){

    alert(
        "Professional Secure Login System পরে Backend-এর সাথে যুক্ত করা হবে।"
    );

}



/* =========================================================
📝 CREATE ACCOUNT
========================================================= */

function registerCustomer(){

    alert(
        "Account Create System Backend-এর সাথে যুক্ত করলে বাস্তবভাবে কাজ করবে।"
    );

}



/* =========================================================
🔄 LOGIN / REGISTER SWITCH
========================================================= */

function showRegister(){

    document.getElementById(
        "loginSection"
    ).classList.add(
        "hidden"
    );


    document.getElementById(
        "registerSection"
    ).classList.remove(
        "hidden"
    );

}



function showLogin(){

    document.getElementById(
        "registerSection"
    ).classList.add(
        "hidden"
    );


    document.getElementById(
        "loginSection"
    ).classList.remove(
        "hidden"
    );

}



/* =========================================================
📄 SECTION 20: PAGE NAVIGATION
========================================================= */

function showPage(pageId){

    document
    .querySelectorAll(".page")
    .forEach(page => {

        page.classList.add(
            "hidden"
        );

    });


    document.getElementById(
        pageId
    ).classList.remove(
        "hidden"
    );


    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

}



/* =========================================================
🏠 GO HOME
========================================================= */

function goHome(){

    showPage("homePage");

}



/* =========================================================
🚀 SECTION 21: WEBSITE START
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        renderCategories();

        updateCartCount();


        setTimeout(
            () => {

                document
                .getElementById("loader")
                .classList.add("hide");

            },

            1800
        );

    }
);
