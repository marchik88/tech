import exampleController from '../controllers';
import { Notification } from '~common/ui';

export default {
  state: {
    exampleState: {},
  },
  reducers: {
    exampleFunction(state, payload) {
      return {
        ...state,
        exampleState: payload,
      };
    },
  },

  effects: dispatch => ({
    async getExampleFromServer(payload = {}) {
      try {
        const result = await exampleController.getExampleFromServer(payload);

        dispatch.example.exampleFunction(result);
      } catch (error) {
        Notification.error({
          placement: 'bottomRight',
          message: error.message,
          description: error.message,
        });
      }
    },

    async addExampleToServer(payload = {}, rootState) {
      try {
        const result = await exampleController.addOrderToServer(
          payload,
          rootState.example.exampleState
        );
        dispatch.example.exampleFunction(payload);
      } catch (error) {
        Notification.error({
          placement: 'bottomRight',
          message: error.message,
          description: 'Заказ не создан',
        });
      }
    },
  }),
};
