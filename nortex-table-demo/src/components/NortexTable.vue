<template>
  <div class="nortex-table">
    <div class="card">
      <slot name="card-header" />
      <div class="card-body">
        <div class="d-flex justify-content-md-between align-items-start">
          <div class="d-flex">
            <label
              class="order-sm-last table-search align-self-start"
              v-if="this.enable_search"
            >
              <span class="float-left">{{ searchLabel }}</span>
              <input
                type="search"
                class="form-control form-control-sm"
                v-model="search_string"
              />
            </label>
          </div>
          <div class="d-md-inline-flex">
            <div
              class="mr-md-2 align-self-end"
              v-for="filter in currentFilters"
              :key="filter.option_name"
            >
              <table-filter
                :ref="filter.option_name"
                :default_selected="filter.default_selected"
                :multiple="filter.multiple"
                :option_name="filter.option_name"
                :options="filter.options"
                :title="filter.title"
                @selected="onFilterSelected"
              />
            </div>
            <datetime-filter
              v-if="DateTimeFilter"
              :title="DateTimeFilter.title"
              :time_from="DateTimeFilter.time_from"
              :time_to="DateTimeFilter.time_to"
              @changed="onTimeChanged"
            />
          </div>
        </div>
        <div class="table-responsive">
          <table class="table table-bordered">
            <table-column
              v-if="show_columns"
              :columns="columns"
              :sort_by="sortBy"
              :sort_type="sortType"
              :columns_row="columns_row"
              :enable_sort="enable_sort"
              @sort-changed="onSortChanged"
            />
            <transition name="fade" mode="out-in">
              <tbody v-if="emit_data_up" :key="'emit'" ref="table_body">
                <tr class="loading-row" v-if="loading" :key="'loading'">
                  <td :colspan="allColumns.length" ref="loading_container">
                    <slot name="loading">
                      <div class="loading-container">
                        <div class="nortex-loader">
                          <span>
                            {{ localization.loading || $t("table.loading") }}
                          </span>
                        </div>
                      </div>
                    </slot>
                    <div class="nortex-min-height-onload" v-if="data.length === 0"></div>
                  </td>
                </tr>
                <tr class="empty-row" v-else-if="data.length === 0">
                  <td :colspan="allColumns.length">
                    <slot name="empty">
                      <p class="d-flex justify-content-center">
                        <span>
                          {{ localization.empty || $t("table.empty") }}
                        </span>
                      </p>
                    </slot>
                  </td>
                </tr>
                <template>
                  <slot name="content" />
                  <slot name="last_row" />
                </template>
              </tbody>
              <tbody v-else :key="'main'" ref="table_body">
                <tr class="loading-row" v-if="loading" :key="'loading'">
                  <td :colspan="allColumns.length" ref="loading_container">
                    <slot name="loading">
                      <div class="loading-container">
                        <div class="nortex-loader">
                          <span>
                            {{ localization.loading || $t("table.loading") }}
                          </span>
                        </div>
                      </div>
                    </slot>
                    <div class="nortex-min-height-onload" v-if="data.length === 0"></div>
                  </td>
                </tr>
                <tr
                  class="empty-row"
                  v-else-if="data.length === 0"
                  :key="'empty'"
                >
                  <td :colspan="allColumns.length">
                    <slot name="empty">
                      <p class="d-flex justify-content-center">
                        <span>
                          {{ localization.empty || $t("table.empty") }}
                        </span>
                      </p>
                    </slot>
                  </td>
                </tr>
                <tr
                  v-for="(row, index) in data"
                  :key="'row' + index"
                  :class="rowClass(row)"
                >
                  <td
                    v-for="(column, index) in allColumns"
                    :key="'row elem' + index"
                  >
                    <div v-if="column.field === 'actions'">
                      <div class="btn-group">
                        <a
                          v-for="action in linkActions(row.actions)"
                          :key="action.title"
                          :class="action.button_class"
                          :href="action.url"
                          v-tooltip="action.title"
                        >
                          <i :class="action.icon_class" />
                        </a>
                        <button
                          v-for="action in otherActions(row.actions)"
                          :key="action.title"
                          :class="action.button_class"
                          @click="runAction(action)"
                          v-tooltip="action.title"
                        >
                          <i :class="action.icon_class" />
                        </button>
                      </div>
                    </div>
                    <div
                      v-else-if="
                        row[column.field] && row[column.field].customize
                      "
                    >
                      <slot
                        :name="row[column.field].name"
                        v-bind:[row[column.field].name]="row[column.field].items"
                      />
                    </div>
                    <span v-else v-html="row[column.field]" />
                  </td>
                </tr>
              </tbody>
            </transition>
          </table>
        </div>
        <table-pagination
          v-if="enable_pagination"
          :current_per_page="perPage"
          :total_records="totalRecords"
          :current_page="page"
          :labels="paginationLabels"
          :per_page_labels="perPageLabels"
          :per_page="perPage"
          :per_page_dropdown="perPageDropdown"
          :is_per_page_enabled="enable_per_page"
          @page-changed="onPageChange"
          @per-page-changed="onPerPageChange"
        />
      </div>
    </div>
    <slot name="after_content" />
  </div>
</template>

<script>
import TableColumn from "./TableColumn.vue";
import TablePagination from "./TablePagination.vue";
import TableFilter from "./TableFilter.vue";
import DatetimeFilter from "./DatetimeFilter.vue";
export default {
  name: "NortexTable",
  components: { TablePagination, TableColumn, TableFilter, DatetimeFilter },
  props: {
    columns: {
      type: Array,
      default: () => []
    },
    columns_row: {
      type: Number,
      default: 1
    },
    api_url: String,
    localization: {
      type: Object,
      default: () => {
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
      default: () => {
        return {
          field: "created_at",
          type: "desc"
        };
      }
    },
    enable_search: {
      type: Boolean,
      default: true
    },
    filters: {
      type: Array,
      default: () => []
    },
    enable_sort: {
      type: Boolean,
      default: true
    },
    enable_pagination: {
      type: Boolean,
      default: true
    },
    enable_per_page: {
      type: Boolean,
      default: true
    },
    default_per_page: {
      type: Number,
      default: 10
    },
    emit_data_up: {
      type: Boolean,
      default: false
    },
    change_url: {
      type: Boolean,
      default: true
    },
    table_data: {
      type: Array,
      default: () => []
    },
    ajax_table: {
      type: Boolean,
      default: true
    },
    show_columns: {
      type: Boolean,
      default: true
    }
  },
  data() {
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
    serverParams() {
      if (this.table_data.length === 0) {
        this.loadItems();
      }
    },
    search_string(val) {
      this.updateParams({ search: val });
    },
    perPage(val) {
      this.updateParams({ perPage: val });
    },
    loading(val) {
      if (val) {
        this.$nextTick(() => {
          let loading_container = this.$refs.loading_container,
            table_body = this.$refs.table_body;
          loading_container.firstChild.firstChild.setAttribute(
            "style",
            `height:${table_body.clientHeight}px;`
          );
        });
      }
    }
  },
  mounted() {
    if (!this.ajax_table) {
      this.loading = false;
      this.modify_url = false;
      this.totalRecords = this.table_data.length;
    }
    this.setSearchParams();
    this.rebuildTable();
  },
  computed: {
    currentFilters() {
      return this.filters.filter(filter => {
        return filter.customize !== "time";
      });
    },
    allColumns() {
      let data = [];
      this.columns.map(item => {
        if (item.children && item.children.length > 0) {
          item.children.map(elem => {
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
    DateTimeFilter() {
      let datetimeFilter = this.filters.find(filter => {
        return filter.customize === "time";
      });
      datetimeFilter = datetimeFilter ? datetimeFilter : false;
      return datetimeFilter;
    }
  },
  methods: {
    rowClass(row) {
      return row.row_class !== undefined ? row.row_class : "";
    },
    setSearchParams() {
      let search = this.search;
      if (search === "") {
        this.searchParams = {};
      } else {
        this.searchParams = JSON.parse(
          '{"' +
            decodeURIComponent(search)
              .replace(/"/g, '\\"')
              .replace(/&/g, '","')
              .replace(/=/g, '":"') +
            '"}'
        );
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
    rebuildTable() {
      this.prepareParams();
      this.updateParams(this.searchParams);
    },
    prepareParams() {
      let that = this;
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
      this.currentFilters.map(function(filter) {
        if (that.searchParams[filter.option_name] !== undefined) {
          let data = filter.options.filter(function(option) {
            return that.searchParams[filter.option_name]
              .split(",")
              .includes(option.id.toString());
          });
          that.$refs[filter.option_name][0].selectOptions(data);
          that.searchParams[filter.option_name] = data.map(function(option) {
            return option.id;
          });
        }
      });
    },
    runAction(action) {
      if (action.action === "link") {
        location.replace(action.url);
      } else {
        this.$emit(action.action, action.url, action.params);
      }
    },
    updateParams(newProps) {
      this.serverParams = Object.assign({}, this.serverParams, newProps);
      if (this.modify_url) {
        let query = Object.keys(this.serverParams)
          .map(key => key + "=" + this.serverParams[key])
          .join("&");
        history.replaceState({}, null, "?" + query);
      }
    },
    onPageChange(params) {
      this.page = params.currentPage;
      this.updateParams({ page: params.currentPage });
    },
    onPerPageChange(params) {
      this.perPage = params.currentPerPage;
    },
    onSortChanged(params) {
      this.sortType = params.sortType;
      this.sortBy = params.sortBy;
      this.updateParams({ sortBy: this.sortBy, sortType: this.sortType });
    },
    onFilterSelected(params) {
      this.updateParams(params);
    },
    onTimeChanged(params) {
      this.updateParams(params);
    },
    loadItems() {
      let that = this;
      clearTimeout(that.timeout);
      that.timeout = setTimeout(function() {
        that.loading = true;
        axios
          .get(that.api_url, { params: that.serverParams })
          .then(({ data }) => {
            if (that.emit_data_up) {
              that.$emit("emit_data", data);
            }
            that.totalRecords = data.recordsTotal;
            that.data = data.data;
            that.loading = false;
          });
      }, 500);
    },
    linkActions(actions) {
      return actions.filter(action => action.action === "link");
    },
    otherActions(actions) {
      return actions.filter(action => action.action !== "link");
    }
  }
};
</script>

<style lang="scss">
.nortex-table {
  .table-per-page select {
    width: 65px;
  }
  .table-search input {
    min-width: 200px;
  }
  .multiselect__single {
    margin: 4px 0;
  }
  .multiselect__tag {
    margin-bottom: 0;
    margin-top: 3px;
  }
  .multiselect__content-wrapper {
    min-width: max-content;
  }
  select,
  input,
  .multiselect__tags {
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 4px;
    min-height: 38px !important;
  }
  .sorting {
    position: relative;
    padding-right: 30px !important;
    cursor: pointer;
    &:before,
    &:after {
      position: absolute;
      bottom: 0.9em;
      display: block;
      opacity: 0.3;
    }
    &:before {
      right: 1em;
      content: "\2191";
    }
    &:after {
      right: 0.5em;
      content: "\2193";
    }
    &.asc:before,
    &.desc:after {
      opacity: 1;
    }
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.2s;
  }

  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }
  .loading-row {
    height: 0;
    td {
      padding: 0;
      border: 0;
    }
    .nortex-min-height-onload {
      height: 200px;
    }
    .loading-container {
      position: relative;
      display: flex;
      justify-content: center;
      .nortex-loader {
        position: absolute;
        background-color: rgba(239, 241, 253, 0.64);
        width: 100%;
        display: flex;
        justify-content: center;
        span {
          padding: 20px;
          border-radius: 8px;
          margin: auto;
          background-color: white;
        }
      }
    }
  }
}
</style>
