import React, {useState, useEffect} from "react";
import { View, ActivityIndicator } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/Firebase";
import { setUser } from "../actions/UserActions";

import Chat from "../components/Chat";
import Login from "../components/Login";
import Signup from "../components/Signup";
import Home from "../components/Home";
import Profile from "../components/Profile";
import EditProfile from "../components/EditProfile";
import { useDispatch, useSelector } from "react-redux";
import { sUser } from "../reducers/UserReducer";
import { Constants } from "../constants/Constants";

const Stack = createStackNavigator();

export default function RootNavigator() {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const { user } = useSelector(sUser);
    
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(
        auth,
        async authenticatedUser => {
          if (authenticatedUser) {
            dispatch(setUser(authenticatedUser));
          }else{
            dispatch(setUser(null));
          }
          setLoading(false);
      });
      return () => unsubscribe();
    }, []);
  
    if (loading) {
      return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size='large'/>
        </View>
      );
    }else{
      return (
        <NavigationContainer>
          { user ? <ChatStack /> : <AuthStack />}
        </NavigationContainer>
      );
    }
}

function ChatStack() {
    return (
      <Stack.Navigator 
        defaultScreenOptions={Home} 
        screenOptions={{
            headerBackImage: ({tintColor}) => {
              return <Ionicons name="arrow-back" size={24} color={tintColor} />
            }
        }}>

        <Stack.Screen name={Constants.routes.home} component={Home}/>
        <Stack.Screen name={Constants.routes.chat} component={Chat}/>
        <Stack.Screen name={Constants.routes.profile} component={Profile}/>
        <Stack.Screen name={Constants.routes.editProfile} component={EditProfile}/>
      </Stack.Navigator>
    );
}
  
function AuthStack() {
    return (
      <Stack.Navigator defaultScreenOptions={Login} screenOptions={{headerShown: false}}>
        <Stack.Screen name={Constants.routes.login} component={Login}/>
        <Stack.Screen name={Constants.routes.signup} component={Signup}/>
      </Stack.Navigator>
    );
}