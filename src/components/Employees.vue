<template>
    <div class="container operator-container" style="margin-top:3em;">
        <div class="col s12">
            <ul class="tabs">
                <li class="tab col s3"><a href="#bus" class="black-text">Bus Drivers</a></li>
                <li class="tab col s3"><a href="#jeep"  class="black-text" >Jeep Drivers</a></li>
                <li class="tab col s3"><a href="#conductor"  class="black-text" >Conductors</a></li>
                <li class="col s1 right"><a href="#add-employee" class="black-cyan modal-trigger">add</a></li>
            </ul>
        </div>

        <div id="bus" class="tab-content col s12" >
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>License Number</th>
                    <th></th>
                    <th></th>
                </tr>
                </thead>

                <tbody>
                <tr v-for="employee in busDrivers" v-bind:key="employee.uid">
                    <td>{{employee.uid}}</td>
                    <th>{{employee.name}}</th>
                    <td>{{employee.email}}</td>
                    <td>{{employee.license}}</td>
                    <td>
                        <a v-bind:href="'#employee-'+ employee.uid" class="icon modal-trigger">
                            <span class="icon">
                                <Eye :size="19"/>
                            </span> 
                        </a>
                    </td>
                    <td>
                        <a href="#" class="icon">
                            <span class="icon"><DeleteOutline :size="19"/></span> 
                        </a>
                    </td>
                </tr> 
                </tbody>
            </table>
        </div>

        <div id="jeep" class="tab-content col s12" >
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>License Number</th>
                    <th></th>
                    <th></th>
                </tr>
                </thead>

                <tbody>
                <tr v-for="employee in jeepDrivers" v-bind:key="employee.uid">
                    <td>{{employee.uid}}</td>
                    <th>{{employee.name}}</th>
                    <td>{{employee.email}}</td>
                    <td>{{employee.license}}</td>
                    <td>
                        <a v-bind:href="'#employee-'+ employee.uid" class="icon modal-trigger">
                            <span class="icon"><Eye :size="19"/></span> 
                        </a>
                    </td>
                    <td>
                        <a href="#" class="icon">
                            <span class="icon"><DeleteOutline :size="19"/></span> 
                        </a>
                    </td>
                </tr> 
                </tbody>
            </table>
        </div>

        <div id="conductor" class="tab-content col s12" >
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>License Number</th>
                    <th></th>
                    <th></th>
                </tr>
                </thead>

                <tbody>
                <tr v-for="employee in conductors" v-bind:key="employee.uid">
                    <td>{{employee.uid}}</td>
                    <th>{{employee.name}}</th>
                    <td>{{employee.email}}</td>
                    <td>{{employee.license}}</td>
                    <td>
                        <a v-bind:href="'#employee-'+ employee.uid" class="icon modal-trigger">
                            <span class="icon"><Eye :size="19"/></span> 
                        </a>
                    </td>
                    <td>
                        <a href="#" class="icon">
                            <span class="icon"><DeleteOutline :size="19"/></span> 
                        </a>
                    </td>
                </tr> 
                </tbody>
            </table>
        </div>

        <ViewEmployeeModal v-for="employee in busDrivers" :key="'employee-'+employee.uid" :id="'employee-'+ employee.uid" :employee="employee"/>
        <AddEmployeeModal/>
    </div>
</template>

<script>
import db from './firebase/firebaseInit'
import Eye from 'vue-material-design-icons/BorderColor.vue';
import DeleteOutline from 'vue-material-design-icons/DeleteOutline.vue'
import AddEmployeeModal from '@/components/partials/AddEmployeeModal'
import ViewEmployeeModal from '@/components/partials/ViewEmployeeModal'
import M from 'materialize-css'

export default {
    name: 'employees',
    components:{
        Eye,
        DeleteOutline,
        AddEmployeeModal,
        ViewEmployeeModal
    } ,
    data(){
        return{
            employees: [],
            busDrivers: [],
            jeepDrivers: [],
            conductors: []
        }
    },
    created(){
        const busDriversCollection = db.collection('employees').where('type', '==', 'Bus Driver')
        const jeepDriversCollection = db.collection('employees').where('type', '==', 'Jeepney Driver')
        const conductorsCollection = db.collection('employees').where('type', '==', 'Conductor')

        busDriversCollection.onSnapshot( snap => {
            snap.docChanges().forEach( change => {
                if(change.type === 'added'){
                    const data = {
                        'uid': change.doc.id,
                        'name': change.doc.data().fname + ' ' + change.doc.data().lname,
                        'license': change.doc.data().license_number,
                        'email': change.doc.data().email
                    }

                    this.busDrivers.push(data)
                    this.employees.push(data)
                }
            })
        })

        jeepDriversCollection.onSnapshot( snap => {
            snap.docChanges().forEach( change => {
                if(change.type === 'added'){
                    const data = {
                        'uid': change.doc.id,
                        'fname': change.doc.data().fname,
                        'lname': change.doc.data().lname,
                        'name': change.doc.data().fname+" "+change.doc.data().lname,
                        'phone_num': change.doc.data().phone_number,
                        'license': change.doc.data().license_number,
                        'email': change.doc.data().email
                    }

                    this.jeepDrivers.push(data)
                    this.employees.push(data)
                }
            })
        })

        conductorsCollection.onSnapshot( snap => {
            snap.docChanges().forEach( change => {
                if(change.type === 'added'){
                    const data = {
                        'uid': change.doc.id,
                        'name': change.doc.data().fname + ' ' + change.doc.data().lname,
                        'license': change.doc.data().license_number,
                        'email': change.doc.data().email
                    }

                    this.conductors.push(data)
                    this.employees.push(data)
                }
            })
        })

    },
    updated(){
        // waits the modals to be rendered before initializing the component
        this.$nextTick(() => M.AutoInit())
    }
}
</script>