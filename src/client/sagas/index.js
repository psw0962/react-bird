import { all, fork, call, put, take, takeEvery, throttle, delay, debounce } from 'redux-saga/effects';
import userSaga from './user';
import postSaga from './post';
import axios from 'axios';
import { serverUrl } from '../config/config';

axios.defaults.baseURL = serverUrl;
axios.defaults.withCredentials = true; // 다른 도메인 간에 쿠키전달 할 수 있게

// redux middleware : 리덕스에 필요한 기능을 끼워 넣는다.(기능향상)
// redux thunk : 비동기 액션을 만들 수 있다. 지연의 의미를 가진다. dispatch를 묶어서 여러번 호출할 수 있고 한 번에 할 수 있다.

// redux saga : thunk는 단순히 dispatch를 여러번 호출하고 비동기적으로 실행할 수 있다면,
// saga는 여러가지의 기능을 사용할 수 있다.

// call은 동기, await과 같은 효과
// fork은 비동기

// takeLatest 두 번 연속클릭 시 가장 마지막 입력만 받는다.
// 2번에 대한 '요청'을 취소하는 것이 아니라 '응답'을 취소하는 것 이다.(응답은 한 번만 오는 것  처럼 보이지만 db에는 요청데이터 2번 모두 저장됨)
// throttle은 takeLatest에서 해당 기능을 요청할 수 있는 시간을 정할 수 있다.

// thrittle : 마지막 함수가 호출된 후 일정 시간이 지나기 전에 다시 호출되지 않도록 한다.
// debounce : 연이어 호출되는 함수들 중 마지막 함수 또는 제일 처음 함수만 호출 되도록 한다.

export default function* rootSaga() {
  yield all([fork(userSaga), fork(postSaga)]);
}
