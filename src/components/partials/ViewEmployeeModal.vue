<template>
    <div class="modal">
        <div class="modal-content">
            <h4>Employee Details</h4>
            <div class="row">
                <form class="col s12" @submit.prevent>
                    <div class="row">
                        <div class="input-field col s6">
                            <input id="first_name" type="text" class="validate" v-model="employee.fname">
                            <label for="first_name">First Name</label>
                        </div>
                        <div class="input-field col s6">
                            <input id="last_name" type="text" class="validate" v-model="employee.lname">
                            <label for="last_name">Last Name</label>
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-field col s12">
                            <input id="license" type="text" class="validate" v-model="employee.license" required>
                            <label for="license">License Number</label>
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-field col s12">
                            <input id="email" type="email" class="validate" v-model="employee.email" required>
                            <label for="email">Email</label>
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-field col s12">
                            <input id="phone" type="text" class="validate" v-model="employee.phone_num" required>
                            <label for="phone">Phone Number</label>
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
                </form>
            </div>
        </div>
        <div class="modal-footer">
            <a href="#!" class="modal-close waves-effect waves-green btn-flat">Close</a>
            <button type="submit" v-on:click="updateEmployee"  class="modal-close waves-effect waves-cyan btn cyan accent-4">Update</button>
        </div>
    </div>
</template>

<script>
import db from '../firebase/firebaseInit'
import M from 'materialize-css'

export default {
    props: ['employee'],
    created(){
      M.updateTextFields()
    },
    methods: {
        updateEmployee:function(){
          console.log(this.employee.lname)
          db.collection('employees').doc(this.employee.uid).update({
            'fname': this.employee.fname, 
            'lname': this.employee.lname,
            'license_number': this.employee.license,
            'email': this.employee.email, 
            'phone_number': this.employee.phone_num, 
            'type': this.employee.type.toString()
          });
        }
    },
}
</script>

