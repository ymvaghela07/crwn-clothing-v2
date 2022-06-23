import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAgC1djICR3-J-ZPkQGiWvrqERVq8KiEFM",
  authDomain: "crwn-clothing-db-45f3a.firebaseapp.com",
  projectId: "crwn-clothing-db-45f3a",
  storageBucket: "crwn-clothing-db-45f3a.appspot.com",
  messagingSenderId: "822055054947",
  appId: "1:822055054947:web:d85637b265cdda0e105256",
};

const firebaseApp = initializeApp(firebaseConfig); // creates an app instance

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore(); // allows us to access database

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid);

  console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot);
  console.log(userSnapshot.exists());

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createAt = new Date();

    // if user data does not exist
    // create/set the document with the data from userAuth in my collection
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createAt,
      });
    } catch (err) {
      console.log("Error creating the user", err.message);
    }
  }

  //if user data exists
  // return userDocRef
  return userDocRef;
};
