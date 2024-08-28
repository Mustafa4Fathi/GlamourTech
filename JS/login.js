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

    let users = JSON.parse(localStorage.getItem('users')) || [];
    let existingUser = users.find(user => user.email === email);

    if (existingUser) {
        if (existingUser.password === password) {
            window.location.href = 'index.html';
        } else {
            errorMessage.textContent = 'Incorrect password. Please try again.';
            errorMessage.style.color = 'red';
            passwordInput.focus();
        }
    } else {
        errorMessage.textContent = 'This email is not registered. Please sign up.';
        errorMessage.style.color = 'red';
    }
});

document.querySelector('.sign-up form').addEventListener('submit', function(e) {
    e.preventDefault();

    let name = document.querySelector('.sign-up input[placeholder="Name"]').value;
    let email = document.querySelector('.sign-up input[placeholder="Email"]').value;
    let password = document.querySelector('.sign-up input[placeholder="Password"]').value;
    let emailInput = document.querySelector('.sign-up input[placeholder="Email"]');
    let errorMessage = document.querySelector('.sign-up .error-message');

    let users = JSON.parse(localStorage.getItem('users')) || [];
    let existingUser = users.find(user => user.email === email);

    if (!existingUser) {
        users.push({ name, email, password });
        localStorage.setItem('users', JSON.stringify(users));
        window.location.href = 'index.html';
    } else {
        errorMessage.textContent = 'This email is already registered. Please sign in.';
        errorMessage.style.color = 'yellow';
        emailInput.focus();
    }
});
