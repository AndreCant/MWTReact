import React, { useEffect } from 'react';
import { FontAwesome, Entypo } from '@expo/vector-icons';
import { Color } from '../constants/Color';
import { useNavigation } from "@react-navigation/native";
import { Image, StyleSheet, View, TouchableOpacity } from "react-native";

export default function Home() {

    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <FontAwesome name="search" size={24} color={Color.gray} style={{marginLeft: 15}} />
            ),
            headerRight: () => (
                <Image 
                    // source={{uri.catImageUrl}}
                    style={{
                        width: 40,
                        height: 40,
                        marginRight: 15
                    }}
                />
            )
        });
    }, [navigation]);

    return (
        <View style={StyleSheet.container}>
            <TouchableOpacity style={styles.chatButton} onPress={() => navigation.navigate("Chat")}>
                <Entypo name="chat" size={24} color={Color.lightGray} />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        backgroundColor: '#fff'
    },
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