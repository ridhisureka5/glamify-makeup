// Smooth scroll to sections when clicking navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Add class 'active' to the current section's nav link
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-links li a');

  let currentSection = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (scrollY >= sectionTop) {
      currentSection = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').includes(currentSection)) {
      link.classList.add('active');
    }
  });
});

// Function to add a product to the wishlist
function addToWishlist(productName, productPrice, productImage) {
  console.log("Adding to Wishlist:", { productName, productPrice, productImage });

  if (!productPrice || isNaN(productPrice)) {
    alert("Invalid product price!");
    return;
  }

  const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  const existingProduct = wishlist.find(item => item.name === productName);
  if (!existingProduct) {
    wishlist.push({ name: productName, price: parseFloat(productPrice), image: productImage });
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    alert(`${productName} has been added to your wishlist!`);
  } else {
    alert(`${productName} is already in your wishlist.`);
  }

  updateWishlistCount();
}

// Function to update the wishlist count
function updateWishlistCount() {
  const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  document.getElementById("wishlist-count").textContent = `(${wishlist.length})`;
}

// Initialize the wishlist count on page load
document.addEventListener("DOMContentLoaded", updateWishlistCount);
