<template>
  <label class="table-datepicker">
    <span>{{ title }}</span>
    <vue-ctk-date-time-picker
      v-model="date"
      :id="random_id"
      :range="true"
      :label="$t('select_date_range')"
      format="YYYY-MM-DD"
      formatted="LL"
      :right="true"
      :maxDate="maxDate"
      color="#333d54"
      :locale="locale"
      :custom-shortcuts="shortcuts"
      @input="onChange"
    />
  </label>
</template>

<script>
export default {
  name: "DatetimeFilter",
  props: {
    title: String,
    time_from: {
      type: String,
      default: ""
    },
    time_to: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      random_id:
        Math.random()
          .toString(36)
          .substring(2, 15) +
        Math.random()
          .toString(36)
          .substring(2, 15),
      date: { start: this.time_from, end: this.time_to },
      maxDate: new Date().toISOString(),
      locale: this.$i18n.locale,
      shortcuts: [
        {
          key: "today",
          label: this.$i18n.t("date_filters.today"),
          value: "day",
          isSelected: false
        },
        {
          key: "yesterday",
          label: this.$i18n.t("date_filters.yesterday"),
          value: "-day",
          isSelected: false
        },
        {
          key: "sevenDays",
          label: this.$i18n.t("date_filters.seven_days"),
          value: 7,
          isSelected: false
        },
        {
          key: "thisWeek",
          label: this.$i18n.t("date_filters.this_week"),
          value: "isoWeek",
          isSelected: false
        },
        {
          key: "lastWeek",
          label: this.$i18n.t("date_filters.last_week"),
          value: "-isoWeek",
          isSelected: false
        },
        {
          key: "thisMonth",
          label: this.$i18n.t("date_filters.this_month"),
          value: "month",
          isSelected: false
        },
        {
          key: "lastMonth",
          label: this.$i18n.t("date_filters.last_month"),
          value: "-month",
          isSelected: false
        }
      ]
    };
  },
  watch: {
    time_from() {
      this.date.start = this.time_from;
    },
    time_to() {
      this.date.end = this.time_to;
    }
  },
  methods: {
    onChange(date) {
      let range = this.get_range(date);
      this.$emit("changed", { time_from: range.start, time_to: range.end });
    },
    get_range(date) {
      if (date) {
        let start = date.start ? date.start : "",
          end = date.end ? date.end : "";
        return { start: start, end: end };
      } else {
        return { start: "", end: "" };
      }
    }
  }
};
</script>

<style lang="scss">
.custom-button {
  padding: 0 10px !important;
}
.field-input {
  height: 38px !important;
}
</style>
