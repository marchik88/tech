import React from 'react';
import {connect} from 'react-redux';

// Components
import {Button} from '~/ui';

// Icons
import {
  PlusCircleOutlined,
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons';

// Styles
import s from './style.sass';

// Redux
const getDataFromStore = ({adminUsers: {users}}) => ({
  users,
});
const getMethodsFromStore = ({
  adminUsers: {getAllUsers, setModal, setCurrentRecord},
}) => ({
  getAllUsers,
  setModal,
  setCurrentRecord,
});

export default connect(
    getDataFromStore,
    getMethodsFromStore,
)(
    ({
      record = {},
      setModal = () => {},
      setCurrentRecord = () => {},
    }) => {
      const handleOpenModal = type => () => {
        setModal(type);

        type === 'add' ? setCurrentRecord({}) : setCurrentRecord(record);
      };

      return (
     <span>
      <Button className={s.ActionButtonAdd} onClick={handleOpenModal('add')}>
        <PlusCircleOutlined/>
      </Button>
      <Button className={s.ActionButtonEdit} onClick={handleOpenModal('edit')}>
        <EditOutlined/>
      </Button>
      <Button className={s.ActionButtonDelete}
              onClick={handleOpenModal('delete')}>
        <DeleteOutlined/>
      </Button>
    </span>
      );
    });
