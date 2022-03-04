import { async } from "@firebase/util";
import { updateProfile } from "firebase/auth";
import { addDoc, collection, doc, endAt, getDoc, getDocs, limit, onSnapshot, orderBy, query, startAt, updateDoc, where } from "firebase/firestore";
import { auth, database } from "../config/Firebase";

const collectionRef = collection(database, 'users');

export async function getUsersByFilter(filter) {
    const qry = query(collectionRef, where('username', '!=', auth.currentUser.displayName),  orderBy('username'), startAt(filter), limit(10));
    const usersDoc = await getDocs(qry);
    const users = [];

    usersDoc.forEach(doc => {
        users.push({
            userRefId: doc.data().userRefId,
            username: doc.data().username,
            avatar: doc.data().avatar
        });
    });

    return users;
}

export function insertUser(user){
    const defaultUsername = `@${user.uid.substring(0, 16)}`;

    addDoc(collectionRef, {
        _id: user.email,
        userRefId: user.uid,
        username: defaultUsername,
        avatar: user.photoURL
    });

    updateProfile(user, {displayName: defaultUsername});
}

export async function updateUser(user){
    const qry = query(collectionRef, where('userRefId', '==', user.uid), limit(1));
    const document = await getDocs(qry);

    if (document) {
        let documentId;
        document.forEach(doc => {
            documentId = doc.id
            return;
        });
    
        if (documentId) {
            const ref = doc(database, 'users', documentId);
        
            updateDoc(ref, {
                username: user.displayName,
                avatar: user.photoURL
            });
        }
    }
}

export async function getUsersByRefIds(ids){
    const users = [];

    if (ids && ids.length) {
        const qry = query(collectionRef, where('userRefId', 'in', ids));
        const usersDoc = await getDocs(qry);
    
        usersDoc.forEach(doc => {
            users.push({
                userRefId: doc.data().userRefId,
                username: doc.data().username,
                avatar: doc.data().avatar
            });
        });
    }
    
    return users;
}