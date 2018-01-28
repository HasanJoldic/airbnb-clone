import React from "react";
import ReactDOM from "react-dom";
//import { Provider } from "react-redux";
//import { createStore, applyMiddleware } from "redux";

import Internalization from "./components/Internalization"; 
import Routes from "./containers/Routes";
//import reducers from "./reducers";

//const createStoreWithMiddleware = applyMiddleware()(createStore);

//ReactDOM.render(
//  <Provider store={createStoreWithMiddleware(reducers)}>
//    <App />
//  </Provider>
//, document.querySelector(".container"));

ReactDOM.render(
	<Internalization>
    	<Routes />
    </Internalization>
, document.querySelector(".app"));
