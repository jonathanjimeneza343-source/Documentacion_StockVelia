/* ==========================================================================
   Script para Entregable 03: Plan de Pruebas
   Sincroniza la navegación lateral y el desplazamiento suave por secciones
   ========================================================================== */
(function () {
    "use strict";

    document.addEventListener("DOMContentLoaded", function () {
        const navLinks = Array.from(document.querySelectorAll(".doc-nav a[href^='#']"));
        const sections = navLinks
            .map((link) => {
                const id = link.getAttribute("href").slice(1);
                return document.getElementById(id);
            })
            .filter(Boolean);

        if (!navLinks.length || !sections.length) return;

        function highlightNav(sectionId) {
            navLinks.forEach((link) => {
                const matches = link.getAttribute("href") === "#" + sectionId;
                link.classList.toggle("active", matches);
                link.classList.toggle("is-current", matches);
            });
        }

        const initialHash = window.location.hash ? window.location.hash.slice(1) : "";
        if (initialHash && document.getElementById(initialHash)) {
            highlightNav(initialHash);
        }

        navLinks.forEach((link) => {
            link.addEventListener("click", function (event) {
                const targetId = this.getAttribute("href").slice(1);
                const targetSection = document.getElementById(targetId);
                if (targetSection) {
                    event.preventDefault();
                    targetSection.scrollIntoView({ behavior: "smooth", block: "start" });
                    highlightNav(targetId);
                    if (history.replaceState) {
                        history.replaceState(null, "", "#" + targetId);
                    }
                }
            });
        });

        if ("IntersectionObserver" in window) {
            const observer = new IntersectionObserver(
                (entries) => {
                    const visibleEntries = entries
                        .filter((entry) => entry.isIntersecting)
                        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
                    if (visibleEntries.length > 0) {
                        highlightNav(visibleEntries[0].target.id);
                    }
                },
                {
                    rootMargin: "-18% 0px -65% 0px",
                    threshold: [0, 0.1],
                }
            );
            sections.forEach((section) => observer.observe(section));
        }
    });
})();