<template>
    <thead>
        <tr>
            <th v-for="column in mainColumns"
                :key="column.field"
                :rowspan="column.rowspan"
                :colspan="column.colspan"
                :class="column.class"
                @click="changeSort(column.field)"
            >
                <span>
                    {{column.label}}
                    <i class="icon-question ml-1" v-if="column.title" v-tooltip="column.title"></i>
                </span>
            </th>
        </tr>
        <tr>
            <th v-for="column in childrenColumns"
                :key="column.field"
                :class="sortingClass(column)"
                @click="changeSort(column.field)"
            >
                <span>
                    {{column.label}}
                    <i class="icon-question ml-1" v-if="column.title" v-tooltip="column.title"></i>
                </span>
            </th>
        </tr>
    </thead>
</template>

<script>
    export default {
        name: "TableColumn",
        props: {
            columns: Array,
            columns_row: {
                type: Number,
                default: 1
            },
            enable_sort: {
                type: Boolean,
                default: true
            },
            sort_by: {
                type: String,
                default: 'created_at'
            },
            sort_type: {
                type: String,
                default: 'desc'
            }
        },
        data() {
            return {
                sortBy: this.sort_by,
                sortType: this.sort_type
            }
        },
        watch: {
            sort_by(){
                this.sortBy = this.sort_by
            },
            sort_type(){
                this.sortType = this.sort_type
            },
            sortBy(){
                this.sortChanged();
            },
            sortType(){
                this.sortChanged();
            }
        },
        computed: {
            mainColumns(){
                let that = this,
                    data = [];
                this.columns.map((column) => {
                    column['rowspan'] = column.children && column.children.length === 0 ? that.columns_row : null;
                    column['colspan'] = column.children && column.children.length > 0 ? column.children.length : null;
                    column['class'] = [{'text-center': column.children && column.children.length > 0}, that.sortingClass(column)]
                    data.push(column)
                });
                return data
            },
            childrenColumns(){
                let data = [];
                this.columns.map((column)=> {
                    if (column.children && column.children.length > 0) {
                        column.children.map((child_column)=>{data.push(child_column)});
                    }
                });
                return data;
            },
            isDesc(){
                return this.sortType === 'desc'
            },
            isAsc(){
                return this.sortType === 'asc'
            }
        },
        methods: {
            revertSortType(){
                this.sortType = this.isAsc ? 'desc' : 'asc'
            },
            sortingClass(column) {
                return {
                    sorting: column.sortable && this.enable_sort,
                    asc: column.sortable && this.sortBy === column.field && this.isAsc,
                    desc: column.sortable && this.sortBy === column.field && this.isDesc,
                }

            },
            changeSort(field){
                if (this.enable_sort && field !== 'actions'){
                    if (field === this.sortBy){
                        this.revertSortType();
                    } else {
                        this.sortBy = field;
                        this.sortType = 'asc'
                    }
                }
            },
            sortChanged(){
                if(this.enable_sort){
                    this.$emit('sort-changed', {sortBy: this.sortBy, sortType: this.sortType})
                }
            }
        }
    }
</script>

<style scoped>

</style>