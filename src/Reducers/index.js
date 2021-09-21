import { combineReducers } from 'redux';
import Auth from './Auth';
import posts from './Post'
import comments from './comments';
import errors from './errors';
import messages from './messages';

export default combineReducers({
    Auth,
    posts,
    comments,
    errors,
    messages,
    
})