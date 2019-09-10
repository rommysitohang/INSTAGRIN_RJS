import {
    LOGIN_USER_SUCCESS,
    LOGOUT_USER,
    NOT_LOGIN_YET
} from '../actions/types';

const INITIAL_STATE = {
    user: null,
    loading: false,
    checkedAuth: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOGIN_USER_SUCCESS :
            return { ...INITIAL_STATE, user: action.payload, checkedAuth: true };
        case LOGOUT_USER:
            return {...INITIAL_STATE, checkedAuth: true };
        case NOT_LOGIN_YET :
            return { ...INITIAL_STATE, checkedAuth: true};
        default :
        return state;

    }
}