import React from "react";
import { Image, StyleSheet, View, SafeAreaView, Text, TextInput, TouchableOpacity } from "react-native";
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
        login: (email, password) => { 
            dispatch(login(email, password)) 
        }
    }
}

class Login extends React.Component {

    constructor(props) {
        super(props);
    }

    onLogin = () => {
        this.props.login(this.email, this.password);
    }

    render(){
        return (
            <View style={styles.container}>
                <Image source={backImage} style={styles.backImage}></Image>
                <View style={styles.whiteSheet}>
                    <SafeAreaView style={styles.form}>
                        <Text style={styles.title}>Login</Text>
                        <TextInput 
                            style={styles.input}
                            placeholder="Enter email"
                            autoCapitalize="none"
                            keyboardType="email-address"
                            textContentType="emailAddress"
                            autoFocus={true}
                            value={this.email}
                            onChangeText={text => this.email = text}
                        />
                        <TextInput 
                            style={styles.input}
                            placeholder="Enter password"
                            autoCapitalize="none"
                            autoCorrect={false}
                            secureTextEntry={true}
                            textContentType="password"
                            value={this.password}
                            onChangeText={text => this.password = text}
                        />
                        <TouchableOpacity style={styles.button} onPress={this.onLogin}>
                            <Text style={{fontWeight: 'bold', color: '#fff', fontSize: 18}}> Log In</Text>
                        </TouchableOpacity>
                        <View style={{marginTop: 20, flexDirection: 'row', alignItems: 'center', alignSelf: 'center'}}>
                            <Text style={{fontWeight: '600', color: 'gray', fontSize: 14}}>Don't have an account? </Text>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate("Signup")}>
                                <Text style={{fontWeight: '600', color: '#3EBDC9', fontSize: 14}}> Sign Up</Text>
                            </TouchableOpacity>
                        </View>
                    </SafeAreaView>
                </View>
            </View>
        );
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(Login);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    title: {
        fontSize: 36,
        fontWeight: 'bold',
        color: "#3EBDC9",
        alignSelf: "center",
        paddingBottom: 24
    },
    input: {
        backgroundColor: "#F6F7FB",
        height: 58,
        marginBottom: 20,
        fontSize: 16,
        borderRadius: 10,
        padding: 12
    },
    backImage: {
        width: '100%',
        height: 130,
        position: "absolute",
        top: 0,
        resizeMode: "cover",
        marginTop: 50
    },
    whiteSheet: {
        width: '100%',
        height: '75%',
        position: 'absolute',
        bottom: 0,
        backgroundColor: '#fff'
    },
    form: {
        flex: 1,
        justifyContent: 'center',
        marginHorizontal: 30
    },
    button: {
        backgroundColor: '#3EBDC9',
        height: 58,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40
    }
});