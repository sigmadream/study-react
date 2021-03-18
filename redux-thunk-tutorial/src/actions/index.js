import JsonPlaceHolder from '../apis/JsonPlaceHolder';
import * as ActionTypes from './ActionTypes';

export const fetchPosts = () => async (dispatch) => {
  let response = await JsonPlaceHolder.get('/posts');
  dispatch({ type: ActionTypes.FETCH_POSTS, payload: response.data });
};

export const fetchUser = (id) => async (dispatch) => {
  const response = await JsonPlaceHolder.get(`/users/${id}`);
  dispatch({ type: ActionTypes.FETCH_USER, payload: response.data });
};
