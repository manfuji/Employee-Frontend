import React from 'react'
import {
 GET_COMMENTS,ADD_COMMENT
} from '../Actions/Types';
const inistialState = {
    comments: [],
}
export default function (state = inistialState,action) {
    switch(action.type){
        case ADD_COMMENT:
            return({
                ...state,
                comments: [...state.comments,action.payload]
            });
        case GET_COMMENTS:
            return({
                ...state,
                comments:action.payload
            }) 
            
        default:
            return state
    }
    
    
}
