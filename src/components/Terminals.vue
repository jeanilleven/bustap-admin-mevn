<template>
    <div class="container">
        <div class="row">
            <div class="col s12">
                <ul class="tabs">
                     <li class="col s1 right"><a href="#add-terminal" class="black-cyan modal-trigger">Add</a></li>
                </ul>
            </div>
            <div id="terminals" class="tab-content col s12" >
                <table>
                    <thead>
                    <tr>
                        <th>Station Number</th>
                        <th>Name</th>
                        <th></th>
                        <th></th>
                    </tr>
                    </thead>

                    <tbody>
                    <tr v-for="terminal in terminals" v-bind:key="terminal.uid">
                        <td>{{terminal.station_number}}</td>
                        <th>{{terminal.name}}</th>
                        <td>
                            <a v-bind:href="'#terminal-'+ terminal.uid" class="icon modal-trigger">
                                <span class="icon"><Eye :size="19"/></span> 
                            </a>
                        </td>
                        <td>
                            <a v-bind:href="'#delete-'+ terminal.uid" class="icon modal-trigger">
                                <span class="icon"><DeleteOutline :size="19"/></span> 
                            </a>
                        </td>
                    </tr> 
                    </tbody>
                </table>
            </div>
        </div>
        <!-- view operator modals -->
        <DeleteTerminalModal v-for="terminal in terminals" :key="'delete-'+terminal.uid" :id="'delete-'+ terminal.uid" :terminal="terminal"/>
        <!-- view operator modals -->
        <ViewTerminal v-for="terminal in terminals" :key="'terminal-'+terminal.uid" :id="'terminal-'+ terminal.uid" :terminal="terminal"/>
        <!-- add terminal modal -->
        <AddTerminalModal/>
    </div>
</template>

<script>
import db from './firebase/firebaseInit'
import Eye from 'vue-material-design-icons/Eye.vue';
import DeleteOutline from 'vue-material-design-icons/DeleteOutline.vue';
import AddTerminalModal from '@/components/partials/AddTerminalModal';
import DeleteTerminalModal from '@/components/partials/DeleteTerminalModal'
import ViewTerminal from '@/components/partials/ViewTerminal'
import M from 'materialize-css';

export default {
    name: 'terminals',
    components: {
        Eye,
        DeleteOutline,
        AddTerminalModal,
        ViewTerminal,
        DeleteTerminalModal
    },
    data(){
        return{
            terminals: []
        }
    },
    created(){

        const terminalCollection = db.collection('terminals').where('deleted', '==', false)

        terminalCollection.onSnapshot( snap => {
            snap.docChanges().forEach( change => {
                if(change.type === 'added'){
                    const data = {
                        'uid': change.doc.id,
                        'station_number': change.doc.data().station_number,
                        'name':  change.doc.data().name,
                        'street': change.doc.data().street,
                        'city': change.doc.data().city,
                        'province': change.doc.data().province,
                        'country': change.doc.data().country,
                    }
                    this.terminals.push(data)
                }
            })
        })
        // db.collection('terminals').get().then(querSnapshot => {
        //     querSnapshot.forEach(doc => {
        //         const data = {
        //             'uid': doc.id,
        //             'station_number': doc.data().station_number,
        //             'name': doc.data().name,
        //         }
        //         this.terminals.push(data)
        //     })
        // })
    },
    updated(){
         this.$nextTick(() => M.AutoInit())
    }
}
</script>