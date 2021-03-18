import * as ActionTypes from '../actions/ActionTypes';

export const usersReducer = (state = [], action) => {
  switch (action.type) {
    case ActionTypes.FETCH_USER:
      return [...state, action.payload];
    default:
      return state;
  }
};
