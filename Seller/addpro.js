// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getDatabase, ref, push, set, onValue } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-database.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBLCWmhmY1qc_szY7PkLHHooPPZSbTeXj4",
  authDomain: "agridrop-5ffa8.firebaseapp.com",
  databaseURL: "https://agridrop-5ffa8-default-rtdb.firebaseio.com",
  projectId: "agridrop-5ffa8",
  storageBucket: "agridrop-5ffa8.appspot.com",
  messagingSenderId: "447104623367",
  appId: "1:447104623367:web:4938333541fee115559ba2",
  measurementId: "G-Z66S9DVKZX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

/**
 * Encode a File object (image) into a Base64 string
 * @param {File} file - Image file to be encoded
 * @returns {Promise} - Resolves with the Base64 encoded string
 */
function encodeFileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
}

// Form submission handler
document.getElementById("product-form").addEventListener("submit", async function (e) {
  e.preventDefault();

  const name = document.getElementById("product-name").value.trim();
  const category = document.getElementById("category").value;
  const price = document.getElementById("price").value.trim();
  const description = document.getElementById("description").value.trim();
  const imageFile = document.getElementById("poster").files[0];
  const  quantity = document.getElementById("quantity").value || null;
  const quality = document.getElementById("quality").value || null;

  if (category === "Pesticides") {
    quantity = document.getElementById("quantity").value;
    if (!quantity) {
      alert("Please select the quantity.");
      return;
    }
  } else if (category === "Biowaste") {
    quality = document.getElementById("quality").value;
    if (!quantity) {
      alert("Please enter the quantity.");
      return;
    }
  } else if (category === "Tools") {
    if (!quantity) {
        alert("Please select the quantity.");
        return;
  }

  if (!imageFile) {
    alert("Please select an image.");
    return;
  }

  try {
    // Convert image file to Base64
    const base64Image = await encodeFileToBase64(imageFile);

    // Save product details in Firebase
    const productRef = push(ref(database, `products/${category}`)); // Create a new product reference under the selected category
    await set(productRef, {
      name,
      category,
      price,
      description,
      image: base64Image,
      ...(category === 'Pesticides || Tools' && { quality }),
      ...(category === 'Biowaste' && { quantity }),
    });

    alert("Product uploaded successfully!");
    window.location.href = '../index1.html';
  } catch (error) {
    console.error("Error uploading product: ", error);
    alert("Error uploading product. Check the console for details.");
  }
});

// // Toggle visibility of category-specific fields
// function toggleCategoryFields() {
//   const category = document.getElementById("category").value;
//   const quantityField = document.getElementById("quantityField");
//   const qualityField = document.getElementById("qualityField");

//   if (category === "Pesticides") {
//     qualityField.style.display = "none";
//     quantityField.style.display = "block";
//   } else if (category === "Biowaste") {
//     quantityField.style.display = "none";
//     qualityField.style.display = "block";
//   } else {
//     quantityField.style.display = "block";
//     qualityField.style.display = "none";
//   }
// }

// // Ensure the function is globally available
// // window.toggleCategoryFields = toggleCategoryFields;

// // // Add event listener for DOMContentLoaded
// // document.addEventListener("DOMContentLoaded", () => {
// //   const categoryElement = document.getElementById("category");
// //   categoryElement.addEventListener("change", toggleCategoryFields);
// // });

// Toggle visibility of category-specific fields
function toggleCategoryFields() {
    const category = document.getElementById("category").value;
    const quantityField = document.getElementById("quantityField");
    const qualityField = document.getElementById("qualityField");
  
    if (category === "Pesticides" || category === "Tools") {
      // Show quantity field and hide quality field
      quantityField.style.display = "block";
      qualityField.style.display = "none";
    } else if (category === "Biowaste") {
      // Show quality field and hide quantity field
      qualityField.style.display = "block";
      quantityField.style.display = "none";
    } else {
      // Hide both fields for any other case
      quantityField.style.display = "none";
      qualityField.style.display = "none";
    }
  }
  