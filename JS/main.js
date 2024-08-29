document.addEventListener('DOMContentLoaded', () => {
    const mainContent = document.getElementById('main-content');

    // Assume these IDs are correct or adjust accordingly
    const loginIcon = document.querySelector('.icons .icon[href="pages/user/login.html"]');
    const profileIcon = document.querySelector('.icons .icon[data-page="profile"]');

    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('token');
    if (isLoggedIn) {
        if (loginIcon) loginIcon.style.display = 'none';
        if (profileIcon) profileIcon.style.display = 'block';
    } else {
        if (loginIcon) loginIcon.style.display = 'block';
        if (profileIcon) profileIcon.style.display = 'none';
    }

    // Set event listener for navigation and icon clicks using event delegation
    document.body.addEventListener('click', (event) => {
        const target = event.target;

        // Handle nav and icon link clicks
        if (target.matches('nav a, .icons a')) {
            event.preventDefault();

            const href = target.getAttribute('href');
            const page = target.getAttribute('data-page');

            if (href && href !== '#') {
                window.location.href = href; // Full page load for external links
            } else if (page) {
                loadPage(page); // Load page dynamically
            }
        }
    });

    // Function to load page content dynamically
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

                // Dynamically load the corresponding JavaScript for the page
                const script = document.createElement('script');
                script.src = `/JS/${page}.js`;
                document.body.appendChild(script);
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    }

    // Load the default home page on initial load
    loadPage('home');
});
