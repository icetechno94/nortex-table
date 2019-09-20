<template>
  <div class="d-flex justify-content-md-end align-items-start">
    <label class="mr-4 table-per-page d-md-inline-flex align-items-center">
      <span class="mr-2">{{ perPageLabels.per_page }}</span>
      <select
        name="perPageSelect"
        class="form-control form-control-sm"
        v-model="perPage"
      >
        <option
                :value="perPage"
                v-if="!perPageDropdown.includes(perPage)"
        >{{ perPage }}
        </option>
        <option
          v-for="(option, idx) in perPageDropdown"
          :key="'rows-dropdown-option-' + idx"
          :value="option"
        >{{ option }}
        </option>
        <option :value="totalRecords">{{ perPageLabels.all }}</option>
      </select>
    </label>
    <div class="mr-4 mt-2">{{ infoText }}</div>
    <ul class="pagination">
      <li class="page-item" :class="{ disabled: prevIsDisabled }">
        <a
          href="#"
          class="page-link"
          @click.prevent="firstPage"
          v-tooltip="labels.first"
        >
          {{ "<<<" }}
        </a>
      </li>
      <li class="page-item" :class="{ disabled: prevIsDisabled }">
        <a
          href="#"
          class="page-link"
          @click.prevent="previousPage"
          v-tooltip="labels.prev"
        >
          {{ "<" }}
        </a>
      </li>
      <li class="page-item" v-for="page in prevPages" :key="page">
        <a href="#" class="page-link" @click.prevent="changePage(page)">
          {{ page }}
        </a>
      </li>
      <li class="page-item active">
        <a href="#" class="page-link" @click.prevent="">
          {{ currentPage }}
        </a>
      </li>
      <li class="page-item" v-for="page in nextPages" :key="page">
        <a href="#" class="page-link" @click.prevent="changePage(page)">
          {{ page }}
        </a>
      </li>
      <li class="page-item" :class="{ disabled: nextIsDisabled }">
        <a
          class="page-link"
          href="#"
          @click.prevent="nextPage"
          v-tooltip="labels.next"
        >
          {{ ">" }}
        </a>
      </li>
      <li class="page-item" :class="{ disabled: nextIsDisabled }">
        <a
          class="page-link"
          href="#"
          @click.prevent="lastPage"
          v-tooltip="labels.last"
        >
          {{ ">>>" }}
        </a>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "TablePagination",
  props: {
    total_records: {
      type: Number,
      default: 0
    },
    current_page: {
      type: Number,
      default: 1
    },
    current_per_page: {
      type: Number,
      default: 10
    },
    labels: {
      type: Object,
      default: () => {}
    },
    per_page_labels: {
      type: Object,
      default: () => {}
    },
    per_page: {
      type: Number,
      default: 10
    },
    per_page_dropdown: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      currentPage: this.current_page,
      currentPerPage: this.current_per_page,
      totalRecords: this.total_records,
      perPageLabels: this.per_page_labels,
      perPage: this.per_page,
      perPageDropdown: this.per_page_dropdown
    };
  },
  watch: {
    current_page() {
      if (this.current_page < 1) {
        this.firstPage();
      } else {
        this.changePage(this.current_page);
      }
    },
    current_per_page() {
      this.currentPerPage = this.current_per_page;
    },
    total_records() {
      this.totalRecords = this.total_records;
      if (this.current_page > this.pagesCount) {
        this.lastPage();
      }
    },
    currentPage() {
      this.pageChanged();
    }
  },
  computed: {
    infoText() {
      return (
        this.itemStart +
        " - " +
        this.itemEnd +
        " " +
        this.labels.of +
        " " +
        this.totalRecords
      );
    },
    prevPages() {
      let length = this.currentPage > 3 ? 2 : this.currentPage - 1;
      return Array.from(
        { length: length },
        (v, k) => this.currentPage - k - 1
      ).reverse();
    },
    nextPages() {
      let length =
        this.pagesCount - this.currentPage > 2
          ? 2
          : this.pagesCount - this.currentPage;
      return Array.from({ length: length }, (v, k) => this.currentPage + k + 1);
    },
    nextIsDisabled() {
      return this.currentPage === this.pagesCount;
    },
    prevIsDisabled() {
      return this.currentPage === 1;
    },
    pagesCount() {
      return Math.ceil(this.totalRecords / this.currentPerPage);
    },
    itemStart() {
      if (this.totalRecords > 0) {
        if (this.currentPage === 1) {
          return 1;
        } else {
          return (
            this.currentPage * this.currentPerPage - this.currentPerPage + 1
          );
        }
      } else {
        return 0;
      }
    },
    itemEnd() {
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
    nextPage() {
      this.changePage(this.currentPage + 1);
    },
    previousPage() {
      this.changePage(this.currentPage - 1);
    },
    firstPage() {
      this.changePage(1);
    },
    lastPage() {
      this.changePage(this.pagesCount);
    },
    changePage(number) {
      this.currentPage = number;
    },
    pageChanged() {
      this.$emit("page-changed", { currentPage: this.currentPage });
    }
  }
};
</script>
