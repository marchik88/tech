import request from '../services/request';
import { Message } from '~/ui';

/**
 * Controller for async effects
 */
export default {
  /**
   * Users all
   */
  getAllSettings: async () => {
    const response = await request.settings.get('all', true);
    if (response.error) throw new Error(response.message);

    return response;
  },
  saveSettings: async payload => {
    try {
      const response = await request.settings.put('edit', true, payload);
      if (response.error) throw new Error(response.message);

      Message.success('Saved');

      return response;
    } catch (error) {
      Message.error(error.message);
    }
  },
};
