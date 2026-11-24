/* ==========================================================================
   Script para Entregable 01: Documentación del Despliegue
   Sincroniza navegación suave, resaltado de sección y estado de checklist
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

        function setActiveSection(sectionId) {
            navLinks.forEach((link) => {
                const isMatch = link.getAttribute("href") === "#" + sectionId;
                link.classList.toggle("active", isMatch);
                link.classList.toggle("is-current", isMatch);
            });
        }

        if (navLinks.length && sections.length) {
            const initialHash = window.location.hash ? window.location.hash.slice(1) : "";
            if (initialHash && document.getElementById(initialHash)) {
                setActiveSection(initialHash);
            }

            navLinks.forEach((link) => {
                link.addEventListener("click", function (event) {
                    const targetId = this.getAttribute("href").slice(1);
                    const targetEl = document.getElementById(targetId);
                    if (targetEl) {
                        event.preventDefault();
                        targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
                        setActiveSection(targetId);
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
                            setActiveSection(visible[0].target.id);
                        }
                    },
                    {
                        rootMargin: "-18% 0px -65% 0px",
                        threshold: [0, 0.1],
                    }
                );
                sections.forEach((section) => observer.observe(section));
            }
        }

        const checkboxes = Array.from(document.querySelectorAll("#deployChecklist input[type='checkbox']"));
        const storageKey = "stockvelia_deploy_checklist_v1";

        if (checkboxes.length) {
            try {
                const saved = JSON.parse(localStorage.getItem(storageKey) || "{}");
                checkboxes.forEach((box, idx) => {
                    if (Object.prototype.hasOwnProperty.call(saved, idx)) {
                        box.checked = Boolean(saved[idx]);
                    }
                    box.addEventListener("change", () => {
                        const nextState = {};
                        checkboxes.forEach((cb, i) => {
                            nextState[i] = cb.checked;
                        });
                        try {
                            localStorage.setItem(storageKey, JSON.stringify(nextState));
                        } catch (_) {
                            /* Ignorar si el almacenamiento local no está disponible */
                        }
                    });
                });
            } catch (_) {
                /* Ignorar errores de parseo de localStorage */
            }
        }
    });
})();