<template>
  <div class="container">
    <CoinsList />
  </div>
</template>

<script>
import CoinsList from '@/components/CoinsList';

export default {
  components: { CoinsList }
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
</style>
