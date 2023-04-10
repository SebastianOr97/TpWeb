// Obtener botones "Agregar al carrito" y "Eliminar" en la página del catálogo
var addToCartButtons = document.querySelectorAll(".add-to-cart");
var removeItemButtons = document.querySelectorAll(".remove-item");

// Añadir evento click a los botones "Agregar al carrito"
addToCartButtons.forEach(function(button) {
    
  button.addEventListener("click", function() {
    var productId = button.getAttribute("data-id");
    var productName = button.parentNode.querySelector("h3").innerText;
    var productPrice = button.parentNode.querySelector("p").innerText.replace("Precio: $", "");
    addItemToCart(productId, productName, productPrice, 1); 
    updateCartTotal();
  });
});

// Añadir evento click a los botones "Eliminar"
removeItemButtons.forEach(function(button) {
  button.addEventListener("click", function() {
    var productId = button.getAttribute("data-id");
    removeItemFromCart(productId);
    updateCartTotal();
  });
});

// Añadir producto al carrito
function addItemToCart(id, name, price, quantity) {
  var cartItem = document.createElement("tr");
  cartItem.classList.add("cart-item");
  cartItem.setAttribute("data-id", id);
  var cartItems = document.querySelector("tbody");
  var cartItemNames = document.querySelectorAll(".cart-item td:first-child");
  for (var i = 0; i < cartItemNames.length; i++) {
    if (cartItemNames[i].innerText === name) {
      alert("Este producto ya está en el carrito.");
      return;
    }
  }
  var cartItemContents = `
    <td>${name}</td>
    <td>$${price}</td>
    <td><input type="number" class="cart-quantity-input" value="${quantity}" min="1"></td>
    <td class="cart-item-total">$${price * quantity}</td>
    <td><button class="remove-item" data-id="${id}">Eliminar</button></td>
  `;
  cartItem.innerHTML = cartItemContents;
  cartItems.append(cartItem);
}

// Eliminar producto del carrito
function removeItemFromCart(id) {
  var cartItem = document.querySelector(`.cart-item[data-id="${id}"]`);
  cartItem.remove();
}

// Actualizar el total del carrito
function updateCartTotal() {
  var cartItems = document.querySelectorAll(".cart-item");
  var cartTotal = 0;
  cartItems.forEach(function(item) {
    var price = parseFloat(item.querySelector(".cart-item-total").innerText.replace("$", ""));
    var quantity = parseFloat(item.querySelector(".cart-quantity-input").value);
    cartTotal =cartTotal+( price * quantity)   ;
  });
  document.querySelector("tfoot td:last-child").innerText = "$" + cartTotal;
  console.log(cartTotal);
}  
