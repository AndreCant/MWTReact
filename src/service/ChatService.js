import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { database } from "../config/Firebase";

const collectionRef = collection(database, 'chats');

export async function getMessages(user_1, user_2) {
    const qry = query(collectionRef, 
        where('user_1', 'in', [user_1.userRefId, user_2.userRefId]), 
        where('user_2', 'in', [user_1.userRefId, user_2.userRefId]), 
        orderBy('createdAt', 'desc'));

    const messagesDoc = await getDocs(qry);
    const messages = [];

    messagesDoc.forEach(doc => {
        messages.push({
            _id: doc.id,
            createdAt: doc.data().createdAt.toDate(),
            text: doc.data().text,
            user_1: doc.data().user_1,
            user_2: doc.data().user_2,
        });
    });

    return messages;
}