import { LOGOUT_SUCCESS } from "../types/authType";
import {
  CLEAR_MESSAGE,
  DELIVERED_MESSAGE,
  FRIEND_GET_SUCCESS,
  GET_MESSAGE_SUCCESS,
  GET_THEME_SUCCESS,
  SEEN_ALL,
  SEEN_MESSAGE,
  SEND_MESSAGE_SUCCESS,
  SET_THEME_SUCCESS,
  SOCKET_MESSAGE,
  UPDATE,
  UPDATE_FRIEND_MESSAGE,
} from "../types/messengerType";

const messengerState = {
  friends: [],
  message: [],
  messageSendSuccess: false,
  message_get_success: false,
  themeMode: "",
};

export const messengerReducer = (state = messengerState, action) => {
  const { type, payload } = action;

  if (type === GET_THEME_SUCCESS || type === SET_THEME_SUCCESS) {
    return {
      ...state,
      themeMode: payload.theme,
    };
  }

  if (type === FRIEND_GET_SUCCESS) {
    return {
      ...state,
      friends: payload.friends,
    };
  }

  if (type === GET_MESSAGE_SUCCESS) {
    return {
      ...state,
      message_get_success: true,
      message: payload.message,
    };
  }

  if (type === SEND_MESSAGE_SUCCESS) {
    return {
      ...state,
      messageSendSuccess: true,
      message: [...state.message, payload.message],
    };
  }
  if (type === SOCKET_MESSAGE) {
    return {
      ...state,
      message: [...state.message, payload.message],
    };
  }
  if (type === UPDATE_FRIEND_MESSAGE) {
    const index = state.friends.findIndex(
      (f) =>
        f.frndInfo._id === payload.msgInfo.receiverId ||
        f.frndInfo._id === payload.msgInfo.senderId
    );
    state.friends[index].msgInfo = payload.msgInfo;
    state.friends[index].msgInfo.status = payload.status;
    return state;
  }
  if (type === CLEAR_MESSAGE) {
    return {
      ...state,
      messageSendSuccess: false,
      message_get_success: false, ///can be separated
    };
  }
  if (type === SEEN_MESSAGE) {
    const index = state.friends.findIndex(
      (f) =>
        f.frndInfo._id === payload.msgInfo.receiverId ||
        f.frndInfo._id === payload.msgInfo.senderId
    );
    state.friends[index].msgInfo.status = "seen";
    return {
      ...state,
    };
  }
  if (type === DELIVERED_MESSAGE) {
    const index = state.friends.findIndex(
      (f) =>
        f.frndInfo._id === payload.msgInfo.receiverId ||
        f.frndInfo._id === payload.msgInfo.senderId
    );
    state.friends[index].msgInfo.status = "delivered";
    return {
      ...state,
    };
  }
  if (type === UPDATE) {
    const index = state.friends.findIndex((f) => f.frndInfo._id === payload.id);
    if (state.friends[index].msgInfo) {
      state.friends[index].msgInfo.status = "seen";
    }
    return {
      ...state,
    };
  }
  if (type === SEEN_ALL) {
    const index = state.friends.findIndex(
      (f) => f.frndInfo._id === payload.receiverId
    );
    state.friends[index].msgInfo.status = "seen";
    return {
      ...state,
    };
  }
  if (type === LOGOUT_SUCCESS) {
    return {
      ...state,
      friends: [],
      message: [],
      messageSendSuccess: false,
      message_get_success: false,
    };
  }

  return state;
};
