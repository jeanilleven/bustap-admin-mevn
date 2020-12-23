<template>
  <div id="add-employee" class="modal">
        <div class="modal-content">
            <h4>Add an Employee</h4>
            <div class="row">
                <form class="col s12" @submit.prevent="addEmployee">
                    <div class="row">
                        <div class="input-field col s6">
                            <input id="new_first_name" type="text" class="validate" v-model="employee.fname" required>
                            <label for="new_first_name">First Name</label>
                        </div>
                        <div class="input-field col s6">
                            <input id="new_last_name" type="text" class="validate" v-model="employee.lname" required>
                            <label for="new_last_name">Last Name</label>
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-field col s12">
                            <input id="new_license" type="text" class="validate" v-model="employee.license" required>
                            <label for="new_license">License Number</label>
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-field col s12">
                            <input id="new_email" type="email" class="validate" v-model="employee.email" required>
                            <label for="new_email">Email</label>
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-field col s12">
                            <input id="new_phone" type="text" class="validate" v-model="employee.phoneNum" required>
                            <label for="new_phone">Phone Number</label>
                        </div>
                    </div>
                    <div class="input-field col s12">
                        <select v-model="employee.type" required>
                            <option value="Bus Driver">Bus Driver</option>
                            <option value="Jeepney Driver">Jeepney Driver</option>
                            <option value="Conductor">Conductor</option>
                        </select>
                        <label>Employee Type</label>
                    </div>
                    <div class="modal-footer">
                        <a href="#!" class="modal-close waves-effect waves-green btn-flat cyan-text text-accent-4">close</a>
                        <button type="submit"  class="modal-close waves-effect waves-cyan btn cyan accent-4">save</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import db from '../firebase/firebaseInit'

export default {
    data(){
        return{
            employee:{
                fname: null,
                lname: null,
                email: null,
                phoneNum: null,
                type: null,
                license: null,
                password: 'P@ssw0rd'
            }
        }
    },
    methods:{
        addEmployee(){
            db.collection('employees').add({
                deleted: false,
                email: this.employee.email,
                fname: this.employee.fname,
                lname: this.employee.lname,
                type: this.employee.type,
                phone_number: this.employee.phoneNum,
                license_number: this.employee.license
            })
        }
    }
}
</script>

<style lang="scss">
    #add-employee.modal-footer{
        margin-bottom: 4em;
        a{
            &:nth-child(2){
                margin-right:2em ;
            }
        }
    }
</style>
