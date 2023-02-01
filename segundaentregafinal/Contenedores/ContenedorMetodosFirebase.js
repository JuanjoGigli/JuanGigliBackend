import { optionsFireBase } from '../config/config.js';

//import { initializeApp } from "firebase/app";
import { initializeApp } from "firebase/app";
//import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { getFirestore, collection, doc, getDoc, getDocs } from 'firebase/firestore';

const app = initializeApp(optionsFireBase);

getDocs(collection(getFirestore(), 'productos')).then((item) => {
    const arrayItems = item.docs.map((doc) => ({id: doc.id, ...doc.data()}));
    console.log(arrayItems);
}
);


//app.delete();