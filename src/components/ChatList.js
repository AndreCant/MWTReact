import React, { useEffect } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome, Entypo } from '@expo/vector-icons';
import { Color } from '../constants/Color';
import { useNavigation } from '@react-navigation/native';
import { Constants } from '../constants/Constants';

export default function ChatList() {

    const navigation = useNavigation();

    return (
        <TouchableOpacity style={styles.chatButton} onPress={() => navigation.navigate(Constants.routes.chat)}>
            <Entypo name="chat" size={24} color={Color.lightGray} />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    chatButton: {
        backgroundColor: Color.primary,
        height: 50,
        width: 50,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: Color.primary,
        shadowOffset: {
            width: 0,
            height: 0
        },
        shadowOpacity: .9,
        shadowRadius: 8,
        marginRight: 20,
        marginBottom: 50
    }
});