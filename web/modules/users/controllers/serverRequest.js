import { userToken, userData } from '../services/localStorage';
import request from '../services/request';

export default {
  getUserProfile: async () => {
    const response = await request.users.get('profile', true);

    if (response.error) throw new Error(response.message);
    userData.set = response;

    return response;
  },
  getAllUsers: async ({ email, password }) => {
    const response = await request.users.get('all', false, { email, password });

    if (response.error) throw new Error(response.message);

    return response;
  },
  sendSignInRequest: async ({ email, password }) => {
    const response = await request.auth.post('login', false, {
      email,
      password,
      // enterType,
    });

    if (response.error) throw new Error(response.message);
    if (!response.token) throw new Error('Server problem. Response not have token.');

    userToken.set = response.token;
    userData.set = response.user;

    return response;
  },
  sendSignUpRequest: async ({ email, password, firstName, lastName }) => {
    const response = await request.auth.post('register', false, {
      email,
      password,
      firstName,
      lastName,
    });

    if (response.error) throw new Error(response.message);
    if (!response.user || (response.user && !response.user.email))
      throw new Error('Server problem. Response not have user data.');

    userToken.set = response.token;
    userData.set = response.user;

    return response;
  },
  sendForgotPasswordRequest: async ({ email }) => {
    const response = await request.auth.post('restore/by/email', false, { email });

    if (response.error) throw new Error(response.error.message);
    if (!response.token) throw new Error('Server problem. Response not have token.');
    // userToken.set = response.token; ? emailtoken

    return response;
  },
  sendLogOutRequest: async () => {
    const response = await request.auth.post('logout', true);
    const responseStart = await request.users.put('today/start/break', true);
    const responseStop = await request.users.put('today/stop/break', true);

    if (response.error) throw new Error(response.error.message);
    if (!response.success) throw new Error('Server problem. Response not success.');
    // userToken.clear();
    // userData.clear();

    return response;
  },
};
