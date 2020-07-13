import React, { useState } from 'react';
import { connect } from 'react-redux';
import Link from 'next/link';

// Containers
import { SocialButtons } from '../SocialButtons';

// Components
import { Flex, Button, Checkbox, Message } from '~/ui';
import { LabeledInput } from '../../components/LabeledInput';

// Styles
import s from './style.sass';

// Redux
const getDataFromStore = ({ users: { userData }, themes: { mt }, languages: { t } }) => ({
  userData,
  mt,
  t,
});
const getMethodsFromStore = ({ users: { submitDataToServer } }) => ({
  submitDataToServer,
  // sendUserForgotPassword,
});

// Container
export default connect(
  getDataFromStore,
  getMethodsFromStore
)(
  // Props
  ({
    userData = {},
    mt = () => {},
    t = () => {},
    submitDataToServer = () => {},
    // sendUserForgotPassword = () => {},
    title = 'Login',
  }) => {
    const [signInData, setSignInData] = useState({});

    const updateField = fieldName => e => {
      setSignInData({
        ...signInData,
        [fieldName]: e.target
          ? e.target.type === 'checkbox'
            ? e.target.checked
            : e.target.value
          : e,
      });
    };

    return (
      <Flex direction="column" className={s.SignInForm}>
        {/* START Form */}
        <h4 style={{ color: mt('colors.main') }}>{t('users.sign_in.form.header')}</h4>
        <div>{t('users.sign_in.form.explanation')}</div>
        <Flex direction="column" className={s.Fields}>
          {/* Email */}
          <LabeledInput
            label={t('users.sign_in.form.email.label')}
            type="email"
            name="email"
            id="emailAdress"
            placeholder={t('users.sign_in.form.email.placeholder')}
            value={signInData.email}
            onChange={updateField('email')}
            color={mt('colors.main')}
            background={mt('backgrounds.input')}
          />
          {/* Password */}
          <LabeledInput
            label={t('users.sign_in.form.password.label')}
            type="password"
            name="password"
            id="password"
            placeholder={t('users.sign_in.form.password.placeholder')}
            value={signInData.password}
            onChange={updateField('password')}
            color={mt('colors.main')}
            background={mt('backgrounds.input')}
            desc={
              <Flex justify="flex-start">
                <Checkbox
                  id="rememberPassword"
                  inline
                  value={signInData.isRememberPassword}
                  onChange={updateField('isRememberPassword')}
                />
                &nbsp; &nbsp;
                <label for="rememberPassword">
                  {t('users.sign_in.form.password.remember')}
                </label>
              </Flex>
            }
          />
          {/* Submit to server */}
          <Button
            color={'#fff'}
            onClick={() => submitDataToServer({ ...signInData })}
            block>
            {t('users.sign_in.form.login')}
          </Button>
          {t('users.sign_in.form.separator')}
          <SocialButtons />
        </Flex>
        {/* END Form */}
        {/* START Bottom Links */}
        <Flex justify="space-between" className={s.Fields}>
          <Link href="/forgot">{t('users.sign_in.form.link_forgot_password')}</Link>
          <Link href="/signup">{t('users.sign_in.form.link_sign_up')}</Link>
        </Flex>
        {/* END Bottom Links */}
      </Flex>
    );
  }
);
