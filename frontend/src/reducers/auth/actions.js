import {
  AUTH_LOGIN,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_FAILED,
  AUTH_LOGIN_LOGOUT
} from "./index.js";

import { callApi } from "../../utils/utils";
import axios from "axios";

export const register = (payload) => {
  return async (dispatch, getState) => {
    axios({
      method: "post",
      url: "http://localhost:3000" + "/api/v1/auth/register",
      responseType: "json",
      data: payload
    }).then(response => {
      dispatch({
        type: AUTH_LOGIN,
        emailOrPhoneNumber: response,
      });
    }).catch(error => {
      console.log(error);
    });
  };
};

export const loginPending = (emailOrPhoneNumber) => {
  return async (dispatch) => {
    dispatch({
      type: AUTH_LOGIN,
      emailOrPhoneNumber: emailOrPhoneNumber,
    });
  };
};

export const loginSuccess = (accessToken, type: "girl"|"client") => {
  return async (dispatch) => {
    dispatch({
      type: AUTH_LOGIN_SUCCESS,
      payload: {
        accessToken: accessToken,
        type: type
      }
    });
  };
};

const loginFailed = (e) => {
  return async (dispatch) => {
    dispatch({
      type: AUTH_LOGIN_FAILED,
      payload: {
        errorStatus: e.message
      }
    });
  };
};

const logoutSuccess = (accessToken, type: "girl"|"client") => {
  return async (dispatch) => {
    dispatch({
      type: AUTH_LOGOUT_SUCCESS
    });
  };
};

export const login = (payload) => {
  return async (dispatch, getState) => {
    axios({
      method: "post",
      url: "http://localhost:3000" + "/api/v1/auth/login",
      responseType: "json",
      data: payload
    }).then(response => {
      console.log(response);
      dispatch({
        type: AUTH_LOGIN_SUCCESS,
        payload: {
          accessToken: response.data.accessToken,
          email: response.data.email
        },
      });
    }).catch(error => {
      console.log(error);
    });
  };
};

const logoutServer = () => {
  return async (dispatch, getState) => {
    try {
      const isLoggedOut = await _login(emailOrPhoneNumber, password);
      dispatch(logoutSuccess(isLoggedOut);
    } catch (e) {
      dispatch(loginFailed(e));
    }
  };
};