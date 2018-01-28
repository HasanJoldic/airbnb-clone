import { combineReducers } from "redux";
import auth from "./auth";
import user from "./user";
import app from "./app";
import girls from "./girls";
import girl from "./girl";

export default combineReducers({
  auth,
  user,
  app,
  girls,
  girl
});