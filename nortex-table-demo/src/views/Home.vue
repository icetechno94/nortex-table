<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <nortex-table
      :columns="columns"
      :table_data="table_data"
      :ajax_table="false"
      :filters="filters"
    ></nortex-table>
  </div>
</template>

<script>
import NortexTable from "../components/NortexTable";
export default {
  name: "home",
  components: { NortexTable },
  computed: {
    table_data() {
      return this.$store.getters.TABLE_DATA || [];
    },
    columns() {
      return this.$store.getters.COLUMNS || [];
    },
    filters() {
      return this.$store.getters.FILTERS || [];
    }
  }
};
</script>
