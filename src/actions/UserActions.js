import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { Alert } from "react-native";
import { auth } from "../config/Firebase";

export const UserActions = {
    SET_USER: "SET_USER",
    SET_IMAGE: "SET_IMAGE",
    SET_DATA: "SET_DATA"
}

export function login(email, password) {
    return () => {
        signInWithEmailAndPassword(auth, email, password)
        .then(() => {
            console.log("Login OK!");
        }).catch(error => {
            Alert.alert("Login error", error.message);
        });
    }
}

export function signup(email, password) {
    return () => {
        createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
            console.log("Signup OK!");
        }).catch(error => {
            Alert.alert("Signup error", error.message);
        });
    }
}

export function setAvatar(url){
    updateProfile(auth.currentUser, { photoURL: url });

    return {
        type: UserActions.SET_IMAGE,
        payload: url
    }
}

export function setUserData(username, email, phone){
    updateProfile(auth.currentUser, { displayName: username, email: email, phoneNumber: phone });

    return {
        type: UserActions.SET_DATA,
        payload: {username, email, phone}
    }
}

export function setUser(user){
    return {
        type: UserActions.SET_USER,
        payload: user
    }
}

