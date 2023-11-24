// Fonction pour calculer la quantité totale des produits dans le panier
function calculateTotalQuantity() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let totalQuantity = cart.reduce(
    (total, product) => total + product.quantity,
    0
  );
  return totalQuantity;
}

// Fonction pour mettre à jour l'élément HTML avec la quantité totale
function updateTotalQuantityElement() {
  let totalQuantity = calculateTotalQuantity();
  let cartTotalQuantityElement = document.getElementById("cartTotalQuantity");
  cartTotalQuantityElement.textContent = totalQuantity.toString();
}

document.addEventListener("DOMContentLoaded", function () {
  let cartButton = document.querySelectorAll(".add-to-cart");
  let cartItemsList = document.getElementById("cartItems");

  // Fonction pour ajouter un produit au localStorage
  function addToLocalStorage(product) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingProduct = cart.find((p) => p.name === product.name);

    if (existingProduct) {
      existingProduct.quantity += product.quantity;
    } else {
      cart.push(product);
    }
    localStorage.setItem("cart", JSON.stringify(cart));

    // Mettre à jour le nombre d'articles dans le panier
    updateTotalQuantityElement(); // Ajoutez cette ligne pour mettre à jour le nombre d'articles
  }

  // Fonction pour charger les produits depuis le localStorage
  function loadFromLocalStorage() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.forEach((product) => {
      addToCartPanel(product);
    });
  }

  // Fonction pour ajouter un produit au panneau du panier
  function addToCartPanel(product) {
    let existingItem = [...cartItemsList.children].find((item) =>
      item.textContent.includes(product.name)
    );

    if (existingItem) {
      // Mise à jour de la quantité sans toucher aux autres enfants (image, bouton)
      let existingQuantity = parseInt(
        existingItem.textContent.split(" (Quantité: ")[1]
      );
      existingQuantity += product.quantity;
      // Supprimez le texte actuel de l'élément
      existingItem.childNodes.forEach((node) => {
        if (node.nodeType === 3) {
          // Si le node est de type texte
          node.remove();
        }
      });
      // Ajoutez le nouveau texte
      existingItem.insertBefore(
        document.createTextNode(
          product.name + " (Quantité: " + existingQuantity + ")"
        ),
        existingItem.childNodes[1]
      );
    } else {
      let listItem = document.createElement("li");
      listItem.classList.add("cart-item");

      let imageElement = document.createElement("img");
      imageElement.src = product.image;
      imageElement.style.width = "50px";
      imageElement.style.height = "50px";
      imageElement.style.objectFit = "cover";
      imageElement.style.marginRight = "10px";

      let deleteButton = document.createElement("button");
      deleteButton.textContent = "Supprimer";
      deleteButton.classList.add("btn", "btn-danger", "btn-sm", "delete-item");
      deleteButton.style.marginLeft = "10px";

      listItem.appendChild(imageElement);
      listItem.append(product.name + " (Quantité: " + product.quantity + ")");
      listItem.appendChild(deleteButton);

      cartItemsList.appendChild(listItem);
    }
  }

  // ... Votre code existant

  // Après avoir ajouté un produit au panier, appelez la fonction pour mettre à jour le prix total
  cartButton.forEach(function (button) {
    button.addEventListener("click", function (event) {
      let productElement = event.target.closest(".card");

      let productName = productElement.querySelector(".card-title").textContent;
      let productImage = productElement.querySelector("img.card-img-top").src;
      let quantity = parseInt(productElement.querySelector(".quantity").value);

      let product = {
        name: productName,
        image: productImage,
        quantity: quantity,
      };

      addToLocalStorage(product);
      addToCartPanel(product);

      // Mettre à jour le prix total après avoir ajouté un produit
      updateTotalAmountElement();
    });
  });

  // Après avoir supprimé un produit du panier, appelez la fonction pour mettre à jour le prix total
  cartItemsList.addEventListener("click", function (event) {
    if (event.target.classList.contains("delete-item")) {
      let productElement = event.target.closest(".cart-item");
      let productName = productElement.textContent.split(" (Quantité:")[0]; // Extraction du nom du produit

      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      cart = cart.filter((product) => product.name !== productName); // Suppression du produit de localStorage
      localStorage.setItem("cart", JSON.stringify(cart));

      productElement.remove(); // Suppression du produit du panneau

      // Mettre à jour le prix total après avoir supprimé un produit
      updateTotalAmountElement();

      // Mettre à jour la quantité totale après avoir supprimé un produit
      updateTotalQuantityElement();
    }
  });

  // Appelez cette fonction pour mettre à jour la quantité totale au chargement de la page
  updateTotalQuantityElement();

  // Charger les produits depuis localStorage au démarrage
  loadFromLocalStorage();
});

document.addEventListener("DOMContentLoaded", function () {
  let increaseButtons = document.querySelectorAll(".quantity-increase");
  let decreaseButtons = document.querySelectorAll(".quantity-decrease");

  increaseButtons.forEach(function (button) {
    button.addEventListener("click", function (event) {
      let quantityInput = event.target.previousElementSibling;
      quantityInput.value = parseInt(quantityInput.value) + 1;
    });
  });

  decreaseButtons.forEach(function (button) {
    button.addEventListener("click", function (event) {
      let quantityInput = event.target.nextElementSibling;
      let currentValue = parseInt(quantityInput.value);
      if (currentValue > 1) {
        quantityInput.value = currentValue - 1;
      }
    });
  });
});

// Fonction pour calculer le prix total du panier
function calculateTotalAmount(productPrices) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let totalAmount = 0;

  for (let product of cart) {
    let productId = product.id;
    totalAmount += parseFloat(productPrices[productId]) * product.quantity; // Utilisez le prix récupéré du tableau productPrices
  }

  return totalAmount;
}

// Fonction pour mettre à jour l'élément HTML avec le prix total
function updateTotalAmountElement(productPrices) {
  let totalAmount = calculateTotalAmount(productPrices);
  let totalAmountElement = document.getElementById("totalAmount");
  totalAmountElement.textContent = totalAmount + " €";
}

// Fonction pour ajouter un produit au localStorage
function addToLocalStorage(product) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existingProduct = cart.find((p) => p.name === product.name);

  if (existingProduct) {
    existingProduct.quantity += product.quantity;
  } else {
    cart.push(product);
  }
  localStorage.setItem("cart", JSON.stringify(cart));

  // Mettre à jour le nombre d'articles dans le panier
  updateTotalQuantityElement(); // Mettez à jour le nombre d'articles

  // Mettre à jour le prix total du panier
  updateTotalAmountElement(); // Ajoutez cette ligne pour mettre à jour le prix total
}

// Appelez cette fonction pour mettre à jour la quantité totale au chargement de la page
updateTotalQuantityElement();
