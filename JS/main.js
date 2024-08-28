document.addEventListener('DOMContentLoaded', () => {

    document.querySelectorAll('.icons a').forEach(iconLink =>{
        iconLink.addEventListener('click', (event) => {
            const href = event.target.getAttribute('href');
            if (href && href !== '#') {
                event.preventDefault();
                window.location.href = href;
            }
        })
    })

    const loginIcon = document.getElementById('login-icon');
    const profileIcon = document.getElementById('profile-icon');
    
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('token');

    if (isLoggedIn) {
        loginIcon.style.display = 'none';
        profileIcon.style.display = 'block';
    } else {
        loginIcon.style.display = 'block';
        profileIcon.style.display = 'none';
    }
});

document.addEventListener('DOMContentLoaded', () => {
    // Set click listeners for links
    document.querySelectorAll('nav a, .icons a').forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const page = event.target.getAttribute('data-page');
            if (page) {
                loadPage(page);
            }
        });
    });

    function loadPage(page) {
        fetch(`pages/user/${page}.html`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text();
            })
            .then(content => {
                document.getElementById('main-content').innerHTML = content;
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    }

    loadPage('home');
});
