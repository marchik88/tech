import light from './light.json';
import dark from './dark.json';

const deepSearchKey = (obj, keys) => {
  if (keys.length === 1) {
    return obj ? obj[keys[0]] : '#fff';
  } else {
    const newObj = obj ? obj[keys[0]] : {};

    return deepSearchKey(newObj, keys.splice(1));
  }
};

export default {
  state: {
    theme: 'light',
    mt: () => '',
    themes: { dark, light },
    // themes: {},
  },
  reducers: {
    changeTheme: (state, newTheme) => ({
      ...state,
      theme: newTheme,
      mt: key => deepSearchKey(state.themes[newTheme], key.split('.')),
    }),
    editThemeSchema(state, { text, type }) {
      return {
        ...state,
        themes: {
          ...state.themes,
          [type]: typeof text === 'string' ? JSON.parse(text) : text,
        },
      };
    },
  },
  effects: dispatch => ({
    async saveTheme(theme, rootState) {
      const localTheme = rootState.themes.themes[theme];

      dispatch.adminSettings.saveSettings({
        type: 'theme',
        mode: theme,
        text: localTheme,
      });
    },
  }),
};
