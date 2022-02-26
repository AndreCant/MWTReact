import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { Alert } from "react-native";
import { auth } from "../config/Firebase";

export const UserActions = {
    SET_USER: "SET_USER",
    SET_IMAGE: "SET_IMAGE"
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

export function setAvatar(imageUrl){
    updateProfile(auth.currentUser, {
        photoURL: imageUrl
    }).then(() => {
        return {
            type: UserActions.SET_IMAGE,
            payload: url
        }
    }).catch((error) => {
        Alert.alert("Update image error", error.message);
    });
}

export function setUser(user){
    return {
        type: UserActions.SET_USER,
        payload: user
    }
}

