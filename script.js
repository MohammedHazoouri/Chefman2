document.addEventListener('DOMContentLoaded', () => {
    // 1. شاشة التحميل
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }, 1500);

    // 2. التحكم في قائمة الموبايل
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // إغلاق القائمة عند الضغط على أي رابط (للموبايل)
    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });

    // 3. نظام الفلترة للمنيو
    const filterBtns = document.querySelectorAll('.filter-btn');
    const menuCards = document.querySelectorAll('.menu-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // تحديث الزر النشط
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            menuCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.classList.remove('hidden');
                    // إضافة تأثير ظهور
                    card.style.animation = 'fadeIn 0.5s ease forwards';
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });

    // 4. نظام المودال (النافذة المنبثقة) للوجبات
    const modal = document.getElementById('menu-modal');
    const modalImg = document.getElementById('modal-img');
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-desc');
    const modalPrice = document.getElementById('modal-price');
    const closeBtn = document.querySelector('.close-modal');

    menuCards.forEach(card => {
        card.addEventListener('click', () => {
            const img = card.querySelector('img').src;
            const title = card.querySelector('h3').innerText;
            const desc = card.getAttribute('data-desc');
            const price = card.getAttribute('data-price');

            modalImg.src = img;
            modalTitle.innerText = title;
            modalDesc.innerText = desc;
            modalPrice.innerText = price;

            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden'; // منع التمرير عند فتح المودال

            // إضافة حركة "BOOM" عند فتح المودال
            modal.querySelector('.modal-content').animate([
                { transform: 'scale(0) rotate(-20deg)', opacity: 0 },
                { transform: 'scale(1.1) rotate(5deg)', opacity: 1 },
                { transform: 'scale(1) rotate(0deg)', opacity: 1 }
            ], {
                duration: 500,
                easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)'
            });
        });
    });

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // 5. حركات الماوس على الأزرار
    const buttons = document.querySelectorAll('.cta-button, .order-btn');
    buttons.forEach(btn => {
        btn.addEventListener('mouseover', () => {
            btn.style.transform = 'scale(1.1) rotate(2deg)';
        });
        btn.addEventListener('mouseout', () => {
            btn.style.transform = 'scale(1) rotate(0deg)';
        });
    });
});

// إضافة أنيميشن الظهور للـ CSS ديناميكياً
const style = document.createElement('style');
style.innerHTML = `
@keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
}
`;
document.head.appendChild(style);
