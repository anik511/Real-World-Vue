<template>
  <form @submit.prevent="submit" :class="{ error: $v.email.$error }">
    <input
      type="email"
      placeholder="Enter email"
      v-model="email"
      @blur="$v.email.$touch()"
    />
    <div v-if="$v.email.$error" class="errorMessage">
      <p v-if="!$v.email.email">Please enter a valid email</p>
      <p v-if="!$v.email.required">Email is required</p>
    </div>
    <button :disabled="$v.$invalid" type="submit">submit</button>
    <p v-if="$v.$anyError" class="errorMessage">
      Please fill out the required fileds
    </p>
  </form>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'
export default {
  data() {
    return {
      email: null
    }
  },
  validations: {
    email: {
      required,
      email
    }
  },
  methods: {
    submit() {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        console.log('Form Submited:', this.email)
      }
    }
  }
}
</script>

<style scoped>
.error input {
  border: 1px solid red !important;
}
</style>
