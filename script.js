 /* ========================================
   AMANOKROM WEBSITE JAVASCRIPT
======================================== */


/* ========================================
   MOBILE NAVIGATION
======================================== */

const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");
const siteBody = document.body;

if (menuToggle && mainNav) {

    menuToggle.addEventListener("click", function () {

        const isOpen = mainNav.classList.toggle("show");

        menuToggle.setAttribute("aria-expanded", isOpen);
        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Close navigation menu" : "Open navigation menu"
        );

        menuToggle.innerHTML = isOpen
            ? '<i class="fas fa-times"></i>'
            : '<i class="fas fa-bars"></i>';

        siteBody.classList.toggle("menu-open", isOpen);

    });


    // Close the menu when a normal navigation link is clicked

    mainNav.querySelectorAll("a").forEach(function (link) {

        link.addEventListener("click", function () {

            const parent = link.closest(".has-dropdown");

            // Allow dropdown parent links to open their submenu on mobile.
            // Other links close the menu.

            if (
                window.innerWidth <= 900 &&
                parent &&
                link.classList.contains("nav-link")
            ) {
                return;
            }

            closeMobileMenu();

        });

    });


    // Close the menu when clicking outside it

    document.addEventListener("click", function (event) {

        if (
            window.innerWidth <= 900 &&
            mainNav.classList.contains("show") &&
            !mainNav.contains(event.target) &&
            !menuToggle.contains(event.target)
        ) {
            closeMobileMenu();
        }

    });

}


function closeMobileMenu() {

    if (!mainNav || !menuToggle) return;

    mainNav.classList.remove("show");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';

    siteBody.classList.remove("menu-open");

}


/* ========================================
   MOBILE DROPDOWN MENUS
======================================== */

const dropdownParents = document.querySelectorAll(".has-dropdown");

dropdownParents.forEach(function (parent) {

    const dropdownLink = parent.querySelector(":scope > .nav-link");

    if (!dropdownLink) return;

    dropdownLink.addEventListener("click", function (event) {

        if (window.innerWidth <= 900) {

            event.preventDefault();

            const isOpen = parent.classList.toggle("open");

            dropdownLink.setAttribute("aria-expanded", isOpen);

        }

    });

});


/* ========================================
   HERO CAROUSEL
======================================== */

const heroSlides = document.querySelectorAll(".hero-slide");
const heroDotsContainer = document.getElementById("heroDots");
const heroPrev = document.getElementById("heroPrev");
const heroNext = document.getElementById("heroNext");

let currentSlide = 0;
let carouselTimer = null;

const carouselDelay = 6000;


if (heroSlides.length > 0) {

    // Create the navigation dots

    if (heroDotsContainer) {

        heroDotsContainer.innerHTML = "";

        heroSlides.forEach(function (slide, index) {

            const dot = document.createElement("button");

            dot.type = "button";
            dot.className = "hero-dot";

            dot.setAttribute(
                "aria-label",
                "Show slide " + (index + 1)
            );

            dot.addEventListener("click", function () {
                showSlide(index);
                restartCarousel();
            });

            heroDotsContainer.appendChild(dot);

        });

    }


    function showSlide(index) {

        heroSlides[currentSlide].classList.remove("active");

        const dots = heroDotsContainer
            ? heroDotsContainer.querySelectorAll(".hero-dot")
            : [];

        if (dots[currentSlide]) {
            dots[currentSlide].classList.remove("active");
        }

        currentSlide = (index + heroSlides.length) % heroSlides.length;

        heroSlides[currentSlide].classList.add("active");

        if (dots[currentSlide]) {
            dots[currentSlide].classList.add("active");
        }

    }


    function nextSlide() {
        showSlide(currentSlide + 1);
    }


    function previousSlide() {
        showSlide(currentSlide - 1);
    }


    function startCarousel() {

        stopCarousel();

        if (
            heroSlides.length > 1 &&
            !window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ) {
            carouselTimer = setInterval(nextSlide, carouselDelay);
        }

    }


    function stopCarousel() {

        if (carouselTimer !== null) {
            clearInterval(carouselTimer);
            carouselTimer = null;
        }

    }


    function restartCarousel() {
        startCarousel();
    }


    if (heroNext) {

        heroNext.addEventListener("click", function () {
            nextSlide();
            restartCarousel();
        });

    }


    if (heroPrev) {

        heroPrev.addEventListener("click", function () {
            previousSlide();
            restartCarousel();
        });

    }


    // Pause automatic sliding when the visitor hovers over the carousel

    const heroSection = document.querySelector(".hero-section");

    if (heroSection) {

        heroSection.addEventListener("mouseenter", stopCarousel);
        heroSection.addEventListener("mouseleave", startCarousel);

        heroSection.addEventListener("focusin", stopCarousel);
        heroSection.addEventListener("focusout", startCarousel);

    }


    // Pause when the browser tab is not visible

    document.addEventListener("visibilitychange", function () {

        if (document.hidden) {
            stopCarousel();
        } else {
            startCarousel();
        }

    });


    // Start the carousel

    showSlide(0);
    startCarousel();

}


/* ========================================
   HEADER SCROLL EFFECT
======================================== */

const siteHeader = document.getElementById("siteHeader");

function updateHeader() {

    if (!siteHeader) return;

    if (window.scrollY > 50) {
        siteHeader.classList.add("scrolled");
    } else {
        siteHeader.classList.remove("scrolled");
    }

}

window.addEventListener("scroll", updateHeader, {
    passive: true
});

updateHeader();


/* ========================================
   SCROLL REVEAL ANIMATIONS
======================================== */

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {

    const revealObserver = new IntersectionObserver(
        function (entries, observer) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    entry.target.classList.add("revealed");

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.12,
            rootMargin: "0px 0px -35px 0px"
        }
    );


    revealElements.forEach(function (element) {

        revealObserver.observe(element);

    });

} else {

    // Fallback for older browsers

    revealElements.forEach(function (element) {

        element.classList.add("revealed");

    });

}


/* ========================================
   BACK TO TOP BUTTON
======================================== */

const backToTop = document.getElementById("backToTop");

function updateBackToTop() {

    if (!backToTop) return;

    if (window.scrollY > 450) {
        backToTop.classList.add("visible");
    } else {
        backToTop.classList.remove("visible");
    }

}

window.addEventListener("scroll", updateBackToTop, {
    passive: true
});

updateBackToTop();


/* ========================================
   CURRENT COPYRIGHT YEAR
======================================== */

const currentYear = document.getElementById("currentYear");

if (currentYear) {

    currentYear.textContent = new Date().getFullYear();

}


/* ========================================
   RESET MOBILE MENU ON RESIZE
======================================== */

window.addEventListener("resize", function () {

    if (window.innerWidth > 900) {

        closeMobileMenu();

        dropdownParents.forEach(function (parent) {

            parent.classList.remove("open");

            const link = parent.querySelector(":scope > .nav-link");

            if (link) {
                link.removeAttribute("aria-expanded");
            }

        });

    }

});


document.addEventListener("DOMContentLoaded", function () {
    const menuButton = document.getElementById("historyMenuToggle");
    const navigation = document.getElementById("historyNav");
    const year = document.getElementById("historyYear");

    // Automatically update the copyright year
    if (year) {
        year.textContent = new Date().getFullYear();
    }

    // Mobile navigation
    if (menuButton && navigation) {
        menuButton.addEventListener("click", function () {
            const isOpen = navigation.classList.toggle("is-open");

            menuButton.setAttribute("aria-expanded", String(isOpen));
            menuButton.setAttribute(
                "aria-label",
                isOpen ? "Close navigation menu" : "Open navigation menu"
            );
        });

        // Close the menu after a navigation link is selected
        navigation.querySelectorAll("a").forEach(function (link) {
            link.addEventListener("click", function () {
                navigation.classList.remove("is-open");
                menuButton.setAttribute("aria-expanded", "false");
                menuButton.setAttribute("aria-label", "Open navigation menu");
            });
        });

        // Close the menu when returning to desktop width
        window.addEventListener("resize", function () {
            if (window.innerWidth > 800) {
                navigation.classList.remove("is-open");
                menuButton.setAttribute("aria-expanded", "false");
            }
        });
    }
});


 
