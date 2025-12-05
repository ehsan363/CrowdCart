import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-analytics.js";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

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

  // Listen for button click
  document.getElementById('googleLoginBtn').addEventListener('click', () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        alert(`Welcome ${user.displayName}!`);
        // TODO: Redirect or update UI
      })
      .catch((error) => {
        console.error(error);
        document.getElementById('failedLoginText').style.display = "block";
      });
  });

