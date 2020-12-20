<template>
    <div class="container operator-container" style="margin-top:3em;">
        <div class="row">
            <div class="col s12">
                <ul class="tabs">
                <li class="tab col s3"><a href="#bus" class="black-text">Bus</a></li>
                <li class="tab col s3"><a href="#jeep"  class="black-text" >Jeep</a></li>
                </ul>
            </div>
            <div id="bus" class="tab-content col s12" >
                <table >
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr v-for="operator in busOperators" v-bind:key="operator.uid">
                            <td>{{operator.uid}}</td>
                            <th>{{operator.name}}</th>
                            <td>{{operator.email}}</td>
                            <td>
                                <a v-bind:href="'#'+operator.uid" class="icon modal-trigger">
                                    <span class="icon"><Bus :size="19"/></span> 
                                </a>
                            </td>
                            <td>
                                <a href="#" class="icon">
                                    <span class="icon"><Employee :size="19"/></span> 
                                </a>
                            </td>
                            <td>
                                <a href="#" class="icon">
                                    <span class="icon"><Eye :size="19"/></span> 
                                </a>
                            </td>
                            <td>
                                <a href="#" class="icon">
                                    <span class="icon"><DeleteOutline :size="19"/></span> 
                                </a>
                            </td>
                        </tr> 
                    </tbody>
            </table>
        </div>

        <div  id="jeep" class="tab-content col s12" >
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="operator in jeepOperators" v-bind:key="operator.uid">
                            <td>{{operator.uid}}</td>
                            <th>{{operator.name}}</th>
                            <td>{{operator.email}}</td>
                            <td>
                                <a v-bind:href="'#'+operator.uid" class="icon modal-trigger">
                                    <span class="icon"><Bus :size="19"/></span> 
                                </a>
                            </td>
                            <td>
                                <a href="#" class="icon">
                                    <span class="icon"><Employee :size="19"/></span> 
                                </a>
                            </td>
                            <td>
                                <a href="#" class="icon">
                                    <span class="icon"><Eye :size="19"/></span> 
                                </a>
                            </td>
                            <td>
                                <a href="#" class="icon">
                                    <span class="icon"><DeleteOutline :size="19"/></span> 
                                </a>
                            </td>
                        </tr> 
                </tbody>
            </table>
        </div>
      </div>

      <!-- <VehicleModal v-bind:id="'1'"/> -->
      <VehicleModal class="v-modal" v-for="operator in busOperators" :key="operator.uid" :id="operator.uid" :operator="operator"/>
      <VehicleModal v-for="operator in jeepOperators" :key="operator.uid" :id="operator.uid" :operator="operator"/>

      <!-- <div v-for="element in operators" v-bind:key="element.uid">
          <VehicleModal v-bind:operator="element" v-bind:id="element.uid"/>
      </div> -->
    </div>
</template>

<script>
import Bus from 'vue-material-design-icons/Bus.vue';
import Employee from 'vue-material-design-icons/AccountTie.vue';
import Eye from 'vue-material-design-icons/Eye.vue';
import DeleteOutline from 'vue-material-design-icons/DeleteOutline.vue';
import VehicleModal from '@/components/partials/VehicleModal'
import db from './firebase/firebaseInit'
export default {
    name: 'operators',
    components: {
        Bus,
        Employee,
        Eye,
        DeleteOutline,
        VehicleModal
    },
    data(){
        return{
            operators: [],
            busOperators: [],
            jeepOperators: []
        }
    },
    created(){
        db.collection('operators').where('type', '==', 'Bus').get().then(querSnapshot => {
            querSnapshot.forEach(doc => {
                const data = {
                    'uid': doc.id,
                    'name': doc.data().fname + ' ' + doc.data().lname,
                    'email': doc.data().email
                }

                this.busOperators.push(data)
            })
        })
        db.collection('operators').where('type', '==', 'Jeepney').get().then(querSnapshot => {
            querSnapshot.forEach(doc => {
                const data = {
                    'uid': doc.id,
                    'name': doc.data().fname + ' ' + doc.data().lname,
                    'email': doc.data().email
                }

                this.jeepOperators.push(data)
            })
        })
    },
    mounted() {
        const MyComponentConstructor = Vue.extend(MyComponent);
        const vm = new MyComponentConstructor();
        vm.$mount('#some-place');
    }
}
</script>

<style>

</style>