import React, { useCallback, useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { signOut } from "firebase/auth";
import { GiftedChat } from "react-native-gifted-chat";
import { auth, database } from "../config/Firebase";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Color } from "../constants/Color";
import { AntDesign } from "@expo/vector-icons";
import { collection, query, orderBy, onSnapshot, data, addDoc } from "firebase/firestore";

export default function Chat() {
    const [messages, setMessages] = useState([]);
    const navigation = useNavigation();

    const onSignOut = () => {
        signOut(auth).catch(error => console.error(error));
    };

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity 
                    style={{marginRight: 10}}
                    onPress={onSignOut}>

                        <AntDesign name="logout" size={24} color={Color.gray} style={{marginRight: 10}}/>
                </TouchableOpacity>
            )
        });
    }, [navigation]);

    useLayoutEffect(() => {
        const collectionRef = collection(database, 'chats');
        const qry = query(collectionRef, orderBy('createdAt', 'desc'));

        const unsubscribe = onSnapshot(qry, snapshot => {
            console.log('snapshot');
            setMessages(
                snapshot.docs.map(doc => ({
                    _id: doc.id,
                    createdAt: doc.data().createdAt.toDate(),
                    text: doc.data().text,
                    user: doc.data().user,
                }))
            );
        });
        return unsubscribe;
    }, []);

    const onSend = useCallback((messages = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages));

        const { _id, createdAt, text, user } = messages[0];
        addDoc(collection(database, 'chats'), {
            _id,
            createdAt,
            text,
            user
        });
    }, []);

    return (
        <GiftedChat
            messages={messages}
            onSend={messages => onSend(messages)}
            user={{
                _id: auth?.currentUser?.email,
                avatar: 'https://i.pravatar.cc/300'
            }}
            messagesContainerStyle={{
                backgroundColor: '#fff'
            }}
            showAvatarForEveryMessage={true}
        />
    );
}