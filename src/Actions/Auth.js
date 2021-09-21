import axios from "axios";
import { returnErrors } from "./messages";
import {
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  USER_LOADING,
  USER_LOADED,
  AUTH_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  ADD_PROFILE,
  RESET_PASSWORD,
} from "./Types";

export const loadUser = () => (dispatch, getState) => {
  dispatch({ type: USER_LOADING });
  //  const url = "http://127.0.0.1:8000/api/users";
  const url = `${process.env.REACT_APP_MY_BASEURL}/api/user`;
  axios
    .get(url, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: AUTH_FAIL,
      });
    });
};

export const Profiles = () => (dispatch, getState) => {
  dispatch({ type: USER_LOADING });

  const url = `${process.env.REACT_APP_MY_BASEURL}/api/profile`;
  //  const url = "http://127.0.0.1:8000/api/profile";
  axios
    .get(url, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: ADD_PROFILE,
        payload: res.data,
      });
    })
    .catch((err) => {
      // dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: AUTH_FAIL,
      });
    });
};

export const PasswordReset =
  ({ old_password, new_password }) =>
  (dispatch, getState) => {
    const url = `${process.env.REACT_APP_MY_BASEURL}/api/changepassword`;
    const body = JSON.stringify({ old_password, new_password });
    axios
      .put(url, body, tokenConfig(getState))
      .then((res) => {
        dispatch({
          type: RESET_PASSWORD,
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch(returnErrors(err.response.data, err.response.status));
        dispatch({
          type: AUTH_FAIL,
        });
      });
  };

//regisgter User
export const Registers =
  ({ username, email, password }) =>
  (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({ username, email, password });
    const url = `${process.env.REACT_APP_MY_BASEURL}/api/register`;
    axios
      .post(url, body, config)
      .then((res) => {})
      .catch((err) => {
        dispatch(returnErrors(err.response.data, err.response.status));
      });
  };

//Login User
export const login = (username, password) => (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ username, password });
  const url = `${process.env.REACT_APP_MY_BASEURL}/api/login`;
  // const url = "http://127.0.0.1:8000/api/login";
  axios
    .post(url, body, config)
    .then((res) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
      // dispatch(toast.error("Login successfully"));
    })
    .catch((error) => {
      dispatch(returnErrors(error.response.data, error.response.status));
      dispatch({
        type: LOGIN_FAIL,
      });
      throw error;
      // dispatch(toast.error("Invalid Credentials"));
    });
};

export const logout = () => (dispatch, getState) => {
  const url = `${process.env.REACT_APP_MY_BASEURL}/api/logout`;
  // const url = "http://127.0.0.1:8000/api/logout";
  axios
    .post(url, null, tokenConfig(getState))
    .then((res) => {
      dispatch({ type: "LOGOUT_SUCCESS" });
      dispatch({
        type: LOGOUT_SUCCESS,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: LOGOUT_FAIL,
      });
    });
};

//function for getting the state
// Setup config with token - helper function
export const tokenConfig = (getState) => {
  // Get token from state
  const token = getState().Auth.token;

  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  // If token, add to headers config
  if (token) {
    config.headers["Authorization"] = `Token ${token}`;
  }

  return config;
};
