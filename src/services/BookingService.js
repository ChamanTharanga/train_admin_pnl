import { DocumentReference, getDoc, onSnapshot } from "firebase/firestore"
import { bookingCollection } from "../config/firebaseConfig"



/**
 * 
 * @param {(v: {id, date, fromObj, toObj, seatNumber,route, routeObj, userObj})=> void} callback 
 */
const getBooking = (callback) => {
    return onSnapshot(bookingCollection, async (snap) => {
        const docs = snap.docs;
        const data = await Promise.all(docs.map(async (doc) => {
            const data = doc.data();
            /** @type{DocumentReference} */
            const from = data.from;
            const fromObj = (await getDoc(from)).data();

            /** @type{DocumentReference} */
            const to = data.to;
            const toObj = (await getDoc(to)).data();

            const route = data.to;
            const routeObj = (await getDoc(route)).data();

            const user = data.user;
            const userObj = (await getDoc(user)).data();

            return {
                ...data,
                id: doc.id,
                fromObj,
                toObj,
                routeObj,
                userObj
            }
        }));
        if (callback)
            callback(data);
    });
}

export default { getBooking };