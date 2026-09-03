/* =====================================================
   ADMIN PANEL NAVIGATION
===================================================== */

function showAdminSection(sectionId) {

    const sections =
        document.querySelectorAll(".admin-section");

    sections.forEach(function(section) {

        section.classList.remove("active-section");

    });


    const selectedSection =
        document.getElementById(sectionId);


    if (selectedSection) {

        selectedSection.classList.add("active-section");

    }


    const menuItems =
        document.querySelectorAll(".menu-item");


    menuItems.forEach(function(item) {

        item.classList.remove("active");

    });


    const clickedItem =
        document.querySelector(
            `.menu-item[onclick="showAdminSection('${sectionId}')"]`
        );


    if (clickedItem) {

        clickedItem.classList.add("active");

    }


    const titles = {

        dashboard: "Dashboard",

        products: "Product Management",

        orders: "Order Management",

        customers: "Customer Management",

        marketing: "Marketing Center",

        reports: "Sales Reports",

        reviews: "Review Management",

        settings: "Website Settings"

    };


    const pageTitle =
        document.getElementById("pageTitle");


    if (pageTitle) {

        pageTitle.innerText =
            titles[sectionId] || "Admin Panel";

    }


    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}

/* =====================================================
   PRODUCT MANAGEMENT
===================================================== */

let adminProducts = [];

let editingProductId = null;


/* OPEN PRODUCT FORM */

function openProductForm() {

    const modal = document.getElementById("productModal");

    if (!modal) return;

    editingProductId = null;

    document.getElementById("productForm").reset();

    modal.classList.add("show");

}


/* CLOSE PRODUCT FORM */

function closeProductForm() {

    const modal = document.getElementById("productModal");

    if (!modal) return;

    modal.classList.remove("show");

    editingProductId = null;

}


/* SAVE PRODUCT */

function saveProduct(event) {

    event.preventDefault();


    const name =
        document.getElementById("productName").value.trim();

    const category =
        document.getElementById("productCategory").value;

    const stock =
        Number(document.getElementById("productStock").value);

    const price =
        Number(document.getElementById("productPrice").value);

    const salePrice =
        Number(document.getElementById("productSalePrice").value) || 0;

    const image =
        document.getElementById("productImage").value.trim();

    const description =
        document.getElementById("productDescription").value.trim();

    const featured =
        document.getElementById("productFeatured").checked;

    const upcoming =
        document.getElementById("productUpcoming").checked;


    if (!name || !category) {

        alert("Product name এবং category দিন।");

        return;

    }


    const product = {

        id: editingProductId || Date.now(),

        name: name,

        category: category,

        stock: stock,

        price: price,

        salePrice: salePrice,

        image: image,

        description: description,

        featured: featured,

        upcoming: upcoming,

        createdAt: new Date().toISOString()

    };


    if (editingProductId) {

        const index =
            adminProducts.findIndex(
                item => item.id === editingProductId
            );

        if (index !== -1) {

            adminProducts[index] = product;

        }

    } else {

        adminProducts.push(product);

    }


    saveProductsToStorage();

    renderProducts();

    closeProductForm();

}


/* LOCAL STORAGE */

function saveProductsToStorage() {

    localStorage.setItem(

        "adminProducts",

        JSON.stringify(adminProducts)

    );

}


/* LOAD PRODUCTS */

function loadProductsFromStorage() {

    const savedProducts =
        localStorage.getItem("adminProducts");


    if (savedProducts) {

        try {

            adminProducts =
                JSON.parse(savedProducts);

        } catch (error) {

            adminProducts = [];

        }

    }


    renderProducts();

}


/* RENDER PRODUCTS */

function renderProducts(products = adminProducts) {

    const tbody =
        document.getElementById("productTableBody");

    if (!tbody) return;


    const count =
        document.getElementById("productCount");


    if (count) {

        count.innerText =
            `${products.length} Products`;

    }


    if (products.length === 0) {

        tbody.innerHTML = `

            <tr>

                <td colspan="6" class="no-products">

                    <div>📦</div>

                    <strong>No Products Yet</strong>

                    <p>
                        Add your first product to get started.
                    </p>

                </td>

            </tr>

        `;

        updateProductStats();

        return;

    }


    tbody.innerHTML = products.map(product => {

        let stockStatus = "In Stock";

        let statusClass = "in-stock";


        if (product.stock <= 0) {

            stockStatus = "Out of Stock";

            statusClass = "out-stock";

        } else if (product.stock <= 5) {

            stockStatus = "Low Stock";

            statusClass = "low-stock";

        }


        const priceHTML = product.salePrice > 0

            ? `
                <strong>৳${product.salePrice}</strong>
                <del>৳${product.price}</del>
              `

            : `
                <strong>৳${product.price}</strong>
              `;


        return `

            <tr>

                <td>

                    <strong>
                        ${escapeProductText(product.name)}
                    </strong>

                </td>


                <td>
                    ${escapeProductText(product.category)}
                </td>


                <td>
                    ${priceHTML}
                </td>


                <td>
                    ${product.stock}
                </td>


                <td>

                    <span class="stock-badge ${statusClass}">
                        ${stockStatus}
                    </span>

                </td>


                <td>

                    <button
                        onclick="editProduct(${product.id})"
                    >
                        ✏️
                    </button>


                    <button
                        onclick="deleteProduct(${product.id})"
                    >
                        🗑️
                    </button>

                </td>

            </tr>

        `;

    }).join("");


    updateProductStats();

}


/* UPDATE STATS */

function updateProductStats() {

    const total =
        adminProducts.length;


    const active =
        adminProducts.filter(
            product => product.stock > 0
        ).length;


    const lowStock =
        adminProducts.filter(
            product =>
                product.stock > 0 &&
                product.stock <= 5
        ).length;


    const outOfStock =
        adminProducts.filter(
            product => product.stock <= 0
        ).length;


    const totalElement =
        document.getElementById("totalProducts");

    const activeElement =
        document.getElementById("activeProducts");

    const lowElement =
        document.getElementById("lowStockProducts");

    const outElement =
        document.getElementById("outOfStockProducts");


    if (totalElement)
        totalElement.innerText = total;


    if (activeElement)
        activeElement.innerText = active;


    if (lowElement)
        lowElement.innerText = lowStock;


    if (outElement)
        outElement.innerText = outOfStock;

}


/* SEARCH + FILTER */

function filterProducts() {

    const search =
        document.getElementById("productSearch")
            .value
            .toLowerCase()
            .trim();


    const category =
        document.getElementById("productCategoryFilter")
            .value;


    const stockFilter =
        document.getElementById("productStockFilter")
            .value;


    const filtered =
        adminProducts.filter(product => {

            const matchesSearch =
                product.name
                    .toLowerCase()
                    .includes(search);


            const matchesCategory =
                category === "all" ||
                product.category === category;


            let matchesStock = true;


            if (stockFilter === "in-stock") {

                matchesStock =
                    product.stock > 5;

            }


            if (stockFilter === "low-stock") {

                matchesStock =
                    product.stock > 0 &&
                    product.stock <= 5;

            }


            if (stockFilter === "out-stock") {

                matchesStock =
                    product.stock <= 0;

            }


            return (
                matchesSearch &&
                matchesCategory &&
                matchesStock
            );

        });


    renderProducts(filtered);

}


/* EDIT PRODUCT */

function editProduct(id) {

    const product =
        adminProducts.find(
            item => item.id === id
        );


    if (!product) return;


    editingProductId = id;


    document.getElementById("productName").value =
        product.name;

    document.getElementById("productCategory").value =
        product.category;

    document.getElementById("productStock").value =
        product.stock;

    document.getElementById("productPrice").value =
        product.price;

    document.getElementById("productSalePrice").value =
        product.salePrice || "";

    document.getElementById("productImage").value =
        product.image || "";

    document.getElementById("productDescription").value =
        product.description || "";

    document.getElementById("productFeatured").checked =
        product.featured;

    document.getElementById("productUpcoming").checked =
        product.upcoming;


    document
        .getElementById("productModal")
        .classList.add("show");

}


/* DELETE PRODUCT */

function deleteProduct(id) {

    const product =
        adminProducts.find(
            item => item.id === id
        );


    if (!product) return;


    const confirmed =
        confirm(
            `"${product.name}" delete করতে চান?`
        );


    if (!confirmed) return;


    adminProducts =
        adminProducts.filter(
            item => item.id !== id
        );


    saveProductsToStorage();

    renderProducts();

}


/* ESCAPE TEXT */

function escapeProductText(text) {

    return String(text)

        .replace(/&/g, "&amp;")

        .replace(/</g, "&lt;")

        .replace(/>/g, "&gt;")

        .replace(/"/g, "&quot;")

        .replace(/'/g, "&#039;");

}


/* INITIALIZE */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        loadProductsFromStorage();

    }
);
