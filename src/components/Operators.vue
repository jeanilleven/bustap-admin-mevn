<template>
    <div class="container">
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
          <tr v-for="operator in operators" v-bind:key="operator.uid">
            <td>{{operator.uid}}</td>
            <th>{{operator.name}}</th>
            <td>{{operator.email}}</td>
            <td>bus-icon</td>
            <td>driver-icon</td>
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
    name: 'operators',
    data(){
        return{
            operators: []
        }
    },
    created(){
        db.collection('operators').get().then(querSnapshot => {
            querSnapshot.forEach(doc => {
                const data = {
                    'uid': doc.id,
                    'name': doc.data().fname + ' ' + doc.data().lname,
                    'email': doc.data().email
                }

                this.operators.push(data)
            })
        })
    }
}
</script>