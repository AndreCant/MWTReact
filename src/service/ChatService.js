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
    const chatUsers = {};

    chatsDoc.forEach(doc => {
        const keys = Object.keys(chatUsers);

        if (keys.length < 10) {
            doc.data().users.forEach(userId => {
                if (userId != user && !keys.includes(userId)) {
                    chatUsers[userId] = { createdAt: doc.data().createdAt }
                    return;
                }
            });
        }else{
            return;
        }
    });

    return await getUsersByRefIds(chatUsers);
}