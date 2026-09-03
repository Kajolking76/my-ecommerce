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
