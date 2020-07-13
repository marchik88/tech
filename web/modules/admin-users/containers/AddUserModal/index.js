import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { components as _components } from './AddUserModalComponents';

// Components
import { Input, Select } from '~/ui';

// Style
import s from './style.sass';

const ComponentsList = {
  input: Input,
  select: Select,
};

/**
 * Component
 */
export const AddUserModalBody = connect(
  ({ adminUsers: { modalData, currentRecord } }) => ({ modalData, currentRecord }),
  ({ adminUsers: { setModalData } }) => ({ setModalData })
)(({ modalData = {}, setModalData = () => {}, currentRecord = {} }) => {
  const [localData, setLocalData] = useState({});

  const handleFields = key => e => {
    setLocalData({ ...localData, [key]: e.target ? e.target.value : e });
  };

  const components = _components({ handleFields });
  const selectData = {
    // clients: modelData.clients || [],
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
