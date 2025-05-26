function openNav() {
  const sideNav = document.getElementById("sideNav");
  sideNav.style.width = "250px";
  sideNav.classList.add("open"); // Add this line
}

function closeNav() {
  const sideNav = document.getElementById("sideNav");
  sideNav.style.width = "0";
  sideNav.classList.remove("open"); // Add this line
}

let textIndex = 0;
const textSlides = document.querySelectorAll('.text-slide');
const textTrack = document.getElementById('textTrack');

function showNextText() {
  textIndex = (textIndex + 1) % textSlides.length;
  const offset = -textIndex * 100;
  textTrack.style.transform = `translateX(${offset}%)`;
}

setInterval(showNextText, 3000); // Change every 3 seconds


let slideIndex = 0;
const track = document.querySelector('.carousel-track');
const slides = document.querySelectorAll('.carousel-slide');

function moveSlide(direction) {
  slideIndex += direction;

  if (slideIndex < 0) slideIndex = slides.length - 1;
  if (slideIndex >= slides.length) slideIndex = 0;

  const offset = -slideIndex * 100;
  track.style.transform = `translateX(${offset}%)`;
}


// Cart logic
function addToCart(name, price) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const existingItem = cart.find(item => item.name === name);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ name, price, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  alert(`${name} added to cart!`);
}

// Update cart item count in nav (if applicable)
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartCount = document.getElementById("cart-count");
  if (cartCount) {
    cartCount.textContent = count;
  }
}

// Load and display cart items on the cart page
function loadCart() {
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  const cartTable = document.getElementById("cartItems");
  const grandTotalSpan = document.getElementById("grandTotal");

  if (!cartTable || !grandTotalSpan) return; // Exit if not on cart page

  cartTable.innerHTML = ""; // Clear current rows
  let grandTotal = 0;

  cartItems.forEach((item, index) => {
    const total = item.price * item.quantity;
    grandTotal += total;

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.name}</td>
      <td>P${item.price.toFixed(2)}</td>
      <td>${item.quantity}</td>
      <td>P${total.toFixed(2)}</td>
      <td><button onclick="removeItem(${index})">Remove</button></td>
    `;
    cartTable.appendChild(row);
  });

  grandTotalSpan.textContent = grandTotal.toFixed(2);
}

// Remove item from cart
function removeItem(index) {
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  cartItems.splice(index, 1); // Remove item at index
  localStorage.setItem("cart", JSON.stringify(cartItems));
  loadCart(); // Refresh table
  updateCartCount(); // Update count
}

// Show thank you message on feedback form submit
document.addEventListener("DOMContentLoaded", () => {
  const feedbackForm = document.getElementById("feedbackForm");
  const thankYou = document.getElementById("thankYouMessage");

  if (feedbackForm && thankYou) {
    feedbackForm.addEventListener("submit", function (event) {
      event.preventDefault();
      feedbackForm.style.display = "none";
      thankYou.style.display = "block";
    });
  }

  updateCartCount();
  loadCart();
});

 
    function handleSignup(event) {
      event.preventDefault();
      const username = document.getElementById("username").value;
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      const confirmPassword = document.getElementById("confirmPassword").value;
      const message = document.getElementById("signupMessage");

      if (password !== confirmPassword) {
        message.textContent = "Passwords do not match.";
        message.style.color = "red";
        return;
      }

      // Normally here you'd send this data to a server.
      message.textContent = `Thank you for signing up, ${username}!`;
      message.style.color = "green";
      document.getElementById("signupForm").reset();
    }
  
    
    function handleSignin(event) {
      event.preventDefault();
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      const message = document.getElementById("signinMessage");

      // Dummy validation logic
      if (email === "user@example.com" && password === "password123") {
        message.textContent = "Login successful!";
        message.style.color = "green";
        // Redirect or further action can go here
      } else {
        message.textContent = "Invalid email or password.";
        message.style.color = "red";
      }
    }
  
document.getElementById("buyBtn").addEventListener("click", function () {
  const cartTable = document.getElementById("cartItems");

  if (cartTable.rows.length === 0) {
    document.getElementById("buyMessage").textContent = "Your cart is empty!";
    document.getElementById("buyMessage").style.color = "red";
    return;
  }

  // Optional: Here you could send data to a server or save locally

  // Clear the cart visually
  cartTable.innerHTML = "";
  document.getElementById("grandTotal").textContent = "0.00";
  document.getElementById("buyMessage").textContent = "Thank you for your purchase!";
  document.getElementById("buyMessage").style.color = "green";
});
