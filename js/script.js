const ENTREGABLES_INFO = {
    "01": {
        code: "ENTREGABLE 01 • LISTO",
        title: "Despliegue de la aplicación",
        url: "01-despliegue.html",
        desc: "Documentación del despliegue de StockVelia en Vercel (frontend), Render (backend) y Supabase (PostgreSQL), con evidencias y estado de pruebas.",
        points: [
            "Arquitectura desplegada y estructura monorepo (frontend / backend)",
            "Configuración en Vercel (REACT_APP_API_URL) y Render (Web Service Node)",
            "Base de datos PostgreSQL en Supabase y variables de entorno",
            "Estado de pruebas, incidente SMTP en Render Free y datos pendientes",
        ],
    },
    "02": {
        code: "ENTREGABLE 02 • LISTO",
        title: "Documentación de requisitos corregida",
        url: "02-requisitos.html",
        desc: "Alineada a lo que realmente existe en el código y en la base de datos de StockVelia.",
        points: [
            "Roles 1 (Propietario), 2 (Admin Operativo) y 3 (Empleado)",
            "Requisitos funcionales RF-01 a RF-12 y reglas de negocio",
            "Seguridad JWT, blacklist de tokens, bloqueo tras 5 intentos y auditoría",
            "Aclaración de alcance real (refresco periódico y exportación PDF/CSV)",
        ],
    },
    "03": {
        code: "ENTREGABLE 03 • LISTO",
        title: "Plan de pruebas",
        url: "03-plan-pruebas.html",
        desc: "Definición de escenarios, datos de prueba y criterios de aceptación para validar el sistema.",
        points: [
            "Pruebas funcionales por módulo (auth, usuarios, categorías, productos, movimientos, reportes)",
            "Pruebas de seguridad y permisos RBAC (401, 403, 423, aislamiento por empresa)",
            "Validación de stock insuficiente, justificación en bajas y concurrencia",
            "Criterios de entrada/salida y riesgos operativos",
        ],
    },
    "04": {
        code: "ENTREGABLE 04 • LISTO",
        title: "Plan de respaldo",
        url: "04-plan-respaldo.html",
        desc: "Lineamientos para proteger la base de datos y los archivos subidos frente a fallos o pérdidas.",
        points: [
            "Respaldos lógicos de PostgreSQL (pg_dump / pg_restore)",
            "Resguardo de avatares y configuración del sistema",
            "Objetivos RPO/RTO, frecuencia y política de retención",
            "Procedimiento de restauración, validación y contingencia",
        ],
    },
    "05": {
        code: "ENTREGABLE 05 • LISTO",
        title: "Manual de usuario",
        url: "05-manual-usuario.html",
        desc: "Guía completa y práctica para operar el sistema según el rol asignado.",
        points: [
            "Registro, vinculación multi-empresa, login, bloqueo y recuperación de contraseña",
            "Gestión de categorías, productos, alertas de stock bajo y movimientos",
            "Administración de usuarios, perfil, avatar y color corporativo",
            "Reportes y exportación a PDF y CSV",
        ],
    },
    "06": {
        code: "ENTREGABLE 06 • LISTO",
        title: "Manual de instalación",
        url: "06-manual-instalacion.html",
        desc: "Pasos técnicos para montar y ejecutar StockVelia en un entorno local o de desarrollo.",
        points: [
            "Requisitos previos (Node.js, npm, PostgreSQL, Git, SMTP)",
            "Creación de base de datos, esquema, trigger y roles semilla",
            "Configuración de variables de entorno, CORS, SMTP y avatares",
            "Arranque de backend y frontend, verificación y solución de problemas",
        ],
    },
    "07": {
        code: "ENTREGABLE 07 • LISTO",
        title: "Otros entregables necesarios",
        url: "07-otros-entregables.html",
        desc: "Documentos complementarios clave para gobernanza, seguridad, datos y operación continua.",
        points: [
            "Matriz de roles y permisos (RBAC) y aislamiento multi-empresa",
            "Diccionario de datos y reglas de integridad en PostgreSQL",
            "Seguridad, auditoría, respuesta a incidentes y mantenimiento evolutivo",
        ],
    },
};

document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.getElementById("menuToggle");
    const mobileMenu = document.getElementById("mobileMenu");

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener("click", () => {
            const isOpen = mobileMenu.classList.toggle("open");
            menuToggle.setAttribute("aria-expanded", String(isOpen));
        });

        mobileMenu.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", () => {
                mobileMenu.classList.remove("open");
                menuToggle.setAttribute("aria-expanded", "false");
            });
        });
    }

    const filterButtons = document.querySelectorAll(".filter-btn");
    const cards = document.querySelectorAll("#deliverablesGrid .card");

    filterButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            const filter = btn.dataset.filter;
            filterButtons.forEach((b) => b.classList.remove("active"));
            btn.classList.add("active");

            cards.forEach((card) => {
                const status = card.dataset.status;
                const match = filter === "all" || filter === status;
                card.style.display = match ? "" : "none";
            });
        });
    });

    const modal = document.getElementById("detailModal");
    const modalClose = document.getElementById("modalClose");
    const modalAccept = document.getElementById("modalAccept");
    const modalDocLink = document.getElementById("modalDocLink");
    const modalCode = document.getElementById("modalCode");
    const modalTitle = document.getElementById("modalTitle");
    const modalDesc = document.getElementById("modalDesc");
    const modalPoints = document.getElementById("modalPoints");

    const openModal = (id) => {
        const info = ENTREGABLES_INFO[id];
        if (!info || !modal) return;
        modalCode.textContent = info.code;
        modalTitle.textContent = info.title;
        modalDesc.textContent = info.desc;
        modalPoints.innerHTML = info.points.map((pt) => `<li>${pt}</li>`).join("");
        if (modalDocLink && info.url) {
            modalDocLink.setAttribute("href", info.url);
        }
        modal.classList.add("open");
        modal.setAttribute("aria-hidden", "false");
    };

    const closeModal = () => {
        if (!modal) return;
        modal.classList.remove("open");
        modal.setAttribute("aria-hidden", "true");
    };

    document.querySelectorAll("[data-open-id]").forEach((btn) => {
        btn.addEventListener("click", () => openModal(btn.dataset.openId));
    });

    if (modalClose) modalClose.addEventListener("click", closeModal);
    if (modalAccept) modalAccept.addEventListener("click", closeModal);

    if (modal) {
        modal.addEventListener("click", (e) => {
            if (e.target === modal) closeModal();
        });
    }

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closeModal();
    });
});