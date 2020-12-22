<template>
    <div id="add-operator" class="modal">
        <div class="modal-content">
            <h4>Add an Operator</h4>
            <div class="row">
                <form class="col s12" @submit.prevent="addOperator">
                    <div class="row">
                        <div class="input-field col s6">
                            <input id="new_first_name" type="text" class="validate" v-model="operator.fname" required>
                            <label for="new_first_name">First Name</label>
                        </div>
                        <div class="input-field col s6">
                            <input id="new_last_name" type="text" class="validate" v-model="operator.lname" required>
                            <label for="new_last_name">Last Name</label>
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-field col s12">
                            <input id="new_email" type="email" class="validate" v-model="operator.email" required>
                            <label for="new_email">Email</label>
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-field col s12">
                            <input id="new_phone" type="text" class="validate" v-model="operator.phoneNum" required>
                            <label for="new_phone">Phone Number</label>
                        </div>
                    </div>
                    <div class="input-field col s12">
                        <select v-model="operator.type" required>
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

export default {
    data(){
        return{
            operator:{
                fname: null,
                lname: null,
                email: null,
                phoneNum: null,
                type: null,
                password: 'P@ssw0rd'
            }
        }
    },
    methods:{
        addOperator(){
            db.collection('operators').add({
                deleted: false,
                email: this.operator.email,
                fname: this.operator.fname,
                lname: this.operator.lname,
                type: this.operator.type,
                phone_number: this.operator.phoneNum
            })
        }
    }
}
</script>

<style lang="scss">
    #add-operator.modal-footer{
        margin-bottom: 4em;
        a{
            &:nth-child(2){
                margin-right:2em ;
            }
        }
    }
</style>
