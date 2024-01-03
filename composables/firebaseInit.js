// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { ref, getStorage, uploadBytes, getDownloadURL } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBGiPcxsQAoDN_G_0RwkU-1sAVgNUGHMdg",
  authDomain: "linkfree-6db99.firebaseapp.com",
  projectId: "linkfree-6db99",
  storageBucket: "linkfree-6db99.appspot.com",
  messagingSenderId: "755913803777",
  appId: "1:755913803777:web:e133f3354a54f1a0c29800",
};

// Initialize Firebase
const useFireBaseStorage = () => {
  const app = initializeApp(firebaseConfig);
  const storage = getStorage(app);
  return storage;
};

export const saveFile = async (file) => {
  try {
    const storage = useFireBaseStorage();
    const imageRef = ref(storage, "images/" + file.name);

    const snapshot = await uploadBytes(imageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);

    return downloadURL;
  } catch (error) {
    return new Error("Can't upload image at this moment");
  }
};
