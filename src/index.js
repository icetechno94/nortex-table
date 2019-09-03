import NortexTable from "../nortex-table-demo/src/components/NortexTable.vue";

export default {
    install(Vue, options) {
        // Let's register our component globally
        // https://vuejs.org/v2/guide/components-registration.html
        Vue.component("nortex-table", NortexTable);
    }
};