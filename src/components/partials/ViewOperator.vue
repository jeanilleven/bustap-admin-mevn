<template>
    <div class="modal">
        <div class="modal-content">
            <h4>Operator Details</h4>
            <div class="row">
                <form class="col s12" @submit.prevent>
                    <div class="row">
                        <div class="input-field col s6">
                            <input id="first_name" type="text" class="validate" :value="operator.fname">
                            <label for="first_name">First Name</label>
                        </div>
                        <div class="input-field col s6">
                            <input id="last_name" type="text" class="validate" :value="operator.lname">
                            <label for="last_name">Last Name</label>
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-field col s12">
                            <input id="email" type="email" class="validate" :value="operator.email">
                            <label for="email">Email</label>
                        </div>
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
    props: ['operator'],
    created(){
        M.updateTextFields()
    }
}
</script>

