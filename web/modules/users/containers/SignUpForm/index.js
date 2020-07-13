import React, { useState } from 'react';
import { connect } from 'react-redux';
import Link from 'next/link';

// Containers
import { SocialButtons } from '../SocialButtons';

// Components
import { Flex, Button, Checkbox } from '~/ui';
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
    submitDataToServer = () => {},
    mt = () => {},
    t = () => {},
    // sendUserForgotPassword = () => {},
    title = 'Login',
  }) => {
    const [signUpData, setSignUpData] = useState({});

    const updateField = fieldName => e => {
      setSignUpData({
        ...signUpData,
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
        <h4 style={{ color: mt('colors.main') }}>{t('users.sign_up.form.header')}</h4>
        <div>{t('users.sign_up.form.explanation')}</div>
        <Flex direction="column" className={s.Fields}>
          {/* firstName */}
          <LabeledInput
            label={t('users.sign_up.form.firstName.label')}
            type="name"
            name="firstName"
            id="firstName"
            placeholder={t('users.sign_up.form.firstName.placeholder')}
            value={signUpData.firstName}
            onChange={updateField('firstName')}
            color={mt('colors.main')}
            background={mt('backgrounds.input')}
            desc={
              <span className={s.descriptionLabel}>
                {t('users.sign_up.form.firstName.description')}
              </span>
            }
          />
          {/* lastName */}
          <LabeledInput
            label={t('users.sign_up.form.lastName.label')}
            type="name"
            name="lastName"
            id="lastNameAdress"
            placeholder={t('users.sign_up.form.lastName.placeholder')}
            value={signUpData.lastName}
            onChange={updateField('lastName')}
            color={mt('colors.main')}
            background={mt('backgrounds.input')}
            desc={
              <span className={s.descriptionLabel}>
                {t('users.sign_up.form.lastName.description')}
              </span>
            }
          />
          {/* Email */}
          <LabeledInput
            label={t('users.sign_up.form.email.label')}
            type="email"
            name="email"
            id="emailAdress"
            placeholder={t('users.sign_up.form.email.placeholder')}
            value={signUpData.email}
            onChange={updateField('email')}
            color={mt('colors.main')}
            background={mt('backgrounds.input')}
            desc={
              <span className={s.descriptionLabel}>
                {t('users.sign_up.form.email.description')}
              </span>
            }
          />
          {/* Password */}
          <LabeledInput
            label={t('users.sign_up.form.password.label')}
            type="password"
            name="password"
            id="password"
            placeholder={t('users.sign_up.form.password.placeholder')}
            value={signUpData.password}
            onChange={updateField('password')}
            color={mt('colors.main')}
            background={mt('backgrounds.input')}
          />
          {/* Password */}
          <LabeledInput
            label={t('users.sign_up.form.re-password.lable')}
            type="password"
            name="passwordCheck"
            id="passwordCheck"
            placeholder={t('users.sign_up.form.re-password.placeholder')}
            value={signUpData.passwordCheck}
            onChange={updateField('passwordCheck')}
            color={mt('colors.main')}
            background={mt('backgrounds.input')}
          />
          <Flex justify="flex-start">
            <Checkbox
              id="rememberPassword"
              inline
              value={signUpData.isAgree}
              onChange={updateField('isAgree')}
            />
            &nbsp; &nbsp;
            <label for="rememberPassword">{t('users.sign_up.form.checkbox.lable')}</label>
          </Flex>
          {/* Submit to server */}
          <Button
            color={'#fff'}
            onClick={() => submitDataToServer(signUpData, true)}
            block>
            {t('users.sign_up.form.create_account')}
          </Button>
          {t('users.sign_up.form.separator')}
          <SocialButtons />
        </Flex>
        {/* END Form */}
        {/* START Bottom Links */}
        <Flex justify="space-between" className={s.Links}>
          <Link href="/forgot">{t('users.sign_up.form.link_forgot_password')}</Link>
          <Link href="/signin">{t('users.sign_up.form.link_sign_in')}</Link>
        </Flex>
        {/* END Bottom Links */}
      </Flex>
    );
  }
);
