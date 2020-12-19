<template>
    <div class="container">
        <table>
        <thead>
          <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Type</th>
              <th></th>
              <th></th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="employee in employees" v-bind:key="employee.uid">
            <td>{{employee.uid}}</td>
            <th>{{employee.name}}</th>
            <td>{{employee.email}}</td>
            <td>{{employee.type}}</td>
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
    name: 'employees',
    data(){
        return{
            employees: []
        }
    },
    created(){
        db.collection('employees').get().then(querSnapshot => {
            querSnapshot.forEach(doc => {
                const data = {
                    'uid': doc.id,
                    'name': doc.data().fname + ' ' + doc.data().lname,
                    'type': doc.data().type,
                    'email': doc.data().email
                }

                this.employees.push(data)
            })
        })
    }
}
</script>