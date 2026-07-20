/**
 * Uptotechsyl Final Optimized Master Script
 */
document.addEventListener('DOMContentLoaded', () => {
    // ১. মোবাইল মেনু লজিক
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const header = document.getElementById('main-header');

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            const icon = menuBtn.querySelector('i');
            icon.classList.toggle('fa-bars-staggered');
            icon.classList.toggle('fa-xmark');
        });
    }

    // ২. হেডার স্ক্রল এফেক্ট
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) header?.classList.add('bg-black/90', 'backdrop-blur-md', 'shadow-xl');
        else header?.classList.remove('bg-black/90', 'backdrop-blur-md', 'shadow-xl');
    });

    // ৩. ইউনিফাইড এনিমেশন (সব কার্ড ও পোর্টফোলিও)
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach((entry, index) => {
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
});
// সব contact-card গুলো খুঁজে বের করা
const cards = document.querySelectorAll('.contact-card');
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
        }
    });
}, { threshold: 0.1 });

cards.forEach((card, index) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(50px)";
    card.style.transition = `all 0.8s ease-out ${index * 0.1}s`; 
    observer.observe(card);
});
    
   
