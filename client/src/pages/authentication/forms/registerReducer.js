export const initialStates = {
    fullname: "",
    email: "",
    emailFocus: false,
    validEmail: false,
    username: "",
    validUsername: false,
    usernameFocus: false,
    pwd: "",
    validPwd: false,
    pwdFocus: false,
    matchPwd: "",
    validMatch: false,
    matchFocus: false,
    errMsg: {},
    birth_date: "",
};

export function registerReducer(state, action) {
    switch (action.type) {
        case "inputError": {
            return { ...state, errMsg: { ...state.errMsg, ...action.errMsg } };
        }
        case "fullnameInput": {
            return { ...state, fullname: action.fullname };
        }
        case "emailInput": {
            return { ...state, email: action.email, emailFocus: true };
        }
        case "validEmail": {
            return { ...state, validEmail: action.validEmail };
        }
        case "usernameInput": {
            return { ...state, username: action.username, usernameFocus: true };
        }
        case "validateUsername": {
            return { ...state, validUsername: action.validUsername };
        }
        case "passwordInput": {
            return { ...state, pwd: action.pwd };
        }
        case "validatePassword": {
            return { ...state, validPwd: action.validPwd };
        }

        case "passwordCheck": {
            return { ...state, matchPwd: action.matchPwd };
        }

        case "validatePasswordCheck": {
            return { ...state, validMatch: action.validMatch };
        }
        case "birthInput": {
            return { ...state, birth_date: action.birth_date };
        }

        default:
            return state;
    }
}
