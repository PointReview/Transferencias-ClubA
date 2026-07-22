/* ==================================================
   FUNCIONES DE COPIADO Y TRANSFERENCIA
   ================================================== */

document.addEventListener("DOMContentLoaded", () => {
    const toast = document.querySelector(".toast") || crearToast();
    let temporizadorToast;

    function crearToast() {
        const elemento = document.createElement("div");
        elemento.className = "toast";
        elemento.setAttribute("role", "status");
        elemento.setAttribute("aria-live", "polite");
        document.body.appendChild(elemento);
        return elemento;
    }

    function mostrarToast(mensaje) {
        window.clearTimeout(temporizadorToast);
        toast.textContent = mensaje;
        toast.classList.add("mostrar");
        temporizadorToast = window.setTimeout(() => {
            toast.classList.remove("mostrar");
        }, 2400);
    }

    async function copiarTexto(texto) {
        if (!texto) throw new Error("No hay información para copiar.");

        if (navigator.clipboard?.writeText && window.isSecureContext) {
            await navigator.clipboard.writeText(texto);
            return;
        }

        const auxiliar = document.createElement("textarea");
        auxiliar.value = texto;
        auxiliar.setAttribute("readonly", "");
        auxiliar.style.cssText = "position:fixed;opacity:0;pointer-events:none;";
        document.body.appendChild(auxiliar);
        auxiliar.select();
        const copiado = document.execCommand("copy");
        auxiliar.remove();
        if (!copiado) throw new Error("El navegador bloqueó el copiado.");
    }

    function cambiarEstadoBoton(boton) {
        const contenidoOriginal = boton.innerHTML;
        boton.classList.add("copiado");
        boton.setAttribute("aria-label", "Copiado");
        boton.innerHTML = '<i class="fa-solid fa-check" aria-hidden="true"></i>';

        window.setTimeout(() => {
            boton.classList.remove("copiado");
            boton.setAttribute("aria-label", "Copiar dato");
            boton.innerHTML = contenidoOriginal;
        }, 1400);
    }

    document.querySelectorAll("[data-copy]").forEach((boton) => {
        boton.addEventListener("click", async () => {
            const destino = document.querySelector(boton.dataset.copy);
            const texto = destino?.value?.trim() || destino?.textContent?.trim();

            try {
                await copiarTexto(texto);
                cambiarEstadoBoton(boton);
                mostrarToast("Dato copiado correctamente");
            } catch (error) {
                mostrarToast(error.message || "No se pudo copiar el dato");
            }
        });
    });

    document.querySelectorAll(".transferir").forEach((boton) => {
        boton.addEventListener("click", async () => {
            const tarjeta = boton.closest(".card");
            if (!tarjeta) return;

            const entidad = tarjeta.querySelector("h3")?.textContent.trim() || "Datos de transferencia";
            const lineas = [...tarjeta.querySelectorAll(".linea")]
                .map((linea) => {
                    const etiqueta = linea.querySelector("label")?.textContent.trim();
                    const valor = linea.querySelector("input")?.value.trim();
                    return etiqueta && valor ? `${etiqueta}: ${valor}` : "";
                })
                .filter(Boolean);
            const titular = tarjeta.querySelector(".titular strong")?.textContent.trim();
            const detalle = [entidad, ...lineas, titular ? `Titular: ${titular}` : ""].filter(Boolean).join("\n");

            try {
                await copiarTexto(detalle);
                mostrarToast("Datos de transferencia copiados");
            } catch (error) {
                mostrarToast(error.message || "No se pudieron copiar los datos");
            }
        });
    });
});
