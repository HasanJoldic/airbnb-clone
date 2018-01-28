import axios from "axios";

import { 
  LOADING,
  LOADING_SUCCESS,
  LOADING_FAIL
} from "../app/index";

import {
  LOAD_GIRL_DATA,
   
} from "./index";

export const loadGirlData = () => {
  return async (dispatch) => {
    dispatch({
      type: LOADING
    });
    const girl = {
      "public_name": "Ariana",
      "uid": "AG",
      "age": "23",
      "height": 155,
      "phone_number": "062/396-551",
      "place": "Vienna",
      "type": "student",
      "offers": [
        "blowjob",
        "photo"
      ],
      "description": [
        "student",
        "teen"
      ],
      "images": ["1","2","3","4","5","6","7","8"],
      "profileImage": "0",
      "messages": [
        { "timestamp": 1515019152, text: "Last message" },
        { "timestamp": 1515010000, text: "2nd to last message" },
        { "timestamp": 1515003000, text: "3rd to last message" },
        { "timestamp": 1515018000, text: "4th to last message" },
      ],
      "price": {
        "amount": "100",
        "currency": "EUR",
        "unit": "HOUR"
      },
      "activeImage": "1"
    };
    dispatch({
      type: LOAD_GIRL_DATA,
      payload: girl
    });
    dispatch({
      type: LOADING_SUCCESS
    });
  };
};