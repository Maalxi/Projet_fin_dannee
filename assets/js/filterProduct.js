document.addEventListener("DOMContentLoaded", function () {
  const categoryFilter = document.getElementById("categoryFilter");
  const products = document.querySelectorAll(".col-md-4");

  categoryFilter.addEventListener("change", function () {
    let selectedCategory = this.value;

    products.forEach((product) => {
      if (selectedCategory === "all") {
        product.style.display = "";
      } else {
        if (product.getAttribute('data-category') !== selectedCategory.toString())        {
          product.style.display = "none";
        } else {
          product.style.display = "";
        }
      }
    });
  });
});
