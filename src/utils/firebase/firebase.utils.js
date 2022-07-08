import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
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

const firebaseApp = initializeApp(firebaseConfig); // creates an app instance based on firebaseConfig

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account", // forces user to select an google account
});

export const auth = getAuth(); // keeps track of authentication status of entire application

export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

///////////////////////////////////////////////////////////////////////////////////////

export const db = getFirestore(); // allows us to access database

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  const userDocRef = doc(db, "users", userAuth.uid);

  // console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef);
  // console.log(userSnapshot);
  // console.log(userSnapshot.exists());

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    // if user data does not exist
    // create/set the document with the data from userAuth in my collection
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (err) {
      console.log("Error creating the user", err.message);
    }
  }

  //if user data exists
  // return userDocRef
  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => {
  await signOut(auth);
};

export const onAuthStateChangedListner = (callback) =>
  onAuthStateChanged(auth, callback);
