import {
  PRODUCT_REQUEST,
  PRODUCT_REQUEST_FAIL,
  PRODUCT_REQUEST_SUCCESS,
  PRODUCT_DETAIL_REQUEST,
  PRODUCT_DETAIL_REQUEST_SUCCESS,
  PRODUCT_DETAIL_REQUEST_FAIL,
} from "../constants/productConstants";
import axios from "axios";
export const productList = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_REQUEST });
    const { data } = await axios.get("/api/products");
    dispatch({ type: PRODUCT_REQUEST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_REQUEST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const productDetail = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAIL_REQUEST });
    const { data } = await axios.get(`/api/products/${id}`);
    dispatch({ type: PRODUCT_DETAIL_REQUEST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAIL_REQUEST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
