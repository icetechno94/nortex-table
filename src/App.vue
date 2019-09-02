<template>
    <nortex-table
        api_url="http://brokeridge.loc:3000/admin/users"
        :columns='columns'
        :localization="localization"
    ></nortex-table>
</template>



<script>
    import NortexTable from './NortexTable';
    import 'bootstrap/dist/css/bootstrap.css'
    import axios from 'axios'
    window.axios = axios;
    axios.defaults.headers.common['X-CSRF-Token'] = "SSmtWGksGDIoVM9f8z8EhZFkifjHAR14Su7MHdjfeEHthVg8sj/jD1JXr5nNaSCsqKW5g3sJnod/jugP7Zfwig==";
    axios.defaults.headers.common['Accept'] = 'application/json';
    import VTooltip from 'v-tooltip'
    export default {
        name: 'App',
        components: {NortexTable},
        data(){
            return {
                columns: [
                    {'field':'email','label':'E-mail','title':false,'sortable':true,'html':true,'rowspan':null,'colspan':null,'class':{'sorting':true,'asc':false,'desc':false}},
                    {'field':'firstname','label':'First Name','title':false,'sortable':true,'html':true,'rowspan':null,'colspan':null,'class':{'sorting':true,'asc':false,'desc':false}},
                    {'field':'surname','label':'Surname','title':false,'sortable':true,'html':true,'rowspan':null,'colspan':null,'class':{'sorting':true,'asc':false,'desc':false}},
                    {'field':'patronymic','label':'Patronymic','title':false,'sortable':true,'html':true,'rowspan':null,'colspan':null,'class':{'sorting':true,'asc':false,'desc':false}},
                    {'field':'phone','label':'Phone','title':false,'sortable':true,'html':true,'rowspan':null,'colspan':null,'class':{'sorting':true,'asc':false,'desc':false}},
                    {'field':'verified','label':'Verified','title':false,'sortable':true,'html':true,'rowspan':null,'colspan':null,'class':{'sorting':true,'asc':false,'desc':false}},
                    {'field':'created_at','label':'Created at','title':false,'sortable':true,'html':true,'rowspan':null,'colspan':null,'class':{'sorting':true,'asc':false,'desc':true}},
                    {'field':'actions','label':'Actions','sortable':false,'html':true,'rowspan':null,'colspan':null,'class':{'sorting':false,'asc':false,'desc':false}}
                ],
                localization: {
                    "search": "Search",
                    "next": "Next",
                    "first": "First",
                    "last": "Last",
                    "prev": "Previous",
                    "per_page": "Show",
                    "all": "All",
                    "empty": "No matching records found",
                    "of": "of",
                    "loading": "Loading..."
                }
            }
        }
    }
</script>

<style lang="scss">
    .tooltip {
        display: block !important;
        z-index: 10000;

    .tooltip-inner {
        background: black;
        color: white;
        border-radius: 16px;
        padding: 5px 10px 4px;
    }

    .tooltip-arrow {
        width: 0;
        height: 0;
        border-style: solid;
        position: absolute;
        margin: 5px;
        border-color: black;
        z-index: 1;
    }

    &[x-placement^="top"] {
         margin-bottom: 5px;

    .tooltip-arrow {
        border-width: 5px 5px 0 5px;
        border-left-color: transparent !important;
        border-right-color: transparent !important;
        border-bottom-color: transparent !important;
        bottom: -5px;
        left: calc(50% - 5px);
        margin-top: 0;
        margin-bottom: 0;
    }
    }

    &[x-placement^="bottom"] {
         margin-top: 5px;

    .tooltip-arrow {
        border-width: 0 5px 5px 5px;
        border-left-color: transparent !important;
        border-right-color: transparent !important;
        border-top-color: transparent !important;
        top: -5px;
        left: calc(50% - 5px);
        margin-top: 0;
        margin-bottom: 0;
    }
    }

    &[x-placement^="right"] {
         margin-left: 5px;

    .tooltip-arrow {
        border-width: 5px 5px 5px 0;
        border-left-color: transparent !important;
        border-top-color: transparent !important;
        border-bottom-color: transparent !important;
        left: -5px;
        top: calc(50% - 5px);
        margin-left: 0;
        margin-right: 0;
    }
    }

    &[x-placement^="left"] {
         margin-right: 5px;

    .tooltip-arrow {
        border-width: 5px 0 5px 5px;
        border-top-color: transparent !important;
        border-right-color: transparent !important;
        border-bottom-color: transparent !important;
        right: -5px;
        top: calc(50% - 5px);
        margin-left: 0;
        margin-right: 0;
    }
    }

    &.popover {
         $color: #f9f9f9;

    .popover-inner {
        background: $color;
        color: black;
        padding: 24px;
        border-radius: 5px;
        box-shadow: 0 5px 30px rgba(black, .1);
    }

    .popover-arrow {
        border-color: $color;
    }
    }

    &[aria-hidden='true'] {
         visibility: hidden;
         opacity: 0;
         transition: opacity .15s, visibility .15s;
     }

    &[aria-hidden='false'] {
         visibility: visible;
         opacity: 1;
         transition: opacity .15s;
     }
    }
</style>