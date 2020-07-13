export const components = ({ handleFields = () => {} }) => [
  {
    type: 'input',
    value: 'firstName',
    behaviours: { onChange: handleFields('firstName') },
    defaultValue: 'firstName',
    placeholder: 'First Name',
  },
  {
    type: 'input',
    value: 'lastName',
    behaviours: { onChange: handleFields('lastName') },
    defaultValue: 'lastName',
    placeholder: 'Last Name',
  },
  {
    type: 'input',
    value: 'email',
    behaviours: { onChange: handleFields('email') },
    defaultValue: 'email',
    placeholder: 'Email',
  },
  {
    type: 'input',
    value: 'password',
    behaviours: { onChange: handleFields('password') },
    defaultValue: 'password',
    placeholder: 'Password',
  },
  {
    type: 'input',
    value: 'checkPassword',
    behaviours: { onChange: handleFields('checkPassword') },
    defaultValue: 'checkPassword',
    placeholder: 'Check Password',
  },
  // {
  //   type: 'select',
  //   value: 'users',
  //   behaviours: { onChange: handleFields('users') },
  //   defaultValue: 'users',
  //   placeholder: 'Users',
  //   isHasItems: true,
  //   listName: 'clients',
  // },
];
