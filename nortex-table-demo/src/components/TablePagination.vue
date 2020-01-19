<template>
  <div class="nortex-table-pagination d-flex justify-content-md-end align-items-start">
    <div class="mr-4 mt-2" v-if="is_per_page_enabled">{{ infoText }}</div>
    <label class="nortex-table-pagination-per-page d-md-inline-flex align-items-center mr-4" v-if="is_per_page_enabled">
      <multiselect
        v-model="currentPerPage"
        label="name"
        track-by="id"
        :options="perPageSelectList"
        :show-labels="false"
        :allowEmpty="false"
        :preselectFirst="true"
        :searchable="false"
      />
    </label>
    <ul class="pagination nortex-table-pagination-pages">
      <li class="page-item prev" :class="{ disabled: prevIsDisabled }">
        <a
          href="#"
          class="page-link"
          @click.prevent="previousPage"
          v-tooltip="labels.prev"
        >
          {{ arrowButtons.prev }}
        </a>
      </li>
      <li class="page-item first" v-show="!firstIsDisabled">
        <a href="#" class="page-link" @click.prevent="firstPage">
          {{ 1 }}
        </a>
      </li>
      <li class="page-item disabled" v-show="!firstIsDisabled">
        <a href="#" class="page-link">...</a>
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
      <li class="page-item disabled" v-show="!lastIsDisabled">
        <a href="#" class="page-link">...</a>
      </li>
      <li class="page-item last" v-show="!lastIsDisabled">
        <a
          class="page-link"
          href="#"
          @click.prevent="lastPage"
        >
          {{ pagesCount }}
        </a>
      </li>
      <li class="page-item next" :class="{ disabled: nextIsDisabled }">
        <a
          class="page-link"
          href="#"
          @click.prevent="nextPage"
          v-tooltip="labels.next"
        >
          {{ arrowButtons.next }}
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
      default: () => {
        return {
          next: "next",
          prev: "prev",
          of: "of",
          first: "first",
          last: "last"
        };
      }
    },
    per_page_labels: {
      type: Object,
      default: () => {
        return {
          per_page: "per_page",
          all: "all"
        };
      }
    },
    per_page: {
      type: Number,
      default: 10
    },
    per_page_dropdown: {
      type: Array,
      default: () => []
    },
    is_per_page_enabled: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      currentPage: this.current_page > 0 ? this.current_page : 1,
      currentPerPage: {
        id: this.current_per_page,
        name: this.current_per_page
      },
      totalRecords: this.total_records,
      perPageLabels: this.per_page_labels,
      perPageDropdown: this.per_page_dropdown,
      arrowButtons: {
        next: ">",
        prev: "<",
        last: ">>>",
        first: "<<<"
      }
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
      this.currentPerPage = {id: this.current_per_page, name: this.current_per_page};
    },
    total_records() {
      this.totalRecords = this.total_records;
      if (this.current_page > this.pagesCount) {
        this.lastPage();
      }
    },
    currentPage() {
      this.pageChanged();
    },
    currentPerPage() {
      this.firstPage();
      this.perPageChanged();
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
    lastIsDisabled() {
      return this.nextPages.includes(this.pagesCount) || this.nextPages.length === 0;
    },
    nextIsDisabled() {
      return this.currentPage === this.pagesCount || this.pagesCount === 0;
    },
    firstIsDisabled() {
      return this.prevPages.includes(1) || this.prevPages.length === 0;
    },
    prevIsDisabled() {
      return this.currentPage === 1;
    },
    pagesCount() {
      return Math.ceil(this.totalRecords / this.currentPerPage.id);
    },
    itemStart() {
      if (this.totalRecords > 0) {
        if (this.currentPage === 1) {
          return 1;
        } else {
          return (
            this.currentPage * this.currentPerPage.id -
            this.currentPerPage.id +
            1
          );
        }
      } else {
        return 0;
      }
    },
    itemEnd() {
      if (this.totalRecords < this.itemStart + this.currentPerPage.id - 1) {
        return this.totalRecords;
      } else if (this.totalRecords > 0) {
        return this.itemStart + this.currentPerPage.id - 1;
      } else {
        return 0;
      }
    },
    perPageSelectList() {
      let data = [];
      if (!this.perPageDropdown.includes(this.currentPerPage.id)) {
        data.push({ id: this.currentPerPage.id, name: this.currentPerPage.id });
      }
      this.perPageDropdown.forEach(item => {
        data.push({ id: item, name: item });
      });
      data.push({ id: this.totalRecords, name: this.perPageLabels.all });
      return data;
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
    },
    perPageChanged() {
      this.$emit("per-page-changed", { currentPerPage: this.currentPerPage.id });
    }
  }
};
</script>
