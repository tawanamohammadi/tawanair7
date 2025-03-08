// افکت تایپ برای عناوین
function typeWriter(element, text, i = 0) {
    if (i < text.length) {
        element.innerHTML += text.charAt(i);
        i++;
        setTimeout(() => typeWriter(element, text, i), 100);
    }
}

// اضافه کردن کلاس برای انیمیشن به المان‌ها در هنگام اسکرول
function handleScrollAnimations() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach(element => {
        if (isElementInViewport(element)) {
            element.classList.add('visible');
        }
    });
}

// تشخیص المان در viewport
function isElementInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// اجرای اسکریپت‌ها بعد از لود صفحه
document.addEventListener('DOMContentLoaded', () => {
    // افکت تایپ برای عنوان اصلی
    const mainTitle = document.querySelector('.terminal-prompt');
    if (mainTitle) {
        const originalText = mainTitle.textContent;
        mainTitle.textContent = '';
        typeWriter(mainTitle, originalText);
    }

    // اضافه کردن event listener برای انیمیشن‌های اسکرول
    window.addEventListener('scroll', handleScrollAnimations);
    handleScrollAnimations();
});