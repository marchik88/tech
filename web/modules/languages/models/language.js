import ru from './ru.json';
import en from './en.json';
import { setLanguage, getLanguage } from '../services/localStorage';

const deepSearchKey = (obj, keys) => {
  if (keys.length === 1) {
    return obj ? obj[keys[0]] : '';
  } else {
    const newObj = obj ? obj[keys[0]] : {};

    return deepSearchKey(newObj, keys.splice(1));
  }
};

export default {
  state: {
    lang: 'ru',
    t: () => '',
    languages: { ru, en },
    // languages: {},
  },
  reducers: {
    editLanguage(state, language) {
      return {
        ...state,
        lang: language,
        t: key => deepSearchKey(state.languages[language], key.split('.')),
      };
    },
    editLanguageSchema(state, { text, type }) {
      return {
        ...state,
        languages: {
          ...state.languages,
          [type]: typeof text === 'string' ? JSON.parse(text) : text,
        },
      };
    },
  },
  effects: dispatch => ({
    async changeLanguage(language, rootState, check) {
      if (check) {
        const localLanguage = await getLanguage();
        dispatch.languages.editLanguage(localLanguage ? localLanguage : language);
      } else {
        setLanguage(language);
        dispatch.languages.editLanguage(language);
      }
    },
    async saveLanguage(language, rootState) {
      const localLanguage = rootState.languages.languages[language];

      dispatch.adminSettings.saveSettings({
        type: 'language',
        mode: language,
        text: localLanguage,
      });
    },
  }),
};
