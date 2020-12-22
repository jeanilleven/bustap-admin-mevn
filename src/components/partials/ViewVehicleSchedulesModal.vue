<template>
    <div class="modal">
        
        <div class="modal-content">
            <!-- TABLE -->
            <div v-if="mode == 'table'">
                
                <table>
                    <h4>
                        <strong>{{vehicle.bus_code}}</strong> Schedules
                        <button v-on:click="moveToAdd" class="btn-flat cyan white-text">
                            <span class="icon">
                                Add Schedule
                            </span> 
                        </button>
                    </h4>
                    <div class="row">
                        <table>
                            <thead>
                                <th>ID</th>
                                <th>Terminal</th>
                                <th>Time</th>
                                <th>Actions</th>
                            </thead>
                            <tr v-for="schedule in schedules" v-bind:key="schedule.uid">
                                <td>
                                    {{schedule.uid}}
                                </td>
                                <th>
                                    {{schedule.terminal_code}}
                                </th>
                                <td>{{schedule.datetime.toDate()}}</td>
                                <td>
                                    <button @click="moveToEdit(schedule.uid, schedule.terminalObject)" :id="'udpate-schedule-'+ schedule.uid">
                                        <span class="icon"><Eye :size="19"/></span> 
                                    </button>
                                    <button v-on:click="moveToDelete" :id="'delete-schedule-'+ schedule.uid">
                                        <div>
                                            <span class="icon"><DeleteOutline :size="19"/></span> 

                                        </div>
                                    </button>
                                </td>
                            </tr> 
                        </table>
                    </div>        
                </table>
            </div>  

            <!-- DELETE -->
            <div v-if="mode == 'delete'">
                
                <div class="modal-content">
                    <table>
                        <div class="row">
                            <h4>Delete Schedule?</h4>
                        <button class="btn white-text red" v-on:click="deleteSchedule">Delete</button>
                            <div class="input-field col s12">
                            </div>
                        </div>
                    </table>
                </div>
                
                <div class="input-field col s12">
                    <button class="btn-flat black-text pl-4" v-on:click="moveToTable">Cancel Delete</button>
                </div>
            </div>

            <!-- ADD -->
            <div v-if="mode == 'add'">
                
                <h4>Add <strong>{{vehicle.bus_code}}</strong> Schedule</h4>
                <div class="row">
                    <input type="datetime-local" :id="'add-datetime-'+vehicle.uid">
                </div>
                <div class="input-field col s12">
                    <select class="browser-default" style="display:block" name="select-terminal" :id="'add-terminal-'+vehicle.uid">
                        <option v-for="terminal in terminals" v-bind:key="'options-'+terminal.uid" :value="terminal.uid">{{terminal.station_number}}</option>
                    </select>
                </div>
                    
                <div class="input-field col s12">
                    <button class="btn-flat white-text pl-4 red" v-on:click="moveToTable">Cancel Add</button>
                    <button style="margin-left: 10px" class="btn-flat white-text pl-4 green" v-on:click="addSchedule">Add Schedule</button>
                </div>
            </div>

            <!-- EDIT -->
            <div v-if="mode == 'edit'">
                <UpdateScheduleModal :vehicle="vehicle" :terminals="terminals" v-bind="currentSchedule"/>
                    
                <div class="input-field col s12">
                    <button class="btn-flat white-text pl-4 red" v-on:click="moveToTable">Cancel Add</button>
                    <button style="margin-left: 10px" class="btn-flat white-text pl-4 green" v-on:click="addSchedule">Add Schedule</button>
                </div>
            </div>
        </div>
        <div class="modal-footer">
            <a href="#!" class="modal-close waves-effect waves-green btn-flat" v-on:click="moveToTable">Close Schedules</a>
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

import UpdateScheduleModal from '@/components/partials/UpdateScheduleModal.vue';

import db from '../firebase/firebaseInit'
import M from 'materialize-css'
// import { Router } from 'express';

var uid = '';
// var currentSchedule;
function checkTerminalId(terminal) {
    // if(terminal.uid === uid){
    //     console.log(terminal.uid +' === ' + uid);
    // }
    return terminal.uid === uid;
}

function checkScheduleId(schedule) {
    console.log(schedule.uid + ' === ' + uid);
    return schedule.uid === uid;
}

export default {
    props: ['vehicle'],
    components: {
        Eye,
        DeleteOutline,
        
        // DeleteScheduleModal,
        UpdateScheduleModal
    },
    data(){
        return{
            mode: 'table',
            currentSchedule: {},
            currentTerminal: {},
            // currentSchedule: '',
            schedules: [],
            terminals: []
        }
    },
    methods: {
        moveToTable: function(){
            this.mode = 'table';
        },
        moveToEdit: function(scheduleUID, termObject){
            // console.log(event.target.parentNode.parentNode.parentNode.parentNode.id.replace('udpate-schedule-', ''));
            // uid =       event.target.parentNode.parentNode.parentNode.parentNode.id.replace('udpate-schedule-', '');
            uid = scheduleUID;
            this.currentSchedule = this.schedules.find(checkScheduleId);

            console.log('EDITING CURRENT SCHEDULE: ');
            console.log(this.currentSchedule);
            this.currentTerminal = termObject;
            console.log('WITH CURRENT TERMINAL: ');
            console.log(this.currentTerminal);

            this.mode = 'edit';

        },
        moveToAdd: function(){
            this.mode = 'add';
        },
        moveToDelete: function(){
            console.log(event.target.parentNode.parentNode.parentNode.parentNode.id.replace('delete-schedule-', ''));
            uid = event.target.parentNode.parentNode.parentNode.parentNode.id.replace('delete-schedule-', '');
            this.currentSchedule = this.schedules.find(checkScheduleId);
            console.log('DELETING CURRENT SCHEDULE');
            console.log(this.currentSchedule);
            this.mode = 'delete';
        },
        addSchedule: function(){
            var currentVehicle = this.vehicle;
            var dateTime = new Date(document.getElementById('add-datetime-'+this.vehicle.uid).value);
            uid = document.getElementById('add-terminal-'+this.vehicle.uid).value;
            var terminal = this.terminals.find(checkTerminalId);
            console.log('CURRENT VEHICLE: ' + currentVehicle.uid);
            console.log('DATETIME: ' + dateTime);
            console.log('TERMINAL: '+ terminal);
            db.collection('busSchedules').add({
                'datetime': dateTime,
                'deleted': false,
                'terminal_code': terminal.station_number,
                'terminal_id': db.collection('terminals').doc(terminal.uid),
                'type': currentVehicle.type,
                'vehicle_code': currentVehicle.bus_code,
                'vehicle_id': db.collection('buses').doc(currentVehicle.uid)
            });
            this.moveToTable();
        },
        deleteSchedule: function(){
            db.collection('busSchedules').doc(this.currentSchedule.uid).update({
                'deleted': true
            }).then(()=>{
                    location.reload();
                    // router.push('/vehicles');
                }
            );
        },
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
                            'datetime': doc.data().datetime,
                            'terminalObject': this.terminals.find(checkTerminalId)
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
        // $(document).ready(function() {
        //     $('select').material_select();
        // });
    }
}
</script>