/**
 * Uptotechsyl Final Optimized Master Script
 * One script for all pages: Home, About, Service, Contact, Portfolio
 */
// Hero Section Image Slider
const slides = document.querySelectorAll('.hero-slide');
let slideIndex = 0;

function showNextSlide() {
    // বর্তমান স্লাইড হাইড করা
    slides[slideIndex].classList.replace('opacity-100', 'opacity-0');
    
    // পরের স্লাইড ইনডেক্স বের করা
    slideIndex = (slideIndex + 1) % slides.length;
    
    // পরের স্লাইড শো করা
    slides[slideIndex].classList.replace('opacity-0', 'opacity-100');
}

// প্রতি ৫ সেকেন্ড পর পর ইমেজ চেঞ্জ হবে
setInterval(showNextSlide, 5000);
// ১. পোর্টফোলিও ফিল্টার ফাংশন (Global Scope)
function filterPortfolio(category, btn) {
    const items = document.querySelectorAll('.portfolio-item');
    const buttons = document.querySelectorAll('.filter-btn');

    buttons.forEach(b => {
        b.classList.remove('bg-primary', 'text-black', 'active');
        b.classList.add('text-gray-400', 'border-white/10');
    });
    
    btn.classList.add('bg-primary', 'text-black', 'active');
    btn.classList.remove('text-gray-400', 'border-white/10');

    items.forEach(item => {
        item.style.transition = 'all 0.4s ease-in-out';
        if (category === 'all' || item.classList.contains(category)) {
            item.style.display = 'block';
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'scale(1)';
            }, 10);
        } else {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.8)';
            setTimeout(() => { item.style.display = 'none'; }, 400);
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {

    // --- ২. অল-ইন-ওয়ান রিভিল এনিমেশন (Contact, Services, Pricing, Team) ---
    const revealItems = document.querySelectorAll('.group, .pricing-card, .contact-card, .team-card');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const target = entry.target;
                target.style.opacity = '1';
                
                // গোল্ডেন কার্ডের জন্য স্কেল মেইনটেইন করা
                if (target.classList.contains('btn-golden') && target.classList.contains('pricing-card')) {
                    target.style.transform = 'translateY(0) scale(1.05)';
                } else {
                    target.style.transform = 'translateY(0) scale(1)';
                }
                revealObserver.unobserve(target); // এনিমেশন একবার হলে অবজার্ভার বন্ধ
            }
        });
    }, { threshold: 0.15 });

    revealItems.forEach((item) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(60px)';
        item.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        revealObserver.observe(item);
    });

    // --- ৩. পোর্টফোলিও কার্ড এনিমেশন (Slide from Right) ---
    const portfolioCards = document.querySelectorAll('#portfolio .group, .portfolio-item');
    const portObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
                portObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    portfolioCards.forEach((card) => {
        card.style.opacity = '0';
        card.style.transform = 'translateX(60px)';
        card.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        portObserver.observe(card);
    });

    // --- ৪. মোবাইল মেনু এবং হেডার লজিক ---
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const header = document.getElementById('main-header');

    if (menuBtn && mobileMenu) {
        const menuIcon = menuBtn.querySelector('i');
        menuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            mobileMenu.classList.toggle('hidden');
            mobileMenu.classList.toggle('flex');
            if (menuIcon) {
                menuIcon.classList.toggle('fa-bars-staggered');
                menuIcon.classList.toggle('fa-xmark');
            }
        });
    }

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) header?.classList.add('bg-black/90', 'backdrop-blur-md', 'shadow-xl');
        else header?.classList.remove('bg-black/90', 'backdrop-blur-md', 'shadow-xl');
    });

    // --- ৫. কাউন্টার এনিমেশন ---
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