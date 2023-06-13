import { ALL_POSTS } from "../../utils/Constants";

export const PostReducer = (postState, {payload, type}) =>{
    switch (type) {
        case ALL_POSTS:
            return {...postState, posts: payload};

        default:
            break;
    }
}