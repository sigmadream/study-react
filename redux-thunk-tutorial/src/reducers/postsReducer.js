import * as ActionType from '../actions/ActionTypes';

export const postsReducer = (state = [], action) => {
  switch (action.type) {
    case ActionType.FETCH_POSTS:
      return action.payload;
    default:
      return state;
  }
};
