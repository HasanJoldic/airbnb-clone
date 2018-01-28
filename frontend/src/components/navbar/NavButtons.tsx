import React, { Component } from 'react';
import {
	Button
} from "react-bootstrap";

import "./NavButtons.less";

const NavButtons = (props) => {
	return (
		<div>
      <div>
        <Button onClick={() => props.onNavbarButtonClick("messages")}>Messages</Button>
        <Button onClick={() => props.onNavbarButtonClick("info")}>Info</Button>
        {props.isAuthenticated ?
          (<Button onClick={() => props.onNavbarButtonClick("logout")}>Log out</Button>):
          (<Button onClick={() => props.onNavbarButtonClick("login")}>Log in</Button>)}
        {props.isAuthenticated ? null : (<Button onClick={() => props.onNavbarButtonClick("signup")}>Sign up</Button>)}
      </div>
      
    </div>
	);
};

export default NavButtons;