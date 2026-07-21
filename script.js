/*======================================================
                CLUBA PAGOS
======================================================*/


/*------------ COPIAR TEXTO ------------*/

function copiar(id){

    let texto = document.getElementById(id);

    texto.select();

    texto.setSelectionRange(0,99999);

    navigator.clipboard.writeText(texto.value);

    mostrarToast("Copiado correctamente");

}


/*------------ TOAST ------------*/

function mostrarToast(mensaje){

    let toast = document.createElement("div");

    toast.className="toast";

    toast.innerHTML=`
        <i class="fa-solid fa-circle-check"></i>
        ${mensaje}
    `;

    document.body.appendChild(toast);

    setTimeout(()=>{

        toast.classList.add("mostrar");

    },100);

    setTimeout(()=>{

        toast.classList.remove("mostrar");

    },2500);

    setTimeout(()=>{

        toast.remove();

    },3200);

}


/*------------ BOTONES TRANSFERIR ------------*/

const botones=document.querySelectorAll(".transferir");

botones.forEach((boton)=>{

    boton.addEventListener("click",()=>{

        mostrarToast("Datos listos para transferir");

    });

});


/*------------ EFECTO CLICK ------------*/

document.querySelectorAll("button").forEach((boton)=>{

    boton.addEventListener("mousedown",()=>{

        boton.style.transform="scale(.96)";

    });

    boton.addEventListener("mouseup",()=>{

        boton.style.transform="scale(1)";

    });

    boton.addEventListener("mouseleave",()=>{

        boton.style.transform="scale(1)";

    });

});


/*------------ EFECTO HOVER INPUT ------------*/

document.querySelectorAll("input").forEach((input)=>{

    input.addEventListener("mouseenter",()=>{

        input.style.boxShadow="0 0 18px rgba(255,0,180,.35)";

    });

    input.addEventListener("mouseleave",()=>{

        input.style.boxShadow="none";

    });

});


/*------------ EFECTO LOGO ------------*/

const logo=document.querySelector(".logo");

let angulo=0;

setInterval(()=>{

    angulo+=0.2;

    logo.style.transform=`rotate(${Math.sin(angulo)*2}deg)`;

},25);


/*------------ APARICIÓN TARJETAS ------------*/

const tarjetas=document.querySelectorAll(".card");

const observer=new IntersectionObserver((entries)=>{

entries.forEach((entry)=>{

if(entry.isIntersecting){

entry.target.classList.add("visible");

}

});

});

tarjetas.forEach((card)=>{

observer.observe(card);

});


/*------------ EFECTO BRILLO AL MOUSE ------------*/

document.querySelectorAll(".card").forEach((card)=>{

card.addEventListener("mousemove",(e)=>{

const rect=card.getBoundingClientRect();

const x=e.clientX-rect.left;

const y=e.clientY-rect.top;

card.style.background=`
radial-gradient(circle at ${x}px ${y}px,
rgba(255,255,255,.12),
rgba(20,20,20,.85) 60%)
`;

});

card.addEventListener("mouseleave",()=>{

card.style.background="rgba(15,15,15,.80)";

});

});


/*------------ PARTICULAS ------------*/

for(let i=0;i<20;i++){

let p=document.createElement("span");

p.className="particle";

document.body.appendChild(p);

p.style.left=Math.random()*100+"vw";

p.style.animationDuration=(10+Math.random()*20)+"s";

p.style.animationDelay=(Math.random()*10)+"s";

}


/*------------ MENSAJE BIENVENIDA ------------*/

window.addEventListener("load",()=>{

setTimeout(()=>{

mostrarToast("Bienvenido a ClubA");

},800);

});