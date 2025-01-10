
//   import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
//   import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";

//   // Firebase configuration
//   const firebaseConfig = {
//     apiKey: "AIzaSyBLCWmhmY1qc_szY7PkLHHooPPZSbTeXj4",
//     authDomain: "agridrop-5ffa8.firebaseapp.com",
//     projectId: "agridrop-5ffa8",
//     storageBucket: "agridrop-5ffa8.firebasestorage.app",
//     messagingSenderId: "447104623367",
//     appId: "1:447104623367:web:4938333541fee115559ba2",
//     measurementId: "G-Z66S9DVKZX"
//   };

//   // Initialize Firebase and Authentication
//   const app = initializeApp(firebaseConfig);
//   const auth = getAuth(app);

//   // Function to check authentication state
//   onAuthStateChanged(auth, (user) => {
//     if (user) {
//       // User is logged in, check if the user is a seller
//       const isSeller = localStorage.getItem('isSeller') === 'true';
//       // Set the user state and update localStorage
//       localStorage.setItem('isLoggedIn', 'true');
//       localStorage.setItem('userEmail', user.email);

//       // Update navbar
//       updateNavbar(isSeller);
//     } else {
//       // User is logged out, update navbar and localStorage
//       localStorage.setItem('isLoggedIn', 'false');
//       localStorage.removeItem('userEmail');
//       updateNavbar(false);  // Default to non-seller if logged out
//     }
//   });

//   // Function to update the navbar based on login state and user type
//   function updateNavbar(isSeller) {
//     const navbar = document.getElementById('navbar');
//     let links = '';

//     if (localStorage.getItem('isLoggedIn') === 'false') {
//       // New user (not logged in)
//       links = `
//         <li><a href="#home">Home</a></li>
//         <li><a href="signup.html">Sign Up</a></li>
//         <li><a href="#contact">About Us</a></li>
//       `;
//     } else if (!isSeller) {
//       // Logged-in user (not a seller)
//       links = `
//         <li><a href="#home">Home</a></li>
//         <li><a href="#" onclick="logout()">Logout</a></li>
//         <li><a href="Seller/seller.html">Become a seller</a></li>
//         <li><a href="#profile">Profile</a></li>
//       `;
//     } else {
//       // Seller user
//       links = `
//         <li><a href="#home">Home</a></li>
//         <li><a href="#" onclick="logout()">Logout</a></li>
//         <li><a href="Seller/addProduct.html">Sell a Product</a></li>
//         <li><a href="#profile">Profile</a></li>
//       `;
//     }

//     navbar.innerHTML = links;
//   }

//   // Logout function
//   function logout() {
//     signOut(auth).then(() => {
//       localStorage.setItem('isLoggedIn', 'false');
//       localStorage.removeItem('userEmail');
//       updateNavbar(false);
//       alert('You have been logged out.');
//     }).catch((error) => {
//       console.error('Logout failed:', error);
//     });
//   }

//   // Function to simulate seller registration
//   function registerAsSeller() {
//     localStorage.setItem('isSeller', 'true');
//     updateNavbar(true); // Update navbar as a seller
//   }

//   // Function to simulate regular user registration
//   function registerAsUser() {
//     localStorage.setItem('isSeller', 'false');
//     updateNavbar(false); // Update navbar as a non-seller
//   }

//   // Example Login Function
//   async function loginUser(email, password) {
//     try {
//       const userCredential = await signInWithEmailAndPassword(auth, email, password);
//       const user = userCredential.user;
//       alert('Login successful!');
//     } catch (error) {
//       alert('Error during login: ' + error.message);
//     }
//   }

//   // Example Usage of login function (replace these with actual form logic)
//   loginUser('testuser@example.com', 'password123'); // Replace with actual login logic
// // </script>


//------------------------------------
// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
// import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";

// // Firebase configuration
// const firebaseConfig = {
//     apiKey: "AIzaSyBLCWmhmY1qc_szY7PkLHHooPPZSbTeXj4",
//     authDomain: "agridrop-5ffa8.firebaseapp.com",
//     projectId: "agridrop-5ffa8",
//     storageBucket: "agridrop-5ffa8.firebasestorage.app",
//     messagingSenderId: "447104623367",
//     appId: "1:447104623367:web:4938333541fee115559ba2",
//     measurementId: "G-Z66S9DVKZX"
// };

// // Initialize Firebase and Authentication
// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);

// // Function to check authentication state
// onAuthStateChanged(auth, (user) => {
//     if (user) {
//         // User is logged in, check if the user is a seller
//         const isSeller = localStorage.getItem('isSeller') === 'true';
//         // Set the user state and update localStorage
//         localStorage.setItem('isLoggedIn', 'true');
//         localStorage.setItem('userEmail', user.email);

//         // Store the Firebase authentication token
//         user.getIdToken().then((token) => {
//             localStorage.setItem('authToken', token);
//         });

//         // Update navbar
//         updateNavbar(isSeller);
//     } else {
//         // User is logged out, update navbar and localStorage
//         localStorage.setItem('isLoggedIn', 'false');
//         localStorage.removeItem('userEmail');
//         localStorage.removeItem('authToken');
//         updateNavbar(false);  // Default to non-seller if logged out
//     }
// });

// // Function to update the navbar based on login state and user type
// function updateNavbar(isSeller) {
//     const navbar = document.getElementById('navbar');
//     let links = '';

//     if (localStorage.getItem('isLoggedIn') === 'false') {
//         // New user (not logged in)
//         links = `
//         <li><a href="#home">Home</a></li>
//         <li><a href="signup.html">Sign Up</a></li>
//         <li><a href="#contact">About Us</a></li>
//       `;
//     } else if (!isSeller) {
//         // Logged-in user (not a seller)
//         links = `
//         <li><a href="#home">Home</a></li>
//         <li><a href="index.html" onclick="logout()">Logout</a></li>
//         <li><a href="Seller/seller.html">Become a seller</a></li>
//         <li><a href="#profile">Profile</a></li>
//       `;
//     } else {
//         // Seller user
//         links = `
//         <li><a href="#home">Home</a></li>
//         <li><a href="index.html" onclick="logout()">Logout</a></li>
//         <li><a href="Seller/addProduct.html">Sell a Product</a></li>
//         <li><a href="#profile">Profile</a></li>
//       `;
//     }

//     navbar.innerHTML = links;
// }

// function logout() {
//     signOut(auth)
//         .then(() => {
//             // Clear all authentication-related data
//             localStorage.removeItem('isLoggedIn');
//             localStorage.removeItem('userEmail');
//             localStorage.removeItem('authToken');
//             localStorage.removeItem('isSeller'); // Optional: clear seller status if applicable

//             // Update the navbar for logged-out state
//             updateNavbar(false);

//             // Provide user feedback
//             alert('You have been logged out.');

//             // Optionally redirect to a landing or login page
//             window.location.href = "index.html";
//         })
//         .catch((error) => {
//             console.error('Logout failed:', error);
//         });
// }

// function registerAsSeller() {
//   localStorage.setItem('isSeller', 'true'); // Update seller status
//   updateNavbar(true); // Update navbar for a seller
//   alert('You are now registered as a seller!');
//   window.location.reload(); // Reload the page to apply changes
// }


// // Function to simulate regular user registration
// function registerAsUser() {
//     localStorage.setItem('isSeller', 'false');
//     updateNavbar(false); // Update navbar as a non-seller
// }

// // Example Login Function
// async function loginUser(email, password) {
//     try {
//         const userCredential = await signInWithEmailAndPassword(auth, email, password);
//         const user = userCredential.user;

//         // Store the Firebase authentication token
//         const token = await user.getIdToken();
//         localStorage.setItem('authToken', token);

//         alert('Login successful!');
//     } catch (error) {
//         console.error('Login failed:', error);
//       //  alert('Error during login: ' + error.message);
//     }
// }

// // Example Usage of login function (replace these with actual form logic)
// //loginUser('testuser@example.com', 'password123'); // Replace with actual login logic

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { 
    getAuth, 
    signInWithEmailAndPassword, 
    signOut, 
    onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBLCWmhmY1qc_szY7PkLHHooPPZSbTeXj4",
    authDomain: "agridrop-5ffa8.firebaseapp.com",
    projectId: "agridrop-5ffa8",
    storageBucket: "agridrop-5ffa8.firebasestorage.app",
    messagingSenderId: "447104623367",
    appId: "1:447104623367:web:4938333541fee115559ba2",
    measurementId: "G-Z66S9DVKZX"
};

// Initialize Firebase and Authentication
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Utility functions for localStorage management
function setLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function getLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
}

function clearLocalStorage(keys) {
    keys.forEach(key => localStorage.removeItem(key));
}

// Function to check authentication state
onAuthStateChanged(auth, (user) => {
    if (user) {
        const isSeller = getLocalStorage('isSeller') === true;

        // Store user details in localStorage
        setLocalStorage('isLoggedIn', true);
        setLocalStorage('userEmail', user.email);

        // Store Firebase authentication token
        user.getIdToken().then((token) => {
            setLocalStorage('authToken', token);
        });

        // Update navbar based on user type
        updateNavbar(isSeller);
    } else {
        // Clear localStorage and update navbar when logged out
        clearLocalStorage(['isLoggedIn', 'userEmail', 'authToken', 'isSeller']);
        updateNavbar(false);
    }
});

// Function to update the navbar dynamically
// function updateNavbar(isSeller) {
//     const navbar = document.getElementById('navbar');
//     const isLoggedIn = getLocalStorage('isLoggedIn');

//     const sellerLinks = `
//         <li><a href="#home">Home</a></li>
//         <li><a href="index.html" onclick="logout()">Logout</a></li>
//         <li><a href="Seller/addProduct.html">Sell a Product</a></li>
//         <li><a href="#profile">Profile</a></li>
//     `;
//     const userLinks = `
//         <li><a href="#home">Home</a></li>
//         <li><a href="index.html" onclick="logout()">Logout</a></li>
//         <li><a href="Seller/seller.html">Become a seller</a></li>
//         <li><a href="#profile">Profile</a></li>
//     `;
//     const guestLinks = `
//         <li><a href="#home">Home</a></li>
//         <li><a href="signup.html">Sign Up</a></li>
//         <li><a href="#contact">About Us</a></li>
//     `;

//     navbar.innerHTML = isLoggedIn ? (isSeller ? sellerLinks : userLinks) : guestLinks;
// }

function updateNavbar(isSeller) {
    const navbar = document.getElementById('navbar');
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    let links = '';

    if (!isLoggedIn) {
        // Not logged in
        links = `
            <li><a href="index.html">Home</a></li>
            <li><a href="signup.html">Sign Up</a></li>
            <li><a href="#contact">About Us</a></li>
        `;
    } else if (isLoggedIn && !isSeller) {
        // Logged in user (not a seller)
        links = `
            <li><a href="index.html">Home</a></li>
            <li><a href="index.html" onclick="logout()">Logout</a></li>
            <li><a href="Seller/seller.html">Become a seller</a></li>
            <li><a href="#profile">Profile</a></li>
        `;
    } else {
        // Seller user
        links = `
            <li><a href="index.html">Home</a></li>
            <li><a href="index.html" onclick="logout()">Logout</a></li>
            <li><a href="Seller/addProduct.html">Sell a Product</a></li>
            <li><a href="#profile">Profile</a></li>
        `;
    }

    navbar.innerHTML = links;
}
// // Logout function
// function logout() {
//     localStorage.clear();
//     updateNavbar(false);
//     console.log("log out success");
//     signOut(auth)
//         .then(() => {
//             // Clear local storage
//             clearLocalStorage(['isLoggedIn', 'userEmail', 'authToken', 'isSeller']);

//             // Ensure navbar updates after logout
//             updateNavbar(false);

//             // Provide feedback and redirect to login page
//             alert('You have been logged out.');
//             window.location.href = "index.html";
//         })
//         .catch((error) => {
//             console.error('Logout failed:', error);
//             alert('Logout failed. Please try again.');
//         });
// }
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

  // Initialize the navbar on page load
  updateNavbar();
// Function to register as a seller
function registerAsSeller() {
    setLocalStorage('isSeller', true); // Update seller status
    updateNavbar(true); // Update navbar for sellers
    alert('You are now registered as a seller!');
    window.location.reload(); // Reload to apply changes
}

// Function to register as a regular user
function registerAsUser() {
    setLocalStorage('isSeller', false); // Set as regular user
    updateNavbar(false); // Update navbar for non-sellers
}

// Login function
async function loginUser(email, password) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Store Firebase authentication token
        const token = await user.getIdToken();
        // setLocalStorage('authToken', token);
        localStorage.setItem('authToken',token)

        alert('Login successful!');
        // Update navbar after login
        updateNavbar(false);
    } catch (error) {
        console.error('Login failed:', error);
        alert('Error during login: ' + error.message);
    }
}

// Example Usage of Login Function
// Replace with actual form submission logic
// loginUser('testuser@example.com', 'password123');
