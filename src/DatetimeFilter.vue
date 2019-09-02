<template>
    <label class="table-datepicker mr-md-2 align-self-end">
        <span>{{title}}</span>
        <vue-ctk-date-time-picker
                v-model="date"
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
    import VueCtkDateTimePicker from 'vue-ctk-date-time-picker';
    import 'vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css';

    Vue.component('VueCtkDateTimePicker', VueCtkDateTimePicker);

    export default {
        name: "DatetimeFilter",
        props: {
            title: String,
            time_from: {
                type: String,
                default: ''
            },
            time_to: {
                type: String,
                default: ''
            },
        },
        data(){
            return {
                date: {start: this.time_from, end: this.time_to},
                maxDate: new Date().toISOString(),
                locale: this.$i18n.locale,
                shortcuts: [
                    { label: this.$i18n.t('date_filters.today'), value: 'day', isSelected: false },
                    { label: this.$i18n.t('date_filters.yesterday'), value: '-day', isSelected: false },
                    { label: this.$i18n.t('date_filters.seven_days'), value: 7, isSelected: false },
                    { label: this.$i18n.t('date_filters.this_week'), value: 'isoWeek', isSelected: false },
                    { label: this.$i18n.t('date_filters.last_week'), value: '-isoWeek', isSelected: false },
                    { label: this.$i18n.t('date_filters.this_month'), value: 'month', isSelected: false },
                    { label: this.$i18n.t('date_filters.last_month'), value: '-month', isSelected: false },
                ]
            }
        },
        watch: {
            time_from() {
                this.date.start = this.time_from
            },
            time_to() {
                this.date.end = this.time_to
            }
        },
        methods: {
            onChange(date){
                let range = this.get_range(date);
                this.$emit('changed', {time_from: range.start, time_to: range.end});
            },
            get_range(date){
                if (date){
                    let start = date.start ? date.start : '',
                        end = date.end ? date.end : '';
                    return {start: start, end: end}
                } else {
                    return {start: '', end: ''}
                }
            }
        }
    }
</script>

<style>
    .custom-button{
        padding: 0 10px!important;
    }
</style>