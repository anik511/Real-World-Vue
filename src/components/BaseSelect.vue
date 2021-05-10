<template>
  <div>
    <label v-if="label">{{ label }}</label>
    <select
      :value="value"
      @input="updateValue"
      v-bind="$attrs"
      v-on="$listeners"
    >
      <option
        v-for="option in options"
        :key="option"
        :selected="option === value"
        >{{ option }}</option
      >
    </select>
  </div>
</template>

<script>
import { formFildMixin } from '../mixins/formFildMixins'
export default {
  mixins: [formFildMixin],
  props: {
    options: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>
.error select {
  border: 1px solid red !important;
}
</style>
