import React, { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { FontAwesome, Entypo } from '@expo/vector-icons';
import { Color } from '../constants/Color';
import { useNavigation } from '@react-navigation/native';
import { Constants } from '../constants/Constants';
import SearchDropDown from './SearchDropDown';
import { getUsersByFilter } from '../service/UserService';

export default function ChatList() {

    const navigation = useNavigation();
    const [keyword, setKeyword] = useState('');
    const [selectedType, setSelectedType] = useState(0);
    const [data, setData] = useState([]);
    const [searching, setSearching] = useState(false);
    const [filtered, setFiltered] = useState([]);

    const onKeywordChanged = (keyword) => {
        setKeyword(() => keyword);
    };

    const updateSelectedType = (selectedType) => () => {
        setSelectedType(() => selectedType);
    };

    const onSearch = (text) => {
        if (text) {
          setSearching(true)
          const temp = text.toLowerCase()
    
          getUsersByFilter(text).then(users => {
            setFiltered(users);
          });

        }
        else {
          setSearching(false);
          setFiltered([]);
        }
    }

    const renderItems = ({ item }) => {
        return (
          <TouchableOpacity style={styles.listItem} onPress={selectItem(item)}>
            <Image
              style={styles.listItemImage}
              source={{
                uri: item.avatar ? item.avatar : item.icon
              }}
            />
            <Text style={styles.listItemLabel}>{item.name}</Text>
          </TouchableOpacity>
        );
      }

    return (
        <View style={styles.container}>
            {/* <TouchableOpacity style={styles.chatButton} onPress={() => navigation.navigate(Constants.routes.chat)}>
                <Entypo name="chat" size={24} color={Color.lightGray} />
            </TouchableOpacity> */}

            <View style={styles.inputContainer}>
                <View style={styles.searchSection}>
                    <FontAwesome 
                        name="search" 
                        size={20} 
                        color={Color.gray} 
                        style={{padding: 10}} />
                    <TextInput
                        autoCapitalize='none'
                        // onChangeText={onKeywordChanged}
                        selectionColor={Color.primary}
                        onChangeText={onSearch}
                        placeholder="Search..."
                        placeholderTextColor="#000"
                        style={styles.input}
                    />
                </View>
            </View>
            <View style={styles.list}>
                <FlatList
                    data={data}
                    renderItem={renderItems}
                    keyExtractor={(item, index) => getKey(item)}
                />
            </View>

            {
                searching &&
                <SearchDropDown
                    onPress={() => setSearching(false)}
                    dataSource={filtered} />
            }
        </View>
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
    },
    /******** */
    container: {
        backgroundColor: '#fff'
      },
      inputContainer: {
        marginTop: 8,
      },
      input: {
        alignSelf: 'flex-start',
        borderColor: '#000',
        borderRadius: 8,
        borderWidth: 1,
        fontSize: 16,
        flex: 1,
        paddingTop: 5,
        paddingRight: 10,
        paddingBottom: 5,
        paddingLeft: 10,
        marginRight: 10
      },
      searchSection: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: '#000',
        paddingBottom: 10,
    },
      searchActionBtn: {
        backgroundColor: '#fff',
        borderColor: '#000',
        flex: 1,
        fontSize: 16,
        padding: 8
      },
      searchLeftActionBtn: {
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8,
        marginRight: 0,
      },
      searchRightActionBtn: {
        borderTopRightRadius: 8,
        borderBottomRightRadius: 8,
        marginLeft: 0,
      },
      searchActionBtnActive: {
        backgroundColor: '#60A5FA',
        borderColor: '#60A5FA',
        borderRadius: 8,
      },
      searchActionLabel: {
        color: '#000',
        fontSize: 16,
        textAlign: 'center',
      },
      searchActionLabelActive: {
        color: '#fff',
      },
      list: {
        flex: 1,
      },
      listItem: {
        flex: 1,
        flexDirection: 'row',
        marginHorizontal: 8,
        paddingVertical: 12,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc'
      },
      listItemImage: {
        width: 32,
        height: 32,
        marginRight: 8
      },
      listItemLabel: {
        fontSize: 16,
      }
});