import React, {useEffect, useContext, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  StyleSheet,
  Platform,
  Alert,
} from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';
import { windowHeight } from '../constants/Dimension';
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

class EditProfile extends React.Component {

    userData = {};
    image = {};
    bs = React.createRef();

    constructor(props) {
        super(props);
    }

    setUserData = (obj) => {

    } 

    takePhotoFromCamera = () => {
        ImagePicker.openCamera({
          compressImageMaxWidth: 300,
          compressImageMaxHeight: 300,
          cropping: true,
          compressImageQuality: 0.7,
        }).then((image) => {
          console.log(image);
          const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
          setImage(imageUri);
          this.bs.current.snapTo(1);
        });
    };
    
    choosePhotoFromLibrary = () => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.getMediaLibraryPermissionsAsync();
    
                if (status !== 'granted') {
                    const { newStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();

                    if (newStatus !== 'granted') return;
                }
            }

            ImagePicker.launchImageLibraryAsync({
              width: 300,
              height: 300,
              cropping: true,
              compressImageQuality: 0.7,
            }).then((image) => {
              console.log(image);
              const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
              setImage(imageUri);
              this.bs.current.snapTo(1);
            });
        })();
    };

    render(){
        return (
            <View style={styles.container}>
              {/* <BottomSheet
                ref={this.bs}
                snapPoints={[330, -5]}
                renderContent={this.renderInner}
                renderHeader={this.renderHeader}
                initialSnap={1}
                callbackNode={this.fall}
                enabledGestureInteraction={true}
              /> */}
                <View style={{alignItems: 'center'}}>
                  <TouchableOpacity onPress={this.choosePhotoFromLibrary}>
                    <View
                      style={{
                        height: 100,
                        width: 100,
                        borderRadius: 15,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <ImageBackground
                        source={{
                          uri: 'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg'}}
                        style={{height: 100, width: 100}}
                        imageStyle={{borderRadius: 15}}>
                        <View
                          style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          {/* <MaterialCommunityIcons
                            name="camera"
                            size={35}
                            color="#fff"
                            style={{
                              opacity: 0.7,
                              alignItems: 'center',
                              justifyContent: 'center',
                              borderWidth: 1,
                              borderColor: '#fff',
                              borderRadius: 10,
                            }}
                          /> */}
                        </View>
                      </ImageBackground>
                    </View>
                  </TouchableOpacity>
                  <Text style={{marginTop: 10, fontSize: 18, fontWeight: 'bold'}}>
                    {this.userData ? this.userData.fname : ''} {this.userData ? this.userData.lname : ''}
                  </Text>
                </View>
        
                <View style={styles.action}>
                  <FontAwesome name="user-o" color="#333333" size={20} />
                  <TextInput
                    placeholder="First Name"
                    placeholderTextColor="#666666"
                    autoCorrect={false}
                    value={this.userData ? this.userData.fname : ''}
                    onChangeText={(txt) => setUserData({...this.userData, fname: txt})}
                    style={styles.textInput}
                  />
                </View>
                <View style={styles.action}>
                  <FontAwesome name="user-o" color="#333333" size={20} />
                  <TextInput
                    placeholder="Last Name"
                    placeholderTextColor="#666666"
                    value={this.userData ? this.userData.lname : ''}
                    onChangeText={(txt) => setUserData({...this.userData, lname: txt})}
                    autoCorrect={false}
                    style={styles.textInput}
                  />
                </View>
                <View style={styles.action}>
                  <Ionicons name="ios-clipboard-outline" color="#333333" size={20} />
                  <TextInput
                    multiline
                    numberOfLines={3}
                    placeholder="About Me"
                    placeholderTextColor="#666666"
                    value={this.userData ? this.userData.about : ''}
                    onChangeText={(txt) => setUserData({...this.userData, about: txt})}
                    autoCorrect={true}
                    style={[styles.textInput, {height: 40}]}
                  />
                </View>
                <View style={styles.action}>
                  <Feather name="phone" color="#333333" size={20} />
                  <TextInput
                    placeholder="Phone"
                    placeholderTextColor="#666666"
                    keyboardType="number-pad"
                    autoCorrect={false}
                    value={this.userData ? this.userData.phone : ''}
                    onChangeText={(txt) => setUserData({...this.userData, phone: txt})}
                    style={styles.textInput}
                  />
                </View>
        
                <View style={styles.action}>
                  <FontAwesome name="globe" color="#333333" size={20} />
                  <TextInput
                    placeholder="Country"
                    placeholderTextColor="#666666"
                    autoCorrect={false}
                    value={this.userData ? this.userData.country : ''}
                    onChangeText={(txt) => setUserData({...this.userData, country: txt})}
                    style={styles.textInput}
                  />
                </View>
                <View style={styles.action}>
                  <MaterialCommunityIcons
                    name="map-marker-outline"
                    color="#333333"
                    size={20}
                  />
                  <TextInput
                    placeholder="City"
                    placeholderTextColor="#666666"
                    autoCorrect={false}
                    value={this.userData ? this.userData.city : ''}
                    onChangeText={(txt) => setUserData({...this.userData, city: txt})}
                    style={styles.textInput}
                  />
                </View>
                <TouchableOpacity style={styles.buttonContainer}>
                    <Text style={styles.buttonText}>Update</Text>
                </TouchableOpacity>
            </View>
          );
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20
  },
  commandButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#FF6347',
    alignItems: 'center',
    marginTop: 10,
  },
  panel: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    paddingTop: 20,
    width: '100%',
  },
  header: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#333333',
    shadowOffset: {width: -1, height: -3},
    shadowRadius: 2,
    shadowOpacity: 0.4,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: 'gray',
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: '#2e64e5',
    alignItems: 'center',
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: -12,
    paddingLeft: 10,
    color: '#333333',
  },
  buttonContainer: {
    marginTop: 10,
    width: '100%',
    height: windowHeight / 15,
    backgroundColor: '#2e64e5',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
});