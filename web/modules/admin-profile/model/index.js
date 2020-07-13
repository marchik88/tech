export default {
  state: {
    systemData: {},
    sideMenuToggle: false,
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
    setTableChange(data) {
      return {
        tableChange: data,
      };
    },
    setSideMenuToggle(state) {
      return {
        sideMenuToggle: !state.sideMenuToggle,
      };
    },
  },
  effects: dispatch => ({
    async someSystemExampleFunction(payload, rootState) {
      await new Promise(resolve => setTimeout(resolve, 1000));

      dispatch._app.setSystemData(payload);
    },
    saveTableChange: async data => {
      dispatch.managerProfile.setTableChange(data);
    },
  }),
};
