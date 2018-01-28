export const LOAD_GIRL_DATA = "LOAD_GIRL_DATA";

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

export interface IGirlProfileImage {
  uid: string;
}

export interface IMessage {
  timestamp: number;
  text: string;
}

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
  height: number;
  phone_number: string;
  place: string;
  type: GIRL_TYPE;
  offers: OFFER[];
  description: DESCRIPTION[];
  images: string[];
  profileImage: string;
  //currentPage: number;
  messages: IMessage[];
  price: IPrice;
  activeImage: string;
}

const INITIAL_STATE: IGirl = null;

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOAD_GIRL_DATA:
      return action.payload;
    default:
      return state;
  }
};