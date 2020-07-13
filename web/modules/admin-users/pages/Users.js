import React from 'react';
// import Link from 'next/link';
import { connect } from 'react-redux';

// Containers
import { UsersTable } from '../containers/UsersTable';
import { UniversalModal } from '../containers/UniversalModal';
import { AddUserModalBody } from '../containers/AddUserModal';
import { EditUserModal } from '../containers/EditUserModal';
import { DeleteUserModal } from '../containers/DeleteUserModal';

// Components
// import { Button, Table } from '~/ui';

// Move to Containers!!
export const Users = connect(
  ({ adminUsers: { modal, currentRecord, modalData } }) => ({
    modal,
    currentRecord,
    modalData,
  }),
  ({
    adminUsers: {
      setModal,
      setModalData,
      addUserToServer,
      editUserToServer,
      removeUserFromServer,
    },
  }) => ({
    setModal,
    setModalData,
    addUserToServer,
    editUserToServer,
    removeUserFromServer,
  })
)(
  ({
    modal = '',
    currentRecord = {},
    modalData = {},
    setModal = () => {},
    setModalData = () => {},
    addUserToServer = () => {},
    editUserToServer = () => {},
    removeUserFromServer = () => {},
  }) => {
    const setModalClose = () => {
      setModal('');
    };

    return (
      <section style={{ width: '95%' }}>
        {/* Add new user modal */}
        {modal === 'add' && (
          <UniversalModal
            title="Add new user"
            onCancel={setModalClose}
            setModalClose={setModalClose}
            visible={true}
            ModalBody={() => <AddUserModalBody modelData={currentRecord} />}
            serverRequest={addUserToServer}
            setModalData={setModalData}
            modalData={modalData}
          />
        )}
        {/* Edit user modal */}
        {modal === 'edit' && (
          <UniversalModal
            title={`Edit user ${currentRecord.firstName} ${currentRecord.lastName}`}
            onCancel={setModalClose}
            setModalClose={setModalClose}
            visible={true}
            currentRecord={currentRecord}
            ModalBody={() => <EditUserModal modelData={currentRecord} />}
            serverRequest={editUserToServer}
            setModalData={setModalData}
            modalData={modalData}
          />
        )}
        {/* Delete user modal */}
        {modal === 'delete' && (
          <UniversalModal
            title={`Delete user ${currentRecord.firstName} ${currentRecord.lastName}`}
            onCancel={setModalClose}
            setModalClose={setModalClose}
            visible={true}
            currentRecord={currentRecord}
            ModalBody={() => <DeleteUserModal modelData={currentRecord} />}
            serverRequest={removeUserFromServer}
            setModalData={setModalData}
            modalData={currentRecord._id}
          />
        )}
        <UsersTable />
      </section>
    );
  }
);
