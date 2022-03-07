import React from 'react';
import { FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
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

    getDateToShow = timestamp => {
      const date = new Date(timestamp);
        const today = new Date();
        let dateToShow;

        // Is same day
        if (date.getFullYear() === today.getFullYear() && date.getMonth() === today.getMonth() && date.getDate() === today.getDate()) { 
          dateToShow = `${date.getHours()}:${date.getMinutes()}`;
        }else{
          // Is yestarday
          const yesterday = new Date();
          yesterday.setDate(today.getDate()-1);

          if (yesterday.toDateString() === date.toDateString()) dateToShow = 'Yesterday';
        }

        if (!dateToShow) dateToShow = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;

        return dateToShow;
    }

    renderItems = ({ item, index }) => {
      const date = this.getDateToShow(item.createdAt);

      return (
        <TouchableOpacity style={styles.listItem} key={index} onPress={() => this.onChat(item)}>
          <Image
            style={styles.listItemImage}
            source={{
              uri: item.avatar || Constants.defaultAvatar
            }}
          />
          <Text style={styles.listItemLabel}>{item.username}</Text>
          <Text style={styles.listItemDate}>{date}</Text>
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
                  style={styles.flatList}
                  data={this.props.chat.chatUsers}
                  renderItem={this.renderItems}
                  keyExtractor={(item, index) => String(index)}
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
      },
      listItemDate: {
        fontSize: 15,
        marginLeft: 'auto',
        marginRight: 10
      },
      flatList: {
        height: '100%'
      }
});