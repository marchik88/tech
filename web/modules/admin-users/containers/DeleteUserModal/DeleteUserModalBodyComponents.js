export const components = ({ handleFields = () => {} }) => [
  {
    type: 'input',
    value: 'firstName',
    behaviours: { onClick: handleFields('firstName') },
    defaultValue: 'firstName',
    placeholder: 'First Name',
    isHasItems: false,
  },
  {
    type: 'input',
    value: 'lastName',
    behaviours: { onClick: handleFields('lastName') },
    defaultValue: 'lastName',
    placeholder: 'Last Name',
    isHasItems: false,
  },
  {
    type: 'input',
    value: 'email',
    behaviours: { onClick: handleFields('email') },
    defaultValue: 'email',
    placeholder: 'Email',
    isHasItems: false,
  },
  {
    type: 'input',
    value: 'role',
    behaviours: { onClick: handleFields('role') },
    defaultValue: 'role',
    placeholder: 'Access Role',
    isHasItems: false,
  },
  {
    type: 'input',
    value: 'currentCourse',
    behaviours: { onClick: handleFields('currentCourse') },
    defaultValue: 'currentCourse',
    placeholder: 'Current Course',
    isHasItems: false,
  },
  // {
  //   type: 'select',
  //   value: 'users',
  //   behaviours: { onClick: handleFields('users') },
  //   defaultValue: 'users',
  //   placeholder: 'Users',
  //   isHasItems: true,
  //   listName: 'clients',
  // },
];
