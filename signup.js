
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";
import { getFirestore, setDoc, doc, collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBLCWmhmY1qc_szY7PkLHHooPPZSbTeXj4",
    authDomain: "agridrop-5ffa8.firebaseapp.com",
    projectId: "agridrop-5ffa8",
    storageBucket: "agridrop-5ffa8.firebasestorage.app",
    messagingSenderId: "447104623367",
    appId: "1:447104623367:web:4938333541fee115559ba2",
    measurementId: "G-Z66S9DVKZX",
};

// Initialize Firebase, Firestore, and Authentication
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getFirestore(app);

document.querySelector('#myform').addEventListener('submit', async function (e) {
    e.preventDefault(); // Prevent form submission

    // Get form values
    const username = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const role = new URLSearchParams(window.location.search).get("role") || "user"; // Default role as "user"

    // Validate inputs with regex
    const usernameRegex = /^[A-Za-z]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

    if (!usernameRegex.test(username)) {
        alert('Invalid username format. Only alphabets are allowed.');
        return;
    }
    if (!emailRegex.test(email)) {
        alert('Invalid email format.');
        return;
    }
    if (!phoneRegex.test(phone)) {
        alert('Invalid phone number. It should be 10 digits.');
        return;
    }
    if (!passwordRegex.test(password)) {
        alert('Password must be 6-20 characters long, include at least 1 digit, 1 uppercase, and 1 lowercase.');
        return;
    }
    if (password !== confirmPassword) {
        alert('Passwords do not match.');
        return;
    }

    try {
        // Check if the email or phone number already exists in Firestore
        const usersRef = collection(database, 'users');
        const emailQuery = query(usersRef, where('email', '==', email));
        const phoneQuery = query(usersRef, where('phone', '==', phone));

        const emailSnapshot = await getDocs(emailQuery);
        const phoneSnapshot = await getDocs(phoneQuery);

        if (!emailSnapshot.empty) {
            alert('Email already exists. Please use a different email.');
            return;
        }
        if (!phoneSnapshot.empty) {
            alert('Phone number already exists. Please use a different phone number.');
            return;
        }

        // Use Firebase Authentication to create a user with email and password
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Send email verification
        await sendEmailVerification(user);

        // Store data in Firestore
        await setDoc(doc(database, 'users', user.uid), {
            username,
            email,
            phone,
            role:"user",
        });

        alert('Registration successful! Please check your email for verification.');
        window.location.href = 'login.html'; // Redirect to login page
    } catch (error) {
        console.error('Error during registration:', error);
        alert(`An error occurred: ${error.message}`);
    }
});
