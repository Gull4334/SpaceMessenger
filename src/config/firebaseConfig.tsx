import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyByetaTs7zIjKucmKq44Q1eHxPkJS8vdjY",
  authDomain: "spacebook-messenger.firebaseapp.com",
  projectId: "spacebook-messenger",
  storageBucket: "spacebook-messenger.appspot.com",
  messagingSenderId: "548633682668",
  appId: "1:548633682668:web:dfcbd68559b3942edb7bc9",
};

const app = initializeApp(firebaseConfig);
const firebaseDb = getFirestore(app);

export default firebaseDb;