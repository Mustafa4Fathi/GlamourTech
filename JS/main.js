document.addEventListener('DOMContentLoaded', () => {
    const mainContent = document.getElementById('main-content');
    const navLinks = document.querySelectorAll('nav a[data-page], .icons a[data-page]');

    // تحميل الصفحة الافتراضية عند تحميل الصفحة
    loadPage('home.html');

    // إعداد مستمعين للأحداث لكل رابط
    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const page = event.target.getAttribute('data-page');
            loadPage(`${page}.html`);
        });
    });

    // دالة لتحميل الصفحة باستخدام AJAX
    function loadPage(page) {
        fetch(page)
            .then(response => response.text())
            .then(data => {
                mainContent.innerHTML = data;

                // إذا كانت الصفحة التي تم تحميلها هي profile.html، قم بإعداد الأحداث
                if (page === 'profile.html') {
                    setupProfilePage();
                }
            })
            .catch(error => {
                mainContent.innerHTML = `<p>Error loading page: ${error}</p>`;
            });
    }

    // إعداد أحداث صفحة البروفايل
    function setupProfilePage() {
        const profileSection = document.getElementById('profile-section');
        const ordersSection = document.getElementById('orders-section');

        // تعيين العرض الافتراضي
        profileSection.style.display = 'block';
        ordersSection.style.display = 'none';

        // تعيين الأحداث للتبديل بين الأقسام
        document.querySelector('aside ul li a[href="#profile"]').addEventListener('click', (event) => {
            event.preventDefault();
            profileSection.style.display = 'block';
            ordersSection.style.display = 'none';
        });

        document.querySelector('aside ul li a[href="#orders"]').addEventListener('click', (event) => {
            event.preventDefault();
            profileSection.style.display = 'none';
            ordersSection.style.display = 'block';
        });

        // تعيين حدث تسجيل الخروج
        document.querySelector('aside ul li a[onclick="signOut()"]').addEventListener('click', signOut);
    }

    // دالة تسجيل الخروج
    function signOut() {
        alert("You have been signed out.");
        // يمكن إضافة وظائف إضافية لتسجيل الخروج هنا
    }
});
