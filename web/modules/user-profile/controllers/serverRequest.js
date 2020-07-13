import { setProfileData, getProfileData } from '../services/localStorage';
import request from '../services/request';

export default {
  getAllCourses: async token => {
    const response = await request.users.get('profile', true, token);

    if (response.error) throw new Error(response.message);

    // return response;
    return [];
  },
  editProfileInfo: async payload => {
    const response = await request.users.put('profile/edit', true, payload);
    // const response = setProfileData(payload);
    // console.log(payload);
    if (response.error) throw new Error(response.message);

    return response;
  },
  getProfileInfo: async token => {
    // const response = await request.profile.get('get', false, token);
    // const response = getProfileData();
    const response = await request.users.get('profile', true, token);
    // console.log(response);
    if (response.error) throw new Error(response.message);

    return response;
  },
};
