<template>
    <div class="container operator-container" style="margin-top:3em;">

        <h3 id="page-header">Operators</h3>
        <div class="row">
            <div class="col s12">
                <ul class="tabs">
                    <li class="tab col s3"><a href="#bus" class="">Bus</a></li>
                    <li class="tab col s3"><a href="#jeep"  class="" >Jeep</a></li>
                    <li class="col s1 right"><a href="#add-operator" class="cyan-text modal-trigger">add</a></li>
                </ul>
            </div>
            <div id="bus" class="tab-content col s12" >
                <table >
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr v-for="operator in busOperators" v-bind:key="operator.uid">
                            <td>{{operator.uid}}</td>
                            <th>{{operator.name}}</th>
                            <td>{{operator.email}}</td>
                            <td>
                                <a v-bind:href="'#vehicle-'+operator.uid" class="icon modal-trigger">
                                    <span class="icon"><Bus :size="19"/></span> 
                                </a>
                            </td>
                            <td>
                                <a v-bind:href="'#employee-'+operator.uid" class="icon modal-trigger">
                                    <span class="icon"><Employee :size="19"/></span> 
                                </a>
                            </td>
                            <td>
                                <a v-bind:href="'#operator-'+ operator.uid" class="icon modal-trigger">
                                    <span class="icon"><Eye :size="19"/></span> 
                                </a>
                            </td>
                            <td>
                                <a v-bind:href="'#delete-'+ operator.uid" class="icon modal-trigger">
                                    <span class="icon"><DeleteOutline :size="19"/></span> 
                                </a>
                            </td>
                        </tr> 
                    </tbody>
            </table>
        </div>

        <div  id="jeep" class="tab-content col s12" >
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="operator in jeepOperators" v-bind:key="operator.uid">
                            <td>{{operator.uid}}</td>
                            <th>{{operator.name}}</th>
                            <td>{{operator.email}}</td>
                            <td>
                                <a v-bind:href="'#vehicle-'+operator.uid" class="icon modal-trigger">
                                    <span class="icon"><Bus :size="19"/></span> 
                                </a>
                            </td>
                            <td>
                                <a v-bind:href="'#employee-'+operator.uid" class="icon modal-trigger">
                                    <span class="icon"><Employee :size="19"/></span> 
                                </a>
                            </td>
                            <td>
                                <a v-bind:href="'#operator-'+ operator.uid" class="icon modal-trigger">
                                    <span class="icon"><Eye :size="19"/></span> 
                                </a>
                            </td>
                            <td>
                                <a  v-bind:href="'#delete-'+ operator.uid" class="icon modal-trigger">
                                    <span class="icon"><DeleteOutline :size="19"/></span> 
                                </a>
                            </td>
                        </tr> 
                </tbody>
            </table>
        </div>
      </div>

    <!-- vehicle modals -->
    <VehicleModal v-for="operator in busOperators" :key="operator.uid" :id="'vehicle-'+ operator.uid" :operator="operator" :type="'Bus'"/>
    <VehicleModal v-for="operator in jeepOperators" :key="operator.uid" :id="'vehicle-'+ operator.uid" :operator="operator" :type="'Jeep'"/>
    <!-- employee modals -->
    <EmployeeModal v-for="operator in operators" :key="'employee-'+operator.uid" :id="'employee-'+ operator.uid" :operator="operator" />
    <!-- view operator modals -->
    <ViewOperator v-for="operator in operators" :key="'operator-'+operator.uid" :id="'operator-'+ operator.uid" :operator="operator"/>
    <!-- add operator modal -->
    <AddOperatorModal/>
     <!-- delete operator modal -->
    <DeleteOperatorModal v-for="operator in busOperators" :key="'delete-'+operator.uid" :id="'delete-'+ operator.uid" :operator="operator"/>
    <DeleteOperatorModal v-for="operator in jeepOperators" :key="'delete-'+operator.uid" :id="'delete-'+ operator.uid" :operator="operator"/>

    </div>
</template>

<script>
import Bus from 'vue-material-design-icons/Bus.vue';
import Employee from 'vue-material-design-icons/AccountTie.vue';
import Eye from 'vue-material-design-icons/Eye.vue';
import DeleteOutline from 'vue-material-design-icons/DeleteOutline.vue';
import VehicleModal from '@/components/partials/VehicleModal'
import EmployeeModal from '@/components/partials/EmployeeModal'
import ViewOperator from '@/components/partials/ViewOperator'
import AddOperatorModal from '@/components/partials/AddOperatorModal'
import DeleteOperatorModal from '@/components/partials/DeleteOperatorModal'
import db from './firebase/firebaseInit'
import M from 'materialize-css'

export default {
    name: 'operators',
    components: {
        Bus,
        Employee,
        Eye,
        DeleteOutline,
        VehicleModal,
        EmployeeModal,
        ViewOperator,
        AddOperatorModal,
        DeleteOperatorModal
    },
    data(){
        return{
            operators: [],
            busOperators: [],
            jeepOperators: []
        }
    },
    created(){
        const busQuery = db.collection('operators').where('type', '==', 'Bus')
        const jeepQuery = db.collection('operators').where('type', '==', 'Jeepney')

        // const busOperatorCollection = db.collection('operators').where('type', '==', 'Bus')
        // const jeepOperatorCollection = db.collection('operators').where('type', '==', 'Jeepney')

        const busOperatorCollection = busQuery.where('deleted', '==', false)
        const jeepOperatorCollection =  jeepQuery.where('deleted', '==', false)

        // changed from .get().then() to .onSnapshot to get realtime changes or additions to the collection
        // snap.docChanges loads all docs from the db onLoad and also allows us to only append new data added into the DOM
        // this is to avoid duplicating elements in the table as well as the modals anytime a data or an operator is added to firestore 
        busOperatorCollection.onSnapshot( snap => {
            snap.docChanges().forEach( change => {
                if(change.type === 'added'){
                    const data = {
                        'uid': change.doc.id,
                        'name': change.doc.data().fname + ' ' + change.doc.data().lname,
                        'fname':  change.doc.data().fname,
                        'lname': change.doc.data().lname,
                        'email': change.doc.data().email,
                        'type': change.doc.data().type,
                        'phoneNum': change.doc.data().phone_number
                    }

                    this.busOperators.push(data)
                    this.operators.push(data)
                }
            })
        })

        jeepOperatorCollection.onSnapshot( snap => {
            snap.docChanges().forEach( change => {
                if(change.type === 'added'){
                    const data = {
                        'uid': change.doc.id,
                        'name': change.doc.data().fname + ' ' + change.doc.data().lname,
                        'fname':  change.doc.data().fname,
                        'lname': change.doc.data().lname,
                        'email': change.doc.data().email,
                        'type': change.doc.data().type,
                        'phoneNum': change.doc.data().phone_number
                    }

                    this.jeepOperators.push(data)
                    this.operators.push(data)
                }
            })
        })
    },
    methods:{
    
    },
    updated(){
        // waits the modals to be rendered before initializing the component
        this.$nextTick(() => M.AutoInit())
    }
}
</script>
    
<style lang="scss">
    .tabs{
        .indicator{
            color: cyan;
        }
    }

    #page-header{
        margin-bottom: 1em;
    }
    
</style>