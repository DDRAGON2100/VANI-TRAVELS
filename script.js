"use strict";

document.addEventListener("DOMContentLoaded", function () {

    /* ==========================================
       SETTINGS
    ========================================== */

    const WHATSAPP_NUMBER = "919311672525";


    /* ==========================================
       PRELOADER
    ========================================== */

    const preloader = document.getElementById("preloader");

    window.addEventListener("load", function () {

        setTimeout(function () {

            if (preloader) {
                preloader.classList.add("hidden");
            }

        }, 700);

    });



    /* ==========================================
       NAVBAR SCROLL
    ========================================== */

    const navbar = document.getElementById("navbar");

    function updateNavbar() {

        if (!navbar) return;

        if (window.scrollY > 40) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }

    }

    window.addEventListener("scroll", updateNavbar);

    updateNavbar();



    /* ==========================================
       MOBILE MENU
    ========================================== */

    const menuToggle = document.getElementById("menuToggle");
    const mobileMenu = document.getElementById("mobileMenu");

    function closeMobileMenu() {

        if (!menuToggle || !mobileMenu) return;

        menuToggle.classList.remove("active");
        mobileMenu.classList.remove("active");

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

    }


    if (menuToggle && mobileMenu) {

        menuToggle.addEventListener("click", function () {

            const isOpen =
                mobileMenu.classList.toggle("active");

            menuToggle.classList.toggle(
                "active",
                isOpen
            );

            menuToggle.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );

        });


        mobileMenu
            .querySelectorAll("a")
            .forEach(function (link) {

                link.addEventListener(
                    "click",
                    closeMobileMenu
                );

            });

    }



    /* ==========================================
       SMOOTH SCROLL
    ========================================== */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach(function (link) {

            link.addEventListener(
                "click",
                function (event) {

                    const targetId =
                        this.getAttribute("href");

                    if (
                        !targetId ||
                        targetId === "#"
                    ) {
                        return;
                    }

                    const target =
                        document.querySelector(
                            targetId
                        );

                    if (!target) {
                        return;
                    }

                    event.preventDefault();

                    const navbarHeight =
                        navbar
                            ? navbar.offsetHeight
                            : 0;

                    const targetPosition =
                        target.getBoundingClientRect()
                            .top +
                        window.pageYOffset -
                        navbarHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: "smooth"
                    });

                    closeMobileMenu();

                }
            );

        });



    /* ==========================================
       WHATSAPP FUNCTION
    ========================================== */

    function openWhatsApp(message) {

        if (!message) {
            message =
                "Hello VANI TRAVELS, I want to enquire about your luxury car rental service.";
        }

        const encodedMessage =
            encodeURIComponent(message);

        const whatsappURL =
            "https://wa.me/" +
            WHATSAPP_NUMBER +
            "?text=" +
            encodedMessage;

        window.open(
            whatsappURL,
            "_blank",
            "noopener,noreferrer"
        );

    }



    /* ==========================================
       ALL WHATSAPP BUTTONS
    ========================================== */

    document
        .querySelectorAll(".whatsapp-button")
        .forEach(function (button) {

            button.addEventListener(
                "click",
                function () {

                    const message =
                        this.dataset.whatsapp;

                    openWhatsApp(message);

                }
            );

        });



    /* ==========================================
       BOOKING FORM
    ========================================== */

    const bookingForm =
        document.getElementById("bookingForm");

    if (bookingForm) {

        bookingForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                const name =
                    document
                        .getElementById("name")
                        .value
                        .trim();


                const phone =
                    document
                        .getElementById("phone")
                        .value
                        .trim();


                const vehicle =
                    document
                        .getElementById("vehicle")
                        .value;


                const service =
                    document
                        .getElementById("service")
                        .value;


                const requirements =
                    document
                        .getElementById("requirements")
                        .value
                        .trim();


                if (
                    !name ||
                    !phone ||
                    !vehicle ||
                    !service
                ) {

                    alert(
                        "Please fill in all required fields."
                    );

                    return;

                }


                const message =
                    "Hello VANI TRAVELS,\n\n" +

                    "I want to make a booking enquiry.\n\n" +

                    "Name: " +
                    name +
                    "\n" +

                    "Phone: " +
                    phone +
                    "\n" +

                    "Vehicle: " +
                    vehicle +
                    "\n" +

                    "Service: " +
                    service +
                    "\n\n" +

                    "Requirements:\n" +
                    (
                        requirements ||
                        "No additional requirements provided."
                    );


                openWhatsApp(message);

            }
        );

    }



    /* ==========================================
       REVEAL ANIMATIONS
    ========================================== */

    const revealElements =
        document.querySelectorAll(".reveal");


    if ("IntersectionObserver" in window) {

        const revealObserver =
            new IntersectionObserver(
                function (entries, observer) {

                    entries.forEach(
                        function (entry) {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target.classList.add(
                                    "visible"
                                );

                                observer.unobserve(
                                    entry.target
                                );

                            }

                        }
                    );

                },
                {
                    threshold: 0.12
                }
            );


        revealElements.forEach(
            function (element) {

                revealObserver.observe(element);

            }
        );

    } else {

        revealElements.forEach(
            function (element) {

                element.classList.add(
                    "visible"
                );

            }
        );

    }



    /* ==========================================
       ESCAPE KEY
    ========================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Escape") {
                closeMobileMenu();
            }

        }
    );

});