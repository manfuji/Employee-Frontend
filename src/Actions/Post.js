import axios from 'axios';
import { tokenConfig } from './Auth';
import { returnErrors } from './messages';
import {
    GET_POST,
    DELETE_POST,
    ADD_POST,GET_UPDATE,POST_UPDATED
} from './Types';

export const AddPost = (posts)=>(dispatch,getState)=>{
    const url = "https://127.0.0.1:8000/api/post/";
    axios
      .post(url, posts, tokenConfig(getState))
      .then((res) => {
        dispatch({
          type: ADD_POST,
          payload: res.data,
        });
      })
      .catch((err) =>
        dispatch(returnErrors(err.response.data, err.response.status))
      );
}

export const GetPost = () => (dispatch, getState) => {
  //  const url = "http://127.0.0.1:8000/api/post";
    const url = `${process.env.REACT_APP_MY_BASEURL}/api/post/`;
    axios
        .get(url, tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: GET_POST,
                payload: res.data,
                
            });
        })
        .catch((res)=>console.log(res))
        // .catch((err) => dispatch(returnErrors(err.response.data,err.response.req, err.response.status)));
};


export const DeletePost = (id)=>(dispatch,getState)=>{
   const url = `${process.env.REACT_APP_MY_BASEURL}/api/post/${id}/`;
   axios
     .delete(url, tokenConfig(getState))
     .then((res) => {
       dispatch({
         type: DELETE_POST,
         payload: id,
       });
     })
     .catch((err) =>
       dispatch(returnErrors(err.response.data, err.response.status))
     );
}
export const getUpdate = (id)=>(dispatch,getState)=>{
   const url= `${process.env.REACT_APP_MY_BASEURL}/detail/${id}/`;
   axios
     .get(url, tokenConfig(getState))
     .then((res) => {
       dispatch({
         type: GET_UPDATE,
         payload: res.data,
       });
     })
     .catch((err) =>
       dispatch(returnErrors(err.response.data, err.response.status))
     );
}
export const updatePost = (id,formdata) => (dispatch,getState) => {
    const url = `${process.env.REACT_APP_MY_BASEURL}/api/detail/` + id + "/";
    axios
      .put(url, formdata, tokenConfig(getState))
      .then((res) => {
        dispatch({
          type: POST_UPDATED,
          payload: res.data,
        });
      })
      .catch((err) =>
        dispatch(returnErrors(err.response.data, err.response.status))
      );
}