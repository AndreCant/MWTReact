import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { Alert } from "react-native";
import { auth } from "../config/Firebase";

export const UserActions = {
    SET_USER: "SET_USER",
}

export function login(email, password) {
    return (dispatch) => {
        signInWithEmailAndPassword(auth, email, password)
        .then(() => {
            console.log("Login OK!");
            dispatch(
                setUser({
                    email: email
                })
            )
        }).catch(error => {
            Alert.alert("Login error", error.message)
        });
    }
}

export function signup(email, password) {
    return (dispatch) => {
        createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
            console.log("Signup OK!");
            dispatch(
                setUser({
                    email: email
                })
            )
        }).catch(error => {
            Alert.alert("Signup error", error.message)
        });
    }
}

export function setUser(user){
    return {
        type: UserActions.SET_USER,
        payload: user
    }
}