export const SET_ACCOUNT = "SET_ACCOUNT";
export const SET_TRANSACTION_LIST_START = "SET_TRANSACTION_LIST_START_DATE";
export const SET_TRANSACTION_LIST_END = "SET_TRANSACTION_LIST_END_DATE";
export const SELECT_TRANSACTION = "SELECT_TRANSACTION";
export const LOAD_USER_DATA = "LOAD_USER_DATA";
export const LOAD_TRANSACTIONS = "LOAD_TRANSACTIONS";
export const LOADING = "LOADING";
export const LOADING_SUCCESS = "LOADING_SUCCESS";

export interface ITransaction {
  type: "UPLATA" | "ISPLATA";
  date: Date;
  number: string;
  desc: string;
  amount: number;
  currency: string;
}

export interface IAccount {
  type: string;
  number: string;
  createdAt: Date;
  name: string;
  currency: string;
  state: number;
  transactionList: {
    start: string,
    end: string,
    list: ITransaction[]
  }
}

export interface IUserState {
  accounts: IAccount[],
  account: IAccount,
  selectedTransaction: ITransaction
}

const INITIAL_STATE = {
  accounts: null,
  account: null,
  selectedTransaction: null,
  isLoading: false
};


export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_ACCOUNT:
      return { ...state, account: action.account };
    case LOAD_USER_DATA:
      return { ...state, accounts: action.payload.userData.accounts };
    case LOAD_TRANSACTIONS:
      return _setTransactionList(state, action);
    case SELECT_TRANSACTION:
      return { ...state, selectedTransaction: action.payload.transaction };
    case LOADING:
      return { ...state, isLoading: true };
    case LOADING_SUCCESS:
      return { ...state, isLoading: false };
    default:
      return state;
  }
};

const _setTransactionList = (state, action) => {
  let newAccounts = [];
  let newAccount = null;
  state.accounts.forEach(account => {
    if (account.number !== action.payload.accountNumber) {
      newAccounts.push(account);
    } else {
      account.transactionList = action.payload.transactionList;
      newAccounts.push(account);
      newAccount = account;
    }
  });
  return { ...state, accounts: [ ...newAccounts ], account: newAccount };
};