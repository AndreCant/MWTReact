import React, {useState, useContext, useEffect} from "react";
import { View, ActivityIndicator } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/Firebase";

import Chat from "../components/Chat";
import Login from "../components/Login";
import Signup from "../components/Signup";
import Home from "../components/Home";

const Stack = createStackNavigator();

export default function RootNavigator({context}) {
    const { user, setUser } = useContext(context);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(
        auth,
        async authenticatedUser => {
          authenticatedUser ? setUser(authenticatedUser) : setUser(null);
          setLoading(false);
      });
      return () => unsubscribe();
    }, [user]);
  
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
      <Stack.Navigator defaultScreenOptions={Home}>
        <Stack.Screen name="Home" component={Home}/>
        <Stack.Screen name="Chat" component={Chat}/>
      </Stack.Navigator>
    );
}
  
function AuthStack() {
    return (
      <Stack.Navigator defaultScreenOptions={Login} screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={Login}/>
        <Stack.Screen name="Signup" component={Signup}/>
      </Stack.Navigator>
    );
}