/* ==========================================================================
   Script para Entregable 04: Plan de Respaldo
   Maneja navegación suave y resaltado de sección activa en la barra lateral
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

        function markActiveLink(sectionId) {
            navLinks.forEach((link) => {
                const isCurrent = link.getAttribute("href") === "#" + sectionId;
                link.classList.toggle("active", isCurrent);
                link.classList.toggle("is-current", isCurrent);
            });
        }

        const initialHash = window.location.hash ? window.location.hash.slice(1) : "";
        if (initialHash && document.getElementById(initialHash)) {
            markActiveLink(initialHash);
        }

        navLinks.forEach((link) => {
            link.addEventListener("click", function (event) {
                const targetId = this.getAttribute("href").slice(1);
                const targetEl = document.getElementById(targetId);
                if (targetEl) {
                    event.preventDefault();
                    targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
                    markActiveLink(targetId);
                    if (history.replaceState) {
                        history.replaceState(null, "", "#" + targetId);
                    }
                }
            });
        });

        if ("IntersectionObserver" in window) {
            const observer = new IntersectionObserver(
                (entries) => {
                    const visible = entries
                        .filter((entry) => entry.isIntersecting)
                        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
                    if (visible.length > 0) {
                        markActiveLink(visible[0].target.id);
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