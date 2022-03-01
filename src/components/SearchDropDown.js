import React from 'react';
import {
    TouchableOpacity,
    StyleSheet,
    View,
    Text
} from 'react-native';
import { Color } from '../constants/Color';

export default function SearchDropDown(props) {
    const { dataSource } = props
    return (
        <TouchableOpacity
            onPress={props.onPress}
            style={styles.container}>

            <View style={styles.subContainer}>
                {
                    dataSource.length ?

                        dataSource.map(item => {
                            return (
                                <View style={styles.itemView}>
                                    <Text style={styles.itemText}>{item.username}</Text>
                                </View>
                            )
                        })

                        :
                        <View
                            style={styles.noResultView}>
                            <Text style={styles.noResultText}>No users or groups matched...</Text>
                        </View>
                }

            </View>
        </TouchableOpacity>

    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 5,
        marginLeft: 18,
    },
    subContainer: {
        backgroundColor: Color.primary,
        paddingTop: 10,
        marginHorizontal: 20,
        borderRadius: 4,
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center'
    },
    itemView: {
        backgroundColor: 'white',
        height: 30,
        width: '90%',
        marginBottom: 10,
        justifyContent: 'center',
        borderRadius: 4,
    },
    itemText: {
        color: 'black',
        paddingHorizontal: 10,
    },
    noResultView: {
        alignSelf: 'center',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        paddingBottom: 10
    },
    noResultText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white'
    },

});