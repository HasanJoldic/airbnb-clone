export const AUTH_LOGIN = "auth/LOGIN";
export const AUTH_LOGIN_SUCCESS = "auth/LOGIN_SUCCESS";
export const AUTH_LOGIN_FAILED = "auth/LOGIN_FAILED";
export const AUTH_LOGIN_LOGOUT = "auth/LOGIN_LOGOUT";

export interface IAuthReducerState {
    isAuthenticated: boolean;
    emailOrPhoneNumber: string;
    accessToken: string;
    isLoading: boolean;
    error: string;
    errorStatus: number;
}

const INITIAL_STATE = {
    isAuthenticated: null,
    email: null,
    accessToken: null,
    isLoading: false,
    error: null,
    errorStatus: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AUTH_LOGIN:
      return {
        ...state,
        isLoading: true
      };
    case AUTH_LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        accessToken: action.payload.accessToken,
        email: action.payload.email
      };
    case AUTH_LOGIN_LOGOUT:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        accessToken: null
      };
    //case AUTH_LOGIN_FAILED
    default:
      return state;
  }
};