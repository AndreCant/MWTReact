import React, { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { FontAwesome, Entypo } from '@expo/vector-icons';
import { Color } from '../constants/Color';
import { Constants } from '../constants/Constants';
import SearchDropDown from './SearchDropDown';
import { getUsersByFilter } from '../service/UserService';
import { connect } from 'react-redux';
import { getChatUsers } from '../actions/ChatActions';

const mapStateToProps = (state) => {
  return {
      user: state.user,
      chat: state.chat
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      getChatUsers: (user) => { 
          dispatch(getChatUsers(user))
      }
  }
}

class ChatList extends React.Component {

    constructor(props){
      super(props);
      this.state = {
        searching: false,
        filtered: [],
        inputText: ''
      }
    }

    componentDidMount(){
      this.getChats();
    }

    getChats = () => {
      this.props.getChatUsers(this.props.user.user.uid);
    }

    onSearch = text => {
        if (text) {
          this.setState({searching: true, inputText: text});
    
          getUsersByFilter(text).then(users => {
            this.setState({filtered: users});
          });

        }
        else {
          this.setState({searching: false, filtered: [], inputText: ''});
        }
    }

    onChat = user => {
      this.props.onChat(user);
    }  

    renderItems = ({ item }) => {
        return (
          <TouchableOpacity style={styles.listItem} onPress={() => this.onChat(item)}>
            <Image
              style={styles.listItemImage}
              source={{
                uri: item.avatar || Constants.defaultAvatar
              }}
            />
            <Text style={styles.listItemLabel}>{item.username}</Text>
          </TouchableOpacity>
        );
    }

    render(){
      return (
          <View style={styles.container}>
              <View style={styles.inputContainer}>
                  <View style={styles.searchSection}>
                      <FontAwesome 
                          name="search" 
                          size={20} 
                          color={Color.gray} 
                          style={{padding: 10}} />
                      <TextInput
                          autoCapitalize='none'
                          selectionColor={Color.primary}
                          onChangeText={text => this.onSearch(text)}
                          placeholder="Search..."
                          placeholderTextColor="#000"
                          style={styles.input}
                          value={this.state.inputText}
                      />
                  </View>
              </View>
              <FlatList
                  data={this.props.chat.chatUsers}
                  renderItem={this.renderItems}
                  keyExtractor={(item, index) => item}
              />
  
              {
                  this.state.searching &&
                  <SearchDropDown
                      onPress={() => this.setState({searching: false, filtered: [], inputText: ''})}
                      dataSource={this.state.filtered}/>
              }
          </View>
      );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatList);

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
      listItem: {
        flex: 1,
        flexDirection: 'row',
        marginHorizontal: 8,
        paddingVertical: 12,
        alignItems: 'center',
        borderBottomWidth: 2,
        borderBottomColor: '#ccc'
      },
      listItemImage: {
        width: 50,
        height: 50,
        marginRight: 25,
        marginLeft: 10,
        borderRadius: 50
      },
      listItemLabel: {
        fontSize: 20,
      }
});