<template>
  <nortex-table
    :columns="columns"
    :table_data="table_data"
    :ajax_table="false"
    :filters="filters"
  ></nortex-table>
</template>

<script>
import NortexTable from "./NortexTable";

export default {
  name: "App",
  components: { NortexTable },
  data() {
    return {
      filters: [
        {
          options: [
            { id: 0, name: "Pending" },
            { id: 1, name: "Approved" },
            { id: 2, name: "Declined" }
          ],
          title: "Status filter",
          option_name: "status",
          default_selected: [{ id: 0, name: "Pending" }],
          multiple: false
        }
      ]
    };
  },
  computed: {
    table_data() {
      return this.$store.getters.TABLE_DATA || [];
    },
    columns() {
      return this.$store.getters.COLUMNS || [];
    }
  }
};
</script>

<style lang="scss">

</style>
