<template>
  <div>
    <h1>Uh-Oh!!!</h1>
    <h3>It looks like you are having some network issue.</h3>
    <router-link :to="{ name: 'event-list' }">Back to home page</router-link>
  </div>
</template>

<script>
export default {}
</script>

<style></style>
