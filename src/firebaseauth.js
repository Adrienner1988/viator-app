// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";
import { getFirestore, setDoc, doc } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBNKbNZfA0Fns2GmPaygGrKg3SHO60HzaI",
  authDomain: "viator-app-bf837.firebaseapp.com",
  projectId: "viator-app-bf837",
  storageBucket: "viator-app-bf837.firebasestorage.app",
  messagingSenderId: "548930141128",
  appId: "1:548930141128:web:fc2a1bb463f1ec863c1efd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

function showMessage(message, divId){
  var messageDiv = document.getElementById(divId);
  messageDiv.innerHTML = message;
  messageDiv.style.opacity = 1;
  setTimeout(function(){
    messageDiv.style.opacity = 0;
  }, 3000);
  })
}

const signUp= document.getElementById('submitSignUp');
signUp.addEventListener('click', async (e) => {
  event.preventDefault();
  const email= document.getElementById('rEmail').value;
  const password= document.getElementById('rPassword').value;
  const firstName=document.getElementById('fName').value;
  const lastName=document.getElementById('lName').value;

  const auth = getAuth();
  const db=getFirestore();

  createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in
    const user = userCredential.user;
    const userData={
      email:email,
      firstName:firstName,
      lastName:lastName
    };
    showMessage('Account Created Successfully', 'signUpMessage');
    const docRef=doc(db, "users", user.uid);
    setDoc(docRef, userData);
    .then(() => {
      window.location.href='index.html';
    })
    .catch((error) => {
      console.error("error writing document", error);
    });
  })
  .catch((error) => {
    const errorCode = error.code;
    if(errorCode=='auth/email-already-in-use'){
      showMessage('Email already in use', 'signUpMessage');
    } else {
      showMessage('unable to create User', 'signUpMessage');
    }
  });
}
