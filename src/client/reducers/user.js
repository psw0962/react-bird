import produce from 'immer';

export const initialState = {
  // follow
  followLoading: false,
  followDone: false,
  followError: null,

  // unfollow
  unfollowLoading: false,
  unfollowDone: false,
  unfollowError: null,

  // loaduser
  loadUserLoading: false,
  loadUserDone: false,
  loadUserError: null,

  // login
  logInLoading: false,
  logInDone: false,
  logInError: null,

  // logout
  logOutLoading: false,
  logOutDone: false,
  logOutError: null,

  // signup
  signupLoading: false,
  signupDone: false,
  signupError: null,

  // nickname
  changeNicknameLoadding: false,
  changeNicknameDone: false,
  changeNicknameError: null,

  // loadfollowers
  loadFollowersLoadding: false,
  loadFollowersDone: false,
  loadFollowersError: null,

  // loadfollowings
  loadFollowingsLoadding: false,
  loadFollowingsDone: false,
  loadFollowingsError: null,

  // removefollowers
  removeFollowerLoadding: false,
  removeFollowerDone: false,
  removeFollowerError: null,

  // data
  me: null,
  signUpData: {},
  loginData: {},
};

export const FOLLOW_REQUEST = 'FOLLOW_REQUEST';
export const FOLLOW_SUCCESS = 'FOLLOW_SUCCESS';
export const FOLLOW_FAIRLURE = 'FOLLOW_FAIRLURE';

export const UNFOLLOW_REQUEST = 'UNFOLLOW_REQUEST';
export const UNFOLLOW_SUCCESS = 'UNFOLLOW_SUCCESS';
export const UNFOLLOW_FAIRLURE = 'UNFOLLOW_FAIRLURE';

export const REMOVE_FOLLOWER_REQUEST = 'REMOVE_FOLLOWER_REQUEST';
export const REMOVE_FOLLOWER_SUCCESS = 'REMOVE_FOLLOWER_SUCCESS';
export const REMOVE_FOLLOWER_FAIRLURE = 'REMOVE_FOLLOWER_FAIRLURE';

export const LOAD_FOLLOWERS_REQUEST = 'LOAD_FOLLOWERS_REQUEST';
export const LOAD_FOLLOWERS_SUCCESS = 'LOAD_FOLLOWERS_SUCCESS';
export const LOAD_FOLLOWERS_FAIRLURE = 'LOAD_FOLLOWERS_FAIRLURE';

export const LOAD_FOLLOWINGS_REQUEST = 'LOAD_FOLLOWINGS_REQUEST';
export const LOAD_FOLLOWINGS_SUCCESS = 'LOAD_FOLLOWINGS_SUCCESS';
export const LOAD_FOLLOWINGS_FAIRLURE = 'LOAD_FOLLOWINGS_FAIRLURE';

export const LOAD_MY_INFO_REQUEST = 'LOAD_MY_INFO_REQUEST';
export const LOAD_MY_INFO_SUCCESS = 'LOAD_MY_INFO_SUCCESS';
export const LOAD_MY_INFO_FAILURE = 'LOAD_MY_INFO_FAILURE';

export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';

export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const LOG_OUT_FAIRLURE = 'LOG_OUT_FAIRLURE';

export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAIRLURE = 'SIGN_UP_FAIRLURE';

export const CHANGE_NICKNAME_REQUEST = 'CHANGE_NICKNAME_REQUEST';
export const CHANGE_NICKNAME_SUCCESS = 'CHANGE_NICKNAME_SUCCESS';
export const CHANGE_NICKNAME_FAIRLURE = 'CHANGE_NICKNAME_FAIRLURE';

export const ADD_POST_TO_ME = 'ADD_POST_TO_ME';
export const REMOVE_POST_OF_ME = 'REMOVE_POST_OF_ME';

//login
export const loginRequestAction = (data) => {
  return {
    type: LOG_IN_REQUEST,
    data,
  };
};

// logout
export const logoutRequestAction = () => {
  return {
    type: LOG_OUT_REQUEST,
  };
};

export const logoutSuccessAction = () => {
  return {
    type: LOG_OUT_SUCCESS,
  };
};

export const logoutFairureAction = () => {
  return {
    type: LOG_OUT_FAIRURE,
  };
};

const reducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      // removefollower
      case REMOVE_FOLLOWER_REQUEST:
        draft.removeFollowerLoading = true;
        draft.removeFollowerError = null;
        draft.removeFollowerDone = false;
        break;

      case REMOVE_FOLLOWER_SUCCESS:
        draft.removeFollowerLoading = false;
        draft.me.Followers = draft.me.Followers.filter((v) => v.id !== action.data.UserId);
        draft.removeFollowerDone = true;
        break;

      case REMOVE_FOLLOWER_FAIRLURE:
        draft.removeFollowerLoading = false;
        draft.removeFollowerError = action.error;
        break;

      // loadfollowers
      case LOAD_FOLLOWERS_REQUEST:
        draft.followLoading = true;
        draft.followError = null;
        draft.followDone = false;
        break;

      case LOAD_FOLLOWERS_SUCCESS:
        draft.followLoading = false;
        draft.followDone = true;
        draft.me.Followers = action.data;
        break;

      case LOAD_FOLLOWERS_FAIRLURE:
        draft.followLoading = false;
        draft.followError = action.error;
        break;

      // loadfollowings
      case LOAD_FOLLOWINGS_REQUEST:
        draft.followLoading = true;
        draft.followError = null;
        draft.followDone = false;
        break;

      case LOAD_FOLLOWINGS_SUCCESS:
        draft.followLoading = false;
        draft.followDone = true;
        draft.me.Followings = action.data;
        break;

      case LOAD_FOLLOWINGS_FAIRLURE:
        draft.followLoading = false;
        draft.followError = action.error;
        break;

      // follow
      case FOLLOW_REQUEST:
        draft.followLoading = true;
        draft.followError = null;
        draft.followDone = false;
        break;

      case FOLLOW_SUCCESS:
        draft.followLoading = false;
        draft.followDone = true;
        draft.me.Followings.push({ id: action.data.UserId });
        break;

      case FOLLOW_FAIRLURE:
        draft.followLoading = false;
        draft.followError = action.error;
        break;

      // unfollow
      case UNFOLLOW_REQUEST:
        draft.unfollowLoading = true;
        draft.unfollowError = null;
        draft.unfollowDone = false;
        break;

      case UNFOLLOW_SUCCESS:
        draft.unfollowLoading = false;
        draft.unfollowDone = true;
        draft.me.Followings = draft.me.Followings.filter((v) => v.id !== action.data.UserId);
        break;

      case UNFOLLOW_FAIRLURE:
        draft.unfollowLoading = false;
        draft.unfollowError = action.error;
        break;

      // loaduser
      case LOAD_MY_INFO_REQUEST:
        draft.loadUserLoading = true;
        draft.loadUserError = null;
        draft.loadUserDone = false;
        break;

      case LOAD_MY_INFO_SUCCESS:
        draft.loadUserLoading = false;
        draft.me = action.data;
        draft.loadUserDone = true;
        break;

      case LOAD_MY_INFO_FAILURE:
        draft.loadUserLoading = false;
        draft.loadUserError = action.error;
        break;

      // login
      case LOG_IN_REQUEST:
        draft.logInLoading = true;
        draft.logInError = null;
        draft.logInDone = false;
        break;

      case LOG_IN_SUCCESS:
        draft.logInLoading = false;
        draft.logInDone = true;
        draft.me = action.data;
        break;

      case LOG_IN_FAILURE:
        draft.logInLoading = false;
        draft.logInError = action.error;
        break;

      // logout
      case LOG_OUT_REQUEST:
        draft.logOutDone = false;
        draft.logOutLoading = true;
        draft.logOutError = null;
        break;

      case LOG_OUT_SUCCESS:
        draft.logOutLoading = false;
        draft.logOutDone = true;
        draft.me = false;
        break;

      case LOG_OUT_FAIRLURE:
        draft.logOutLoading = false;
        draft.logOutError = action.error;
        break;

      // signup
      case SIGN_UP_REQUEST:
        draft.signupLoading = true;
        draft.signupDone = false;
        draft.signupError = null;
        break;

      case SIGN_UP_SUCCESS:
        draft.signupLoading = false;
        draft.signupDone = true;
        break;

      case SIGN_UP_FAIRLURE:
        draft.signupLoading = false;
        draft.signupError = action.error;
        break;

      // nickname
      case CHANGE_NICKNAME_REQUEST:
        draft.changeNicknameLoadding = true;
        draft.changeNicknameDone = false;
        draft.changeNicknameError = null;
        break;

      case CHANGE_NICKNAME_SUCCESS:
        draft.me.nickname = action.data.nickname;
        draft.changeNicknameLoadding = false;
        draft.changeNicknameDone = true;
        break;

      case CHANGE_NICKNAME_FAIRLURE:
        draft.changeNicknameLoadding = false;
        draft.changeNicknameError = action.error;
        break;

      case ADD_POST_TO_ME:
        draft.me.Posts.unshift({ id: action.data });
        break;

      case REMOVE_POST_OF_ME:
        draft.me.Posts = draft.me.Posts.filter((v) => v.id !== action.data);

      default:
        break;
    }
  });
};

export default reducer;
