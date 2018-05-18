<template>
  <div>
    <h1>Please Wait</h1>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {  
  name: 'wait',
  data () {
    return {
      room: ''
      // status: false,
    }
  },
  computed: {
    ...mapState([
      'status'
    ])
  }, 
  created () {
   let data = localStorage.getItem('player')
   this.room = JSON.parse(data).roomName
   this.$store.dispatch('getStatusRoom', this.room)
  },
  watch : {
    status () {
      // this.status = this.$store.state.status
      if (this.status === true) {
        this.$router.push('gameplay')
      }
    }
  }
}
</script>

<style>

</style>
