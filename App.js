import React, {useState, createContext} from "react";
import RootNavigator from "./src/navigation/RootNavigator";

const AuthenticatedUserContext = createContext({});

const AuthenticatedUserProvider = ({children}) => {
  const [user, setUser] = useState(null);
  return (
    <AuthenticatedUserContext.Provider value={{user, setUser}}> 
      {children}
    </AuthenticatedUserContext.Provider>
  );
}

export default function App() {
  return (
    <AuthenticatedUserProvider>
      <RootNavigator context={AuthenticatedUserContext}/>
    </AuthenticatedUserProvider>
  );
}