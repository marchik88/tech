import Router from 'next/router';
import profileController from '../controllers';

import enCourses from './enCourses.json';
import ruCourses from './ruCourses.json';

export default {
  state: {
    courses: { enCourses: enCourses.courses, ruCourses: ruCourses.courses },
    profileInfo: {},
    avatar: '',
  },
  reducers: {
    setCourses: (state, payload) => ({
      ...state,
      courses: payload,
    }),
    setProfileInfo: (state, payload) => ({
      ...state,
      profileInfo: payload,
    }),
    setAvatar: (state, payload) => ({
      ...state,
      avatar: payload,
    }),
  },
  effects: dispatch => ({
    async getAllCourses(payload, rootState) {
      try {
        const result = await profileController.getAllCourses(rootState.users.token || '');

        // dispatch.userProfile.setCourses(result);
      } catch (error) {
        console.log(error.message);
      }
    },
    async editProfileInfo(payload, rootState) {
      let avatar =
        rootState.userProfile.avatar || rootState.userProfile.profileInfo.avatar || '';
      const _payload = { ...payload, avatar: avatar };
      try {
        const result = await profileController.editProfileInfo(_payload);

        // dispatch.userProfile.setProfileInfo(_payload);
        dispatch.userProfile.getProfileInfo();
      } catch (error) {
        console.log(error.message);
      }
    },
    async getProfileInfo(payload, rootState) {
      try {
        const result = await profileController.getProfileInfo(
          rootState.users.token || ''
        );

        dispatch.userProfile.setProfileInfo(result);
      } catch (error) {
        console.log(error.message);
      }
    },
  }),
};
