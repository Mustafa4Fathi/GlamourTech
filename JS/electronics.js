document.addEventListener("DOMContentLoaded", () => {
    const sortSelect = document.getElementById("sort");
    const products = document.querySelectorAll(".products > div");
    const favIcons = document.querySelectorAll('.fav-icon');
    const categoryNavbar = document.getElementById('category-navbar');

    // Function to sort products
    function sort(order) {
        const productsArray = Array.from(products);

        productsArray.sort((a, b) => {
            const priceA = parseFloat(a.querySelector(".price").textContent.replace("$", ""));
            const priceB = parseFloat(b.querySelector(".price").textContent.replace("$", ""));

            return order === "low-to-high" ? priceA - priceB : priceB - priceA;
        });

        // Reorder the products in the DOM
        const parent = document.querySelector(".products");
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
            };
            
            // Store product details in localStorage
            let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
            wishlist.push(productDetails);
            localStorage.setItem('wishlist', JSON.stringify(wishlist));

            alert(`${productDetails.name} added to your wishlist!`);
        });
    });

    // Function to render categories in the navbar
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
            a.href = category.toLowerCase() + '.html';
            a.textContent = category;
            dropdownContent.appendChild(a);
        });
    }

    // Fetch categories from localStorage on load
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

    // Functionality to handle category addition and removal
    document.getElementById('add-category').addEventListener('click', () => {
        const newCategory = prompt('Enter the name of the new category:');
        if (newCategory) {
            let categories = JSON.parse(localStorage.getItem('categories')) || [];
            categories.push(newCategory);
            localStorage.setItem('categories', JSON.stringify(categories));
            renderCategories();
            alert(`Category ${newCategory} added successfully!`);
        }
    });

    document.getElementById('remove-category').addEventListener('click', () => {
        const categoryToRemove = prompt('Enter the name of the category to remove:');
        if (categoryToRemove) {
            let categories = JSON.parse(localStorage.getItem('categories')) || [];
            categories = categories.filter(category => category.toLowerCase() !== categoryToRemove.toLowerCase());
            localStorage.setItem('categories', JSON.stringify(categories));
            renderCategories();
            alert(`Category ${categoryToRemove} removed successfully!`);
        }
    });
});
