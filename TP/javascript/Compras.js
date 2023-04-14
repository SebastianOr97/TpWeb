//variables
let productos = document.querySelector('.products');
let totalCarrito = document.querySelector('.card-items');
let precioTotal = document.querySelector('.price-total')
let cantidadDeProductos = document.querySelector('.count-product');


let buyThings = [];
let totalCard = 0;
let cantidadProductos = 0;

//funciones
function irASeccion() {
    window.location.href = 'Index.html#menu1';
  }
  function bajar() {
    window.scrollTo(0, document.body.scrollHeight);
  }
totalProductos();
function totalProductos(){
    productos.addEventListener('click', AgregarProducto);

    totalCarrito.addEventListener('click', borrarProducto);
}
//agrega productos
function AgregarProducto(e){
    e.preventDefault();
    if (e.target.classList.contains('btn-add-cart')) {
        const selectProducto = e.target.parentElement; 
        leerContenido(selectProducto);
    }
}
//borra productos
function borrarProducto(e) {
    if (e.target.classList.contains('delete-product')) {
        const deleteId = e.target.getAttribute('data-id');

        buyThings.forEach(value => {
            if (value.id == deleteId) {
                let priceReduce = parseFloat(value.price) * parseFloat(value.amount);
                totalCard =  totalCard - priceReduce;
                totalCard = totalCard.toFixed(2);
            }
        });
        buyThings = buyThings.filter(product => product.id !== deleteId);
        
        cantidadProductos--;
    }
    /*si ponia y sacaba productos quedaban los datos del ultimo aunque ya no haya nada*/
    if (buyThings.length === 0) {
        precioTotal.innerHTML = 0;
        cantidadDeProductos.innerHTML = 0;
    }
    loadHtml();
}

function leerContenido(product){
    const infoProduct = {
        imagen: product.querySelector('div img').src,
        title: product.querySelector('.title').textContent,
        price: product.querySelector('div p span').textContent,
        id: product.querySelector('a').getAttribute('data-id'),
        amount: 1
    }
    /*actualiza precio del carro */
    totalCard = parseFloat(totalCard) + parseFloat(infoProduct.price);
    totalCard = totalCard.toFixed(2);

    const exist = buyThings.some(product => product.id === infoProduct.id);
    if (exist) {
        const pro = buyThings.map(product => {
            if (product.id === infoProduct.id) {
                product.amount++;
                return product;
            } else {
                return product
            }
        });
        buyThings = [...pro];
    } else {
        buyThings = [...buyThings, infoProduct]
        cantidadProductos++;
    }
    loadHtml();
}
function comprar(){
    if (totalCard === 0){
        alert("carrito vacio");
    }
    else
        alert("Realizo la compra, sera llevado de vuelta al menu.");
        window.location.href = 'Index.html';

}

//carga el item para saber su imagen,titulo,precio, etc
function loadHtml(){
    clearHtml();
    buyThings.forEach(product => {
        const {imagen, title, price, amount, id} = product;
        const row = document.createElement('div');
        row.classList.add('item');
        row.innerHTML = `
            <img src="${imagen}" alt="">
            <div class="item-content">
                <h5>${title}</h5>
                <h5 class="cart-price">${price}$</h5>
                <h6>Amount: ${amount}</h6>
            </div>
            <span class="delete-product" data-id="${id}">X</span>
        `;

        totalCarrito.appendChild(row);

        precioTotal.innerHTML = totalCard;

        cantidadDeProductos.innerHTML = cantidadProductos;
    });
}
 function clearHtml(){
    totalCarrito.innerHTML = '';
 }