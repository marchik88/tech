import React, { useState, useEffect } from 'react';
import { components as _components } from './EditUserModalComponents';
import { connect } from 'react-redux';
// Components
import { Input, Select } from '~/ui';

// Style
import s from './style.sass';

const ComponentsList = {
  input: Input,
  select: Select,
};

// Redux
const getDataFromStore = ({ adminUsers: { modalData, currentRecord } }) => ({
  modalData,
  currentRecord,
});
const getMethodsFromStore = ({ adminUsers: { setModalData } }) => ({ setModalData });

/**
 * Component
 */
export const EditUserModal = connect(
  getDataFromStore,
  getMethodsFromStore
)(({ modalData = {}, setModalData = () => {}, currentRecord = {} }) => {
  const [localData, setLocalData] = useState({});

  const handleFields = key => e => {
    setLocalData({ ...localData, [key]: e.target ? e.target.value : e });
  };
  const components = _components({ handleFields });
  const selectData = {
    // clients: currentRecord.clients || [],
  };

  return (
    <div onBlur={() => setModalData({ ...modalData, ...localData })} className={s.Modal}>
      {components.map(comp => {
        const Field = ComponentsList[comp.type];
        const additionalProps = {};

        if (comp.isHasItems) {
          additionalProps.items = selectData[comp.listName].map((fld, k) => (
            <option key={k}>{fld}</option>
          ));
        }

        return (
          <Field
            className={s.Field}
            {...comp.behaviours}
            placeholder={comp.placeholder}
            value={localData[comp.value]}
            defaultValue={
              modalData[comp.defaultValue] || currentRecord[comp.defaultValue]
            }
            {...additionalProps}
          />
        );
      })}
    </div>
  );
});
