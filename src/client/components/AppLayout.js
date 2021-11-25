import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Menu, Input, Row, Col } from 'antd';
import styled from 'styled-components';
import UserProfile from '../components/UserProfile';
import LoginForm from '../components/LoginForm';
import { useSelector } from 'react-redux';

const SearchInput = styled(Input.Search)`
  vertical-align: middle;
`;

const AppLayout = ({ children }) => {
  const { me } = useSelector((state) => state.user);

  return (
    <div>
      <Menu mode="horizontal">
        <Menu.Item>
          <Link href="/">
            <a>bird</a>
          </Link>
        </Menu.Item>

        <Menu.Item>
          <Link href="/profile">
            <a>프로필</a>
          </Link>
        </Menu.Item>

        <Menu.Item>
          <SearchInput enterButton />
        </Menu.Item>
      </Menu>

      <Row gutter={8}>
        <Col xs={24} md={6}>
          {me ? <UserProfile /> : <LoginForm />}
        </Col>

        <Col xs={24} md={12}>
          {children}
        </Col>
      </Row>
    </div>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
