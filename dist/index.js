/*!
 * nortex-table v1.0.4
 * (c) Petrenko Konstantin
 * Released under the MIT License.
 */
'use strict';

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var script = {
  name: "TableColumn",
  props: {
    columns: Array,
    columns_row: {
      type: Number,
      "default": 1
    },
    enable_sort: {
      type: Boolean,
      "default": true
    },
    sort_by: {
      type: String,
      "default": "created_at"
    },
    sort_type: {
      type: String,
      "default": "desc"
    }
  },
  data: function data() {
    return {
      sortBy: this.sort_by,
      sortType: this.sort_type
    };
  },
  watch: {
    sort_by: function sort_by() {
      this.sortBy = this.sort_by;
    },
    sort_type: function sort_type() {
      this.sortType = this.sort_type;
    },
    sortBy: function sortBy() {
      this.sortChanged();
    },
    sortType: function sortType() {
      this.sortChanged();
    }
  },
  computed: {
    mainColumns: function mainColumns() {
      var that = this,
          data = [];
      this.columns.map(function (column) {
        column["rowspan"] = column.children && column.children.length === 0 ? that.columns_row : null;
        column["colspan"] = column.children && column.children.length > 0 ? column.children.length : null;
        column["class"] = [{
          "text-center": column.children && column.children.length > 0
        }, that.sortingClass(column)];
        data.push(column);
      });
      return data;
    },
    childrenColumns: function childrenColumns() {
      var data = [];
      this.columns.map(function (column) {
        if (column.children && column.children.length > 0) {
          column.children.map(function (child_column) {
            data.push(child_column);
          });
        }
      });
      return data;
    },
    isDesc: function isDesc() {
      return this.sortType === "desc";
    },
    isAsc: function isAsc() {
      return this.sortType === "asc";
    }
  },
  methods: {
    revertSortType: function revertSortType() {
      this.sortType = this.isAsc ? "desc" : "asc";
    },
    sortingClass: function sortingClass(column) {
      return {
        sorting: column.sortable && this.enable_sort,
        asc: column.sortable && this.sortBy === column.field && this.isAsc,
        desc: column.sortable && this.sortBy === column.field && this.isDesc
      };
    },
    changeSort: function changeSort(field) {
      if (this.enable_sort && field !== "actions") {
        if (field === this.sortBy) {
          this.revertSortType();
        } else {
          this.sortBy = field;
          this.sortType = "asc";
        }
      }
    },
    sortChanged: function sortChanged() {
      if (this.enable_sort) {
        this.$emit("sort-changed", {
          sortBy: this.sortBy,
          sortType: this.sortType
        });
      }
    }
  }
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier
/* server only */
, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
  if (typeof shadowMode !== 'boolean') {
    createInjectorSSR = createInjector;
    createInjector = shadowMode;
    shadowMode = false;
  } // Vue.extend constructor export interop.


  var options = typeof script === 'function' ? script.options : script; // render functions

  if (template && template.render) {
    options.render = template.render;
    options.staticRenderFns = template.staticRenderFns;
    options._compiled = true; // functional template

    if (isFunctionalTemplate) {
      options.functional = true;
    }
  } // scopedId


  if (scopeId) {
    options._scopeId = scopeId;
  }

  var hook;

  if (moduleIdentifier) {
    // server build
    hook = function hook(context) {
      // 2.3 injection
      context = context || // cached call
      this.$vnode && this.$vnode.ssrContext || // stateful
      this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext; // functional
      // 2.2 with runInNewContext: true

      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__;
      } // inject component styles


      if (style) {
        style.call(this, createInjectorSSR(context));
      } // register component module identifier for async chunk inference


      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier);
      }
    }; // used by ssr in case component is cached and beforeCreate
    // never gets called


    options._ssrRegister = hook;
  } else if (style) {
    hook = shadowMode ? function () {
      style.call(this, createInjectorShadow(this.$root.$options.shadowRoot));
    } : function (context) {
      style.call(this, createInjector(context));
    };
  }

  if (hook) {
    if (options.functional) {
      // register for functional component in vue file
      var originalRender = options.render;

      options.render = function renderWithStyleInjection(h, context) {
        hook.call(context);
        return originalRender(h, context);
      };
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate;
      options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
    }
  }

  return script;
}

var normalizeComponent_1 = normalizeComponent;

/* script */
var __vue_script__ = script;
/* template */

var __vue_render__ = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('thead', [_c('tr', _vm._l(_vm.mainColumns, function (column) {
    return _c('th', {
      key: column.field,
      "class": column["class"],
      attrs: {
        "rowspan": column.rowspan,
        "colspan": column.colspan
      },
      on: {
        "click": function click($event) {
          return _vm.changeSort(column.field);
        }
      }
    }, [_c('span', [_vm._v("\n        " + _vm._s(column.label) + "\n        "), column.title ? _c('i', {
      directives: [{
        name: "tooltip",
        rawName: "v-tooltip",
        value: column.title,
        expression: "column.title"
      }],
      staticClass: "icon-question ml-1"
    }) : _vm._e()])]);
  }), 0), _vm._v(" "), _c('tr', _vm._l(_vm.childrenColumns, function (column) {
    return _c('th', {
      key: column.field,
      "class": _vm.sortingClass(column),
      on: {
        "click": function click($event) {
          return _vm.changeSort(column.field);
        }
      }
    }, [_c('span', [_vm._v("\n        " + _vm._s(column.label) + "\n        "), column.title ? _c('i', {
      directives: [{
        name: "tooltip",
        rawName: "v-tooltip",
        value: column.title,
        expression: "column.title"
      }],
      staticClass: "icon-question ml-1"
    }) : _vm._e()])]);
  }), 0)]);
};

var __vue_staticRenderFns__ = [];
/* style */

var __vue_inject_styles__ = undefined;
/* scoped */

var __vue_scope_id__ = "data-v-3edd0de8";
/* module identifier */

var __vue_module_identifier__ = undefined;
/* functional template */

var __vue_is_functional_template__ = false;
/* style inject */

/* style inject SSR */

var TableColumn = normalizeComponent_1({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, undefined, undefined);

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var script$1 = {
  name: "TablePagination",
  props: {
    total_records: {
      type: Number,
      "default": 0
    },
    current_page: {
      type: Number,
      "default": 1
    },
    current_per_page: {
      type: Number,
      "default": 10
    },
    labels: {
      type: Object,
      "default": function _default() {}
    }
  },
  data: function data() {
    return {
      currentPage: this.current_page,
      currentPerPage: this.current_per_page,
      totalRecords: this.total_records
    };
  },
  watch: {
    current_page: function current_page() {
      if (this.current_page < 1) {
        this.firstPage();
      } else {
        this.changePage(this.current_page);
      }
    },
    current_per_page: function current_per_page() {
      this.currentPerPage = this.current_per_page;
    },
    total_records: function total_records() {
      this.totalRecords = this.total_records;

      if (this.current_page > this.pagesCount) {
        this.lastPage();
      }
    },
    currentPage: function currentPage() {
      this.pageChanged();
    }
  },
  computed: {
    infoText: function infoText() {
      return this.itemStart + " - " + this.itemEnd + " " + this.labels.of + " " + this.totalRecords;
    },
    prevPages: function prevPages() {
      var _this = this;

      var length = this.currentPage > 3 ? 2 : this.currentPage - 1;
      return Array.from({
        length: length
      }, function (v, k) {
        return _this.currentPage - k - 1;
      }).reverse();
    },
    nextPages: function nextPages() {
      var _this2 = this;

      var length = this.pagesCount - this.currentPage > 2 ? 2 : this.pagesCount - this.currentPage;
      return Array.from({
        length: length
      }, function (v, k) {
        return _this2.currentPage + k + 1;
      });
    },
    nextIsDisabled: function nextIsDisabled() {
      return this.currentPage === this.pagesCount;
    },
    prevIsDisabled: function prevIsDisabled() {
      return this.currentPage === 1;
    },
    pagesCount: function pagesCount() {
      return Math.ceil(this.totalRecords / this.currentPerPage);
    },
    itemStart: function itemStart() {
      if (this.totalRecords > 0) {
        if (this.currentPage === 1) {
          return 1;
        } else {
          return this.currentPage * this.currentPerPage - this.currentPerPage + 1;
        }
      } else {
        return 0;
      }
    },
    itemEnd: function itemEnd() {
      if (this.totalRecords < this.itemStart + this.currentPerPage - 1) {
        return this.totalRecords;
      } else if (this.totalRecords > 0) {
        return this.itemStart + this.currentPerPage - 1;
      } else {
        return 0;
      }
    }
  },
  methods: {
    nextPage: function nextPage() {
      this.changePage(this.currentPage + 1);
    },
    previousPage: function previousPage() {
      this.changePage(this.currentPage - 1);
    },
    firstPage: function firstPage() {
      this.changePage(1);
    },
    lastPage: function lastPage() {
      this.changePage(this.pagesCount);
    },
    changePage: function changePage(number) {
      this.currentPage = number;
    },
    pageChanged: function pageChanged() {
      this.$emit("page-changed", {
        currentPage: this.currentPage
      });
    }
  }
};

/* script */
var __vue_script__$1 = script$1;
/* template */

var __vue_render__$1 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "d-flex justify-content-between align-items-center mt-2"
  }, [_c('div', [_vm._v(_vm._s(_vm.infoText))]), _vm._v(" "), _c('ul', {
    staticClass: "pagination"
  }, [_c('li', {
    staticClass: "page-item",
    "class": {
      disabled: _vm.prevIsDisabled
    }
  }, [_c('a', {
    directives: [{
      name: "tooltip",
      rawName: "v-tooltip",
      value: _vm.labels.first,
      expression: "labels.first"
    }],
    staticClass: "page-link",
    attrs: {
      "href": "#"
    },
    on: {
      "click": function click($event) {
        $event.preventDefault();
        return _vm.firstPage($event);
      }
    }
  }, [_vm._v("\n        " + _vm._s("<<<") + "\n      ")])]), _vm._v(" "), _c('li', {
    staticClass: "page-item",
    "class": {
      disabled: _vm.prevIsDisabled
    }
  }, [_c('a', {
    directives: [{
      name: "tooltip",
      rawName: "v-tooltip",
      value: _vm.labels.prev,
      expression: "labels.prev"
    }],
    staticClass: "page-link",
    attrs: {
      "href": "#"
    },
    on: {
      "click": function click($event) {
        $event.preventDefault();
        return _vm.previousPage($event);
      }
    }
  }, [_vm._v("\n        " + _vm._s("<") + "\n      ")])]), _vm._v(" "), _vm._l(_vm.prevPages, function (page) {
    return _c('li', {
      key: page,
      staticClass: "page-item"
    }, [_c('a', {
      staticClass: "page-link",
      attrs: {
        "href": "#"
      },
      on: {
        "click": function click($event) {
          $event.preventDefault();
          return _vm.changePage(page);
        }
      }
    }, [_vm._v("\n        " + _vm._s(page) + "\n      ")])]);
  }), _vm._v(" "), _c('li', {
    staticClass: "page-item active"
  }, [_c('a', {
    staticClass: "page-link",
    attrs: {
      "href": "#"
    },
    on: {
      "click": function click($event) {
        $event.preventDefault();
      }
    }
  }, [_vm._v("\n        " + _vm._s(_vm.currentPage) + "\n      ")])]), _vm._v(" "), _vm._l(_vm.nextPages, function (page) {
    return _c('li', {
      key: page,
      staticClass: "page-item"
    }, [_c('a', {
      staticClass: "page-link",
      attrs: {
        "href": "#"
      },
      on: {
        "click": function click($event) {
          $event.preventDefault();
          return _vm.changePage(page);
        }
      }
    }, [_vm._v("\n        " + _vm._s(page) + "\n      ")])]);
  }), _vm._v(" "), _c('li', {
    staticClass: "page-item",
    "class": {
      disabled: _vm.nextIsDisabled
    }
  }, [_c('a', {
    directives: [{
      name: "tooltip",
      rawName: "v-tooltip",
      value: _vm.labels.next,
      expression: "labels.next"
    }],
    staticClass: "page-link",
    attrs: {
      "href": "#"
    },
    on: {
      "click": function click($event) {
        $event.preventDefault();
        return _vm.nextPage($event);
      }
    }
  }, [_vm._v("\n        " + _vm._s(">") + "\n      ")])]), _vm._v(" "), _c('li', {
    staticClass: "page-item",
    "class": {
      disabled: _vm.nextIsDisabled
    }
  }, [_c('a', {
    directives: [{
      name: "tooltip",
      rawName: "v-tooltip",
      value: _vm.labels.last,
      expression: "labels.last"
    }],
    staticClass: "page-link",
    attrs: {
      "href": "#"
    },
    on: {
      "click": function click($event) {
        $event.preventDefault();
        return _vm.lastPage($event);
      }
    }
  }, [_vm._v("\n        " + _vm._s(">>>") + "\n      ")])])], 2)]);
};

var __vue_staticRenderFns__$1 = [];
/* style */

var __vue_inject_styles__$1 = undefined;
/* scoped */

var __vue_scope_id__$1 = undefined;
/* module identifier */

var __vue_module_identifier__$1 = undefined;
/* functional template */

var __vue_is_functional_template__$1 = false;
/* style inject */

/* style inject SSR */

var TablePagination = normalizeComponent_1({
  render: __vue_render__$1,
  staticRenderFns: __vue_staticRenderFns__$1
}, __vue_inject_styles__$1, __vue_script__$1, __vue_scope_id__$1, __vue_is_functional_template__$1, __vue_module_identifier__$1, undefined, undefined);

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var script$2 = {
  name: "TableFilter",
  props: {
    options: Array,
    title: String,
    option_name: String,
    multiple: {
      type: Boolean,
      "default": true
    },
    default_selected: Array,
    filter_id: {
      type: String,
      "default": "filter_for_table"
    }
  },
  data: function data() {
    return {
      selected: this.default_selected ? this.default_selected : []
    };
  },
  computed: {
    selectedRoles: function selectedRoles() {
      return _defineProperty({}, this.option_name, Array.isArray(this.selected) ? this.selected.map(function (data) {
        return data.id;
      }) : this.selected.id);
    }
  },
  mounted: function mounted() {
    this.Selected();
    this.$root.$on("select_" + this.option_name, this.SelectById);
  },
  methods: {
    Selected: function Selected() {
      this.$emit("selected", this.selectedRoles);
    },
    selectOptions: function selectOptions(options) {
      this.selected = options;
    },
    SelectById: function SelectById(id) {
      var option = this.options.filter(function (item) {
        return item.id === id;
      })[0];

      if (option) {
        if (this.selected.includes(option)) {
          this.selected = this.selected.filter(function (item) {
            return item.id !== id;
          });
        } else {
          this.selected.push(option);
        }

        this.Selected();
      }
    }
  }
};

/* script */
var __vue_script__$2 = script$2;
/* template */

var __vue_render__$2 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('label', {
    staticClass: "table-filter"
  }, [_c('span', [_vm._v(_vm._s(_vm.title))]), _vm._v(" "), _c('multiselect', {
    attrs: {
      "label": "name",
      "track-by": "id",
      "id": _vm.filter_id,
      "options": _vm.options,
      "show-labels": false,
      "multiple": _vm.multiple,
      "placeholder": _vm.$t('action.filter.select'),
      "searchable": false,
      "hideSelected": true
    },
    on: {
      "input": _vm.Selected
    },
    model: {
      value: _vm.selected,
      callback: function callback($$v) {
        _vm.selected = $$v;
      },
      expression: "selected"
    }
  })], 1);
};

var __vue_staticRenderFns__$2 = [];
/* style */

var __vue_inject_styles__$2 = undefined;
/* scoped */

var __vue_scope_id__$2 = undefined;
/* module identifier */

var __vue_module_identifier__$2 = undefined;
/* functional template */

var __vue_is_functional_template__$2 = false;
/* style inject */

/* style inject SSR */

var TableFilter = normalizeComponent_1({
  render: __vue_render__$2,
  staticRenderFns: __vue_staticRenderFns__$2
}, __vue_inject_styles__$2, __vue_script__$2, __vue_scope_id__$2, __vue_is_functional_template__$2, __vue_module_identifier__$2, undefined, undefined);

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var script$3 = {
  name: "DatetimeFilter",
  props: {
    title: String,
    time_from: {
      type: String,
      "default": ''
    },
    time_to: {
      type: String,
      "default": ''
    }
  },
  data: function data() {
    return {
      date: {
        start: this.time_from,
        end: this.time_to
      },
      maxDate: new Date().toISOString(),
      locale: this.$i18n.locale,
      shortcuts: [{
        label: this.$i18n.t('date_filters.today'),
        value: 'day',
        isSelected: false
      }, {
        label: this.$i18n.t('date_filters.yesterday'),
        value: '-day',
        isSelected: false
      }, {
        label: this.$i18n.t('date_filters.seven_days'),
        value: 7,
        isSelected: false
      }, {
        label: this.$i18n.t('date_filters.this_week'),
        value: 'isoWeek',
        isSelected: false
      }, {
        label: this.$i18n.t('date_filters.last_week'),
        value: '-isoWeek',
        isSelected: false
      }, {
        label: this.$i18n.t('date_filters.this_month'),
        value: 'month',
        isSelected: false
      }, {
        label: this.$i18n.t('date_filters.last_month'),
        value: '-month',
        isSelected: false
      }]
    };
  },
  watch: {
    time_from: function time_from() {
      this.date.start = this.time_from;
    },
    time_to: function time_to() {
      this.date.end = this.time_to;
    }
  },
  methods: {
    onChange: function onChange(date) {
      var range = this.get_range(date);
      this.$emit('changed', {
        time_from: range.start,
        time_to: range.end
      });
    },
    get_range: function get_range(date) {
      if (date) {
        var start = date.start ? date.start : '',
            end = date.end ? date.end : '';
        return {
          start: start,
          end: end
        };
      } else {
        return {
          start: '',
          end: ''
        };
      }
    }
  }
};

/* script */
var __vue_script__$3 = script$3;
/* template */

var __vue_render__$3 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('label', {
    staticClass: "table-datepicker mr-md-2 align-self-end"
  }, [_c('span', [_vm._v(_vm._s(_vm.title))]), _vm._v(" "), _c('vue-ctk-date-time-picker', {
    attrs: {
      "range": true,
      "label": _vm.$t('select_date_range'),
      "format": "YYYY-MM-DD",
      "formatted": "LL",
      "right": true,
      "maxDate": _vm.maxDate,
      "color": "#333d54",
      "locale": _vm.locale,
      "custom-shortcuts": _vm.shortcuts
    },
    on: {
      "input": _vm.onChange
    },
    model: {
      value: _vm.date,
      callback: function callback($$v) {
        _vm.date = $$v;
      },
      expression: "date"
    }
  })], 1);
};

var __vue_staticRenderFns__$3 = [];
/* style */

var __vue_inject_styles__$3 = undefined;
/* scoped */

var __vue_scope_id__$3 = undefined;
/* module identifier */

var __vue_module_identifier__$3 = undefined;
/* functional template */

var __vue_is_functional_template__$3 = false;
/* style inject */

/* style inject SSR */

var DatetimeFilter = normalizeComponent_1({
  render: __vue_render__$3,
  staticRenderFns: __vue_staticRenderFns__$3
}, __vue_inject_styles__$3, __vue_script__$3, __vue_scope_id__$3, __vue_is_functional_template__$3, __vue_module_identifier__$3, undefined, undefined);

//
var script$4 = {
  name: "NortexTable",
  components: {
    TablePagination: TablePagination,
    TableColumn: TableColumn,
    TableFilter: TableFilter,
    DatetimeFilter: DatetimeFilter
  },
  props: {
    columns: Array,
    columns_row: {
      type: Number,
      "default": 1
    },
    api_url: String,
    localization: {
      type: Object,
      "default": function _default() {
        return {
          next: null,
          prev: null,
          per_page: null,
          of: null,
          search: null,
          page: null,
          all: null,
          loading: null,
          empty: null,
          first: null,
          last: null
        };
      }
    },
    default_sort: {
      type: Object,
      "default": function _default() {
        return {
          field: "created_at",
          type: "desc"
        };
      }
    },
    enable_search: {
      type: Boolean,
      "default": true
    },
    filters: {
      type: Array,
      "default": function _default() {
        return [];
      }
    },
    enable_sort: {
      type: Boolean,
      "default": true
    },
    enable_pagination: {
      type: Boolean,
      "default": true
    },
    default_per_page: {
      type: Number,
      "default": 10
    },
    emit_data_up: {
      type: Boolean,
      "default": false
    },
    change_url: {
      type: Boolean,
      "default": true
    },
    table_data: {
      type: Array,
      "default": function _default() {
        return [];
      }
    },
    ajax_table: {
      type: Boolean,
      "default": false
    }
  },
  data: function data() {
    return {
      data: this.table_data,
      modify_url: this.change_url,
      loading: true,
      perPageLabels: {
        per_page: this.localization.per_page || this.$i18n.t("table.per_page"),
        all: this.localization.all || this.$i18n.t("table.all")
      },
      searchLabel: this.localization.search || this.$i18n.t("table.search"),
      perPage: this.default_per_page,
      perPageDropdown: [10, 20, 30],
      paginationLabels: {
        next: this.localization.next || this.$i18n.t("table.next"),
        prev: this.localization.prev || this.$i18n.t("table.prev"),
        of: this.localization.of || this.$i18n.t("table.of"),
        first: this.localization.first || this.$i18n.t("table.first"),
        last: this.localization.last || this.$i18n.t("table.last")
      },
      page: 1,
      totalRecords: 0,
      sortBy: this.default_sort.field,
      sortType: this.default_sort.type,
      serverParams: {},
      searchParams: {},
      timeout: "",
      search_string: "",
      search: location.search.substring(1)
    };
  },
  watch: {
    serverParams: function serverParams() {
      if (this.table_data.length === 0) {
        this.loadItems();
      }
    },
    search_string: function search_string(val) {
      this.updateParams({
        search: val
      });
    },
    perPage: function perPage(val) {
      this.updateParams({
        perPage: val
      });
    }
  },
  mounted: function mounted() {
    if (!this.ajax_table) {
      this.loading = false;
      this.modify_url = false;
      this.totalRecords = this.table_data.length;
    }

    this.setSearchParams();
    this.rebuildTable();
  },
  computed: {
    currentFilters: function currentFilters() {
      return this.filters.filter(function (filter) {
        return filter.customize !== "time";
      });
    },
    allColumns: function allColumns() {
      var data = [];
      this.columns.map(function (item) {
        if (item.children && item.children.length > 0) {
          item.children.map(function (elem) {
            data.push(elem);
          });
        } else {
          data.push({
            field: item.field,
            label: item.label,
            sortable: item.sortable
          });
        }
      });
      return data;
    },
    DateTimeFilter: function DateTimeFilter() {
      var datetimeFilter = this.filters.filter(function (filter) {
        return filter.customize === "time";
      });
      return datetimeFilter.length > 0 ? datetimeFilter[0] : false;
    }
  },
  methods: {
    rowClass: function rowClass(row) {
      return row.row_class !== undefined ? row.row_class : "";
    },
    setSearchParams: function setSearchParams() {
      var search = this.search;

      if (search === "") {
        this.searchParams = {};
      } else {
        this.searchParams = JSON.parse('{"' + decodeURIComponent(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}');
      }

      if (this.enable_pagination) {
        if (this.searchParams.page === undefined) {
          this.searchParams.page = this.page;
        }

        if (this.searchParams.perPage === undefined) {
          this.searchParams.perPage = this.perPage;
        }
      }

      if (this.enable_sort) {
        if (this.searchParams.sortBy === undefined) {
          this.searchParams.sortBy = this.sortBy;
        }

        if (this.searchParams.sortType === undefined) {
          this.searchParams.sortType = this.sortType;
        }
      }
    },
    rebuildTable: function rebuildTable() {
      this.prepareParams();
      this.updateParams(this.searchParams);
    },
    prepareParams: function prepareParams() {
      var that = this;

      if (this.enable_pagination) {
        this.perPage = parseInt(this.searchParams.perPage, 10) || this.perPage;
        this.page = parseInt(this.searchParams.page, 10) || 1;
      }

      if (this.enable_search) {
        this.search_string = this.searchParams.search || "";
      }

      if (this.enable_sort) {
        this.sortType = this.searchParams.sortType || this.default_sort.type;
        this.sortBy = this.searchParams.sortBy || this.default_sort.field;
      }

      if (this.DateTimeFilter) {
        if (that.searchParams.time_from) {
          that.DateTimeFilter.time_from = that.searchParams.time_from;
        }

        if (that.searchParams.time_to) {
          that.DateTimeFilter.time_to = that.searchParams.time_to;
        }
      }

      this.currentFilters.map(function (filter) {
        if (that.searchParams[filter.option_name] !== undefined) {
          var data = filter.options.filter(function (option) {
            return that.searchParams[filter.option_name].split(",").includes(option.id.toString());
          });
          that.$refs[filter.option_name][0].selectOptions(data);
          that.searchParams[filter.option_name] = data.map(function (option) {
            return option.id;
          });
        }
      });
    },
    runAction: function runAction(action) {
      if (action.action === "link") {
        location.replace(action.url);
      } else {
        this.$emit(action.action, action.url, action.params);
      }
    },
    updateParams: function updateParams(newProps) {
      var _this = this;

      this.serverParams = Object.assign({}, this.serverParams, newProps);

      if (this.modify_url) {
        var query = Object.keys(this.serverParams).map(function (key) {
          return key + "=" + _this.serverParams[key];
        }).join("&");
        history.replaceState({}, null, "?" + query);
      }
    },
    onPageChange: function onPageChange(params) {
      this.page = params.currentPage;
      this.updateParams({
        page: params.currentPage
      });
    },
    onSortChanged: function onSortChanged(params) {
      this.sortType = params.sortType;
      this.sortBy = params.sortBy;
      this.updateParams({
        sortBy: this.sortBy,
        sortType: this.sortType
      });
    },
    onFilterSelected: function onFilterSelected(params) {
      this.updateParams(params);
    },
    onTimeChanged: function onTimeChanged(params) {
      this.updateParams(params);
    },
    loadItems: function loadItems() {
      var that = this;
      clearTimeout(that.timeout);
      that.timeout = setTimeout(function () {
        that.loading = true;
        axios.get(that.api_url, {
          params: that.serverParams
        }).then(function (_ref) {
          var data = _ref.data;

          if (that.emit_data_up) {
            that.$emit("emit_data", data);
          } else {
            that.totalRecords = data.recordsTotal;
            that.data = data.data;
            that.loading = false;
          }
        });
      }, 500);
    }
  }
};

/* script */
var __vue_script__$4 = script$4;
/* template */

var __vue_render__$4 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "nortex-table"
  }, [_c('div', {
    staticClass: "card"
  }, [_vm._t("card-header"), _vm._v(" "), _c('div', {
    staticClass: "card-body"
  }, [_c('div', {
    staticClass: "d-flex justify-content-md-end align-items-start"
  }, [_vm.enable_pagination ? _c('label', {
    staticClass: "mr-2 flex-grow-1 table-per-page d-md-inline-flex flex-column"
  }, [_c('span', {
    staticClass: "text-left"
  }, [_vm._v(_vm._s(_vm.perPageLabels.per_page) + " ")]), _vm._v(" "), _c('select', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.perPage,
      expression: "perPage"
    }],
    staticClass: "form-control form-control-sm",
    attrs: {
      "name": "perPageSelect"
    },
    on: {
      "change": function change($event) {
        var $$selectedVal = Array.prototype.filter.call($event.target.options, function (o) {
          return o.selected;
        }).map(function (o) {
          var val = "_value" in o ? o._value : o.value;
          return val;
        });
        _vm.perPage = $event.target.multiple ? $$selectedVal : $$selectedVal[0];
      }
    }
  }, [!_vm.perPageDropdown.includes(_vm.perPage) ? _c('option', {
    domProps: {
      "value": _vm.perPage
    }
  }, [_vm._v(_vm._s(_vm.perPage))]) : _vm._e(), _vm._v(" "), _vm._l(_vm.perPageDropdown, function (option, idx) {
    return _c('option', {
      key: 'rows-dropdown-option-' + idx,
      domProps: {
        "value": option
      }
    }, [_vm._v(_vm._s(option))]);
  }), _vm._v(" "), _c('option', {
    domProps: {
      "value": _vm.totalRecords
    }
  }, [_vm._v(_vm._s(_vm.perPageLabels.all))])], 2)]) : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "d-md-inline-flex"
  }, [this.enable_search ? _c('label', {
    staticClass: "order-sm-last table-search align-self-start"
  }, [_c('span', {
    staticClass: "float-left"
  }, [_vm._v(_vm._s(_vm.searchLabel))]), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.search_string,
      expression: "search_string"
    }],
    staticClass: "form-control form-control-sm",
    attrs: {
      "type": "search"
    },
    domProps: {
      "value": _vm.search_string
    },
    on: {
      "input": function input($event) {
        if ($event.target.composing) {
          return;
        }

        _vm.search_string = $event.target.value;
      }
    }
  })]) : _vm._e(), _vm._v(" "), _vm._l(_vm.currentFilters, function (filter) {
    return _c('div', {
      key: filter.option_name,
      staticClass: "mr-md-2 align-self-end"
    }, [_c('table-filter', {
      ref: filter.option_name,
      refInFor: true,
      attrs: {
        "default_selected": filter.default_selected,
        "multiple": filter.multiple,
        "option_name": filter.option_name,
        "options": filter.options,
        "title": filter.title
      },
      on: {
        "selected": _vm.onFilterSelected
      }
    })], 1);
  }), _vm._v(" "), _vm.DateTimeFilter ? _c('datetime-filter', {
    attrs: {
      "title": _vm.DateTimeFilter.title,
      "time_from": _vm.DateTimeFilter.time_from,
      "time_to": _vm.DateTimeFilter.time_to
    },
    on: {
      "changed": _vm.onTimeChanged
    }
  }) : _vm._e()], 2)]), _vm._v(" "), _c('div', {
    staticClass: "table-responsive"
  }, [_c('table', {
    staticClass: "table table-bordered"
  }, [_c('table-column', {
    attrs: {
      "columns": _vm.columns,
      "sort_by": _vm.sortBy,
      "sort_type": _vm.sortType,
      "columns_row": _vm.columns_row,
      "enable_sort": _vm.enable_sort
    },
    on: {
      "sort-changed": _vm.onSortChanged
    }
  }), _vm._v(" "), _c('transition', {
    attrs: {
      "name": "fade",
      "mode": "out-in"
    }
  }, [_vm.emit_data_up ? _c('tbody', {
    key: "emit"
  }, [_vm._t("empty", null, {
    "empty_text": _vm.localization.empty || _vm.$t('table.empty')
  }), _vm._v(" "), _vm._t("content"), _vm._v(" "), _vm._t("last_row")], 2) : _vm.loading ? _c('tbody', {
    key: "loading"
  }, [_c('tr', [_c('td', {
    attrs: {
      "colspan": _vm.allColumns.length
    }
  }, [_c('p', {
    staticClass: "d-flex justify-content-center"
  }, [_c('span', [_vm._v("\n                      " + _vm._s(_vm.localization.loading || _vm.$t("table.loading")) + "\n                    ")])])])])]) : _vm.data.length === 0 ? _c('tbody', {
    key: "empty"
  }, [_c('tr', [_c('td', {
    attrs: {
      "colspan": _vm.allColumns.length
    }
  }, [_c('p', {
    staticClass: "d-flex justify-content-center"
  }, [_c('span', [_vm._v("\n                      " + _vm._s(_vm.localization.empty || _vm.$t("table.empty")) + "\n                    ")])])])])]) : _c('tbody', {
    key: "data"
  }, _vm._l(_vm.data, function (row, index) {
    return _c('tr', {
      key: 'row' + index,
      "class": _vm.rowClass(row)
    }, _vm._l(_vm.allColumns, function (column, index) {
      return row[column.field] !== undefined ? _c('td', {
        key: 'row elem' + index
      }, [column.field === 'actions' ? _c('div', [_c('div', {
        staticClass: "btn-group"
      }, [_vm._l(row.actions, function (action) {
        return action.action === 'link' ? _c('a', {
          directives: [{
            name: "tooltip",
            rawName: "v-tooltip",
            value: action.title,
            expression: "action.title"
          }],
          key: action.title,
          "class": action.button_class,
          attrs: {
            "href": action.url
          }
        }, [_c('i', {
          "class": action.icon_class
        })]) : _vm._e();
      }), _vm._v(" "), _vm._l(row.actions, function (action) {
        return action.action !== 'link' ? _c('button', {
          directives: [{
            name: "tooltip",
            rawName: "v-tooltip",
            value: action.title,
            expression: "action.title"
          }],
          key: action.title,
          "class": action.button_class,
          on: {
            "click": function click($event) {
              return _vm.runAction(action);
            }
          }
        }, [_c('i', {
          "class": action.icon_class
        })]) : _vm._e();
      })], 2)]) : row[column.field] && row[column.field].customize ? _c('div', [_vm._t(row[column.field].name, null, _vm._d({}, [row[column.field].name, row[column.field].items]))], 2) : _c('span', {
        domProps: {
          "innerHTML": _vm._s(row[column.field])
        }
      })]) : _vm._e();
    }), 0);
  }), 0)])], 1)]), _vm._v(" "), _vm.enable_pagination ? _c('table-pagination', {
    attrs: {
      "current_per_page": _vm.perPage,
      "total_records": _vm.totalRecords,
      "current_page": _vm.page,
      "labels": _vm.paginationLabels
    },
    on: {
      "page-changed": _vm.onPageChange
    }
  }) : _vm._e()], 1)], 2), _vm._v(" "), _vm._t("after_content")], 2);
};

var __vue_staticRenderFns__$4 = [];
/* style */

var __vue_inject_styles__$4 = undefined;
/* scoped */

var __vue_scope_id__$4 = "data-v-a9d72cd6";
/* module identifier */

var __vue_module_identifier__$4 = undefined;
/* functional template */

var __vue_is_functional_template__$4 = false;
/* style inject */

/* style inject SSR */

var NortexTable = normalizeComponent_1({
  render: __vue_render__$4,
  staticRenderFns: __vue_staticRenderFns__$4
}, __vue_inject_styles__$4, __vue_script__$4, __vue_scope_id__$4, __vue_is_functional_template__$4, __vue_module_identifier__$4, undefined, undefined);

var index = {
  install: function install(Vue, options) {
    // Let's register our component globally
    // https://vuejs.org/v2/guide/components-registration.html
    Vue.component("nortex-table", NortexTable);
  }
};

module.exports = index;
