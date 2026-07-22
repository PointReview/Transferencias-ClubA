// ========================================
// COPIAR TEXTO (Compatible con todos)
// ========================================

function copiar(id) {

    const elemento = document.getElementById(id);

    if (!elemento) return;

    const texto = elemento.value;

    // Navegadores modernos
    if (navigator.clipboard && window.isSecureContext) {

        navigator.clipboard.writeText(texto)
            .then(() => {

                animarBoton(elemento);

                mostrarToast("✅ Copiado correctamente");

            })
            .catch(() => {

                copiarFallback(elemento);

            });

    } else {

        copiarFallback(elemento);

    }

}



// ========================================
// MÉTODO ALTERNATIVO DE COPIADO
// ========================================

function copiarFallback(elemento) {

    elemento.removeAttribute("readonly");

    elemento.select();

    elemento.setSelectionRange(0, 99999);

    document.execCommand("copy");

    elemento.setAttribute("readonly", true);

    window.getSelection().removeAllRanges();

    animarBoton(elemento);

    mostrarToast("✅ Copiado correctamente");

}



// ========================================
// ANIMACIÓN DEL BOTÓN
// ========================================

function animarBoton(elemento) {

    const boton = elemento.parentElement.querySelector("button");

    if (!boton) return;

    const icono = boton.querySelector("i");

    if (!icono) return;

    icono.classList.remove("fa-copy");

    icono.classList.add("fa-check");

    boton.classList.add("copiado");

    setTimeout(() => {

        icono.classList.remove("fa-check");

        icono.classList.add("fa-copy");

        boton.classList.remove("copiado");

    }, 1500);

}



// ========================================
// TOAST
// ========================================

function mostrarToast(texto) {

    const viejo = document.querySelector(".toast");

    if (viejo) viejo.remove();

    const toast = document.createElement("div");

    toast.className = "toast";

    toast.innerHTML = texto;

    document.body.appendChild(toast);

    setTimeout(() => {

        toast.classList.add("mostrar");

    }, 20);

    setTimeout(() => {

        toast.classList.remove("mostrar");

        setTimeout(() => {

            toast.remove();

        }, 300);

    }, 2200);

}



// ========================================
// ABRIR APP DE TRANSFERENCIA
// ========================================

document.querySelectorAll(".transferir").forEach((boton) => {

    boton.addEventListener("click", () => {

        const app = boton.dataset.app;

        if (app === "mercadopago") {

            abrirMercadoPago();

        }

        if (app === "naranjax") {

            abrirNaranjaX();

        }

    });

});



// ========================================
// MERCADO PAGO
// ========================================

function abrirMercadoPago() {

    const urlApp = "mercadopago://";

    const urlWeb = "https://www.mercadopago.com.ar/";

    abrirAplicacion(urlApp, urlWeb);

}



// ========================================
// NARANJA X
// ========================================

function abrirNaranjaX() {

    const urlApp = "naranjax://";

    const urlWeb = "https://www.naranjax.com/";

    abrirAplicacion(urlApp, urlWeb);

}



// ========================================
// INTENTAR ABRIR APP
// ========================================

function abrirAplicacion(appUrl, webUrl) {

    const inicio = Date.now();

    window.location.href = appUrl;

    setTimeout(() => {

        if (Date.now() - inicio < 1800) {

            window.open(webUrl, "_blank");

        }

    }, 1200);

}
