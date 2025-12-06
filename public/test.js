import {
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  signOut
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

const auth = getAuth();
const provider = new GoogleAuthProvider();

// Login button
document.getElementById("googleLoginBtn").addEventListener("click", () => {
  signInWithPopup(auth, provider);
});

// Auth state listener
onAuthStateChanged(auth, (user) => {
  if (user) {
    // Logged in
    document.getElementById("loggedOutView").style.display = "none";
    document.getElementById("loggedInView").style.display = "block";

    document.getElementById("userName").textContent = user.displayName;
    document.getElementById("userEmail").textContent = user.email;
  } else {
    // Logged out
    document.getElementById("loggedOutView").style.display = "block";
    document.getElementById("loggedInView").style.display = "none";
  }
});

// Logout button
document.getElementById("logoutBtn").addEventListener("click", () => {
  signOut(auth);
});