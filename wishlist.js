document.addEventListener("DOMContentLoaded", function () {
    const wishlistContainer = document.querySelector("#wishlist-table tbody");
    const totalElement = document.querySelector("#wishlist-total");
  
    const loadWishlist = () => {
      const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
      wishlistContainer.innerHTML = "";
      let total = 0;
  
      wishlist.forEach((item, index) => {
        total += item.price;
  
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${item.name}</td>
          <td>₹${item.price}</td>
          <td>
            <button class="btn remove-btn" data-index="${index}">Remove</button>
          </td>
        `;
        wishlistContainer.appendChild(row);
      });
  
      totalElement.textContent = total.toFixed(2);
    };
  
    wishlistContainer.addEventListener("click", function (e) {
      if (e.target.classList.contains("remove-btn")) {
        const index = e.target.getAttribute("data-index");
        const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
        wishlist.splice(index, 1);
        localStorage.setItem("wishlist", JSON.stringify(wishlist));
        loadWishlist();
      }
    });
  
    loadWishlist();
  });
  