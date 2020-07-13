import Router from 'next/router';
import userController from '../controllers';

import { Message } from '~/ui';
import { checkEmail } from '~/utils';

const errorMessage = str => {
  Message.error(str);
};

export default {
  state: {
    userData: {},
    users: [],
    token: null,
    error: null,
    notify: null,
    modal: null,
  },
  reducers: {
    // Error handler
    setError: (state, payload) => ({ ...state, error: payload }),
    clearError: state => ({ ...state, error: null }),
    // When user get token - pass it to store
    setUserToken: (state, payload) => ({
      ...state,
      token: payload.token,
    }),
    // email, avatar, role, about
    setUserData: (state, payload = {}) => ({
      ...state,
      userData: { ...state.userData, ...payload },
    }),
    setUsers: (state, payload = []) => ({
      ...state,
      users: payload,
    }),
  },
  effects: dispatch => ({
    async submitDataToServer(data, rootState, signUp) {
      try {
        if (!data.email) {
          errorMessage(rootState.languages.t('users.sign_up.messages.no_email'));
        } else if (!checkEmail(data.email)) {
          errorMessage(rootState.languages.t('users.sign_up.messages.inc_email'));
        } else if (!data.password) {
          errorMessage(rootState.languages.t('users.sign_up.messages.no_password'));
        } else if (signUp && !data.passwordCheck) {
          errorMessage(rootState.languages.t('users.sign_up.messages.no_re_password'));
        } else if (signUp && data.password !== data.passwordCheck) {
          errorMessage(
            rootState.languages.t('users.sign_up.messages.dont_match_password')
          );
        } else if (signUp && !data.isAgree) {
          errorMessage(rootState.languages.t('users.sign_up.messages.disagree_terms'));
        } else dispatch.users[signUp ? 'sendUserSignUp' : 'sendUserSignIn']({ ...data });
      } catch {
        errorMessage(rootState.languages.t('users.sign_up.messages.error'));
      }
    },
    async getAllUsers({ email, password }, rootState) {
      try {
        const result = await userController.getAllUsers({ email, password });

        dispatch.users.setUsers(result);
        dispatch.users.clearError();
      } catch (error) {
        errorMessage(error.message);
      }
    },
    async getUserProfile(data, rootState) {
      try {
        const result = await userController.getUserProfile();

        dispatch.users.setUserData(result);
        dispatch.users.clearError();
      } catch (error) {
        errorMessage(error.message);
      }
    },
    async sendUserSignIn({ email, password, enterType }, rootState) {
      try {
        const result = await userController.sendSignInRequest({
          email,
          password,
        });

        // const isAdminRole = result.user.role === 'administrator';
        // const isManagerRole = result.user.role === 'admin';

        dispatch.users.setUserToken(result.token);
        dispatch.users.setUserData(result.user);
        dispatch.users.clearError();

        if (result.token) {
          Router.push('/profile');
        }
      } catch (error) {
        errorMessage(error.message);
      }
    },
    async sendUserSignUp(
      { email, password, firstName, lastName, passwordCheck },
      rootState
    ) {
      try {
        const result = await userController.sendSignUpRequest({
          email,
          password,
          firstName,
          lastName,
        });

        dispatch.users.setUserToken(result.token);
        dispatch.users.setUserData(result.user);
        dispatch.users.clearError();

        if (result.token) Router.push('/profile');
      } catch (error) {
        errorMessage(error.message);
      }
    },
    async sendUserForgotPassword({ email }, rootState) {
      try {
        if (!email) throw new Error('Enter a mail address');

        await userController.sendForgotPasswordRequest({ email });

        dispatch.users.clearError();
      } catch (error) {
        errorMessage(error.message);
      }
    },
    async sendUserLogOut(userStatus) {
      try {
        await userController.sendLogOutRequest({ userStatus });

        dispatch.users.clearError();
      } catch (error) {
        errorMessage(error.message);
      }
    },
  }),
};
