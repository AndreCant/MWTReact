import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateEmail, updateProfile, signOut } from "firebase/auth";
import { Alert } from "react-native";
import { auth } from "../config/Firebase";
import { insertUser, updateUser } from "../service/UserService";
import { setChats, setChatUsers } from "./ChatActions";

export const UserActions = {
    SET_USER: "SET_USER",
    SET_IMAGE: "SET_IMAGE",
    GET_USERS_FILTER: "GET_USERS_FILTER"
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

            insertUser(auth.currentUser);
        }).catch(error => {
            Alert.alert("Signup error", error.message);
        });
    }
}

export function setAvatar(url){
    updateProfile(auth.currentUser, { photoURL: url });
    updateUser({...auth.currentUser, photoURL: url});

    return {
        type: UserActions.SET_IMAGE,
        payload: url
    }
}

export function setUserData(username, email){
    const payload = {...auth.currentUser};

    if(username) {
        updateProfile(auth.currentUser, { displayName: username });
        updateUser(payload);
        payload.displayName = username;
    }

    if(email) {
        updateEmail(auth.currentUser, email);
        payload.email = email;
    }

    return {
        type: UserActions.SET_USER,
        payload: payload
    }
}

export function setUser(user){
    return {
        type: UserActions.SET_USER,
        payload: user
    }
}

export function logout(){
    return (dispatch, getState) => {
        signOut(auth).catch(error => console.error(error));
    
        dispatch(setUser(null));
        dispatch(setChats([]));
        dispatch(setChatUsers([]));
    }
}

