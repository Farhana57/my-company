document.addEventListener('DOMContentLoaded', () => {
    // ১. মোবাইল মেনু লজিক
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const header = document.getElementById('main-header');

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            mobileMenu.classList.toggle('hidden');
            mobileMenu.classList.toggle('flex');
            const icon = menuBtn.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-xmark');
            }
        });

        document.addEventListener('click', (e) => {
            if (!mobileMenu.contains(e.target) && e.target !== menuBtn) {
                mobileMenu.classList.add('hidden');
                mobileMenu.classList.remove('flex');
                const icon = menuBtn.querySelector('i');
                if (icon) {
                    icon.classList.add('fa-bars');
                    icon.classList.remove('fa-xmark');
                }
            }
        });
    }

    // ২. হেডার স্ক্রল এফেক্ট
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) header?.classList.add('bg-black/90', 'backdrop-blur-md', 'shadow-xl');
        else header?.classList.remove('bg-black/90', 'backdrop-blur-md', 'shadow-xl');
    });

    // ৩. ইউনিফাইড এনিমেশন (সব কার্ড)
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.group, .pricing-card, .contact-card, .team-card, .portfolio-item').forEach((el) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px)';
        el.style.transition = 'all 0.8s ease-out';
        observer.observe(el);
    });

    // ৪. পোর্টফোলিও ফিল্টার
    window.filterPortfolio = function(category, btn) {
        const items = document.querySelectorAll('.portfolio-item');
        document.querySelectorAll('.filter-btn').forEach(b => {
            b.classList.remove('bg-primary', 'text-black', 'active');
            b.classList.add('text-gray-400', 'border-white/10');
        });
        btn.classList.add('bg-primary', 'text-black', 'active');
        btn.classList.remove('text-gray-400', 'border-white/10');

        items.forEach(item => {
            if (category === 'all' || item.classList.contains(category)) {
                item.style.display = 'block';
                setTimeout(() => { item.style.opacity = '1'; }, 50);
            } else {
                item.style.opacity = '0';
                setTimeout(() => { item.style.display = 'none'; }, 400);
            }
        });
    };

    // ৫. কাউন্টার এনিমেশন
    const statsSection = document.getElementById('stats');
    if (statsSection) {
        const obs = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                document.querySelectorAll('.counter').forEach(counter => {
                    const target = +counter.getAttribute('data-target');
                    const updateCount = () => {
                        const current = +counter.innerText;
                        const inc = target / 50;
                        if (current < target) {
                            counter.innerText = Math.ceil(current + inc);
                            setTimeout(updateCount, 30);
                        } else counter.innerText = target;
                    };
                    updateCount();
                });
                obs.unobserve(statsSection);
            }
        }, { threshold: 0.5 });
        obs.observe(statsSection);
    }

    // ৬. Scroll to Top Button
    const scrollBtn = document.getElementById('scrollToTop');
    if (scrollBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollBtn.style.opacity = '1';
                scrollBtn.style.visibility = 'visible';
            } else {
                scrollBtn.style.opacity = '0';
                scrollBtn.style.visibility = 'hidden';
            }
        });

        scrollBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});