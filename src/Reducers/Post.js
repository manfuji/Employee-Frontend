import {
    GET_POST,ADD_POST,DELETE_POST,POST_UPDATED,GET_UPDATE
} from '../Actions/Types'

const initialState={
    posts: [],
    update:[],
}

export default function (state= initialState,action) {
    switch (action.type) {
        case GET_POST:
            return{
            ...state,
            posts:action.payload,
            };
        case GET_UPDATE:
            return{
            ...state,
                update: action.payload,
            
            };
        case ADD_POST:
        return{
            ...state,
            posts:[...state.posts,action.payload]
        };
        case POST_UPDATED:
        return{
            ...state,
            update:[...state.posts,action.payload]
        };
        case DELETE_POST:
            return {
                ...state,
                posts:state.posts.filter((post) => post.id !==action.payload),
                    
                
            };
        default:
            return state;
    }
}
