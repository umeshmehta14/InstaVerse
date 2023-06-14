import { ALL_USERS, SET_BOOKMARK } from "../../utils/Constants";

export const UserReducer = (userState, {payload, type}) =>{
    switch (type) {
        case ALL_USERS:
            return {...userState, users: payload};
        
        case SET_BOOKMARK:
            return {...userState, userBookmarks: payload};
        default:
            break;
    }
}