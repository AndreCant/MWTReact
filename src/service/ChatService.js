import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { database } from "../config/Firebase";

const collectionRef = collection(database, 'chats');

export async function getMessages(user_1, user_2) {
    console.log(user_1, user_2)
    const qry = query(collectionRef, 
        where('sender', '==', user_1), 
        where('users', 'array-contains', user_1), 
        where('users', 'in', [user_2]), 
        // orderBy('createdAt', 'desc')
        );

    const messagesDoc = await getDocs(qry);
    const messages = [];

    messagesDoc.forEach(doc => {
        messages.push({
            _id: doc.id,
            createdAt: doc.data().createdAt.toDate(),
            text: doc.data().text,
            user: doc.data().user,
            users: doc.data().users,
            sender: doc.data().sender
        });
    });

    console.log(messages);
    return messages;
}