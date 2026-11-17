/**
 * مبادرة حكاية الشمال - الملف البرمجي التفاعلي (JavaScript)
 * برئاسة عامر الخوالدة
 * تم التحديث لدعم كافة الهواتف الذكية وتجربة استخدام لمسية مثالية (Touch Friendly)
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. تأثير شريط التنقل وزر الصعود للأعلى (Navbar & Scroll-to-Top)
    const navbar = document.getElementById('navbar');
    const scrollTopBtn = document.getElementById('scrollTopBtn');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        if (window.scrollY > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    }, { passive: true });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // 2. القائمة التفاعلية للهواتف المحمولة (Mobile Drawer & Backdrop)
    const mobileToggle = document.getElementById('mobileToggle');
    const navLinks = document.getElementById('navLinks');
    const navOverlay = document.getElementById('navOverlay');
    const drawerClose = document.getElementById('drawerClose');
    const navItems = document.querySelectorAll('.nav-item, .nav-cta');

    function openMobileMenu() {
        navLinks.classList.add('open');
        if (navOverlay) navOverlay.classList.add('active');
        document.body.classList.add('menu-open');
        mobileToggle.setAttribute('aria-expanded', 'true');
        const icon = mobileToggle.querySelector('i');
        if (icon) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-xmark');
        }
    }

    function closeMobileMenu() {
        navLinks.classList.remove('open');
        if (navOverlay) navOverlay.classList.remove('active');
        document.body.classList.remove('menu-open');
        mobileToggle.setAttribute('aria-expanded', 'false');
        const icon = mobileToggle.querySelector('i');
        if (icon) {
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
        }
    }

    mobileToggle.addEventListener('click', () => {
        if (navLinks.classList.contains('open')) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    });

    if (drawerClose) {
        drawerClose.addEventListener('click', closeMobileMenu);
    }

    if (navOverlay) {
        navOverlay.addEventListener('click', closeMobileMenu);
    }

    // إغلاق قائمة الموبايل فور النقر على أي رابط للانتقال السلس
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (navLinks.classList.contains('open')) {
                closeMobileMenu();
            }
        });
    });

    // 3. تتبع موضع القراءة وتحديد الرابط النشط تلقائياً (Scrollspy)
    const sections = document.querySelectorAll('section[id]');
    
    function updateActiveNavLink() {
        const scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 120;
            const sectionId = current.getAttribute('id');
            const correspondingLink = document.querySelector(`.nav-links a[href*="${sectionId}"]`);

            if (correspondingLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    correspondingLink.classList.add('active');
                } else {
                    correspondingLink.classList.remove('active');
                }
            }
        });
    }

    window.addEventListener('scroll', updateActiveNavLink, { passive: true });

    // 4. تصفية معالم المحافظات (Landmarks Filter Tabs)
    const filterButtons = document.querySelectorAll('.tab-btn');
    const landmarkCards = document.querySelectorAll('.landmark-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            landmarkCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = 'flex';
                    card.style.animation = 'fadeInUp 0.35s ease forwards';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // 5. نافذة عرض الشعار والبوستر الرسمي (Poster Lightbox Modal)
    const posterModal = document.getElementById('posterModal');
    const openPosterModalBtn = document.getElementById('openPosterModal');
    const modalCloseBtn = document.getElementById('modalClose');
    const modalBackdrop = document.getElementById('modalBackdrop');
    const featuredPosterImg = document.querySelector('.featured-poster');

    function openModal() {
        posterModal.classList.add('active');
        posterModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        posterModal.classList.remove('active');
        posterModal.setAttribute('aria-hidden', 'true');
        if (!navLinks.classList.contains('open')) {
            document.body.style.overflow = '';
        }
    }

    if (openPosterModalBtn) {
        openPosterModalBtn.addEventListener('click', openModal);
    }

    if (featuredPosterImg) {
        featuredPosterImg.addEventListener('click', openModal);
        featuredPosterImg.style.cursor = 'pointer';
    }

    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', closeModal);
    }

    if (modalBackdrop) {
        modalBackdrop.addEventListener('click', closeModal);
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (posterModal.classList.contains('active')) closeModal();
            if (navLinks.classList.contains('open')) closeMobileMenu();
        }
    });
});

// إضافة حركة انسيابية للبطاقات
const style = document.createElement('style');
style.innerHTML = `
@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(12px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
`;
document.head.appendChild(style);
