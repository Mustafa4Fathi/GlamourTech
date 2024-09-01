
document.addEventListener('DOMContentLoaded', () => {
    const mainContent = document.getElementById('main-content');
    const loginIcon = document.getElementById('login-icon');
    const profileIcon = document.getElementById('profile-icon');

    const isLoggedIn = localStorage.getItem('token');
    if (isLoggedIn) {
        loginIcon.style.display = 'none';
        profileIcon.style.display = 'block';
    } else {
        loginIcon.style.display = 'block';
        profileIcon.style.display = 'none';
    }

    document.body.addEventListener('click', (event) => {
        const target = event.target;
        if (target.matches('nav a, .icons a')) {
            event.preventDefault();
            const href = target.getAttribute('href');
            const page = target.getAttribute('data-page');

            if (href && href !== '#') {
                window.location.href = href;
            } else if (page) {
                loadPage(page);
            }
        }
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
                mainContent.innerHTML = content;

                const script = document.createElement('script');
                script.src = `/GlamourTech/JS/${page}.js`;
                script.onload = () => console.log(`${page}.js loaded successfully`);
                script.onerror = () => console.error(`Failed to load ${page}.js`);
                document.body.appendChild(script);
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    }

    loadPage('home');
});
