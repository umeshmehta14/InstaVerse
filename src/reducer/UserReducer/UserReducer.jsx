import { ALL_USERS } from "../../utils/Constants";

export const UserReducer = (UserState, {payload, type}) =>{
    switch (type) {
        case ALL_USERS:
            return {...UserState, users: payload};
        default:
            break;
    }
}