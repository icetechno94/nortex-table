import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    table_data: [
      {
        email: "test@test.ru",
        firstname: "test",
        lastname: "test"
      },
      {
        email: "test1@test.ru",
        firstname: "test1",
        lastname: "test1"
      },
      {
        email: "test2@test.ru",
        firstname: "test2",
        lastname: "test2"
      }
    ],
    columns: [
      {
        field: "email",
        label: "E-mail",
        title: "email",
        sortable: true,
        html: true,
        rowspan: null,
        colspan: null,
        class: { sorting: true, asc: false, desc: false }
      },
      {
        field: "firstname",
        label: "Firstname",
        title: "firstname",
        sortable: true,
        html: true,
        rowspan: null,
        colspan: null,
        class: { sorting: true, asc: false, desc: false }
      },
      {
        field: "lastname",
        label: "Lastname",
        title: "lastname",
        sortable: true,
        html: true,
        rowspan: null,
        colspan: null,
        class: { sorting: true, asc: false, desc: false }
      }
    ],
    filters: [
      {
        options: [
          { id: 0, name: "Admin", key: "admin" },
          { id: 1, name: "Director of sales", key: "director_of_sales" },
          { id: 2, name: "Head of sales", key: "head_of_sales" },
          { id: 3, name: "Chief manager", key: "chief_manager" },
          { id: 4, name: "Second line manager", key: "second_line_manager" },
          { id: 5, name: "First line manager", key: "first_line_manager"},
          { id: 6, name: "Partner manager", key: "partner_manager" }
        ],
        title: "Roles filter",
        option_name: "role"
      },
      {
        options: [
          { id: 0, name: "Active", key: "active" },
          { id: 1, name: "Fired", key: "fired" }
        ],
        title: "Status filter",
        option_name: "status",
      },
      { customize: "time", title: "Date filter", time_from: "", time_to: "" }
    ]
  },
  getters: {
    TABLE_DATA: state => {
      return state.table_data;
    },
    COLUMNS: state => {
      return state.columns;
    },
    FILTERS: state => {
      return state.filters;
    }
  },
  mutations: {},
  actions: {}
});
