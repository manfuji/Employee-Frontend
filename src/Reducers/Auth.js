import {
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  USER_LOADED,
  AUTH_ERROR,
  USER_LOADING,
  LOGOUT_SUCCESS,
  ADD_PROFILE,
  RESET_PASSWORD,
} from "../Actions/Types";

const initialState = {
  isLoading: false,
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  user: null,
  profiles: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case USER_LOADED:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        user: action.payload,
      };
    case ADD_PROFILE:
      localStorage.getItem("token", action.payload.token);
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        profiles: action.payload,
      };
    case LOGIN_SUCCESS:
    case RESET_PASSWORD:
      localStorage.getItem("token", action.payload.token);
      return {
        ...state,
        ...action.payload,
        isLoading: false,
        isAuthenticated: true,
      };
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT_SUCCESS:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false,
      };

    default:
      return state;
  }
}
