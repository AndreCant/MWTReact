import React, {useState, createContext} from "react";
import RootNavigator from "./src/navigation/RootNavigator";
import createStore from "./src/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

const AuthenticatedUserContext = createContext({});
const {store, persistor} = createStore();

const AuthenticatedUserProvider = ({children}) => {
  const [user, setUser] = useState(null);
  return (
    <AuthenticatedUserContext.Provider value={{user, setUser}}> 
      {children}
    </AuthenticatedUserContext.Provider>
  );
}

export default class App extends React.Component {

  constructor(props) {
    super(props);
  }

  render(){
    return (
      <Provider store={store}>
         <PersistGate persistor={persistor}>
            <AuthenticatedUserProvider>
              <RootNavigator context={AuthenticatedUserContext}/>
            </AuthenticatedUserProvider>
         </PersistGate>
      </Provider>
    );
  }
}