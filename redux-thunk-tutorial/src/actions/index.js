import JsonPlaceHolder from '../apis/JsonPlaceHolder';

export const fetchPosts = () => async (dispatch) => {
  let response = await JsonPlaceHolder.get('/posts');
  dispatch({ type: 'FETCH_POSTS', payload: response.data });
};
