import React from "react";
import { Image, StyleSheet, View, SafeAreaView, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { login } from "../actions/UserActions";
import { connect } from "react-redux";
const backImage = require("../../assets/logo.png");

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        // login: (email, password) => { 
        //     dispatch(login(email, password)) 
        // }
    }
}

class Profile extends React.Component {

    userData = {};
    route = {};
    posts = [];

    constructor(props) {
        super(props);
    }

    // onLogin = () => {
    //     this.props.login(this.email, this.password);
    // }

    render(){
        return (
            <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
              <ScrollView
                style={styles.container}
                contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}}
                showsVerticalScrollIndicator={false}>
                <Image
                  style={styles.userImg}
                  source={{uri: this.userData ? this.userData.userImg || 'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg' : 'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg'}}
                />
                <Text style={styles.userName}>{this.userData ? this.userData.fname || 'Test' : 'Test'} {this.userData ? this.userData.lname || 'User' : 'User'}</Text>
                {/* <Text>{this.route.params ? this.route.params.userId : user.uid}</Text> */}
                <Text style={styles.aboutUser}>
                {this.userData ? this.userData.about || 'No details added.' : ''}
                </Text>
                <View style={styles.userBtnWrapper}>
                  {this.route.params ? (
                    <>
                      <TouchableOpacity style={styles.userBtn} onPress={() => {}}>
                        <Text style={styles.userBtnTxt}>Message</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.userBtn} onPress={() => {}}>
                        <Text style={styles.userBtnTxt}>Follow</Text>
                      </TouchableOpacity>
                    </>
                  ) : (
                    <>
                      <TouchableOpacity
                        style={styles.userBtn}
                        onPress={() => {
                          this.props.navigation.navigate('Edit Profile');
                        }}>
                        <Text style={styles.userBtnTxt}>Edit</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.userBtn} onPress={() => logout()}>
                        <Text style={styles.userBtnTxt}>Logout</Text>
                      </TouchableOpacity>
                    </>
                  )}
                </View>
        
                <View style={styles.userInfoWrapper}>
                  <View style={styles.userInfoItem}>
                    <Text style={styles.userInfoTitle}>{this.posts.length}</Text>
                    <Text style={styles.userInfoSubTitle}>this.posts</Text>
                  </View>
                  <View style={styles.userInfoItem}>
                    <Text style={styles.userInfoTitle}>10,000</Text>
                    <Text style={styles.userInfoSubTitle}>Followers</Text>
                  </View>
                  <View style={styles.userInfoItem}>
                    <Text style={styles.userInfoTitle}>100</Text>
                    <Text style={styles.userInfoSubTitle}>Following</Text>
                  </View>
                </View>
        
                {this.posts.map((item) => (
                  <PostCard key={item.id} item={item} onDelete={handleDelete} />
                ))}
              </ScrollView>
            </SafeAreaView>
          );
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      padding: 20,
    },
    userImg: {
      height: 150,
      width: 150,
      borderRadius: 75,
    },
    userName: {
      fontSize: 18,
      fontWeight: 'bold',
      marginTop: 10,
      marginBottom: 10,
    },
    aboutUser: {
      fontSize: 12,
      fontWeight: '600',
      color: '#666',
      textAlign: 'center',
      marginBottom: 10,
    },
    userBtnWrapper: {
      flexDirection: 'row',
      justifyContent: 'center',
      width: '100%',
      marginBottom: 10,
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
      fontSize: 12,
      color: '#666',
      textAlign: 'center',
    },
  });