
document.addEventListener("DOMContentLoaded", () => {
    
    const sortSelect = document.getElementById("sort");
    const products = document.querySelectorAll(".clothes > div"); // NodeList
    const favIcons = document.querySelectorAll('.fav-icon');
    // const categoryNavbar = document.getElementById('category-navbar');

    // Function to sort products
    function sort(order) {
        const productsArray = Array.from(products); // Convert from NodeList to an array to sort it

        productsArray.sort((a, b) => {
            const priceA = parseFloat(a.querySelector(".price").textContent.replace("$", ""));
            const priceB = parseFloat(b.querySelector(".price").textContent.replace("$", ""));

            return order === "low-to-high" ? priceA - priceB : priceB - priceA;
        });

        // Reorder the products in the DOM
        const parent = document.querySelector(".clothes");
        productsArray.forEach(product => parent.appendChild(product));
    }

    // Apply sorting when selecting the sort order
    sortSelect.addEventListener("change", () => {
        const selectedValue = sortSelect.value;
        sort(selectedValue);
    });

    // Wishlist functionality
    favIcons.forEach(icon => {
        icon.addEventListener('click', () => {
            const product = icon.closest('.product-1, .product-2, .product-3');
            const productDetails = {
                image: product.querySelector('img').src,
                name: product.querySelector('p').textContent,
                price: product.querySelector('.price').textContent,
                sizes: Array.from(product.querySelectorAll('.Sizes button')).map(button => button.textContent)
            };
            
            // Store product details in localStorage
            let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
            wishlist.push(productDetails);
            localStorage.setItem('wishlist', JSON.stringify(wishlist));

            alert(`${productDetails.name} added to your wishlist!`);
        });
    });

    // Load and render categories from localStorage
    function renderCategories() {
        const categories = JSON.parse(localStorage.getItem('categories')) || [];
        const dropdownContent = document.querySelector('.dropdown-content');
        dropdownContent.innerHTML = ''; // Clear any existing categories

        if (categories.length === 0) {
            dropdownContent.innerHTML = '<a href="#">No categories available</a>';
            return;
        }

        categories.forEach(category => {
            const a = document.createElement('a');
            a.href = category.url || category.toLowerCase() + '.html';
            a.textContent = category.name || category;
            dropdownContent.appendChild(a);
        });
    }

    // Check if categories are already in localStorage, if not, prompt the user
    if (localStorage.getItem('categories')) {
        renderCategories();
    } else {
        console.warn('No categories found in localStorage');
        // Optionally, you could handle this case with a prompt or default categories here
    }

    // Listen for changes to localStorage to update the navbar when categories are changed
    window.addEventListener('storage', () => {
        renderCategories();
    });
});



















