import React, {useEffect} from 'react';
import {connect} from 'react-redux';
// import Link from 'next/link';

// Containers
import Actions from './Actions';

// Components
import {Table} from '~/ui';
import _columns from './columns';

// Styles
import s from './style.sass';

const columns = _columns({Actions});

// Redux
const getDataFromStore = ({languages: {t}, themes: {theme, mt}, adminUsers: {users}}) => ({
  users,
  t,
  theme,
  mt,
});
const getMethodsFromStore = ({adminUsers: {getAllUsers}}) => ({
  getAllUsers,
});

/**
 * Component
 */
export const UsersTable = connect(
    getDataFromStore,
    getMethodsFromStore,
)(
    ({
      users = [],
      t = () => {},
      mt = () => {},
      theme = '',
      getAllUsers = () => {},
    }) => {

      const columnsLang = t('admin-users.usersTable.columns'),
          columnsWithTitle = columns.map((c) => {
            let {dataIndex} = c;
            return {...c, title: (columnsLang[dataIndex] || '')};
          }),
          isDarkTheme = theme === 'dark';

      useEffect(() => {
        getAllUsers({});
      }, []);

      return (
          <Table
              bordered
              dataSource={users.map((u, k) => ({...u, key: k}))}
              columns={columnsWithTitle}
              className={(isDarkTheme) ? s.darkTable : ''}
          />
      );
    },
);
