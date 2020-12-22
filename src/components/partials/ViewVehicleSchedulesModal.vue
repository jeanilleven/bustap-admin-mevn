<template>
    <div class="modal">
        <div class="modal-content">
            <div v-if="mode == 'table'">
                <button v-on:click="moveToDelete">Move to Delete</button>
                <table>
                    <h4>{{vehicle.bus_code}} Schedules</h4>
                    <div class="row">
                        <table>
                            <thead>
                                <th>Terminal</th>
                                <th>Time</th>
                                <th>Actions</th>
                            </thead>
                            <tr v-for="schedule in schedules" v-bind:key="schedule.uid">
                                <td>
                                    <!-- {{schedule.terminal_code}} -->
                                    <form action=""> 
                                        <select name="terminal-options" id="select">
                                            <option v-for="terminal in terminals" v-bind:key="'options-'+terminal.uid" :value="terminal.uid">{{terminal.station_number}}</option>
                                        </select>   

                                    </form>
                                </td>
                                <td>{{schedule.datetime}}</td>
                                <td>
                                    <a v-bind:href="'#view-'+ schedule.uid" class="icon modal-trigger">
                                        <span class="icon"><Eye :size="19"/></span> 
                                    </a>
                                    <button v-on:click="moveToDelete" :id="'delete-schedule'+ schedule.uid">
                                        <span class="icon"><DeleteOutline :size="19"/></span> 
                                    </button>
                                </td>
                            </tr> 
                        </table>
                    </div>        
                </table>
            </div>  
            <div v-if="mode == 'delete'">
                <DeleteScheduleModal v-for="schedule in schedules"  :key="'delete-schedule-'+schedule.uid" :id="'delete-schedule-'+ schedule.uid" :schedule="schedule"/>
                
                <div class="input-field col s12">
                    <button class="btn-flat black-text pl-4" v-on:click="moveToTable">Cancel</button>
                </div>
            </div>
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

var uid = '';
var currentSchedule;
function checkTerminalId(terminal) {
    // if(terminal.uid === uid){
    //     console.log(terminal.uid +' === ' + uid);
    // }
  return terminal.uid === uid;
}
function checkScheduleId(schedule) {
    // if(terminal.uid === uid){
    //     console.log(terminal.uid +' === ' + uid);
    // }
  return schedule.uid === uid;
}
export default {
    props: ['vehicle'],
    components: {
        Eye,
        DeleteOutline,
        
        DeleteScheduleModal,
    },
    data(){
        return{
            mode: 'table',
            currentSched: '',
            schedules: [],
            terminals: []
        }
    },
    methods: {
        moveToTable: function(){
           this.mode = 'table';
        },
        moveToEdit: function(){
           this.mode = 'edit';
        },
        moveToAdd: function(){
           this.mode = 'add';
        },
        moveToDelete: function(event){
            console.log(event.target.id);
            currentSchedule = this.terminals.find(checkTerminalId);
            this.mode = 'delete';
        }
    },
    created(){            
        db.collection('terminals').get().then(querSnapshot => {
            querSnapshot.forEach(doc => {
                if(doc.exists){
                    const data = {
                        'uid': doc.id,
                        'station_number': doc.data().station_number,
                    }
                    this.terminals.push(data)
                }
            })
            db.collection('busSchedules').get().then(querSnapshot => {
                querSnapshot.forEach(doc => {
                    if(doc.exists && doc.data().vehicle_id.path == this.vehicle.docRef.path && doc.data().deleted == false){
                        uid = doc.data().terminal_id.path.replace('terminals/','');
                        // console.log(uid);
                        const data = {
                            'uid': doc.id,
                            // 'terminal_code': doc.data().terminal_code,
                            'terminal_code': (this.terminals.find(checkTerminalId) != null)?this.terminals.find(checkTerminalId).station_number:'not_found',
                            'datetime': doc.data().datetime.toDate()
                        }
                        this.schedules.push(data)
                    }
                })
                if(querSnapshot.empty){
                    console.log('no document found');
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