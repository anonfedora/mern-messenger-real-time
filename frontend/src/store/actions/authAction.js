import axios from "axios";
import {
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAIL,
  ERROR_CLEAR,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
} from "../types/authType";

export const userRegister = (data) => {
  return async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await axios.post(
        "/api/messenger/user-register",
        data,
        config
      );
      localStorage.setItem("authToken", response.data.token);

      dispatch({
        type: REGISTER_SUCCESS,
        payload: {
          successMessage: response.data.successMessage,
          token: response.data.token,
        },
      });
    } catch (error) {
      dispatch({
        type: REGISTER_FAIL,
        payload: {
          error: error.response.data.error.errorMessage,
        },
      });
    }
  };
};

export const userLogin = (data) => {
  return async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await axios.post(
        "/api/messenger/user-login",
        data,
        config
      );
      localStorage.setItem("authToken", response.data.token);

      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: {
          successMessage: response.data.successMessage,
          token: response.data.token,
        },
      });
    } catch (error) {
      dispatch({
        type: USER_LOGIN_FAIL,
        payload: {
          error: error.response.data.error,
        },
      });
    }
  };
};

export const forgotPassword = (data) => {
  return async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
  try {
    const response = await axios.post(`/api/messenger/password/forgot-password`, data, config);
    dispatch({
      type: FORGOT_PASSWORD_SUCCESS,
      payload : response.data.message
    })
    console.log(response)
  } catch (error) {
    dispatch({
      type: FORGOT_PASSWORD_FAIL,
      payload: error.response.data
    })
  }}
}

export const resetPassword = (token, passwords) => async (dispatch) => {
  try {
    //dispatch({type: RESET_PASSWORD_REQUEST});
    const config = { headers: 
    {"Content-Type" : "application/json"}}
    const response = await axios.put(`/api/messenger/password/reset/${token}`, passwords, config);
    dispatch({
      type: RESET_PASSWORD_SUCCESS, payload: response.data.success
    })
  } catch (error) {
    dispatch({
      type: RESET_PASSWORD_FAIL, 
      payload: error.response.data.error
    })
  }
}

export const userLogout = () => async (dispatch) => {
  try {
    const response = await axios.post(`/api/messenger/user-logout`);
    if (response.data.success){
      localStorage.removeItem('authToken');
      dispatch({
        type : LOGOUT_SUCCESS
      })
    }
  } catch (error) {}
};

export const clearErrors = () => async (dispatch) => {
  dispatch({type: ERROR_CLEAR});
}