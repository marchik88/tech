import React from 'react';
import { UsergroupAddOutlined, IdcardOutlined, ControlOutlined } from '@ant-design/icons';

export default [
  {
    label: 'dashboard',
    Icon: () => <IdcardOutlined />,
    link: '/admin',
    sub: [],
  },
  {
    label: 'users',
    Icon: () => <UsergroupAddOutlined />,
    link: '/admin/users',
    sub: [],
  },
  {
    label: 'settings',
    Icon: () => <ControlOutlined />,
    link: '/admin/settings',
    sub: [],
  },
];
