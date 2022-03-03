import { addDoc, collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { database } from "../config/Firebase";

const collectionRef = collection(database, 'chats');

export async function getMessages(user_1, user_2) {
    const qry = query(collectionRef, 
        where('users', 'array-contains', user_1),
        orderBy('createdAt', 'desc')
    );

    const messagesDoc = await getDocs(qry);
    const messages = [];

    messagesDoc.forEach(doc => {
        if(doc.data().users.includes(user_2)){
            messages.push({
                _id: doc.id,
                createdAt: doc.data().createdAt.toDate(),
                text: doc.data().text,
                user: doc.data().user,
                users: doc.data().users,
                sender: doc.data().sender
            });
        }
    });

    return messages;
}

export async function insertMessage(message, users){
    const { _id, createdAt, text, user } = message;

    addDoc(collectionRef, {
        _id,
        createdAt,
        text,
        user,
        users
    });
}