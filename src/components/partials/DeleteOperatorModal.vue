<template>
    <div class="modal">
        <div class="modal-content">
            <table>
                        
            <h4>Delete {{operator.name}}?</h4>
            <div class="row">
                
            </div>
        </table>
        </div>
        <div class="modal-footer">
            <a href="#!" class="modal-close waves-effect waves-green btn-flat">Cancel</a>
            <button class="modal-close waves-effect waves-green btn white-text red" v-on:click="deleteOperator">Delete</button>
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
        deleteOperator(){
            db.collection('operators').doc(this.operator.uid).update({
                'deleted': true,
            }).then(()=>{
                    location.reload();
                }
            )
        }
    },
}
</script>