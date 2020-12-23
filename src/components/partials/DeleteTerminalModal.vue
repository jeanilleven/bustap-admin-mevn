<template>
    <div class="modal">
        <div class="modal-content">
            <table>
                        
            <h4>Delete {{terminal.station_number}}?</h4>
            <div class="row">
                
            </div>
        </table>
        </div>
        <div class="modal-footer">
            <a href="#!" class="modal-close waves-effect waves-green btn-flat">Cancel</a>
            <button class="btn white-text red" v-on:click="deleteTerminal">Delete</button>
        </div>
    </div>
</template>
<script>
import db from '../firebase/firebaseInit'
import M from 'materialize-css'


export default {
    props: ['terminal'],
    created(){
        M.updateTextFields()
    },
    methods: {
        deleteTerminal:function(){
            db.collection('terminals').doc(this.terminal.uid).update({
                'deleted': true,
            }).then(()=>{
                    // console.log(terminalCode, terminalName);
                    location.reload();
                }
            );
        },
    },
}
</script>