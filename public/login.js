import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-analytics.js";
import { getAuth, onAuthStateChanged, signInWithPopup, GoogleAuthProvider,signOut} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBAUkCJYab8t9yKDlN2i5BDFJ_kvph4BX4",
  authDomain: "crowdcart-y2025.firebaseapp.com",
  projectId: "crowdcart-y2025",
  storageBucket: "crowdcart-y2025.firebasestorage.app",
  messagingSenderId: "887027389752",
  appId: "1:887027389752:web:bb6ec9f72e8fdbd9125dcd",
  measurementId: "G-RSG2EN3HTW"
};

  // Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();


window.logoutUser = logoutUser;
window.loginWithGoogle = loginWithGoogle;


export function loginWithGoogle(){
  signInWithPopup(auth, provider)
      .catch(err => console.error(err));
}

function logoutUser() {
  signOut(auth);
}

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

// Listen for button click
document.getElementById('googleLoginBtn').addEventListener('click', () => {
  signInWithPopup(auth, provider)
    })

    .catch((error) => {
      console.error(error);
      document.getElementById('failedLoginText').style.display = "block";
    });
;