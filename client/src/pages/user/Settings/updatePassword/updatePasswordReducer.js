export const initialStates = {
    success: "",
    saving: false,
    passwordValue: { currentPassword: "", changePassword: "", confirmChangePassword: "" },
    error: { currentPassword: "", changePassword: "", confirmChangePassword: "" },
};

export function passwordReducer(state, action) {
    switch (action.type) {
        case "inputChange": {
            return {
                ...state,
                passwordValue: { ...state.passwordValue, ...action.passwordValue },
                error: { ...state.error, ...action.error },
            };
        }
        case "submitChange": {
            return {
                ...state,
                saving: action.saving,
            };
        }
        case "inputBlank": {
            return {
                ...state,
                error: { ...state.error, confirmChangePassword: "任一欄位不得為空！" },
                saving: action.saving,
            };
        }

        case "confirmError": {
            return {
                ...state,
                error: { ...state.error, confirmChangePassword: "確認密碼不符" },
                saving: action.saving,
            };
        }
        case "responseError": {
            return {
                ...state,
                error: { ...state.error, currentPassword: action.error },
                saving: action.saving,
            };
        }

        case "responseSuccess": {
            return {
                ...state,
                success: action.success,
                saving: action.saving,
            };
        }

        default:
            return state;
    }
}
