import React, { useMemo, useCallback } from 'react';
import { Form, Input } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import useInput from '../hooks/useInput';
import { CHANGE_NICKNAME_REQUEST } from '../reducers/user';

const NicknameEditForm = () => {
  const { me } = useSelector((state) => state.user);
  const [nickname, onChangeNickname] = useInput(me?.nickname || '');
  const dispatch = useDispatch();

  // inline style로 넣을 경우 함수 컴포넌트 특성상 style 객체를 렌더링 할때마다 새로운 객체로 인식하기 때문에
  // useMemo를 통해 캐싱하거나 styled-components 또는 css 파일을 import하여 사용한다.
  const style = useMemo(() => ({ marginBttom: '20px', border: '1px solid #d9d9d9', padding: '20px' }), []);

  const onSubmit = useCallback(() => {
    dispatch({
      type: CHANGE_NICKNAME_REQUEST,
      data: nickname,
    });
  }, [nickname]);

  return (
    <Form stlye={style}>
      <Input.Search
        value={nickname}
        onChange={onChangeNickname}
        onSearch={onSubmit}
        addonBefore="닉네임"
        enterButton="수정"
      />
    </Form>
  );
};

export default NicknameEditForm;
