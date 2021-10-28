

import  firebase  from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getFirestore,collection, getDocs } from 'firebase/firestore/lite';

const firebaseConfig = {
    apiKey: "AIzaSyCbH8TcSDBPzzcnjyzAwwgb2dAD23hOO6I",
    authDomain: "mobrecette.firebaseapp.com",
    projectId: "mobrecette",
    storageBucket: "mobrecette.appspot.com",
    messagingSenderId: "350072110846",
    appId: "1:350072110846:web:1e36a3094c65fcd9346faf",
    measurementId: "G-4XQBT0G43K"
  };
  
const app = firebase.initializeApp(firebaseConfig);
const auth = app.auth();
const db = getFirestore(app);

const googleProvider = new firebase.auth.GoogleAuthProvider();

const signInWithGoogle = async () => {
  try {
    const res = await auth.signInWithPopup(googleProvider);
    const user = res.user;
    const query = await db
      .collection("users")
      .where("uid", "==", user.uid)
      .get();
    if (query.docs.length === 0) {
      await db.collection("users").add({
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};


const logout = () => {
  auth.signOut();
};

// Get a list of recipes from your database
async function getRecipes() {
  const recipesCol = collection(db, 'recette');
  const recipeSnapshot = await getDocs(recipesCol);
  const recipeList = recipeSnapshot.docs.map(doc => doc.data());
  
  return recipeList;
}
export {
  auth,
  db,
  getRecipes,
  signInWithGoogle,
  logout,
};