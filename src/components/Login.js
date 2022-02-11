import { useState } from "react";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';
import { Alert } from "react-native";

export default function Login({ navigation }) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onHandleLogin = () => {
        if (email !== "" && password !== "") {
            signInWithEmailAndPassword(auth, email, password)
            .then(() => console.log("Login OK!"))
            .catch(error => Alert.alert("Login error", error.message));
        }
    }
}