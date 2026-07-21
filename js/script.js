const cuentas=[

{

banco:"BANCO NARANJA",

alias:"EPerez1976",

cbu:"000000310001000100010001",

titular:"Evelin Pérez",

logo:"img/naranja.png"

},

{

banco:"MERCADO PAGO",

alias:"Elishop",

cbu:"000000310001000100010002",

titular:"Martha Elizabeth Puig",

logo:"img/mercadopago.png"

},

{

banco:"BANCO GALICIA",

alias:"Malta.campo.cetro",

cbu:"007010102000010101010101",

titular:"Evelin Pérez",

logo:"img/galicia.png"

}

]; const cards=document.getElementById("cards");

cuentas.forEach(c=>{

cards.innerHTML+=`

<div class="card">

<div class="bankLogo">

<img src="${c.logo}" width="120">

</div>

<div class="info">

<h2>${c.banco}</h2>

<p>Alias: ${c.alias}</p>

<p>CBU: ${c.cbu}</p>

<p>Titular: ${c.titular}</p>

<button class="transfer">

Transferir a esta Cuenta

</button>

</div>

</div>

`;

}); function copiar(texto){

navigator.clipboard.writeText(texto);

alert("Copiado");

}