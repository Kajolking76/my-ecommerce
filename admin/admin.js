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


/* =====================================================
   MULTIPLE PRODUCT IMAGE PREVIEW
===================================================== */

let selectedProductImages = [];


/* =====================================================
   PRODUCT SIZE & COLOR
===================================================== */

let selectedProductSizes = [];

let selectedProductColors = [];


/* =====================================================
   DOM READY
===================================================== */

document.addEventListener("DOMContentLoaded", function() {

    loadProductsFromStorage();

    setupProductImageInput();

});


/* =====================================================
   IMAGE INPUT
===================================================== */

function setupProductImageInput() {

    const imageInput =
        document.getElementById("productImages");

    if (!imageInput) return;


    imageInput.addEventListener("change", function() {

        selectedProductImages = [];

        const files =
            Array.from(this.files);


        files.forEach(function(file) {

            if (!file.type.startsWith("image/")) {
                return;
            }


            const reader =
                new FileReader();


            reader.onload = function(event) {

                selectedProductImages.push(
                    event.target.result
                );

                renderImagePreview();

            };


            reader.readAsDataURL(file);

        });

    });

}


/* =====================================================
   RENDER IMAGE PREVIEW
===================================================== */

function renderImagePreview() {

    const preview =
        document.getElementById("productImagePreview");

    if (!preview) return;


    preview.innerHTML = "";


    selectedProductImages.forEach(
        function(image, index) {

            const item =
                document.createElement("div");

            item.className =
                "product-image-preview-item";


            if (index === 0) {

                item.classList.add(
                    "product-image-main"
                );

            }


            const img =
                document.createElement("img");

            img.src = image;

            img.alt = "Product Image";


            item.appendChild(img);

            preview.appendChild(item);

        }
    );

}


/* =====================================================
   OPEN PRODUCT FORM
===================================================== */

function openProductForm() {

    const modal =
        document.getElementById("productModal");

    if (!modal) return;


    editingProductId = null;


    const form =
        document.getElementById("productForm");

    if (form) {
        form.reset();
    }


    selectedProductImages = [];

    selectedProductSizes = [];

    selectedProductColors = [];


    const imagePreview =
        document.getElementById("productImagePreview");

    if (imagePreview) {
        imagePreview.innerHTML = "";
    }


    renderSizeList();

    renderColorList();


    modal.classList.add("show");

}


/* =====================================================
   CLOSE PRODUCT FORM
===================================================== */

function closeProductForm() {

    const modal =
        document.getElementById("productModal");

    if (!modal) return;


    modal.classList.remove("show");

    editingProductId = null;

}


/* =====================================================
   ADD PRODUCT SIZE
===================================================== */

function addProductSize() {

    const input =
        document.getElementById("sizeInput");

    if (!input) return;


    const value =
        input.value.trim();


    if (!value) {

        alert("Size লিখুন।");

        return;

    }


    if (
        selectedProductSizes
            .some(size =>
                size.toLowerCase() === value.toLowerCase()
            )
    ) {

        alert("এই Size ইতিমধ্যে যোগ করা হয়েছে।");

        return;

    }


    selectedProductSizes.push(value);

    input.value = "";

    renderSizeList();

}


/* =====================================================
   RENDER SIZE LIST
===================================================== */

function renderSizeList() {

    const list =
        document.getElementById("sizeList");

    if (!list) return;


    list.innerHTML = "";


    selectedProductSizes.forEach(
        function(size, index) {

            const item =
                document.createElement("div");

            item.className =
                "variant-item";


            const text =
                document.createElement("span");

            text.innerText =
                size;


            const button =
                document.createElement("button");

            button.type = "button";

            button.innerText = "×";


            button.onclick = function() {

                removeProductSize(index);

            };


            item.appendChild(text);

            item.appendChild(button);

            list.appendChild(item);

        }
    );

}


/* =====================================================
   REMOVE PRODUCT SIZE
===================================================== */

function removeProductSize(index) {

    selectedProductSizes.splice(index, 1);

    renderSizeList();

}


/* =====================================================
   ADD PRODUCT COLOR
===================================================== */

function addProductColor() {

    const input =
        document.getElementById("colorInput");

    if (!input) return;


    const value =
        input.value.trim();


    if (!value) {

        alert("Color লিখুন।");

        return;

    }


    if (
        selectedProductColors
            .some(color =>
                color.toLowerCase() === value.toLowerCase()
            )
    ) {

        alert("এই Color ইতিমধ্যে যোগ করা হয়েছে।");

        return;

    }


    selectedProductColors.push(value);

    input.value = "";

    renderColorList();

}


/* =====================================================
   RENDER COLOR LIST
===================================================== */

function renderColorList() {

    const list =
        document.getElementById("colorList");

    if (!list) return;


    list.innerHTML = "";


    selectedProductColors.forEach(
        function(color, index) {

            const item =
                document.createElement("div");

            item.className =
                "variant-item";


            const text =
                document.createElement("span");

            text.innerText =
                color;


            const button =
                document.createElement("button");

            button.type = "button";

            button.innerText = "×";


            button.onclick = function() {

                removeProductColor(index);

            };


            item.appendChild(text);

            item.appendChild(button);

            list.appendChild(item);

        }
    );

}


/* =====================================================
   REMOVE PRODUCT COLOR
===================================================== */

function removeProductColor(index) {

    selectedProductColors.splice(index, 1);

    renderColorList();

}


/* =====================================================
   SAVE PRODUCT
===================================================== */

function saveProduct(event) {

    event.preventDefault();


    const nameElement =
        document.getElementById("productName");

    const categoryElement =
        document.getElementById("productCategory");

    const stockElement =
        document.getElementById("productStock");

    const priceElement =
        document.getElementById("productPrice");

    const salePriceElement =
        document.getElementById("productSalePrice");

    const descriptionElement =
        document.getElementById("productDescription");

    const featuredElement =
        document.getElementById("productFeatured");

    const upcomingElement =
        document.getElementById("productUpcoming");


    const name =
        nameElement
            ? nameElement.value.trim()
            : "";


    const category =
        categoryElement
            ? categoryElement.value
            : "";


    const stock =
        stockElement
            ? Number(stockElement.value)
            : 0;


    const price =
        priceElement
            ? Number(priceElement.value)
            : 0;


    const salePrice =
        salePriceElement
            ? Number(salePriceElement.value) || 0
            : 0;


    const description =
        descriptionElement
            ? descriptionElement.value.trim()
            : "";


    const featured =
        featuredElement
            ? featuredElement.checked
            : false;


    const upcoming =
        upcomingElement
            ? upcomingElement.checked
            : false;


    if (!name || !category) {

        alert("Product name এবং category দিন।");

        return;

    }


    /* =================================================
       KEEP OLD IMAGES WHEN EDITING
    ================================================= */

    let finalImages =
        selectedProductImages.length
            ? [...selectedProductImages]
            : [];


    if (
        editingProductId &&
        finalImages.length === 0
    ) {

        const oldProduct =
            adminProducts.find(
                item =>
                    item.id === editingProductId
            );


        if (oldProduct) {

            finalImages =
                oldProduct.images ||
                (
                    oldProduct.image
                        ? [oldProduct.image]
                        : []
                );

        }

    }


    const mainImage =
        finalImages.length > 0
            ? finalImages[0]
            : "";


    /* =================================================
       PRODUCT OBJECT
    ================================================= */

    const product = {

        id:
            editingProductId ||
            Date.now(),

        name:
            name,

        category:
            category,

        stock:
            stock,

        price:
            price,

        salePrice:
            salePrice,

        image:
            mainImage,

        images:
            finalImages,

        sizes:
            [...selectedProductSizes],

        colors:
            [...selectedProductColors],

        variants:
            [],

        description:
            description,

        featured:
            featured,

        upcoming:
            upcoming,

        createdAt:
            new Date().toISOString()

    };


    /* =================================================
       EDIT PRODUCT
    ================================================= */

    if (editingProductId) {

        const index =
            adminProducts.findIndex(
                item =>
                    item.id === editingProductId
            );


        if (index !== -1) {

            const oldProduct =
                adminProducts[index];


            /*
             * Keep old data if needed
             */

            product.createdAt =
                oldProduct.createdAt ||
                product.createdAt;


            if (
                selectedProductSizes.length === 0 &&
                oldProduct.sizes
            ) {

                product.sizes =
                    oldProduct.sizes;

            }


            if (
                selectedProductColors.length === 0 &&
                oldProduct.colors
            ) {

                product.colors =
                    oldProduct.colors;

            }


            product.variants =
                oldProduct.variants || [];


            adminProducts[index] =
                product;

        }

    }

    else {

        /* =============================================
           NEW PRODUCT
        ============================================= */

        adminProducts.push(product);

    }


    /* =================================================
       SAVE
    ================================================= */

    saveProductsToStorage();

    renderProducts();

    closeProductForm();


    alert(
        editingProductId
            ? "Product successfully updated!"
            : "Product successfully added!"
    );

}


/* =====================================================
   LOCAL STORAGE
===================================================== */

function saveProductsToStorage() {

    localStorage.setItem(
        "adminProducts",
        JSON.stringify(adminProducts)
    );

}


/* =====================================================
   LOAD PRODUCTS
===================================================== */

function loadProductsFromStorage() {

    const savedProducts =
        localStorage.getItem(
            "adminProducts"
        );


    if (savedProducts) {

        try {

            const parsed =
                JSON.parse(savedProducts);


            if (Array.isArray(parsed)) {

                adminProducts =
                    parsed;

            } else {

                adminProducts = [];

            }

        }

        catch (error) {

            console.error(
                "Product loading error:",
                error
            );

            adminProducts = [];

        }

    }


    renderProducts();

}


/* =====================================================
   RENDER PRODUCTS
===================================================== */

function renderProducts(
    products = adminProducts
) {

    const tbody =
        document.getElementById(
            "productTableBody"
        );

    if (!tbody) return;


    const count =
        document.getElementById(
            "productCount"
        );


    if (count) {

        count.innerText =
            `${products.length} Products`;

    }


    if (products.length === 0) {

        tbody.innerHTML = `

            <tr>

                <td
                    colspan="6"
                    class="no-products"
                >

                    <div>📦</div>

                    <strong>
                        No Products Yet
                    </strong>

                    <p>
                        Add your first product to get started.
                    </p>

                </td>

            </tr>

        `;


        updateProductStats();

        return;

    }


    tbody.innerHTML =
        products.map(
            function(product) {

                let stockStatus =
                    "In Stock";


                let statusClass =
                    "in-stock";


                if (product.stock <= 0) {

                    stockStatus =
                        "Out of Stock";

                    statusClass =
                        "out-stock";

                }

                else if (product.stock <= 5) {

                    stockStatus =
                        "Low Stock";

                    statusClass =
                        "low-stock";

                }


                const salePrice =
                    Number(product.salePrice) || 0;


                const regularPrice =
                    Number(product.price) || 0;


                const priceHTML =
                    salePrice > 0

                        ? `
                            <strong>
                                ৳${salePrice}
                            </strong>

                            <del>
                                ৳${regularPrice}
                            </del>
                          `

                        : `
                            <strong>
                                ৳${regularPrice}
                            </strong>
                          `;


                return `

                    <tr>

                        <td>

                            <strong>
                                ${escapeProductText(
                                    product.name
                                )}
                            </strong>

                        </td>


                        <td>
                            ${escapeProductText(
                                product.category
                            )}
                        </td>


                        <td>
                            ${priceHTML}
                        </td>


                        <td>
                            ${product.stock}
                        </td>


                        <td>

                            <span
                                class="stock-badge ${statusClass}"
                            >
                                ${stockStatus}
                            </span>

                        </td>


                        <td>

                            <button
                                type="button"
                                onclick="editProduct(${product.id})"
                            >
                                ✏️
                            </button>


                            <button
                                type="button"
                                onclick="deleteProduct(${product.id})"
                            >
                                🗑️
                            </button>

                        </td>

                    </tr>

                `;

            }
        ).join("");


    updateProductStats();

}


/* =====================================================
   UPDATE PRODUCT STATS
===================================================== */

function updateProductStats() {

    const total =
        adminProducts.length;


    const active =
        adminProducts.filter(
            function(product) {

                return product.stock > 0;

            }
        ).length;


    const lowStock =
        adminProducts.filter(
            function(product) {

                return (
                    product.stock > 0 &&
                    product.stock <= 5
                );

            }
        ).length;


    const outOfStock =
        adminProducts.filter(
            function(product) {

                return product.stock <= 0;

            }
        ).length;


    const totalElement =
        document.getElementById(
            "totalProducts"
        );


    const activeElement =
        document.getElementById(
            "activeProducts"
        );


    const lowElement =
        document.getElementById(
            "lowStockProducts"
        );


    const outElement =
        document.getElementById(
            "outOfStockProducts"
        );


    if (totalElement) {

        totalElement.innerText =
            total;

    }


    if (activeElement) {

        activeElement.innerText =
            active;

    }


    if (lowElement) {

        lowElement.innerText =
            lowStock;

    }


    if (outElement) {

        outElement.innerText =
            outOfStock;

    }

}


/* =====================================================
   SEARCH + FILTER
===================================================== */

function filterProducts() {

    const searchElement =
        document.getElementById(
            "productSearch"
        );


    const categoryElement =
        document.getElementById(
            "productCategoryFilter"
        );


    const stockElement =
        document.getElementById(
            "productStockFilter"
        );


    const search =
        searchElement
            ? searchElement.value
                .toLowerCase()
                .trim()
            : "";


    const category =
        categoryElement
            ? categoryElement.value
            : "all";


    const stockFilter =
        stockElement
            ? stockElement.value
            : "all";


    const filtered =
        adminProducts.filter(
            function(product) {

                const productName =
                    String(
                        product.name || ""
                    ).toLowerCase();


                const matchesSearch =
                    productName.includes(
                        search
                    );


                const matchesCategory =
                    category === "all" ||
                    product.category === category;


                let matchesStock =
                    true;


                if (
                    stockFilter ===
                    "in-stock"
                ) {

                    matchesStock =
                        product.stock > 5;

                }


                if (
                    stockFilter ===
                    "low-stock"
                ) {

                    matchesStock =
                        product.stock > 0 &&
                        product.stock <= 5;

                }


                if (
                    stockFilter ===
                    "out-stock"
                ) {

                    matchesStock =
                        product.stock <= 0;

                }


                return (
                    matchesSearch &&
                    matchesCategory &&
                    matchesStock
                );

            }
        );


    renderProducts(filtered);

}


/* =====================================================
   EDIT PRODUCT
===================================================== */

function editProduct(id) {

    const product =
        adminProducts.find(
            function(item) {

                return item.id === id;

            }
        );


    if (!product) return;


    editingProductId =
        id;


    const nameElement =
        document.getElementById(
            "productName"
        );


    const categoryElement =
        document.getElementById(
            "productCategory"
        );


    const stockElement =
        document.getElementById(
            "productStock"
        );


    const priceElement =
        document.getElementById(
            "productPrice"
        );


    const salePriceElement =
        document.getElementById(
            "productSalePrice"
        );


    const descriptionElement =
        document.getElementById(
            "productDescription"
        );


    const featuredElement =
        document.getElementById(
            "productFeatured"
        );


    const upcomingElement =
        document.getElementById(
            "productUpcoming"
        );


    if (nameElement) {

        nameElement.value =
            product.name || "";

    }


    if (categoryElement) {

        categoryElement.value =
            product.category || "";

    }


    if (stockElement) {

        stockElement.value =
            product.stock ?? 0;

    }


    if (priceElement) {

        priceElement.value =
            product.price ?? 0;

    }


    if (salePriceElement) {

        salePriceElement.value =
            product.salePrice || "";

    }


    if (descriptionElement) {

        descriptionElement.value =
            product.description || "";

    }


    if (featuredElement) {

        featuredElement.checked =
            !!product.featured;

    }


    if (upcomingElement) {

        upcomingElement.checked =
            !!product.upcoming;

    }


    /* =================================================
       LOAD IMAGES
    ================================================= */

    selectedProductImages =
        product.images
            ? [...product.images]
            : (
                product.image
                    ? [product.image]
                    : []
            );


    renderImagePreview();


    /* =================================================
       LOAD SIZE
    ================================================= */

    selectedProductSizes =
        product.sizes
            ? [...product.sizes]
            : [];


    renderSizeList();


    /* =================================================
       LOAD COLOR
    ================================================= */

    selectedProductColors =
        product.colors
            ? [...product.colors]
            : [];


    renderColorList();


    const modal =
        document.getElementById(
            "productModal"
        );


    if (modal) {

        modal.classList.add("show");

    }

}


/* =====================================================
   DELETE PRODUCT
===================================================== */

function deleteProduct(id) {

    const product =
        adminProducts.find(
            function(item) {

                return item.id === id;

            }
        );


    if (!product) return;


    const confirmed =
        confirm(
            `"${product.name}" delete করতে চান?`
        );


    if (!confirmed) return;


    adminProducts =
        adminProducts.filter(
            function(item) {

                return item.id !== id;

            }
        );


    saveProductsToStorage();

    renderProducts();

}


/* =====================================================
   ESCAPE TEXT
===================================================== */

function escapeProductText(text) {

    return String(text || "")

        .replace(
            /&/g,
            "&amp;"
        )

        .replace(
            /</g,
            "&lt;"
        )

        .replace(
            />/g,
            "&gt;"
        )

        .replace(
            /"/g,
            "&quot;"
        )

        .replace(
            /'/g,
            "&#039;"
        );

}


/* =====================================================
   CLOSE MODAL WHEN CLICKING OUTSIDE
===================================================== */

document.addEventListener(
    "click",
    function(event) {

        const modal =
            document.getElementById(
                "productModal"
            );


        if (!modal) return;


        if (
            event.target === modal
        ) {

            closeProductForm();

        }

    }
);


/* =====================================================
   ENTER KEY FOR SIZE
===================================================== */

document.addEventListener(
    "keydown",
    function(event) {

        if (
            event.key !== "Enter"
        ) {
            return;
        }


        const activeElement =
            document.activeElement;


        if (
            activeElement &&
            activeElement.id ===
            "sizeInput"
        ) {

            event.preventDefault();

            addProductSize();

        }


        if (
            activeElement &&
            activeElement.id ===
            "colorInput"
        ) {

            event.preventDefault();

            addProductColor();

        }

    }
);


/* =====================================================
   ESC KEY CLOSE MODAL
===================================================== */

document.addEventListener(
    "keydown",
    function(event) {

        if (
            event.key === "Escape"
        ) {

            const modal =
                document.getElementById(
                    "productModal"
                );


            if (
                modal &&
                modal.classList.contains("show")
            ) {

                closeProductForm();

            }

        }

    }
);
