<template>
    <div class="modal">
        <div class="modal-content">
            <table>
                        
            <h4>{{vehicle.bus_code}} Schedules</h4>
            <div class="row">
                <table>
                    <thead>
                        <th>ID</th>
                        <th>Terminal</th>
                        <th>Time</th>
                        <th>Actions</th>
                    </thead>
                    <tr v-for="schedule in schedules" v-bind:key="schedule.uid">
                        <td>{{schedule.uid}}</td>
                        <th><input type="text" :value="schedule.terminal_code" disabled></th>
                        <td>{{schedule.datetime}}</td>
                        <td>
                            <a v-bind:href="'#operator-'+ schedule.uid" class="icon modal-trigger">
                                <span class="icon"><Eye :size="19"/></span> 
                            </a>
                            <a v-bind:href="'#delete-schedule-'+ schedule.uid" class="icon modal-trigger">
                                <span class="icon"><DeleteOutline :size="19"/></span> 
                            </a>
                        </td>
                    </tr> 
                </table>
            </div>
        </table>
        <DeleteScheduleModal v-for="schedule in schedules" :key="'delete-schedule-'+schedule.uid" :id="'delete-schedule-'+ schedule.uid" :schedule="schedule"/>
        </div>
        <div class="modal-footer">
            <a href="#!" class="modal-close waves-effect waves-green btn-flat">close</a>
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

import DeleteScheduleModal from '@/components/partials/DeleteScheduleModal.vue';

import db from '../firebase/firebaseInit'
import M from 'materialize-css'
// import { Router } from 'express';

export default {
    props: ['vehicle'],
    components: {
        Eye,
        DeleteOutline,
        
        DeleteScheduleModal,
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
                if(doc.exists && doc.data().vehicle_id.path == this.vehicle.docRef.path && doc.data().deleted == false){
                console.log(doc.data().vehicle_id.path + '=='+ this.vehicle.docRef.path )
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