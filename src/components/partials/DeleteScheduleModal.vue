<template>
    <div class="modal">
        <div class="modal-content">
            <table>
                        
            <h4>Delete Schedule?</h4>
            <div class="row">
                
                <div class="input-field col s12">
                </div>
            </div>
        </table>
        </div>
        <div class="modal-footer">
            <button class="btn white-text red" v-on:click="deleteSchedule">Delete</button>
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
    props: ['schedule'],
    components: {
    },
    data(){
        return{
            schedules: []
        }
    },
    methods: {
        deleteSchedule: function(){
            db.collection('busSchedules').doc(this.schedule.uid).update({
                'deleted': true
            }).then(()=>{
                    location.reload();
                    // router.push('/vehicles');
                }
            );
        }
    },
    created(){
        M.updateTextFields()
    }
}
</script>