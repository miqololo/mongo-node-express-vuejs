
<template>
    <div>
        <nav aria-label="Page navigation example">
          <ul class="pagination">
            <li class="page-item"><a class="page-link" href="#">Previous</a></li>
            <li class="page-item"><a class="page-link" href="#">1</a></li>
            <li class="page-item"><a class="page-link" href="#">2</a></li>
            <li class="page-item"><a class="page-link" href="#">3</a></li>
            <li class="page-item"><a class="page-link" href="#">Next</a></li>
          </ul>
        </nav>
    </div>


</template>

<style>
    #pagination {
        margin-top:10px;
        text-align:center;
    }

    h3 {
        margin-top:10px;
        text-align:center;
    }

    div {
        margin-top:10px;
    }

    small {
        font-size:14px;
    }
</style>

<script>

    Vue.use(VuePagination);

    new Vue({
        el:"#pagination",
        data: {
            totalRows:1,
            totalPages:1,
            perPage:10,
            currentPage:100
        },
        computed:{
            PerPage: function() {
                return this.perpage ? parseInt(this.perpage):25;
            },
            Records: function() {
                return this.records?parseInt(this.records):0;
            },
            totalPages: function() {
                return this.$refs.table.totalPages;
            }
        },
        methods: {
            refresh: function() {
                this.$refs.table.setPage(1);
            },
            prev: function() {
                return this.$refs.table.prev();
            },
            next: function() {
                return this.$refs.table.next();
            },
            prevChunk: function() {
                return this.$refs.table.prevChunk();
            },
            nextChunk: function() {
                return this.$refs.table.nextChunk();
            }
        },
        ready: function() {
            this.$on('vue-pagination::table', function(page) {
                this.table1Page = page;
            });
        }
    })
</script>