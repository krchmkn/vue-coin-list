<template>
  <div class="container">
    <Table />
  </div>
</template>

<script>
import Table from '@/components/Table';

export default {
  components: { Table }
}
</script>

<style scoped>
  .container {
    margin: 0 auto;
    color: #333;
    min-width: 300px;
    max-width: 800px;
    padding: 25px;
    box-sizing: border-box;
  }

  h1 {
    font-size: 32px;
    font-weight: 100;
    padding: 10px;
    margin-bottom: 50px;
    text-transform: uppercase;
    color: #42b983;
  }
</style>
