import React, { Component } from 'react';
import {
	Grid,
	Row,
	Col
} from "react-bootstrap";
import {
  BrowserRouter as Router,
  Route,
  Link
} from "react-router-dom";
import { Provider, connect } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";

import reducers from "../reducers";

import Navbar from "./Navbar";
import AppContent from "./AppContent";
import Footer from "./Footer";
import StatusWrapper from "./StatusWrapper";

import ImageLoader from "../components/ImageLoader";
import Profile from "../components/Profile";
import Messages from "../components/Messages";
import Conversation from "../components/Conversation";

import "./App.less";

interface IAppProps {
	match: any;
}

interface IAppState {
	showMobileNavButtons: boolean;
}

const store = createStore(
  reducers,
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__(), 
  applyMiddleware(ReduxThunk)
);



export default class App extends Component<IAppProps, IAppState> {

	state = {
		showMobileNavButtons: false
	}

	handleMobileNavMenuClick = () => {
		this.setState({
			showMobileNavButtons: !this.state.showMobileNavButtons
		});
	}

  render() {
  	const { match } = this.props;
    let content = null;
    switch (match.path) {
      case "/":
        content = <ImageLoader />;
        break;
      case "/profile/:id":
        content = <Profile match={match} />;
        break;
      case "/messages":
        content = <Messages />;
        break;
      case "/messages/message/:id":
        content = <Conversation />;
        break;
    }
    return (
      <Provider store={store}>
        <StatusWrapper>
          <Navbar onMobileNavMenuClick={this.handleMobileNavMenuClick.bind(this)} />
          <AppContent showMobileNavButtons={this.state.showMobileNavButtons} >
          {content}
          </AppContent>
          <Footer />
        </StatusWrapper>
      </Provider>
    );
  }
}
