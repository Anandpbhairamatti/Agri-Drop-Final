let userState = {
    isLoggedIn: localStorage.getItem('isLoggedIn') === 'true', // Check login status from localStorage
    isSeller: localStorage.getItem('isSeller') === 'true', // Check if the user is a seller
  };

  const navbar = document.getElementById('navbar');

  function updateNavbar() {
    let links = '';

    if (!userState.isLoggedIn) {
      // New user (not logged in)
      links = `
        <li><a href="#home">Home</a></li>
        <li><a href="signup.html">Sign Up</a></li>
        <li><a href="#contact">About Us</a></li>
      `;
    } else if (userState.isLoggedIn && !userState.isSeller) {
      // Logged-in user (not a seller)
      links = `
        <li><a href="#home">Home</a></li>
        <li><a href="#" onclick="logout()">Logout</a></li>
        <li><a href="Seller/seller.html" onclick="registerSeller()">Become a Seller</a></li>
        <li><a href="#profile">Profile</a></li>
      `;
    } else if (userState.isLoggedIn && userState.isSeller) {
      // Seller user
      links = `
        <li><a href="#home">Home</a></li>
        <li><a href="#" onclick="logout()">Logout</a></li>
        <li><a href="Seller/addProduct.html">Sell a Product</a></li>
        <li><a href="#profile">Profile</a></li>
      `;
    }

    navbar.innerHTML = links;
  }

  function logout() {
    // Simulate logout functionality
    userState.isLoggedIn = false;
    userState.isSeller = false;

    // Update localStorage to reflect the logout
    localStorage.setItem('isLoggedIn', 'false');
    localStorage.setItem('isSeller', 'false');

    updateNavbar();
    alert('You have been logged out.');
  }

  function registerSeller() {
    // Simulate seller registration process
    alert('Congratulations! You are now a seller.');
    userState.isSeller = true;
    updateNavbar();

    // Update localStorage to reflect the new status
    localStorage.setItem('isSeller', 'true');

    
  }

  // Initialize the navbar on page load
  updateNavbar();
