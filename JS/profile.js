// // Assuming the logged-in user's email is stored in localStorage after login
// const loggedInUserEmail = localStorage.getItem('loggedInUserEmail');

// // Function to fetch and display user data
// function fetchUserData() {
//   fetch('../data/customers.json') // Update the path to your JSON file
//     .then(response => {
//       if (!response.ok) {
//         throw new Error('Network response was not ok ' + response.statusText);
//       }
//       return response.json();
//     })
//     .then(data => {
//       // Find the user based on the logged-in user's email
//       const user = data.find(user => user.email === loggedInUserEmail);

//       // Check if user is found
//       if (user) {
//         displayUserData(user);
//       } else {
//         console.error('User not found');
//         // Optionally, handle user not found scenario
//       }
//     })
//     .catch(error => console.error('Error fetching user data:', error));
// }

// // Function to display user data on the profile page
// function displayUserData(user) {
//   document.getElementById('name').value = user.name;
//   document.getElementById('email').value = user.email;
//   document.getElementById('phone').value = user.phone;
//   document.getElementById('address').value = user.address;
// }

// // Switch between Profile and Orders sections
// function switchToProfile() {
//   document.getElementById('profileSection').style.display = 'block';
//   document.getElementById('ordersSection').style.display = 'none';
//   document.getElementById('profileTab').classList.add('active');
//   document.getElementById('ordersTab').classList.remove('active');
// }

// function switchToOrders() {
//   document.getElementById('profileSection').style.display = 'none';
//   document.getElementById('ordersSection').style.display = 'block';
//   document.getElementById('profileTab').classList.remove('active');
//   document.getElementById('ordersTab').classList.add('active');
// }

// // Attach event listeners to the tabs
// document.getElementById('profileTab').addEventListener('click', switchToProfile);
// document.getElementById('ordersTab').addEventListener('click', switchToOrders);

// // Call the function to fetch user data when the page loads
// window.onload = function() {
//   fetchUserData();
//   switchToProfile(); // Display the Profile section by default
// };

document.addEventListener('DOMContentLoaded', () => {
    const profileTab = document.getElementById('profile-tab');
    const ordersTab = document.getElementById('orders-tab');
    const profileSection = document.getElementById('profile-section');
    const ordersSection = document.getElementById('orders-section');
    const editBtn = document.getElementById('edit-btn');
    const updateBtn = document.getElementById('update-btn');
    const uploadBtn = document.getElementById('upload-btn');
    const uploadPicInput = document.getElementById('upload-pic');
    const profilePic = document.getElementById('profile-pic');
    const inputs = document.querySelectorAll('#profile-form input[type="text"], #profile-form input[type="email"]');

    let customerData = {};

    // Fetch customer data from JSON file
    fetch('../data/customers.json')
        .then(response => response.json())
        .then(data => {
            customerData = data;  // Assuming data is an object with customer details
            displayCustomerData(customerData);
        })
        .catch(error => console.error('Error fetching customer data:', error));

    function displayCustomerData(data) {
        document.getElementById('name').value = data.name || '';
        document.getElementById('email').value = data.email || '';
        document.getElementById('phone').value = data.phone || '';
        document.getElementById('address').value = data.address || '';
        profilePic.src = data.profilePicture || 'default-profile.png';
        loadOrders(data.orders);
    }

    function loadOrders(orders) {
        const deliveredOrdersContainer = document.getElementById('delivered-orders');
        const pendingOrdersContainer = document.getElementById('pending-orders');

        deliveredOrdersContainer.innerHTML = '';
        pendingOrdersContainer.innerHTML = '';

        orders.forEach(order => {
            const orderElement = document.createElement('div');
            orderElement.classList.add('order');
            orderElement.textContent = `Order ID: ${order.id}, Total: ${order.total}`;

            if (order.status === 'delivered') {
                deliveredOrdersContainer.appendChild(orderElement);
            } else if (order.status === 'pending') {
                pendingOrdersContainer.appendChild(orderElement);
            }
        });
    }

    // Tab switching
    profileTab.addEventListener('click', () => {
        profileTab.classList.add('active');
        ordersTab.classList.remove('active');
        profileSection.style.display = 'block';
        ordersSection.style.display = 'none';
    });

    ordersTab.addEventListener('click', () => {
        ordersTab.classList.add('active');
        profileTab.classList.remove('active');
        ordersSection.style.display = 'block';
        profileSection.style.display = 'none';
    });

    // Edit functionality
    editBtn.addEventListener('click', () => {
        inputs.forEach(input => input.removeAttribute('readonly'));
        editBtn.style.display = 'none';
        updateBtn.style.display = 'inline-block';
    });

    updateBtn.addEventListener('click', (e) => {
        e.preventDefault();
        inputs.forEach(input => input.setAttribute('readonly', true));
        editBtn.style.display = 'inline-block';
        updateBtn.style.display = 'none';
        
        customerData.name = document.getElementById('name').value;
        customerData.phone = document.getElementById('phone').value;
        customerData.address = document.getElementById('address').value;

        console.log('Updated customer data:', customerData);
    });

    // Upload image functionality
    uploadBtn.addEventListener('click', () => {
        uploadPicInput.click();
    });

    uploadPicInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                profilePic.src = e.target.result;
                customerData.profilePicture = e.target.result;  // Update the customer data
                console.log('Updated profile picture:', customerData.profilePicture);
            };
            reader.readAsDataURL(file);
        }
    });
});
