<template>
    <div class="modal">
        <div class="modal-content">
            <h4>Employee Details</h4>
            <div class="row">
                <form class="col s12" @submit.prevent>
                    <div class="row">
                        <div class="input-field col s6">
                            <input :id="'first_name-'+employee.uid" type="text" class="validate" :value="employee.fname">
                            <label for="first_name">First Name</label>
                        </div>
                        <div class="input-field col s6">
                            <input :id="'last_name-'+employee.uid" type="text" class="validate" :value="employee.lname">
                            <label for="last_name">Last Name</label>
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-field col s12">
                            <input :id="'license-'+employee.uid" type="text" class="validate" :value="employee.license" required>
                            <label for="license">License Number</label>
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-field col s12">
                            <input :id="'email-'+employee.uid" type="email" class="validate" :value="employee.email" required>
                            <label for="email">Email</label>
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-field col s12">
                            <input :id="'phone-'+employee.uid" type="text" class="validate" :value="employee.phone_num" required>
                            <label for="phone">Phone Number</label>
                        </div>
                    </div>
                    <div class="input-field col s12">
                        <select :value="employee.type" required :id="'type-'+employee.uid">
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
          var fname = document.getElementById('first_name-'+this.employee.uid).value
          var lname = document.getElementById('last_name-'+this.employee.uid).value
          var email = document.getElementById('email-'+this.employee.uid).value
          var phone_num = document.getElementById('phone-'+this.employee.uid).value
          var license = document.getElementById('license-'+this.employee.uid).value
          var type = document.getElementById('type-'+this.employee.uid).value

          console.log(fname)
          console.log(lname)
          console.log(email)
          console.log(phone_num)
          console.log(license)
          console.log(type)
          db.collection('employees').doc(this.employee.uid).update({
            'fname': fname, 
            'lname': lname,
            'license_number': license,
            'email': email, 
            'phone_number': phone_num, 
            'type': type
          }).then(()=>{
              location.reload();
            }
          )
        }
    },
}
</script>

