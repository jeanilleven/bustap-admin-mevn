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
import DeleteOutline from 'vue-material-design-icons/DeleteOutline.vue';
import Eye from 'vue-material-design-icons/Eye.vue';
import db from '../firebase/firebaseInit'

import M from 'materialize-css'
// import { Router } from 'express';

export default {
    props: ['vehicle'],
    components: {
        Eye,
        DeleteOutline
    },
    data(){
        return{
            schedules: []
        }
    },
    methods: {
    },
    created(){
        console.log(this.vehicle.docRef.path);
        db.collection('busSchedules').get().then(querSnapshot => {
        // db.collection('schedules').where('vehicle_id', '==', this.vehicle.docRef.path).get().then(querSnapshot => {
            querSnapshot.forEach(doc => {
                if(doc.exists){
                const data = {
                    'uid': doc.id,
                    // 'terminal_code': doc.data().terminal_id.get().then(docSnapshot => docSnapshot.data().station_number),
                    'terminal_code': doc.data().terminal_code,
                    'datetime': doc.data().datetime.toDate()
                }
                // doc.data().terminal_id.get().then(docSnapshot=>{
                // //         var hello = docSnapshot.data();
                //         console.log(docSnapshot.data()['station_number']);
                //         this.schedules.find((data)=>{return doc.id == data.id}).terminal_code = docSnapshot.data()['station_number'];
                //     })
                this.schedules.push(data)
                }
            })
            if(querSnapshot.empty){
                console.log('no document found');
            }
        })

        M.updateTextFields()
    }
}
</script>