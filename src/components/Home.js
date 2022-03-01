import React, { useEffect } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { Color } from '../constants/Color';
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, View } from "react-native";
import ChatList from './ChatList';
import { Constants } from '../constants/Constants';

export default function Home() {

    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <FontAwesome 
                    name="search" 
                    size={24} 
                    color={Color.gray} 
                    style={{marginLeft: 15}} />
            ),
            headerRight: () => (
                <FontAwesome 
                    name="user" 
                    size={35} 
                    color={Color.gray} 
                    style={{marginRight: 20}} 
                    onPress={() => navigation.navigate(Constants.routes.profile)}/>
            )
        });
    }, [navigation]);

    return (
        <View style={StyleSheet.container}>
            <ChatList />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        backgroundColor: '#fff'
    }
});