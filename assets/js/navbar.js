// Mise à jour de l'affichage du panier
function updateCartDisplay() {
    const cartItemsElement = document.getElementById('cartItems');
    cartItemsElement.innerHTML = '';
    cart.forEach(productId => {
        const productElement = document.querySelector(`[data-product-id="${productId}"]`);
        const productName = productElement.querySelector('.card-title').textContent;
        const itemElement = document.createElement('li');
        itemElement.innerHTML = `
            ${productName} 
            <button class="btn btn-danger remove-from-cart" data-id="${productId}">Supprimer</button>
        `;
        cartItemsElement.appendChild(itemElement);
    });
}

document.getElementById('cartIcon').addEventListener('click', function() {
  const sidebar = document.getElementById('cartSidebar');
  if (sidebar.style.right === '0px') {
      sidebar.style.right = '-400px';
  } else {
      sidebar.style.right = '0px';
  }
});

document.querySelector('.closebtn').addEventListener('click', function() {
  document.getElementById('cartSidebar').style.right = '-400px';
});

