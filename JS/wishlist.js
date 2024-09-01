

document.addEventListener("DOMContentLoaded", () => {
    const wishlistContainer = document.querySelector('.wishlist-container'); 
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

    wishlist.forEach(item => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('wishlist-product');

        productDiv.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <p>${item.name}</p>
            <p>${item.price}</p>
            
        `;

        wishlistContainer.appendChild(productDiv);
    });

});
