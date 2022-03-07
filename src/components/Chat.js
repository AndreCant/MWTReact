import React from "react";
import { GiftedChat } from "react-native-gifted-chat";
import { connect } from "react-redux";
import { clearChat, getChats, getChatUsers, sendMessage } from "../actions/ChatActions";
import { sChat } from "../reducers/ChatReducer";
import { sUser } from "../reducers/UserReducer";
import { Constants } from '../constants/Constants';

const mapStateToProps = (state) => {
    return {
        user: sUser(state),
        chat: sChat(state)
    }
}
  
const mapDispatchToProps = (dispatch) => {
    return {
        getMessages: (user_1, user_2) => {
            dispatch(getChats(user_1, user_2));
        },
        sendMessage: (message, users) => {
            dispatch(sendMessage(message, users));
        },
        clearMessages: () => {
            dispatch(clearChat())
        },
        getChatUsers: (user) => { 
            dispatch(getChatUsers(user))
        }
    }
}

class Chat extends React.Component {

    constructor(props){
        super(props);
        this.loadMessages();
    }

    componentWillUnmount(){
        this.props.getChatUsers(this.props.user.user.uid);
        this.props.clearMessages();
    }

    loadMessages = () => {
        this.props.getMessages(this.props.user.user.uid, this.props.route.params.userChat.userRefId);
    }

    onSend = messages => {
        const users = [ this.props.user.user.uid, this.props.route.params.userChat.userRefId];
        this.props.sendMessage(messages[0], users);
    }

    render(){
        return (
            <GiftedChat
                messages={this.props.chat.messages}
                onSend={messages => this.onSend(messages)}
                user={{
                    _id: this.props.user.user.email,
                    avatar: this.props.user.user.photoURL || Constants.defaultAvatar,
                    userRefId: this.props.user.user.uid
                }}
                messagesContainerStyle={{
                    backgroundColor: '#fff'
                }}
                showAvatarForEveryMessage={true}
                timeFormat="HH:m"
                dateFormat="D MMMM YYYY"
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat);