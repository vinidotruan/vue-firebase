import firebase from "firebase";
import { ref, onUnmounted } from "vue";

const config = {
  apiKey: "AIzaSyB349MYxVKI3hQQqv79925S2veixDF9_Zs",
  authDomain: "vue-firebase-app-f6c38.firebaseapp.com",
  projectId: "vue-firebase-app-f6c38",
  storageBucket: "vue-firebase-app-f6c38.appspot.com",
  messagingSenderId: "294236003378",
  appId: "1:294236003378:web:83b825bc08f65f4bf9f02b",
  measurementId: "G-F4K22V3B4V",
};

const firebaseApp = firebase.initializeApp(config);

const db = firebaseApp.firestore();
const usersCollection = db.collection("users");

export const createUser = (user) => {
  return usersCollection.add(user);
};

export const getUser = async (id) => {
  const user = await usersCollection.doc(id).get();
  return user.exists ? user.data() : null;
};

export const updateUser = (id, user) => {
  return usersCollection.doc(id).update(user);
};

export const deleteUser = (id) => {
  return usersCollection.doc(id).delete();
};

export const useLoadUsers = () => {
  const users = ref([]);
  const close = usersCollection.onSnapshot((snapshot) => {
    users.value = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  });

  onUnmounted(close);
  return users;
};
