document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('.nav-link');
    const contentDiv = document.getElementById('main-content');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();  
            const url = e.target.getAttribute('href');

            fetch(url)
                .then(response => response.text())
                .then(data => {
                    contentDiv.innerHTML = data;  
                })
                .catch(error => {
                    contentDiv.innerHTML = `<p>Error loading content: ${error.message}</p>`;
                });
        });
    });
});
