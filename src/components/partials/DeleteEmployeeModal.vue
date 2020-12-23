<template>
    <div class="modal">
        <div class="modal-content">
            <table>
                        
                <h4>Delete {{employee.fname}} {{employee.lname}}?</h4>
                <div class="row">
                
            </div>
            </table>
            </div>
            <div class="modal-footer">
                <a href="#!" class="modal-close waves-effect waves-green btn-flat">Cancel</a>
                <button class="btn white-text red modal-close" v-on:click="deleteEmployee">Delete</button>
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
        deleteEmployee:function(){
            db.collection('employees').doc(this.employee.uid).update({
                'deleted': true,
            }).then(()=>{
              location.reload()
            }
          );
        }
    },
}
</script>