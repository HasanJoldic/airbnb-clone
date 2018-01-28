export const LOAD_GIRLS_DATA = "LOAD_GIRLS_DATA";
export const LOADING_SUCCESS = "LOADING_SUCCESS";
export const LOADING_FAIL = "LOADING_FAIL";
export const LOADING = "LOADING";

export enum GIRL_TYPE { 
  STUDENT = "student", 
  PROFFESSIONAL = "professional"
}

export enum OFFER {
  "anal",
  "blowjob",
  "noCondom",
  "photo",
  "video"
};

export enum DESCRIPTION {
  "student",
  "married",
  "teen",
  "milf"
};

export enum CURRENCY {
  EUR = "EUR",
  USD = "USD"
}

export enum UNIT {
  DAY = "day",
  NIGHT = "night",
  HOUR = "hour",
  HOUR_2 = "2 hours",
  HOUR_3 = "3 hours",
  HOUR_4 = "4 hours",
  HOUR_5 = "5 hours",
  MINUTES_30 = "30 minutes"
}

export interface IPrice {
  amount: number;
  currency: CURRENCY;
  unit: UNIT;
}

interface IGirl {
  public_name: string;
  uid: string;
  age: number;
  //height: number;
  type: GIRL_TYPE;
  //offers: OFFER[];
  //description: DESCRIPTION[];
  images: string[];
  currentPage: number;
  price: IPrice;
  activeImage: string;
}


const INITIAL_STATE: IGirl[] = [];

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOAD_GIRLS_DATA:
      return { ...state, girls: action.payload};
    case LOADING_SUCCESS:
      return { ...state, isLoading: false};
    case LOADING_FAIL:
      return { ...state, isLoading: false};
    default:
      return state;
  }
};