import axios from "axios";
import moment from "moment";

import {
  SET_ACCOUNT,
  SET_TRANSACTION_LIST_START,
  SET_TRANSACTION_LIST_END,
  SELECT_TRANSACTION,
  LOAD_USER_DATA,
  LOAD_TRANSACTIONS,
  LOADING,
  LOADING_SUCCESS
} from "./index.js";

import IAccount from "./index.js"
import ITransaction from "./index.js"

export const setAccount = (account: IAccount) => {
  return async (dispatch) => {
        dispatch({
      type: SET_ACCOUNT,
      account: account
    });
  };
};

export const selectTransaction = (transaction: ITransaction) => {
  return {
    type: SELECT_TRANSACTION,
    payload: {
      transaction
    }
  };
};

export const setTransactionStart = (start: string) => {
  return {
    type: SET_TRANSACTION_LIST_START,
    payload: {
      start
    }
  };
};

export const setTransactionEnd = (end: string) => {
  return {
    type: SET_TRANSACTION_LIST_START,
    payload: {
      end
    }
  };
};

export const loadUserData = (account: IAccount) => {
  return async (dispatch) => {  
    const accounts = await axios({
      method: "get",
      url: "https://raw.githubusercontent.com/HasanJoldic/vakuba/master/accounts.json",
      responseType: "json"
    });
    console.log(accounts);
    dispatch({
      type: LOAD_USER_DATA,
      payload: {
        accessToken: "ACCESS_TOKEN",
        userData: {
          accounts: accounts.data
        }
      }
    });
  };
};

export const loadTransactions = (start: Date, end: Date, account: IAccount) => {
  return async (dispatch) => {
    dispatch({
      type: LOADING
    });
    const transactions = await axios({
      method: "get",
      url: "https://raw.githubusercontent.com/HasanJoldic/vakuba/master/transactionList.json",
      responseType: "json"
    });
    let list = [];
    transactions.data.forEach(transaction => {
      if (moment(transaction.date).isBetween(start, end)) {
        console.log(transaction);
        list.push(transaction);
      }
    })
    const transactionList = {
      start: start,
      end: end,
      list: list
    };
    dispatch({
      type: LOAD_TRANSACTIONS,
      payload: {
        transactionList,
        accountNumber: account.number
      }
    });
    dispatch({
      type: LOADING_SUCCESS
    });
  };
};

const _isBetweenDates = (start, end, date) => {
  let year = date.getFullYear();
  let month = date.getMonth();
  let day = date.getDate();
  if (year < start.getFullYear() || year > end.getFullYear()) {
    return false;
  } else if (month < start.getMonth() || month > end.getMonth()) {
    return false;
  } else if (day < start.getDate() || day > end.getDate()) {
    return false;
  }
  return true;
};