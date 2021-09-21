import axios from 'axios';
import { tokenConfig } from './Auth';
import {
    GET_COMMENTS,ADD_COMMENT
} from './Types';



export const addComment = (title,comment) => ({dispatch, getState}) =>{
    const url = `${process.env.REACT_APP_MY_BASEURL}/comment/${title}/`;
    axios
    .post(url,comment,tokenConfig(getState))
    .then((res) =>{
        dispatch({
            type:ADD_COMMENT,
            payload:res.data
        });
    }).catch((err=>console.log(err)))
    
}
export const loadComment = (title) => ({dispatch,getState}) => {
    const url = `${process.env.REACT_APP_MY_BASEURL}/api/comment/${title}/`;
    axios
    .get(url,tokenConfig(getState))
    .then((res)=>{
        dispatch({
            type:GET_COMMENTS,
            payload:res.data
        });
    }).catch((err=>console.log(err)))
}