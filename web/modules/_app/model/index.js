export default {
  state: {
    systemData: {},
  },
  reducers: {
    setSystemData(state, payload) {
      return {
        ...state,
        systemData: {
          ...state.systemData,
          ...payload,
        },
      };
    },
  },
  effects: dispatch => ({
    async someSystemExampleFunction(payload, rootState) {
      await new Promise(resolve => setTimeout(resolve, 1000));

      dispatch._app.setSystemData(payload);
    },
  }),
};
