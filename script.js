 /* ================= WEBNEX SCRIPT ================= */

/* ================= MOBILE MENU ================= */

const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");

if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
        nav.classList.toggle("show");
    });
}


/* ================= CLOSE MOBILE MENU ================= */

document.querySelectorAll(".nav a").forEach(link => {
    link.addEventListener("click", () => {
        if (nav) {
            nav.classList.remove("show");
        }
    });
});


/* ================= HEADER SCROLL EFFECT ================= */

const header = document.querySelector("header");

window.addEventListener("scroll", () => {

    if (!header) return;

    if (window.scrollY > 50) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }

});


/* ================= SMOOTH SCROLL ================= */

document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", function (event) {

        const targetId = this.getAttribute("href");

        if (!targetId || targetId === "#") {
            return;
        }

        const target = document.querySelector(targetId);

        if (target) {
            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }

    });

});


/* ================= ACTIVE NAV ================= */

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll('.nav a[href^="#"]');

function updateActiveNav() {

    let currentSection = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 160;
        const sectionBottom =
            sectionTop + section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionBottom
        ) {
            currentSection = section.getAttribute("id");
        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (
            currentSection &&
            link.getAttribute("href") === "#" + currentSection
        ) {
            link.classList.add("active");
        }

    });

}

window.addEventListener("scroll", updateActiveNav);


/* ================= CONTACT FORM - WEB3FORMS ================= */

const contactForm = document.getElementById("contactForm");
const formResult = document.getElementById("formResult");

if (contactForm) {

    contactForm.addEventListener("submit", async function (event) {

        event.preventDefault();

        const submitButton =
            contactForm.querySelector('button[type="submit"]');


        /* Button loading */

        if (submitButton) {

            submitButton.disabled = true;

            submitButton.innerHTML =
                '<i class="fas fa-spinner fa-spin"></i> Sending...';

        }


        /* Clear previous message */

        if (formResult) {
            formResult.textContent = "";
            formResult.className = "";
        }


        const formData = new FormData(contactForm);


        try {

            const response = await fetch(
                "https://api.web3forms.com/submit",
                {
                    method: "POST",
                    body: formData
                }
            );


            const data = await response.json();


            if (data.success) {

                if (formResult) {

                    formResult.textContent =
                        "Message sent successfully! We will get back to you soon.";

                    formResult.className =
                        "form-success";

                }

                contactForm.reset();

            } else {

                if (formResult) {

                    formResult.textContent =
                        data.message ||
                        "Message could not be sent. Please try again.";

                    formResult.className =
                        "form-error";

                }

            }


        } catch (error) {

            console.error("WEB3FORMS ERROR:", error);

            if (formResult) {

                formResult.textContent =
                    "Unable to send message. Please check your internet connection.";

                formResult.className =
                    "form-error";

            }

        }


        /* Restore button */

        if (submitButton) {

            submitButton.disabled = false;

            submitButton.innerHTML =
                'Send Message <i class="fas fa-paper-plane"></i>';

        }

    });

}


/* ================= SCROLL REVEAL ================= */

const revealElements = document.querySelectorAll(
    ".section-heading, .about-card, .service-card, .project-card, .skill-item, .contact-item"
);

if ("IntersectionObserver" in window) {

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "reveal-visible"
                    );

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.12
        }
    );


    revealElements.forEach(element => {

        element.classList.add("reveal");

        revealObserver.observe(element);

    });

} else {

    revealElements.forEach(element => {
        element.classList.add("reveal-visible");
    });

}


/* ================= CURRENT YEAR ================= */

const yearElement = document.getElementById("year");

if (yearElement) {
    yearElement.textContent =
        new Date().getFullYear();
}


/* ================= SOCIAL LINKS ================= */

document
    .querySelectorAll('.social-links a[href="#"]')
    .forEach(link => {

        link.addEventListener("click", event => {

            event.preventDefault();

            alert(
                "Social media link will be added soon."
            );

        });

    });


/* ================= ESC KEY ================= */

document.addEventListener("keydown", event => {

    if (event.key === "Escape") {

        if (nav) {
            nav.classList.remove("show");
        }

    }

});
