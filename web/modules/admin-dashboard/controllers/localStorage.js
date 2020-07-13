import request from '../services/request';
import { setThemeMode, getThemeMode, setLanguage, getLanguage } from '../services/localStorage';

export default {
  getExampleFromServer: async (payload = {}) => {
    const response = await request.Example.get(`all?example`, true);

    if (!response.docs)
      throw new Error(`Ошибка взятия с сервера. ${JSON.stringify(response)}`);

    setExample(response.docs || []);

    return response.docs || [];
  },

  addExampleToServer: async (payload = {}) => {
    const response = await request.Example.post('create', true, payload).catch(error => {
      throw new Error(error.message);
    });

    if (response.error || response.message)
      throw new Error(response.error || response.message);

    setExample(payload);

    return response;
  },
};
