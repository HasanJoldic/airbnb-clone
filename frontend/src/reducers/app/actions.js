import {
  LOADING,
  LOADING_SUCCESS,
  LOADING_FAIL
} from "./index.js";

export const load = () => {
  return {
    type: LOADING
  }
};

export const loadingSuccess = () => {
  return {
    type: LOADING_SUCCESS
  }
};

export const loadingFail = () => {
  return {
    type: LOADING_FAIL
  }
};