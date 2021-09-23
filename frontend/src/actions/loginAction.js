import {
  DETAIL_REQUEST,
  DETAIL_SUCCESS,
  DETAIL_FAIL,
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_FAIL,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_DETAILS_RESET,
  ORDER_LIST_MY_RESET,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_RESET,
  DELETE_REQUEST,
  DELETE_SUCCESS,
  DELETE_FAIL,
  USER_UPDATE_FAIL,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_REQUEST,
  USER_UPDATE_RESET,
} from "../constants/productConstants.js";
import axios from "axios";

export const register = (name, email, password) => async (dispatch) => {
  try {
    dispatch({
      type: REGISTER_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/api/user/register",
      { name, email, password },
      config
    );

    dispatch({
      type: REGISTER_SUCCESS,
      payload: data,
    });

    dispatch({
      type: LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem("loginInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: LOGIN_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/api/user/login",
      { email, password },
      config
    );

    localStorage.setItem("loginInfo", JSON.stringify(data));
    dispatch({
      type: LOGIN_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const logout = () => async (dispatch) => {
  localStorage.removeItem("loginInfo");
  localStorage.removeItem("userInfo");
  dispatch({
    type: LOGOUT,
  });

  dispatch({ type: USER_DETAILS_RESET });
  dispatch({ type: ORDER_LIST_MY_RESET });
  dispatch({ type: USER_LIST_RESET });
};

export const getUserDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DETAIL_REQUEST,
    });

    let { userLogin } = getState();

    let loginInfo = null;
    while (userLogin.state) {
      userLogin = userLogin.state;
    }
    loginInfo = userLogin.loginInfo;

    const config = {
      headers: {
        Authorization: `Bearer ${loginInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/user/login/${id}`, config);

    dispatch({
      type: DETAIL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: DETAIL_FAIL,
      payload: message,
    });
  }
};

export const UserDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DETAIL_REQUEST,
    });

    let { userLogin } = getState();

    let loginInfo = null;
    while (userLogin.state) {
      userLogin = userLogin.state;
    }
    loginInfo = userLogin.loginInfo;

    const config = {
      headers: {
        Authorization: `Bearer ${loginInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/user/${id}`, config);

    dispatch({
      type: DETAIL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: DETAIL_FAIL,
      payload: message,
    });
  }
};

export const updateUserProfile = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_UPDATE_PROFILE_REQUEST,
    });

    let { userLogin } = getState();

    let loginInfo = null;
    while (userLogin.state) {
      userLogin = userLogin.state;
    }
    loginInfo = userLogin.loginInfo;

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${loginInfo.token}`,
      },
    };

    const { data } = await axios.put(`/api/user/login/profile`, user, config);

    dispatch({
      type: USER_UPDATE_PROFILE_SUCCESS,
      payload: data,
    });
    dispatch({
      type: LOGIN_SUCCESS,
      payload: data,
    });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: USER_UPDATE_PROFILE_FAIL,
      payload: message,
    });
  }
};

export const userListAction = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_LIST_REQUEST,
    });

    let { userLogin } = getState();

    let loginInfo = null;
    while (userLogin.state) {
      userLogin = userLogin.state;
    }
    loginInfo = userLogin.loginInfo;

    const config = {
      headers: {
        Authorization: `Bearer ${loginInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/user`, config);

    dispatch({
      type: USER_UPDATE_PROFILE_SUCCESS,
      payload: data,
    });
    dispatch({
      type: USER_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: USER_LIST_FAIL,
      payload: message,
    });
  }
};

export const deleteUser = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DELETE_REQUEST,
    });

    let { userLogin } = getState();

    let loginInfo = null;
    while (userLogin.state) {
      userLogin = userLogin.state;
    }
    loginInfo = userLogin.loginInfo;

    const config = {
      headers: {
        Authorization: `Bearer ${loginInfo.token}`,
      },
    };

    await axios.delete(`/api/user/${id}`, config);

    dispatch({
      type: DELETE_SUCCESS,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: DELETE_FAIL,
      payload: message,
    });
  }
};

export const updateUser = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_UPDATE_REQUEST,
    });

    let { userLogin } = getState();

    let loginInfo = null;
    while (userLogin.state) {
      userLogin = userLogin.state;
    }
    loginInfo = userLogin.loginInfo;

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${loginInfo.token}`,
      },
    };

    const { data } = await axios.put(`/api/user/${user._id}`, user, config);

    dispatch({ type: USER_UPDATE_SUCCESS });

    dispatch({ type: DETAIL_SUCCESS, payload: data });

    dispatch({ type: USER_DETAILS_RESET });
    dispatch({ type: USER_UPDATE_RESET });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: USER_UPDATE_FAIL,
      payload: message,
    });
  }
};
