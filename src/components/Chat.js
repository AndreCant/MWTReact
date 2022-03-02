import React, { useCallback, useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { signOut } from "firebase/auth";
import { GiftedChat } from "react-native-gifted-chat";
import { auth, database } from "../config/Firebase";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Color } from "../constants/Color";
import { AntDesign } from "@expo/vector-icons";
import { collection, query, orderBy, onSnapshot, data, addDoc } from "firebase/firestore";
import { connect } from "react-redux";
import { getChats } from "../actions/ChatActions";

const mapStateToProps = (state) => {
    return {
        user: state.user,
        messages: state.messages
    }
  }
  
const mapDispatchToProps = (dispatch) => {
    return {
        getMessages: (user_1, user_2) => {
            dispatch(getChats(user_1, user_2));
        }
    }
}

class Chat extends React.Component {

    constructor(props){
        super(props);
        this.loadMessages();
    }


    // const [messages, setMessages] = useState([]);
    // const navigation = useNavigation();

    // useLayoutEffect(() => {
    //     const collectionRef = collection(database, 'chats');
    //     const qry = query(collectionRef, orderBy('createdAt', 'desc'));

    //     const unsubscribe = onSnapshot(qry, snapshot => {
    //         setMessages(
    //             snapshot.docs.map(doc => ({
    //                 _id: doc.id,
    //                 createdAt: doc.data().createdAt.toDate(),
    //                 text: doc.data().text,
    //                 user: doc.data().user,
    //             }))
    //         );
    //     });
    //     return unsubscribe;
    // }, []);

    loadMessages = () => {
        this.props.getMessages(this.props.user.user.uid, this.props.route.params.userChat.userRefId);
    }

    // const onSend = useCallback((messages = []) => {
    //     setMessages(previousMessages => GiftedChat.append(previousMessages, messages));

    //     const { _id, createdAt, text, user } = messages[0];
    //     addDoc(collection(database, 'chats'), {
    //         _id,
    //         createdAt,
    //         text,
    //         user
    //     });
    // }, []);

    onSend = messages => {
        // setMessages(previousMessages => GiftedChat.append(previousMessages, messages));
        // this.setState(previousMessages => GiftedChat.append(previousMessages, messages));
        // GiftedChat.append(this.state.messages, messages);

        const { _id, createdAt, text, user } = messages[0];
        const sender = user.userRefId;
        const users = [sender, this.props.route.params.userChat.userRefId];

        addDoc(collection(database, 'chats'), {
            _id,
            createdAt,
            text,
            user,
            users,
            sender
        });
    }

    render(){
        return (
            <GiftedChat
                messages={this.props.messages}
                onSend={messages => this.onSend(messages)}
                user={{
                    _id: auth?.currentUser?.email,
                    avatar: 'https://i.pravatar.cc/300',
                    userRefId: auth?.currentUser?.uid
                }}
                messagesContainerStyle={{
                    backgroundColor: '#fff'
                }}
                showAvatarForEveryMessage={true}
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat);