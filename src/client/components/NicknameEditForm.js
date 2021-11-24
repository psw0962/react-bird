import React, { useMemo } from 'react';
import { Form, Input } from 'antd';

const NicknameEditForm = () => {
  // inline style로 넣을 경우 함수 컴포넌트 특성상 style 객체를 렌더링 할때마다 새로운 객체로 인식하기 때문에
  // useMemo를 통해 캐싱하거나 styled-components 또는 css 파일을 import하여 사용한다.
  const style = useMemo(() => ({ marginBttom: '20px', border: '1px solid #d9d9d9', padding: '20px' }), []);

  return (
    <Form stlye={style}>
      <Input.Search addonBefore="닉네임" enterButton="수정" />
    </Form>
  );
};

export default NicknameEditForm;
