import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Link
} from "react-router-dom";

import App from "./App";

const Tacos = ({ routes }) => (
  <div>
  </div>
)

const Bus = () => <h3>Bus</h3>
const Cart = () => <h3>Cart</h3>

////////////////////////////////////////////////////////////
// then our route config
const routes = [
  { path: '/app',
    component: App,
    routes: [
      { path: '/app/bus',
        component: Bus
      },
      { path: '/app/cart',
        component: Cart
      }
    ]
  }
]

// wrap <Route> and use this everywhere instead, then when
// sub routes are added to any route it'll work
const RouteWithSubRoutes = (route) => (
  <Route path={route.path} render={props => (
    // pass the sub-routes down to keep nesting
    <route.component {...props} routes={route.routes}/>
  )}/>
)

const RouteConfigExample = () => (
  <Router>
  	<div>
	    <Route exact path="/" component={App}>
	    </Route>
	    <Route exact path="/profile/:id" component={App}>
	    </Route>
      <Route path="/messages/message/:id" component={App}>
      </Route>
      <Route exact path="/messages" component={App}>
      </Route>
      
    </div>
  </Router>
)

export default RouteConfigExample
