<template>
    <div class="container" style="margin-top: 15px;">
        <!-- Search Bar and new Client-->
        <b-input-group style="margin-top: 15px;margin-bottom: 15px;">
            <b-dropdown slot="prepend" :text="searchBy" variant="info">
                <b-dropdown-item value="email" @click="filterAction('email',searchField)">
                    Search By Email
                </b-dropdown-item>
                <b-dropdown-item value="phone" @click="filterAction('phone',searchField)">
                    Search By Phone
                </b-dropdown-item>
                <b-dropdown-item value="name" @click="filterAction('name',searchField)">
                    Search By Name
                </b-dropdown-item>
            </b-dropdown>
            <b-form-input v-model="searchField"  @change="filterAction(searchBy,searchField)"/>
            <b-input-group-append>
                <b-button size="sm" text="Button" @click="updateClientListAction" variant="info">Find</b-button>
            </b-input-group-append>
            <b-input-group-append>
                <b-button size="sm" text="Button" variant="success" @click="showClientFormModal(clientNewModel)">Create New Client</b-button>
            </b-input-group-append>
        </b-input-group>
        <!--data table-->
        <table class="table">
            <thead>
                <tr>
                    <th @click="sortAction('name')">
                        <span v-if="sortBy==='name' && !sortDesc" class="carret1"></span>
                        <span v-if="sortBy==='name' && sortDesc" class="carret2"></span>
                        Name
                    </th>
                    <th @click="sortAction('email')">
                        <span v-if="sortBy==='email' && !sortDesc" class="carret1"></span>
                        <span v-if="sortBy==='email' && sortDesc" class="carret2"></span>
                        Email</th>
                    <th @click="sortAction('phone')">
                        <span v-if="sortBy==='phone' && !sortDesc" class="carret1"></span>
                        <span v-if="sortBy==='phone' && sortDesc" class="carret2"></span>
                        Phone
                    </th>
                    <th>Providers</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="client in items">
                    <td>{{client.name}}</td>
                    <td>{{client.email}}</td>
                    <td>{{client.phone}}</td>
                    <td>
                        <span v-for="item in client.providers">
                          {{ item.name }},
                        </span>
                    </td>
                    <td>
                        <b-button size="sm" @click="showClientFormModal(client)" class="mr-1">
                            Edit
                        </b-button>
                        <b-button size="sm" class="alert-danger" @click="showConfirmModal(client)">
                            Delete
                        </b-button>
                    </td>
                </tr>
            </tbody>
        </table>
        <!-- custom pagination -->
        <b-row>
            <b-col md="6" class="my-1">
                <div>
                    <nav aria-label="Page navigation example">
                        <ul class="pagination">
                            <li class="page-item">
                                <a class="page-link" href="#" v-if="currentPage>1" @click="pagingAction(currentPage-1)">
                                    Previous
                                </a>
                                <a class="page-link disabled" href="#" v-if="currentPage<=1">
                                    Previous
                                </a>
                            </li>
                            <li class="page-item" v-for="index in totalPages"   :key="index">
                                <a class="page-link" v-if="currentPage!==index" @click="pagingAction(index)" href="#">{{index}}</a>
                                <a class="page-link disabled" v-if="currentPage===index" href="#">{{index}}</a>
                            </li>
                            <li class="page-item">
                                <a class="page-link" href="#" v-if="currentPage<totalPages" @click="pagingAction(currentPage+1)">
                                    Next
                                </a>
                                <a class="page-link disabled" href="#" v-if="currentPage>=totalPages">
                                    Next
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </b-col>
        </b-row>
        <!--Client modal form-->
        <b-modal ref = "clientFormModal" hide-footer :title = "clientModalTitle">
            <div class = "d-block text-center">
                <div class="alert alert-danger" v-if="errorAccured" role="alert">
                    {{errorText}}
                </div>
                <div class="form-group">
                    <input type="email" class="form-control" id="email" v-model="clientModel.email" aria-describedby="emailHelp" placeholder="Enter email">
                </div>
                <div class="form-group">
                    <input type="text" class="form-control" id="name" v-model="clientModel.name" placeholder="Name">
                </div>
                <div class="form-group">
                    <input type="text" class="form-control" id="phone" v-model="clientModel.phone" placeholder="Phone">
                </div>
                <div class="form-check">
                    <div class="form-group row">
                        <input type="text" class="form-control col-sm-6" v-model="providerModel.name" placeholder="New provider name">
                        <button class="btn btn-primary mb-2  col-sm-3" @click="saveProviderAction">{{providerAddButton}}</button>
                        <button class="btn btn-primary mb-2  col-sm-3"  @click="cancelChangeProvider" v-if="providerModel._id">Cancel</button>
                    </div>
                    <div v-for="providerItem in providers">
                        <div class="row" style="background-color: aliceblue" v-if="checkInArray(clientModel.providers,providerItem)">
                            <div class="col-sm-2"><input type="checkbox" @change="checkProvider(providerItem)" checked="true" /></div>
                            <div class="col-sm-5">{{providerItem.name}}</div>
                            <div class="col-sm-5">
                                <a href="#" class="btn btn-success" @click="startChangeProvider(providerItem)">Edit</a>
                                <a href="#" class="btn btn-danger"  @click="deleteProvider(providerItem)">Delete</a>
                            </div>
                        </div>
                        <div class="row success" v-if="!checkInArray(clientModel.providers,providerItem)">
                            <div class="col-sm-2"><input type="checkbox" @change="checkProvider(providerItem)"/></div>
                            <div class="col-sm-5">{{providerItem.name}}</div>
                            <div class="col-sm-5">
                                <a href="#" class="btn btn-success" @click="startChangeProvider(providerItem)">Edit</a>
                                <a href="#" class="btn btn-danger"  @click="deleteProvider(providerItem)">Delete</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <b-btn class = "mt-3 col-6" variant = "outline-danger" block @click = "hideModalClient">Cancel</b-btn>
                <b-btn class = "mt-3 col-6" variant = "outline-success" block @click = "saveClientAction">Save</b-btn>
            </div>
        </b-modal>

    <!-- Confirmation modal -->
        <b-modal ref = "confirmModal" hide-footer title = "Confirmation Dialog">
            <div class = "d-block text-center">
                <h3>You are about Delete this item!</h3>
            </div>
            <div class="row">
                <b-btn class = "mt-3 col-6" variant = "outline-danger" block @click = "hideModalConfirm">Cancel</b-btn>
                <b-btn class = "mt-3 col-6" variant = "outline-success" block @click = "confirmDeleteClientAction">Yes</b-btn>
            </div>
        </b-modal>
    </div>
</template>

<script>

export default {
    data() {
        return {
            baseDomain: 'http://localhost:8000/',
            currentPage: 1,
            totalRows: 0,
            perPage:10,
            // Note 'isActive' is left out and will not appear in the rendered table
            fields: [
                {
                    key: 'name',
                    sortable: true
                },
                {
                    key: 'email',
                    sortable: true
                },
                {
                    key: 'phone',
                    sortable: false
                },
                {
                    key: 'providers',
                    sortable: false
                },
                {
                    key: 'action',
                    sortable: false
                }
            ],
            items: [

            ],
            providers: [],
            clientModalTitle:"New Client",
            providerAddButton:"Add Provider",
            sortBy: 'name',
            sortDesc: true,
            errorAccured:false,
            searchBy: 'name',
            searchField: '',
            errorText:'',
            totalPages: 0,
            clientNewModel: {
                _id: false,
                name:'',
                providers:[],
                email:'',
                phone:'',

            },
            clientModel:{},
            providerModelNew: {
                _id: false,
                name: ''
            },
            providerModel: {},
        }
    },
    methods: {
        showClientFormModal(model) {
            if(model._id){
                this.clientModalTitle = "Edit Client " + model.name;
            }else{
                this.clientModalTitle = "New Client";
            }
            this.clientModel = JSON.parse(JSON.stringify(model));
            this.updateProviderListAction();
            this.$refs.clientFormModal.show()
        },
        showConfirmModal(model) {
            this.clientModel=model;
            this.$refs.confirmModal.show()
        },
        hideModalClient() {
            this.$refs.clientFormModal.hide()
        },
        hideModalConfirm() {
            this.$refs.confirmModal.hide()
        },
        confirmDeleteClientAction(){
            axios.delete(this.baseDomain + 'client/'+this.clientModel._id)
                .then(response => {
                    this.updateClientListAction();
                    this.hideModalConfirm();
                });
        },
        confirmDeleteProviderAction(){

        },
        sortAction(collumn){
            if(collumn === this.sortBy){
                this.sortDesc = !this.sortDesc;
            }else{
                this.sortDesc = true;
            }
            this.sortBy = collumn;
            this.updateClientListAction();
        },
        pagingAction(page){//console.log(page);
            this.currentPage = page;
            this.updateClientListAction();
        },
        filterAction(searchBy,searchField){
            this.searchBy = searchBy;
            this.searchField = searchField;
        },
        saveProviderAction(){
            let object = this;
            if(this.providerModel._id){
                axios.put(this.baseDomain +
                    'provider/'+this.providerModel._id,this.providerModel)
                    .then(response => {
                        object.providers = response.data.result;
                        this.providerModel = this.providerModelNew;
                        this.providerAddButton = 'Add Provider';
                        this.updateProviderListAction();
                    });
            }else{
                axios.post(this.baseDomain +
                    'provider',this.providerModel)
                    .then(response => {
                        object.providers = response.data.result;
                        this.providerModel.name = '';
                        this.updateProviderListAction();
                    });
            }
        },
        saveClientAction(){
            let object = this;
            if(this.clientModel._id){
                axios.put(this.baseDomain +
                    'client/'+this.clientModel._id,this.clientModel)
                    .then(response => {
                       object.clientResponseProcess(response);

                    });
            }else{
                axios.post(this.baseDomain +
                    'client',this.clientModel)
                    .then(response => {
                        object.clientResponseProcess(response);
                    });
            }


        },

        clientResponseProcess(response){
            let object = this;
            if(response.data.status===200){
                object.updateClientListAction();
                this.$refs.clientFormModal.hide();
            }else{
                this.errorAccured = true;
                if(response.data.details && response.data.details.length>0){
                    this.errorText = '';
                    for(let key in response.data.details){
                        this.errorText += response.data.details[key].msg + ', ';
                    }
                }else{
                    this.errorText = "Unhandled error accurred";
                }
                setTimeout(function(){
                    object.errorAccured = false;
                },3000)
            }
        },

        updateClientListAction(){
            let object = this;
            axios.get(this.baseDomain +
                'client?page='+this.currentPage+
                '&limit='+this.perPage+
                '&sortBy='+this.sortBy+
                '&sortType='+this.sortDesc+
                '&searchBy='+this.searchBy+
                '&searchField='+this.searchField)
                .then(response => {
                    object.items = response.data.result.docs;
                    object.perPage = response.data.result.limit;
                    object.totalRows = response.data.result.total;
                    object.currentPage = response.data.result.page;
                    object.totalPages = Math.ceil(this.totalRows/this.perPage);
                });
        },
        updateProviderListAction(){
            let object = this;
            axios.get(this.baseDomain +
                'provider')
                .then(response => {
                    object.providers = response.data.result;
                });
        },

        checkProvider(providerModel){
            let bigArray = this.clientModel.providers;
            for(let key in bigArray){
                if(bigArray[key]._id===providerModel._id){
                    this.clientModel.providers.splice(key, 1);
                    return true;
                }
            }
            this.clientModel.providers.push(providerModel);
        },

        startChangeProvider(provider){
            this.providerModel = provider;
            this.providerAddButton = 'Update Provider';

        },

        cancelChangeProvider(){
          this.providerModel = this.providerModelNew;
            this.providerAddButton = 'Add Provider';
        },
        deleteProvider(providerItem){
            axios.delete(this.baseDomain + 'provider/'+providerItem._id)
            .then(response => {
                let providers = this.clientModel.providers;
                for(let key in providers){
                    if(providers[key]._id==providerItem._id){
                        this.clientModel.providers.splice(key, 1);
                        break;
                    }
                }
                this.updateClientListAction();
                this.updateProviderListAction();
            });
        },
        checkInArray(bigArray,simpleObject){
            for(let key in bigArray){
                if(bigArray[key]._id===simpleObject._id){
                    return true;
                }
            }
            return false;
        }

    },
    mounted(){
        this.updateClientListAction();
    }
}
</script>

<style>
    .disabled{
        background-color: silver !important;
        color: rgba(255, 255, 255, 0.16) !important;
    }
    .carret1{
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 0 5px 5px 5px;
        border-color: transparent transparent #007bff transparent;
        float:right;
    }
    .carret2{
        width: 0;
        height: 0;
        margin-top: 10px;
        border-style: solid;
        border-width: 5px 5px 0 5px;
        float:right;
        border-color: #007bff transparent transparent transparent;

    }
</style>