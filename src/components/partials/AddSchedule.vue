<template>
    <div>
        <div>
            <table>   
                <h4>Add Schedule</h4>
                <div class="row">
                    <form class="col s12" @submit.prevent>
                    </form>
                </div>
            </table>
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
    methods: {
        add: function(){
            db.collection('busSchedules').add({
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