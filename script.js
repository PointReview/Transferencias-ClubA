// ============================
// COPIAR TEXTO AL PORTAPAPELES
// ============================

function copiar(id) {

    const elemento = document.getElementById(id);

    if (!elemento) {
        console.error("No se encontró el elemento:", id);
        return;
    }

    const texto = elemento.value;

    navigator.clipboard.writeText(texto)
        .then(() => {

            mostrarToast("Copiado: " + texto);

            // Animación del botón
            const boton = elemento.parentElement.querySelector("button");

            if (boton) {

                const icono = boton.querySelector("i");

                if (icono) {

                    icono.classList.remove("fa-copy");
                    icono.classList.add("fa-check");

                    setTimeout(() => {

                        icono.classList.remove("fa-check");
                        icono.classList.add("fa-copy");

                    }, 1500);

                }

            }

        })
        .catch(err => {
            console.error(err);
            alert("No se pudo copiar.");
        });

}



// ============================
// TOAST
// ============================

function mostrarToast(texto){

    let viejo=document.querySelector(".toast");

    if(viejo){

        viejo.remove();

    }

    const toast=document.createElement("div");

    toast.className="toast";

    toast.innerHTML=texto;

    document.body.appendChild(toast);

    setTimeout(()=>{

        toast.classList.add("mostrar");

    },10);

    setTimeout(()=>{

        toast.classList.remove("mostrar");

        setTimeout(()=>{

            toast.remove();

        },300);

    },2000);

}
