import {  onSnapshot } from "firebase/firestore"
import { usersCollection } from "../config/firebaseConfig"



/**
 * 
 * @param {(v: {id, name, phoneNumber})=> void} callback 
 */
const getUser = (callback) => {
    return onSnapshot(usersCollection, async (snap) => {
        const docs = snap.docs;
        const data = await Promise.all(docs.map(async (doc) => {
            const data = doc.data();
            return data
        }));
        if (callback)
            callback(data);
    });
}

export default { getUser };