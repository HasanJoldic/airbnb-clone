export const LOADING = "LOADING";
export const LOADING_SUCCESS = "LOADING_SUCCESS";
export const LOADING_FAIL = "LOADING_FAIL";

const places = [
  "Vienna",
  "Munich",
  "Innsbrück",
  "Hamburg",
  "Berlin",
  "Stuttgart",
  "Bremen"
];

const INITIAL_STATE = {
    isLoading: false,
    isError: false,
    errorMessage: "",
    places: places,
    selectedPlace: ""
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        isLoading: true
      };
    case LOADING_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case LOADING_FAIL:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
};