<template>
    <div class="modal">
        <div class="modal-content">
            <h4>Operator Details</h4>
            <div class="row">
                <form class="col s12" @submit.prevent="updateOperator">
                    <div class="row">
                        <div class="input-field col s6">
                            <input id="first_name" type="text" class="validate"  v-model="operator.fname">
                            <label for="first_name">First Name</label>
                        </div>
                        <div class="input-field col s6">
                            <input id="last_name" type="text" class="validate"  v-model="operator.lname">
                            <label for="last_name">Last Name</label>
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-field col s12">
                            <input id="email" type="email" class="validate"  v-model="operator.email">
                            <label for="email">Email</label>
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-field col s12">
                            <input id="new_phone" type="text" class="validate"  v-model="operator.phoneNum">
                            <label for="new_phone">Phone Number</label>
                        </div>
                    </div>
                    <div class="input-field col s12">
                        <select v-model="operator.type">
                            <option value="Bus">Bus</option>
                            <option value="Jeepney">Jeepney</option>
                        </select>
                        <label>Operator Type</label>
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
import M from 'materialize-css'

export default {
    props: ['operator'],
    created(){
        M.updateTextFields()
    },
    methods: {
        updateOperator(){
            db.collection('operators').doc(this.operator.uid).update({
                email: this.operator.email,
                fname: this.operator.fname,
                lname: this.operator.lname,
                type: this.operator.type,
                phone_number: this.operator.phoneNum
            }).then(()=>{
                    location.reload();
            })
        }
    }
}
</script>

