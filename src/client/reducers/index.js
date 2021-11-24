import { HYDRATE } from 'next-redux-wrapper';
import { combineReducers } from 'redux'; // reducer 함수를 원활하게 합쳐준다.

import user from './user';
import post from './post';

const initialState = {
  user: {},
  post: {},
};

const rootReducer = combineReducers({
  // redux ssr(HYDRATE)
  index: (state = {}, action) => {
    switch (action.type) {
      case 'HYDRATE':
        return {
          ...state,
          ...action.payload,
        };

      default:
        return state;
    }
  },
  user,
  post,
});

export default rootReducer;
