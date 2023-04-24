import firebase from 'firebase/compat/app';
import 'firebase/compat/storage'; 

const firebaseConfig = {
  apiKey: "AIzaSyCP2x6EYYuMkdI3ZC6SJJj3Vh3dtC7utIU",
  authDomain: "podcast-prime.firebaseapp.com",
  projectId: "podcast-prime",
  storageBucket: "podcast-prime.appspot.com",
  messagingSenderId: "858913246686",
  appId: "1:858913246686:web:c8523363d249d3f960a14f",
  measurementId: "G-4M109TXF16"
};

  const app = firebase.initializeApp(firebaseConfig);

  const storage = app.storage();

  export default storage;