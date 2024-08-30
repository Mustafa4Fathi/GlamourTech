const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});

document.querySelector('.sign-in form').addEventListener('submit', function(e) {
    e.preventDefault();

    let email = document.querySelector('.sign-in input[type="email"]').value;
    let password = document.querySelector('.sign-in input[type="password"]').value;
    let passwordInput = document.querySelector('.sign-in input[type="password"]');
    let errorMessage = document.querySelector('.sign-in .error-message');

    // Fetch users from the server
    fetch('/api/customers')
        .then(response => response.json())
        .then(users => {
            let existingUser = users.find(user => user.email === email);

            if (existingUser) {
                if (existingUser.password === password) {
                    // Store token to indicate login status
                    localStorage.setItem('token', 'true');
                    window.location.href = '../index.html';
                } else {
                    errorMessage.textContent = 'Incorrect password. Please try again.';
                    errorMessage.style.color = 'red';
                    passwordInput.focus();
                }
            } else {
                errorMessage.textContent = 'This email is not registered. Please sign up.';
                errorMessage.style.color = 'red';
            }
        })
        .catch(error => console.error('Error fetching user data:', error));
});

document.querySelector('.sign-up form').addEventListener('submit', function(e) {
    e.preventDefault();

    let name = document.querySelector('.sign-up input[placeholder="Name"]').value;
    let email = document.querySelector('.sign-up input[placeholder="Email"]').value;
    let password = document.querySelector('.sign-up input[placeholder="Password"]').value;
    let emailInput = document.querySelector('.sign-up input[placeholder="Email"]');
    let errorMessage = document.querySelector('.sign-up .error-message');

    fetch('/api/customers')
        .then(response => response.json())
        .then(users => {
            let existingUser = users.find(user => user.email === email);

            if (!existingUser) {
                // Save new user via the server
                fetch('/api/customers', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ name, email, password })
                })
                .then(() => {
                    // Store token to indicate login status
                    localStorage.setItem('token', 'true');
                    window.location.href = '../index.html';
                })
                .catch(error => console.error('Error saving user data:', error));
            } else {
                errorMessage.textContent = 'This email is already registered. Please sign in.';
                errorMessage.style.color = 'yellow';
                emailInput.focus();
            }
        })
        .catch(error => console.error('Error fetching user data:', error));
});
