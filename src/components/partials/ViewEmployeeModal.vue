<template>
    <div class="modal">
        <div class="modal-content">
            <h4>Employee Details</h4>
            <div class="row">
                <form class="col s12" @submit.prevent>
                    <div class="row">
                        <div class="input-field col s6">
                            <input id="first_name" type="text" class="validate" :value="employee.fname">
                            <label for="first_name">First Name</label>
                        </div>
                        <div class="input-field col s6">
                            <input id="last_name" type="text" class="validate" :value="employee.lname">
                            <label for="last_name">Last Name</label>
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-field col s12">
                            <input id="new_license" type="text" class="validate" :value="employee.license" required>
                            <label for="new_license">License Number</label>
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-field col s12">
                            <input id="new_email" type="email" class="validate" :value="employee.email" required>
                            <label for="new_email">Email</label>
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-field col s12">
                            <input id="new_phone" type="text" class="validate" :value="employee.phone_num" required>
                            <label for="new_phone">Phone Number</label>
                        </div>
                    </div>
                    <div class="input-field col s12">
                        <select v-model="employee.type" :selected="employee.type" required>
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
            <a href="#!" class="modal-close waves-effect waves-green btn-flat">close</a>
        </div>
    </div>
</template>

<script>
// import db from '../firebase/firebaseInit'
import M from 'materialize-css'

export default {
    props: ['employee'],
    created(){
        M.updateTextFields()
    }
}
</script>

