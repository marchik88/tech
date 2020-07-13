import request from '../services/request';

/**
 * Controller for async effects
 */
export default {
  /**
   * Users all
   */
  getAllUsers: async () => {
    const response = await request.users.get('all');
    if (response.error) throw new Error(response.message);

    return response;
  },
  addUserToServer: async payload => {
    const response = await request.auth.post('register', false, payload);

    if (response.error) throw new Error(response.message);

    return response;
  },
  editUserToServer: async payload => {
    const response = await request.users.put(`edit/${payload._id}`, true, payload);

    if (response.error) throw new Error(response.message);

    return response;
  },
  removeUserFromServer: async id => {
    const response = await request.users.delete(`remove/${id}`, true, id);

    if (response.error) throw new Error(response.message);

    return response;
  },
};
