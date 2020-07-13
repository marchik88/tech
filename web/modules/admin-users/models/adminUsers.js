import { usersController } from '../controllers';

export default {
  state: {
    users: [],
    modal: '',
    currentRecord: {},
    modalData: {},
  },
  reducers: {
    setUsers(state, payload) {
      return {
        ...state,
        users: payload,
      };
    },
    setModalData(state, payload) {
      return {
        ...state,
        modalData: payload,
      };
    },
    addUser(state, newUser) {
      return {
        ...state,
        users: [...state.users, newUser],
      };
    },
    editUser(state, edUser) {
      return {
        ...state,
        users: state.users.map(r => (edUser._id == r._id ? edUser : r)),
      };
    },
    removeUser(state, reUser) {
      return {
        ...state,
        users: state.users.filter(r => reUser._id !== r._id),
      };
    },
    setModal(state, payload) {
      return {
        ...state,
        modal: payload,
      };
    },
    setCurrentRecord(state, payload) {
      return {
        ...state,
        currentRecord: payload,
      };
    },
  },
  effects: dispatch => ({
    async getAllUsers({ email, phone, password }, rootState) {
      try {
        const result = await usersController.getAllUsers({ email, phone, password });

        dispatch.adminUsers.setUsers(result);
      } catch (error) {
        alert(error.message);
      }
    },
    async addUserToServer(payload, rootState) {
      try {
        const result = await usersController.addUserToServer(payload);

        dispatch.adminUsers.addUser(payload);
        dispatch.adminUsers.getAllUsers({});
      } catch (error) {
        alert(error.message);
      }
    },
    async editUserToServer(payload, rootState) {
      const _payload = { ...rootState.adminUsers.currentRecord, ...payload };
      try {
        const result = await usersController.editUserToServer(_payload);

        dispatch.adminUsers.editUser(payload);
        dispatch.adminUsers.getAllUsers({});
      } catch (error) {
        alert(error.message);
      }
    },
    async removeUserFromServer(id = '', rootState) {
      try {
        const result = await usersController.removeUserFromServer(id);
        // dispatch.adminUsers.removeUser(id);
        dispatch.adminUsers.getAllUsers({});
      } catch (error) {
        alert(error.message);
      }
    },
  }),
};
