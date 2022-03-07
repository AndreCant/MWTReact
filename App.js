import React from "react";
import RootNavigator from "./src/navigation/RootNavigator";
import createStore from "./src/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

const {store, persistor} = createStore();

export default class App extends React.Component {

  constructor(props) {
    super(props);
  }

  render(){
    return (
      <Provider store={store}>
         <PersistGate persistor={persistor}>
              <RootNavigator />
         </PersistGate>
      </Provider>
    );
  }
}