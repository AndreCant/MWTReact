import { addDoc, collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { database } from "../config/Firebase";
import { getUsersByRefIds } from "./UserService";

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

export async function getChatsUsers(user) {
    const qry1 = query(collectionRef, 
        where('users', 'array-contains', user),
        orderBy('createdAt', 'desc')
    );

    const chatsDoc = await getDocs(qry1);
    const chatUsers = new Set();

    chatsDoc.forEach(doc => {
        if (chatUsers.size <= 10) {
            doc.data().users.forEach(usr => {
                chatUsers.add(usr);
            });
        }else{
            return;
        }
    });

    chatUsers.delete(user);

    return await getUsersByRefIds(Array.from(chatUsers));
}