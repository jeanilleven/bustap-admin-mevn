<template>
    <div class="modal">
        <div class="modal-content">
            <table>
                        
            <h4>Delete {{vehicle.bus_code}}?</h4>
            <div class="row">
                
            </div>
        </table>
        </div>
        <div class="modal-footer">
                <button class="btn white-text red" v-on:click="deleteVehicle">Delete</button>
            <a href="#!" class="modal-close waves-effect waves-green btn-flat">Cancel</a>
        </div>
    </div>
</template>
<style lang="scss">
.customLabel {
    color: rgb(180, 180, 180);

}
</style>
<script>
import db from '../firebase/firebaseInit'

import M from 'materialize-css'
// import { Router } from 'express';

export default {
    props: ['vehicle'],
    components: {
    },
    data(){
        return{
            schedules: []
        }
    },
    methods: {
        
        deleteVehicle: function(){
            db.collection('buses').doc(this.vehicle.uid).update({
                'deleted': true
            }).then(()=>{
                    location.reload();
                }
            );
        }
    },
    created(){

        M.updateTextFields()
    }
}
</script>