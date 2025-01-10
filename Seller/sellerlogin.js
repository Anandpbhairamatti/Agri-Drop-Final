document.addEventListener("DOMContentLoaded", () => {
    const sellerLoginForm = document.getElementById("sellerLoginForm");

    sellerLoginForm.addEventListener("submit", (event) => {
        event.preventDefault(); // Prevent form submission

        const email = document.getElementById("sellerEmail").value.trim();
        const password = document.getElementById("sellerPassword").value.trim();

        // Basic validation
        // if (!validateEmail(email)) {
        //     alert("Please enter a valid email address.");
        //     return;
        // }

        // if (password.length < 6) {
        //     alert("Password must be at least 6 characters long.");
        //     return;
        // }

        // Simulate form submission (replace this with real authentication logic)
        alert("Login successful!");
        sellerLoginForm.reset();
    });

    function validateEmail(email) {
        const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
        return emailRegex.test(email);
    }
});
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, reload, getIdToken } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBLCWmhmY1qc_szY7PkLHHooPPZSbTeXj4",
    authDomain: "agridrop-5ffa8.firebaseapp.com",
    projectId: "agridrop-5ffa8",
    storageBucket: "agridrop-5ffa8.firebasestorage.app",
    messagingSenderId: "447104623367",
    appId: "1:447104623367:web:4938333541fee115559559ba2",
    measurementId: "G-Z66S9DVKZX"
};

// Initialize Firebase and Authentication
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

document.querySelector('#sellerLoginForm').addEventListener('submit', async function (e) {
    e.preventDefault(); // Prevent form submission

    // Get form values
    const email = document.getElementById('sellerEmail').value;
    const password = document.getElementById('sellerPassword').value;

    // Validate inputs
    if (!email || !password) {
        alert('Please enter both email and password.');
        return;
    }

    try {
        // Sign in the user using Firebase Authentication
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Refresh the user data to get the latest email verification status
        await reload(user);

        // Check if email is verified
        if (!user.emailVerified) {
            alert('Please verify your email before logging in.');
            return;
        }

        // Get ID token from Firebase
        const token = await getIdToken(user);

        // Simulate checking if the user is a seller (replace with actual backend check if needed)
        const isSeller = true; // Placeholder, update this logic as required

        if (!isSeller) {
            alert('Access denied. This login is for sellers only.');
            return;
        }

        // Store token and user info in localStorage
        localStorage.setItem('authToken', token);
        localStorage.setItem('sellerEmail', user.email); // Store email or other seller info as needed

        // Redirect to the seller dashboard or home page
        alert('Seller login successful!');
        window.location.href = '../index1.html'; // Update the path as per your application structure
    } catch (error) {
        console.error('Error during seller login:', error);
        switch (error.code) {
            case 'auth/user-not-found':
                alert('No user found with this email.');
                break;
            case 'auth/wrong-password':
                alert('Incorrect password. Please try again.');
                break;
            case 'auth/invalid-email':
                alert('Invalid email format.');
                break;
            default:
                alert('An error occurred. Please try again later.');
        }
    }
});

