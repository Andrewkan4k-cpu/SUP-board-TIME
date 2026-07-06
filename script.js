// ================= ЛАЙТБОКС (ГАЛЕРЕЯ) =================

const galleryImages = document.querySelectorAll(".gallery img");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeBtn = document.querySelector(".close-lightbox");

function openLightbox(img){
    lightbox.style.display = "flex";
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    closeBtn.focus();
}

function closeLightbox(){
    lightbox.style.display = "none";
    lightboxImg.src = "";
}

galleryImages.forEach(img => {

    img.addEventListener("click", () => openLightbox(img));

    // Доступность: открытие по Enter/Space, т.к. изображения фокусируемы (tabindex="0")
    img.addEventListener("keydown", (e) => {
        if(e.key === "Enter" || e.key === " "){
            e.preventDefault();
            openLightbox(img);
        }
    });

});

closeBtn.addEventListener("click", closeLightbox);

lightbox.addEventListener("click", (e) => {
    if(e.target === lightbox){
        closeLightbox();
    }
});

document.addEventListener("keydown", (e) => {
    if(e.key === "Escape" && lightbox.style.display === "flex"){
        closeLightbox();
    }
});

// ================= БУРГЕР-МЕНЮ =================

const burger = document.getElementById("burger");
const menu = document.getElementById("menu");

function closeMenu(){
    menu.classList.remove("active");
    burger.classList.remove("active");
    burger.setAttribute("aria-expanded", "false");
}

burger.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("active");
    burger.classList.toggle("active", isOpen);
    burger.setAttribute("aria-expanded", String(isOpen));
});

document.querySelectorAll(".menu a").forEach(link => {
    link.addEventListener("click", closeMenu);
});

// Закрываем мобильное меню, если окно расширили до десктопа
window.addEventListener("resize", () => {
    if(window.innerWidth > 768){
        closeMenu();
    }
});

// ================= ШАПКА ПРИ СКРОЛЛЕ + АКТИВНЫЙ ПУНКТ МЕНЮ =================
// Оба эффекта объединены в один обработчик scroll + requestAnimationFrame,
// чтобы не пересчитывать раскладку дважды на каждый кадр.

const header = document.querySelector(".header");
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".menu a");

let ticking = false;

function updateOnScroll(){

    const scrollY = window.scrollY;

    header.classList.toggle("scrolled", scrollY > 50);

    let current = "";

    sections.forEach(section => {
        const top = section.offsetTop - 120;
        if(scrollY >= top){
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.toggle("active", link.getAttribute("href") === "#" + current);
    });

    ticking = false;
}

window.addEventListener("scroll", () => {
    if(!ticking){
        requestAnimationFrame(updateOnScroll);
        ticking = true;
    }
});

updateOnScroll();

// ================= ПОЯВЛЕНИЕ БЛОКОВ ПРИ СКРОЛЛЕ =================

const revealTargets = document.querySelectorAll(".hidden");

if("IntersectionObserver" in window){

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if(entry.isIntersecting){
                entry.target.classList.add("show");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    revealTargets.forEach(el => revealObserver.observe(el));

}else{
    // Фолбэк для очень старых браузеров без поддержки IntersectionObserver
    revealTargets.forEach(el => el.classList.add("show"));
}

// ================= ГОД В ФУТЕРЕ =================

const yearEl = document.getElementById("year");
if(yearEl){
    yearEl.textContent = new Date().getFullYear();
}
