import controller from '../controllers';

export default {
  state: {
    settings: {},
  },
  reducers: {
    setSettings(state, payload) {
      return {
        ...state,
        settings: {
          ...state.settings,
          ...payload,
        },
      };
    },
  },
  effects: dispatch => ({
    async getAllSettings(payload, rootState) {
      try {
        const response = await controller.getAllSettings();

        response.forEach(st => {
          if (st.type === 'language') {
            dispatch.languages.editLanguageSchema({ type: st.mode, text: st.text });
          }

          if (st.type === 'theme') {
            dispatch.themes.editThemeSchema({ type: st.mode, text: st.text });
          }
        });
      } catch (error) {
        console.log(error.message);
      }
    },
    async saveSettings(payload, rootState) {
      try {
        const response = await controller.saveSettings(payload);

        console.log(response, 'response');
      } catch (error) {
        console.log(error.message);
      }
    },
  }),
};
