import React from 'react';
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
import { setAvatar, setUserData } from "../actions/UserActions";
import { ref, getDownloadURL, getStorage, uploadBytes  } from "firebase/storage";
import DropdownAlert from 'react-native-dropdownalert';
const backImage = require("../../assets/logo.png");

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setAvatar: (url) => { 
            dispatch(setAvatar(url));
        },
        setUserData: (username, email, phone) => {
          dispatch(setUserData(username, email, phone));
        }
    }
}


class EditProfile extends React.Component {

    constructor(props) {
        super(props);
        this.dropDownAlertRef = React.createRef();
        this.username = this.props.user.user.displayName;
        this.email = this.props.user.user.email;
        this.phone = this.props.user.user.phoneNumber;
    }

    setUserData = () => {
      try {
        this.props.setUserData(this.username, this.email, this.phone);
        this.dropDownAlertRef.alertWithType('success', 'Success', 'test');
      } catch (error) {
        this.dropDownAlertRef.alertWithType('error', 'Error', error.message);
      }
    }
    
    onSetAvatar = (imageUri) => {
      this.uploadImage(imageUri).then(url => {
        this.props.setAvatar(url);
      }).catch(error => {
        Alert.alert("Upload image error", error.message);
      });
    }
    
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
            }).then(image => {
              if (!image.cancelled) {
                const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.uri;
                this.onSetAvatar(imageUri);
              }
            });
        })();
    };

    uploadImage = async imageUri => {
      const storage = getStorage();
      const image = await fetch(imageUri);
      const blob = await image.blob();
      const storageRef = ref(storage, `images/${new Date().toISOString()}`);
      const snapshot = await uploadBytes(storageRef, blob);
      const url = await getDownloadURL(snapshot.ref);

      return url;
    }

    render(){
        return (
            <View style={styles.container}>
                <View style={{
                    alignItems: 'center',
                    marginBottom: 60
                  }}>
                  <TouchableOpacity onPress={this.choosePhotoFromLibrary}>
                    <View
                      style={{
                        height: 150,
                        width: 150,
                        borderRadius: 30,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <ImageBackground
                        source={{
                          uri: this.props.user.user.photoURL || 'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg'
                        }}
                        style={{
                          height: 150, 
                          width: 150
                        }}
                        imageStyle={{borderRadius: 30}}>
                        <View
                          style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                        </View>
                      </ImageBackground>
                    </View>
                  </TouchableOpacity>
                </View>
        
                <View style={styles.action}>
                  <FontAwesome name="user-o" color="#333333" size={25} />
                  <TextInput
                    placeholder="Username"
                    placeholderTextColor="#666666"
                    autoCorrect={false}
                    value={() => { return this.username }}
                    onChangeText={text => this.username = text}
                    style={styles.textInput}
                  />
                </View>
                <View style={styles.action}>
                  <FontAwesome name="envelope" color="#333333" size={25} />
                  <TextInput
                    placeholder="Email"
                    placeholderTextColor="#666666"
                    value={this.email}
                    onChangeText={text => this.email = text}
                    autoCorrect={false}
                    style={styles.textInput}
                  />
                </View>
                <View style={styles.action}>
                  <Feather name="phone" color="#333333" size={25} />
                  <TextInput
                    placeholder="Phone"
                    placeholderTextColor="#666666"
                    keyboardType="number-pad"
                    autoCorrect={false}
                    value={this.phone}
                    onChangeText={text => this.phone = text}
                    style={styles.textInput}
                  />
                </View>
                <TouchableOpacity style={styles.buttonContainer}>
                    <Text style={styles.buttonText} onPress={this.setUserData}>Update</Text>
                </TouchableOpacity>

                <View>
                  <DropdownAlert
                    ref={(ref) => {
                      if (ref) {
                        this.dropDownAlertRef = ref;
                      }
                    }}
                  />
                </View>
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
    paddingLeft: 20,
    color: '#333333',
  },
  buttonContainer: {
    marginTop: 60,
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