import React from "react";
import { Image, StyleSheet, View, SafeAreaView, Text, TouchableOpacity, ScrollView } from "react-native";
import { connect } from "react-redux";
import { Constants } from "../constants/Constants"

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => { 
            dispatch(logout())
        }
    }
}

class Profile extends React.Component {

    constructor(props) {
        super(props);
    }

    onSignOut = () => {
      this.props.signOut();
    }

    onEdit = () => {
      this.props.navigation.navigate(Constants.routes.editProfile);
    }

    render(){
      return (
        <SafeAreaView style={styles.safe}>
            <Image
              style={styles.userImg}
              source={{uri: this.props.user.user.photoURL || Constants.defaultAvatar}}
            />

            {
              this.props.user.user.displayName ? 
              <Text style={styles.userName}>{this.props.user.user.displayName}</Text> :
              <Text style={styles.userId}>{`User: @${this.props.user.user.uid.substring(0, 16)}`}</Text>
            }

            <Text style={styles.aboutUser}> {this.props.user.user.email} </Text>

            <View style={styles.userBtnWrapper}>
                <TouchableOpacity
                  style={styles.userBtn}
                  onPress={this.onEdit}>
                  <Text style={styles.userBtnTxt}>Edit Profile</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.userBtn} onPress={this.onSignOut}>
                  <Text style={styles.userBtnTxt}>Logout</Text>
                </TouchableOpacity>
            </View>
    
            <View style={styles.userInfoWrapper}>
              <View style={styles.userInfoItem}>
                <Text style={styles.userInfoTitle}>3</Text>
                <Text style={styles.userInfoSubTitle}>Chats</Text>
              </View>
              <View style={styles.userInfoItem}>
                <Text style={styles.userInfoTitle}>10</Text>
                <Text style={styles.userInfoSubTitle}>Groups</Text>
              </View>
              <View style={styles.userInfoItem}>
                <Text style={styles.userInfoTitle}>10000</Text>
                <Text style={styles.userInfoSubTitle}>Messages</Text>
              </View>
            </View>
        </SafeAreaView>
      );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

const styles = StyleSheet.create({
    safe: {
      flex: 1, 
      backgroundColor: '#fff', 
      alignItems: 'center'
    },
    userImg: {
      height: 150,
      width: 150,
      borderRadius: 75,
      marginTop: 10,
    },
    userName: {
      fontSize: 35,
      fontWeight: 'bold',
      marginTop: 20,
      marginBottom: 20,
    },
    userId: {
      fontSize: 20,
      fontWeight: 'bold',
      marginTop: 30,
      marginBottom: 20,
    },
    aboutUser: {
      fontSize: 28,
      textAlign: 'center',
      marginBottom: 30,
    },
    userBtnWrapper: {
      flexDirection: 'row',
      justifyContent: 'center',
      width: '100%',
      marginBottom: 30,
    },
    userBtn: {
      borderColor: '#2e64e5',
      borderWidth: 2,
      borderRadius: 3,
      paddingVertical: 8,
      paddingHorizontal: 12,
      marginHorizontal: 5,
    },
    userBtnTxt: {
      color: '#2e64e5',
    },
    userInfoWrapper: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      width: '100%',
      marginVertical: 20,
    },
    userInfoItem: {
      justifyContent: 'center',
    },
    userInfoTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 5,
      textAlign: 'center',
    },
    userInfoSubTitle: {
      fontSize: 20,
      color: '#666',
      textAlign: 'center',
    },
  });