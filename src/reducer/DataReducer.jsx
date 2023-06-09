import { ALL_POSTS, ALL_USERS } from "../utils/Constants";

export const DataReducer = (state, action) =>{
    switch (action.type) {
        case ALL_POSTS:
            return {...state, posts: action.payload};

        case ALL_USERS:
            return {...state, users: action.payload};
    
        default:
            break;
    }
}