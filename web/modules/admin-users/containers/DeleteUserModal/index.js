import React, { useState, useEffect } from 'react';
import { components as _components } from './DeleteUserModalBodyComponents';

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
export const DeleteUserModal = ({ modelData = {} }) => {
  const [localData, setLocalData] = useState({});

  const handleFields = key => e => {
    setLocalData({ ...localData, [key]: e.target ? e.target.value : e });
  };

  const components = _components({ handleFields });
  const selectData = {
    // clients: modelData.clients || [],
  };

  return (
    <div className={s.Modal}>Are you sure to delete this user? It cannot be undone!</div>
  );
};
