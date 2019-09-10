import firebase from 'firebase';
import '@firebase/auth';
import {
    EMAIL_LOGIN_CHANGED,
    PASSWORD_LOGIN_CHANGED,
    LOGIN_USER,
    LOGIN_USER_FAIL,
    LOGIN_USER_SUCCESS
} from './types';

export const emailLoginChanged = (text) => {
    return {
        type: EMAIL_LOGIN_CHANGED,
        payload: text
    }
};

export const passwordLoginChanged = (text) => {
    return {
        type: PASSWORD_LOGIN_CHANGED,
        payload: text
    };
};

export const loginUser = (email, password) => {
    return (dispatch) => {
        dispatch({
            type: LOGIN_USER
        })

        if (email !== '' && password !== '') {
            firebase.auth().signInWithEmailAndPassword(email, password)
            .then((user) => {
                dispatch({
                    type: LOGIN_USER_SUCCESS,
                    payload: user
                })
            })
            .catch((err) => {
                console.log(err)
                dispatch({
                    type: LOGIN_USER_FAIL,
                    payload: err.message
                })
            })
        } else {
            dispatch({ type: LOGIN_USER_FAIL, payload: 'All Form Must be Filled!' })
        }
    }
}