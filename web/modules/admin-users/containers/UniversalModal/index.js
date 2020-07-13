import React, { useState } from 'react';
import { ExclamationCircleOutlined } from '@ant-design/icons';
// import Link from 'next/link';
// Components
import { Modal } from '~/ui';

export const UniversalModal = ({
  ModalBody,
  style = {},
  title = '',
  visible = false,
  maskClosable = true,
  typeModal = 'create', // edit, delete, info, warning
  onSubmit = () => new Promise(res => setTimeout(() => res(), 1000)),
  onCancel = () => Promise.resolve(),
  setModalClose = () => {},
  serverRequest = () => {},
  setModalData = () => {},
  modalData = {},
  ...props
}) => {
  const [fields, setFields] = useState({});
  const [loadOnSubmit, setLoadOnSubmit] = useState(false);
  const changeFields = key => e => {
    setFields({ ...fields, [key]: e.target ? e.target.value : e });
  };

  const handleCloseModal = () => {
    setLoadOnSubmit(false);
    setModalClose();
  };

  return (
    <Modal
      width="80%"
      title={title || ''}
      style={style}
      visible={visible}
      maskClosable={maskClosable}
      icon={typeModal === 'create' ? <ExclamationCircleOutlined /> : <div />}
      cancelText="Закрыть"
      okText={'Сохранить'}
      cancelButtonProps={{
        style: { borderRadius: '5px', height: '40px' },
      }}
      okButtonProps={{
        loading: loadOnSubmit,
        style: {
          background: '#922c88',
          border: '#922c88',
          borderRadius: '5px',
          height: '40px',
        },
      }}
      onOk={async () => {
        setLoadOnSubmit(true);
        try {
          await onSubmit(fields);
          await serverRequest(modalData);
          setModalData({});
          handleCloseModal();
        } catch (err) {
          handleCloseModal();
        }
      }}
      onCancel={() => {
        setModalData({});
        onCancel(fields);
        setModalClose();
      }}>
      {ModalBody ? (
        <ModalBody fields={fields} setFields={setFields} changeFields={changeFields} />
      ) : (
        props.children
      )}
    </Modal>
  );
};
