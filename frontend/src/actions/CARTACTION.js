import axios from "axios";
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_REQUEST,
  ORDER_PAY_REQUEST,
  ORDER_PAY_FAIL,
  ORDER_PAY_SUCCESS,
  ORDER_LIST_MY_REQUEST,
  ORDER_LIST_MY_SUCCESS,
  ORDER_LIST_MY_FAIL,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_DELIVER_REQUEST,
  ORDER_DELIVER_SUCCESS,
  ORDER_DELIVER_FAIL,
} from "../constants/productConstants";
import { logout } from "./loginAction";
export const addToCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/${id}`);

  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty,
    },
  });

  localStorage.setItem(
    "cartItems",
    JSON.stringify(getState().cartDetails.cartItems)
  );
};

export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  });

  localStorage.setItem(
    "cartItems",
    JSON.stringify(getState().cartDetails.cartItems)
  );
};

export const saveShippingAddress = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_SHIPPING_ADDRESS,
    payload: data,
  });

  localStorage.setItem("shippingAddress", JSON.stringify(data));
};

export const savePaymentMethod = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_PAYMENT_METHOD,
    payload: data,
  });

  localStorage.setItem("paymentMethod", JSON.stringify(data));
};

export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_CREATE_REQUEST,
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

    const { data } = await axios.post(`/api/orders`, order, config);

    dispatch({
      type: ORDER_CREATE_SUCCESS,
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
      type: ORDER_CREATE_FAIL,
      payload: message,
    });
  }
  //localStorage.setItem("shippingAddress", JSON.stringify(data));
};

export const getOrderDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_DETAILS_REQUEST,
    });
    console.log("get orders id ", id);
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

    const { data } = await axios.get(`/api/orders/${id}`, config);
    console.log("dataaaa== ", data);
    dispatch({
      type: ORDER_DETAILS_SUCCESS,
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
      type: ORDER_DETAILS_FAIL,
      payload: message,
    });
  }
  //localStorage.setItem("shippingAddress", JSON.stringify(data));
};

export const OrderPayDetails = (id, paydata) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_PAY_REQUEST,
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

    const { data } = await axios.put(`/api/orders/${id}/pay`, paydata, config);

    // localStorage.setItem("payDetails", JSON.stringify(data));
    // eslint-disable-next-line
    dispatch({
      type: ORDER_PAY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({
      type: ORDER_PAY_FAIL,
      payload: message,
    });
  }
};

export const orderMylist = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_LIST_MY_REQUEST,
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

    const { data } = await axios.get(`/api/orders/myorders`, config);

    // localStorage.setItem("payDetails", JSON.stringify(data));
    // eslint-disable-next-line
    dispatch({
      type: ORDER_LIST_MY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({
      type: ORDER_LIST_MY_FAIL,
      payload: message,
    });
  }
};

export const orderlist = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_LIST_REQUEST,
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

    const { data } = await axios.get(`/api/orders`, config);

    // localStorage.setItem("payDetails", JSON.stringify(data));
    // eslint-disable-next-line
    dispatch({
      type: ORDER_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({
      type: ORDER_LIST_FAIL,
      payload: message,
    });
  }
};

export const deliverOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_DELIVER_REQUEST,
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

    const { data } = await axios.put(
      `/api/orders/${order._id}/deliver`,
      {},
      config
    );

    dispatch({
      type: ORDER_DELIVER_SUCCESS,
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
      type: ORDER_DELIVER_FAIL,
      payload: message,
    });
  }
};
