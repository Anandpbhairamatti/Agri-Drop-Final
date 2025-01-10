
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getFirestore, setDoc, doc, collection, query, where, getDocs, updateDoc } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBLCWmhmY1qc_szY7PkLHHooPPZSbTeXj4",
    authDomain: "agridrop-5ffa8.firebaseapp.com",
    projectId: "agridrop-5ffa8",
    storageBucket: "agridrop-5ffa8.firebasestorage.app",
    messagingSenderId: "447104623367",
    appId: "1:447104623367:web:4938333541fee115559559ba2",
    measurementId: "G-Z66S9DVKZX",
};

// Initialize Firebase and Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Handle form submission
document.getElementById('sellerForm').addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevent default form submission

    const sellername = document.getElementById('sellername').value.trim();
    const category = document.getElementById('category').value.trim(); // Either 'Farmer' or 'Seller'
    const mobileNumber = document.getElementById('mobileNumber').value.trim();
    const email = document.getElementById('email').value.trim().toLowerCase(); // Convert to lowercase for consistency
    const panCard = document.getElementById('panCard').value.trim() || null;
    const gstin = document.getElementById('gstin').value.trim() || null;

    // Validation checks
    const mobileRegex = /^\d{10}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const panCardRegex = /^[A-Z]{5}\d{4}[A-Z]{1}$/;
    const gstRegex = /^\d{15}$/;

    if (!mobileRegex.test(mobileNumber)) {
        alert('Invalid mobile number.');
        return;
    }

    if (!emailRegex.test(email)) {
        alert('Invalid email address.');
        return;
    }

    if (category === 'Farmer' && !panCardRegex.test(panCard)) {
        alert('Invalid PAN card.');
        return;
    }

    if (category === 'Seller' && !gstRegex.test(gstin)) {
        alert('Invalid GSTIN.');
        return;
    }

    try {
        // Check if the user already exists in the `users` collection
        const userQuery = query(collection(db, 'users'), where('email', '==', email));
        const userSnapshot = await getDocs(userQuery);

        if (!userSnapshot.empty) {
            // Update the existing user document with the new role
            const userDocRef = userSnapshot.docs[0].ref;
            await updateDoc(userDocRef, { role: category });
        } else {
            console.log("User does not exist in the users collection.");
            alert("User not found in the system. Please ensure the user is registered first.");
            return;
        }

        // Add/Update entry in the `sellers` collection using `email` as the foreign key
        const sellerDocRef = doc(db, 'sellers', email);
        const sellerData = {
            sellername,
            mobileNumber,
            email, // Foreign key linking to the `users` collection
            category,
            ...(category === 'Farmer' && { panCard }),
            ...(category === 'Seller' && { gstin }),
        };
        await setDoc(sellerDocRef, sellerData); // Always add data to sellers collection

        alert('Registration successful!');
        window.location.href = '../index1.html';
        document.getElementById('sellerForm').reset(); // Reset form
    } catch (error) {
        console.error('Error registering seller:', error);
        alert('Failed to register. Please try again.');
    }
});


