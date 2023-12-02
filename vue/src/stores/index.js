import { createStore } from "vuex";
import axiosClient from "../axios.js";

const permissions = [
    { id: 0, permission: 'Super Staff', data: [{id: 0 ,menu: []}] },
    { id: 1, permission: 'Can view appointments', data: [{id: 200 ,menu: [300]}] },
    { id: 2, permission: 'Can manage appointments', data: [{id: 200 ,menu: [330]}] },
    { id: 3, permission: 'Can view schedules', data: [{id: 200 ,menu: [400]}] },
    { id: 4, permission: 'Can manage schedules', data: [{id: 200 ,menu: [440]}] },
    { id: 5, permission: 'Can view appointment history', data: [{id: 200 ,menu: [500]}] },
    { id: 6, permission: 'Can manage appointment history', data: [{id: 200 ,menu: [550]}] },
  ];

const store = createStore({
  state: {
    refresh: true,
    sidebar: {},
    user: {
      data: [],
      role: sessionStorage.getItem("ROLE"),
      token: sessionStorage.getItem("TOKEN"),
    },
    roleList: [],
    selectedRole: [],
    userList: [],
    addUserRole: '',
    selectedUser: [],
    clients: {},
    history: {},
    serviceList: [],
    selectedService: [],
    serviceTypes: ["text", "select", "radio", "checkbox", "textarea"],
    bookList: [],
    selectedBook: [],
    staffBookList: [],
    staffScheduleList: [],
    permissionList: permissions,

    dashboard: {
      loading: false,
      data: {}
    },
    notification: {
      show: false,
      type: '',
      title: '',
      message: ''
    },
    timeList: [],
  },
  actions: {
    downloadReport({} ) {
      response = axiosClient
        .put(`/export-reports`)
        .then((res) => {
            return res;
        });
    },
    register({commit}, user) {
      return axiosClient.post('/register', user)
        .then(({data}) => {
          commit('setUser', data.user);
          commit('setToken', data.token);
          return data;
        })
    },
    login({commit}, user) {
      return axiosClient.post('/login', user)
        .then(({data}) => {
          commit('setUser', data.user[0]);
          commit('setToken', data.token);
          return data;
        })
    },
    logout({commit}) {
      return axiosClient.post('/logout')
        .then(response => {
          commit('logout');
          return response;
        })
    },
    // role
    getRoleList({commit}) {
      return axiosClient.get('/role').then((res) => {
        commit("setRoleList", res.data);
      });
    },
    saveRole({ commit }, role) {
      return axiosClient
      .post("/role", role).then((res) => {
      commit('setRoleList', res.data)
        return res;
      });
    },
    updateRole({ commit }, role) {
      return axiosClient
      .put(`/role/${role.services[0].id}`, role)
      .then((res) => {
        commit('setRoleList', res.data)
        return res;
      });
    },
    editRole({ commit }, id) {
      return axiosClient
        .get(`/role/${id}`)
        .then((res) => {
          commit("setSelectedRole", res.data);
          return res;
        })
        .catch((err) => {
          throw err;
        });
    },
    // user
    getUser({commit}) {
      return axiosClient.get('/auth-user')
      .then(res => {
        commit('setUser', res.data);
      });
    },
    getUserList({commit}) {
      return axiosClient.get('/user').then((res) => {
        commit("setUserList", res.data);
      });
    },
    saveUser({commit}, user) {
      let response;
      if(user.id){
        response = axiosClient
          .put(`/user/${user.id}`, user)
          .then((res) => {
            commit("setUserList", res.data);
              return res;
          });
      } else {
        response = axiosClient.post("/user", user).then((res) => {
          commit("setUserList", res.data);
          return res;
        });
      }
      return response;
    },
    editUser({ commit }, id) {
      return axiosClient
        .get(`/user/${id}`)
        .then((res) => {
          commit("setSelectedUser", res.data);
          return res;
        })
        .catch((err) => {
          throw err;
        });
    },
    lockUser({}, user) {
      return axiosClient
        .put(`/lock/${user.id}`, user)
        .catch((err) => {
          throw err;
        });
    },
    saveProfile({}, profile) {
      return axiosClient
          .put(`/profile/${profile.id}`, profile)
          .then((res) => {
            return res;
        })
    },
    changePassword({}, info) {
       return axiosClient
          .put(`/change-password/${info.id}`, info)
          .then((res) => {
            return res;
        })
    },
    sendNotification({}) {
       return axiosClient
          .post(`/send-sms`)
          .then((res) => {
            return res;
        })
    },
    //services
    getServiceList({commit}) {
      return axiosClient.get('/service').then((res) => {
        commit("setServiceList", res.data);
      });
    },
    saveService({ commit }, service) {
      return axiosClient
      .post("/service", service).then((res) => {
      commit('setServiceList', res.data)
        return res;
      });
    },
    updateService({ commit }, service) {
      return axiosClient
      .put(`/service/${service.services[0].id}`, service)
      .then((res) => {
        commit('setServiceList', res.data)
        return res;
      });
    },
    editService({ commit }, id) {
      return axiosClient
        .get(`/service/${id}`)
        .then((res) => {
          commit("setSelectedService", res.data);
          return res;
        })
        .catch((err) => {
          throw err;
        });
    },
    getBookList({commit}) {
      return axiosClient.get('/book').then((res) => {
        commit("setBookList", res.data);
      });
    },
    // Work Hours
    getTimeList({commit}) {
      return axiosClient.get('/time').then((res) => {
        commit("setTimeList", res.data);
      });
    },
    saveBook({commit}, book) {
      let response;
      if(book.id){
        response = axiosClient
          .put(`/book/${book.id}`, book)
          .then((res) => {
            commit("setBookList", res.data);
              return res;
          });
      } else {
        response = axiosClient.post("/book", book).then((res) => {
          commit("setBookList", res.data);
          return res;
        });
      }
      return response;
    },
    // staff
    getStaffAppointmentList({commit}) {
      return axiosClient.get('/book').then((res) => {
        commit("setStaffBookList", res.data);
      });
    },
    getStaffSchedList({commit}) {
      return axiosClient.get('/schedule').then((res) => {
        commit("setStaffSchedule", res.data);
      });
    },
    updateAppointmentStatus({ commit }, appointment) {
      return axiosClient
        .put(`/book-status/${appointment.id}`, appointment)
        .then((res) => {
          commit('setStaffBookList', res.data)
          commit('setStaffSchedule', res.data)
          return res;
        });
    },
     updateSchedule({ commit }, schedule) {
      return axiosClient
      .put(`/schedule-status/${schedule.id}`, schedule)
      .then((res) => {
        commit('setStaffSchedule', res.data)
        commit('setStaffBookList', res.data)
        return res;
      });
    },
    getStaffDashboard({commit}) {
      commit('dashboardLoading', true)
      return axiosClient.get('/staff-dashboard').then((res) => {
        commit('dashboardLoading', false)
        commit("setDashboard", res.data);
      })
      .catch(error => {
        commit('dashboardLoading', false)
        return error;
      });
    },

    
  },
  mutations: {
    stopRefresh: (state) => {
      state.refresh = false;
    },
    logout: (state) => {
      state.user.token = null;
      state.user.data = {};
      sessionStorage.removeItem("TOKEN");
    },
    // role
    setRoleList: (state, roles) => {
      state.roleList = roles.data;
    },
    setRole: (state, role) => {
      state.user.role = role;
    },
    setSelectedRole: (state, role) => {
      state.selectedRole = role.current;
    },
    // user
    setAddUserRole: (state, role) => {
      state.addUserRole = role;
    },
    setUser: (state, user) => {
      state.user.data = user;
      sessionStorage.setItem('ROLE', user.role.toLowerCase());
      state.user.data.full_name = `${user.first_name} ${user.last_name}`;
    },
    setToken: (state, token) => {
      state.user.token = token;
      sessionStorage.setItem('TOKEN', token);
    },
    setUserList: (state, users) => {
      state.userList = users.data;
    },
    setSelectedUser: (state, user) => {
      state.selectedUser = user.current_user[0];
    },
    setServiceList: (state, service) => {
      state.serviceList = service.data;
    },
    setSelectedService: (state, service) => {
      state.selectedService = service.current;
    },
    setBookList: (state, book) => {
      state.bookList = book.data;
    },
    // time
    setTimeList: (state, time) => {
      state.timeList = time.data;
    },
    // staff Appointment List
    setStaffBookList: (state, book) => {
      state.staffBookList = book.data;
    },
    setStaffSchedule: (state, schedule) => {
      state.staffScheduleList = schedule.sched_data;
    },
    dashboardLoading: (state, loading) => {
      state.dashboard.loading = loading;
    },
    setDashboard(state, data) {
      state.dashboard.data = data;
    },
    notify: (state, {show, message, type, title}) => {
      state.notification.show = show;
      state.notification.message = message;
      state.notification.type = type;
      state.notification.title = title;
      setTimeout(() => {
        state.notification.show = false;
      }, 3000)
    },
    alert: (state, {show, message, type, title}) => {
      state.notification.show = show;
      state.notification.message = message;
      state.notification.type = type;
      state.notification.title = title;
    },
    
  },
  getters: {},
  modules: {},

});

export default store;
