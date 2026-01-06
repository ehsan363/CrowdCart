// Login through Google

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-analytics.js";
import { getAuth, onAuthStateChanged, signInWithPopup, GoogleAuthProvider,signOut} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBAUkCJYab8t9yKDlN2i5BDFJ_kvph4BX4",
  authDomain: "crowdcart-y2025.firebaseapp.com",
  projectId: "CrowdCart",
  storageBucket: "crowdcart-y2025.firebasestorage.app",
  messagingSenderId: "887027389752",
  appId: "1:887027389752:web:bb6ec9f72e8fdbd9125dcd",
  measurementId: "G-RSG2EN3HTW"
};

  // Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
const provider = new GoogleAuthProvider();


window.logoutUser = logoutUser;
window.loginWithGoogle = loginWithGoogle;


export function loginWithGoogle(){
  signInWithPopup(auth, provider)
      .catch(err => console.error(err));
}

function logoutUser() {
  signOut(auth)
    .then(() => {
      console.log("User logged out");
      // ✅ DO NOT manually change UI here
      // onAuthStateChanged will do it automatically
    })
    .catch(err => console.error("Logout error:", err));
}




onAuthStateChanged(auth, (user) => {
  const loggedOutView = document.getElementById("loggedOutView");
  const loggedInView = document.getElementById("loggedInView");

  if (!loggedOutView || !loggedInView) return;

  if (user) {
    // USER IS LOGGED IN
    loggedOutView.style.display = "none";
    loggedInView.style.display = "block";

    document.getElementById("userName").textContent = user.displayName || "User";
    document.getElementById("userEmail").textContent = user.email || "";
  } else {
    // USER IS LOGGED OUT
    loggedInView.style.display = "none";
    loggedOutView.style.display = "block";
  }
});


// Listen for button click
document.addEventListener("DOMContentLoaded", () => {
  const loginBtn = document.getElementById("googleLoginBtn");

  if (!loginBtn) return;

  loginBtn.addEventListener("click", () => {
    signInWithPopup(auth, provider)


    .catch((error) => {
      // Ignore popup cancel errors (normal behavior)
      if (error.code === "auth/cancelled-popup-request") {
        console.warn("Popup was cancelled automatically.");
        return;
      }

      console.error("Login error:", error);

      const failText = document.getElementById("failedLoginText");
      if (failText) failText.style.display = "block";
    });

      });
  });