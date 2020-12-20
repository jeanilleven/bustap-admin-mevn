<template>
    <div class="container">
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
            <td>view-icon</td>
            <td>bin-icon</td>
          </tr> 
        </tbody>
      </table>
    </div>
</template>

<script>
import db from './firebase/firebaseInit'
export default {
    name: 'terminals',
    data(){
        return{
            terminals: []
        }
    },
    created(){
        db.collection('terminals').get().then(querSnapshot => {
            querSnapshot.forEach(doc => {
                const data = {
                    'uid': doc.id,
                    'station_number': doc.data().station_number,
                    'name': doc.data().name,
                }

                this.terminals.push(data)
            })
        })
    }
}
</script>