<template>
    <div class="modal">
        <div class="modal-content">
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
                                <td>{{schedule.datetime}}</td>
                                <td>
                                    <a v-bind:href="'#view-'+ schedule.uid" class="icon modal-trigger">
                                        <span class="icon"><Eye :size="19"/></span> 
                                    </a>
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
            <div v-if="mode == 'delete'">
                <DeleteScheduleModal :schedule="currentSchedule"/>
                
                <div class="input-field col s12">
                    <button class="btn-flat black-text pl-4" v-on:click="moveToTable">Cancel Delete</button>
                </div>
            </div>
            <div v-if="mode == 'add'">
                
                <h4>Add <strong>{{vehicle.bus_code}}</strong> Schedule</h4>
                <div class="row">
                    <input type="date">
                </div>
                    <a class='dropdown-trigger btn' href='#' data-target='dropdown1'>Drop Me!</a>

                    <!-- Dropdown Structure
                    <ul id='dropdown1' class='dropdown-content'>
                        <li v-for="terminal in terminals" v-bind:key="'options-'+terminal.uid" :value="terminal.uid"><a href="">{{terminal.station_number}}</a></li>
                    </ul> -->

                    <!-- Dropdown Trigger -->
                    <a class='dropdown-trigger btn' href='#' data-target='dropdown1'>Drop Me!</a>

                    <!-- Dropdown Structure -->
                    <ul id='dropdown1' class='dropdown-content'>
                        <li><a href="#!">one</a></li>
                        <li><a href="#!">two</a></li>
                        <li class="divider" tabindex="-1"></li>
                        <li><a href="#!">three</a></li>
                        <li><a href="#!"><i class="material-icons">view_module</i>four</a></li>
                        <li><a href="#!"><i class="material-icons">cloud</i>five</a></li>
                    </ul>
                <div class="input-field col s12">
                    <button class="btn-flat black-text pl-4" v-on:click="moveToTable">Cancel Add</button>
                </div>
            </div>
        </div>
        <div class="modal-footer">
            <a href="#!" class="modal-close waves-effect waves-green btn-flat">Close Schedules</a>
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
        
        DeleteScheduleModal,
    },
    data(){
        return{
            mode: 'table',
            currentSchedule: {},
            // currentSchedule: '',
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
        moveToDelete: function(){
            console.log(event.target.parentNode.parentNode.parentNode.parentNode.id.replace('delete-schedule-', ''));
            uid = event.target.parentNode.parentNode.parentNode.parentNode.id.replace('delete-schedule-', '');
            this.currentSchedule = this.terminals.find(checkScheduleId);
            console.log('CURRENT SCHEDULE');
            console.log(this.currentSchedule);
            this.mode = 'delete';
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
        
        document.addEventListener('DOMContentLoaded', function() {
            var elem = document.querySelector('.dropdown-trigger');
            var instance = M.Dropdown.getInstance(elem);

            instance.open()
        });
        // $(document).ready(function() {
        //     $('select').material_select();
        // });
    }
}
</script>