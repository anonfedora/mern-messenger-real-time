import axios from 'axios';
import { FRIEND_GET_SUCCESS, GET_MESSAGE_SUCCESS, GET_THEME_SUCCESS, SEND_MESSAGE_SUCCESS, SET_THEME_SUCCESS } from '../types/messengerType';

export const getFriends = () => async (dispatch) => {
    try {
        const response = await axios.get(`/api/messenger/get-friends`);
        dispatch({type: FRIEND_GET_SUCCESS,
        payload: {
            friends: response.data.friends
        }})
    } catch (error) {
        console.log(error)
    }
}

export const messageSend = (data) => async (dispatch) => {
    try {
        const response = await axios.post(`/api/messenger/send-message`,data);
        dispatch({
            type: SEND_MESSAGE_SUCCESS,
            payload: {
                message: response.data.message
            }
        })
    } catch (error) {
        
    }
}

export const getMessage = (id) => async (dispatch) => {
    try {
        const response = await axios.get(`/api/messenger/get-message/${id}`)
        dispatch({
            type: GET_MESSAGE_SUCCESS,
            payload: {
                message: response.data.message}
        })
    } catch (error) {
        console.log(error.response.data)
    }
}

export const sendImages = (data) => async (dispatch) => {
    try {
        const response = await axios.post(`/api/messenger/send-image-message`,data);
        dispatch({
            type: SEND_MESSAGE_SUCCESS,
            payload : {
                message: response.data.message
            }
        })
    } catch (error) {
        console.log(error.response.data);
    }
}

export const seenMessage = (msg) => async (dispatch) => {
    try {
        const response = await axios.post(`/api/messenger/seen-message`, msg);
        console.log(response.data);
    } catch (error) {
        console.log(error.response.message)
    }
}

export const updateMessage = (msg) => async (dispatch) => {
    try {
        const response = await axios.put(`/api/messenger/delivered-message`, msg);
        console.log(response.data);
    } catch (error) {
        console.log(error.response.message)
    }
}

export const getTheme = () => async (dispatch) => {
    const theme = localStorage.getItem('theme');
    dispatch({
        type: GET_THEME_SUCCESS,
        payload: {
            theme : theme? theme : 'white'
        }
    })
}

export const setTheme = (theme) => async (dispatch) => {
    localStorage.setItem('theme', theme);
    dispatch({
        type: SET_THEME_SUCCESS,
        payload: {
            theme : theme
        }
    })
}

