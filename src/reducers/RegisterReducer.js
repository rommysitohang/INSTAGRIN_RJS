import {
    EMAIL_REGISTERED_CHANGED,
    PASSWORD_REGISTERED_CHANGED,
    USERNAME_REGISTERED_CHANGED,
    CON_PASSWORD_REGISTERED_CHANGED,
    REGISTER_USER,
    REGISTER_USER_FAIL,
    REGISTER_USER_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
    email: '',
    username: '',
    password: '',
    conPassword: '',
    loading: false,
    error: ''
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case EMAIL_REGISTERED_CHANGED :
            return { ...state, email: action.payload };
        case PASSWORD_REGISTERED_CHANGED :
            return { ...state, password: action.payload };
        case CON_PASSWORD_REGISTERED_CHANGED :
            return { ...state, conPassword: action.payload };
        case USERNAME_REGISTERED_CHANGED :
            return { ...state, username: action.payload };
        case REGISTER_USER :
            return { ...state, loading: true, error: ' '};
        case REGISTER_USER_FAIL :
            return { ...state, error: action.payload, loading: false };
        case REGISTER_USER_SUCCESS :
            return { ...INITIAL_STATE, loading: false }; 
        default: return state

    }
}