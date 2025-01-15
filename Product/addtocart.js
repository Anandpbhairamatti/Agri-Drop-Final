/*navbar*/
const navbar = document.getElementById("navbar");

function updateNavbar() {
let links = "";

if (!userState.isLoggedIn) {
// User not logged in
links = `
<li><a href="../index1.html">Home</a></li>
<li><a href="../signup.html">Sign Up</a></li>
<li><a href="#contact">About Us</a></li>
`;
} else if (userState.isLoggedIn && !userState.isSeller) {
// Logged-in user (not a seller)
links = `
<li><a href="../index1.html">Home</a></li>
<li><a href="../index1.html" onclick="logout()">Logout</a></li>
<li><a href="order.html">My order</a></li>
<li><a href="../Seller/seller.html">Become a Seller</a></li>
<li><a href="#profile">Profile</a></li>
`;
} else if (userState.isLoggedIn && userState.isSeller) {
// Seller user
links = `
<li><a href="../index1.html">Home</a></li>
<li><a href="../index1.html" onclick="logout()">Logout</a></li>
<li><a href="order.html">My order</a></li>
<li><a href="../Seller/addProduct.html">Sell a Product</a></li>
<li><a href="#profile">Profile</a></li>
`;
}

navbar.innerHTML = links;
}




let userState = {
  isLoggedIn: localStorage.getItem("isLoggedIn") === "true", // Check login status from localStorage
  isSeller: localStorage.getItem("isSeller") === "true", // Check if the user is a seller
}
// Define the logout function and attach it to the window object
function logout() {
// Update localStorage to reflect the logout
localStorage.setItem("isLoggedIn", "false");
localStorage.setItem("isSeller", "false");

// Clear any other data stored in localStorage if necessary
localStorage.removeItem("userState");

// Update userState object to reflect logout status
userState.isLoggedIn = false;
userState.isSeller = false;

// Update the navbar dynamically to reflect logged-out state
updateNavbar();

// Inform the user and redirect to the homepage or login page
alert("You have been logged out.");
window.location.href = "index1.html"; // Replace with your actual redirection path
}

// Attach the function to the global window object
window.logout = logout;


updateNavbar();