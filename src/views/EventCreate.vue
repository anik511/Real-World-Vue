<template>
  <div>
    <h1>Create an Event</h1>
    <form @submit.prevent="newEvent">
      <BaseSelect
        label="Select a category"
        :options="categories"
        v-model="event.category"
        class="field"
        :class="{ error: $v.event.category.$error }"
        @blur="!$v.event.category.$touch()"
      />
      <template v-if="$v.event.category.$error">
        <p v-if="!$v.event.category.required" class="errorMessage">
          Category is required
        </p>
      </template>

      <h3>Name & describe your event</h3>
      <BaseInput
        label="Title"
        v-model="event.title"
        type="text"
        placeholder="Title"
        class="field"
        :class="{ error: $v.event.title.$error }"
        @blur="!$v.event.title.$touch()"
      />
      <template v-if="$v.event.title.$error">
        <p v-if="!$v.event.title.required" class="errorMessage">
          Title is required
        </p>
      </template>
      <BaseInput
        label="Description"
        v-model="event.description"
        type="text"
        placeholder="Add a description"
        class="field"
        :class="{ error: $v.event.description.$error }"
        @blur="!$v.event.description.$touch()"
      />
      <template v-if="$v.event.description.$error">
        <p v-if="!$v.event.description.required" class="errorMessage">
          Description is required
        </p>
      </template>
      <h3>Where is your event?</h3>
      <BaseInput
        label="Location"
        v-model="event.location"
        type="text"
        placeholder="Add a location"
        class="field"
        :class="{ error: $v.event.location.$error }"
        @blur="!$v.event.location.$touch()"
      />
      <template v-if="$v.event.location.$error">
        <p v-if="!$v.event.location.required" class="errorMessage">
          Location is required
        </p>
      </template>
      <h3>When is your event?</h3>

      <div class="field">
        <label>Date</label>
        <datepicker
          v-model="event.date"
          placeholder="Select a date"
          :input-class="{ dateerror: $v.event.date.$error }"
          @opened="$v.event.date.$touch()"
        />
      </div>
      <template v-if="$v.event.date.$error">
        <p v-if="!$v.event.date.required" class="errorMessage">
          Date is required
        </p>
      </template>

      <BaseSelect
        label="Select a time"
        :options="times"
        v-model="event.time"
        class="field"
        :class="{ error: $v.event.time.$error }"
        @blur="!$v.event.time.$touch()"
      />
      <template v-if="$v.event.time.$error">
        <p v-if="!$v.event.time.required" class="errorMessage">
          Time is required
        </p>
      </template>
      <!-- <label class="typo__label">Select a time</label>
      <multiselect
        :options="times"
        v-model="event.time"
        :searchable="false"
        :close-on-select="false"
        :show-labels="false"
        :allow-empty="false"
        placeholder="Pick a value"
      ></multiselect> -->

      <!-- <input type="submit" class="button" value="Submit" /> -->
      <BaseButton
        style="margin-top:20px"
        type="submit"
        buttonClass="-fill-gradient"
        :disabled="$v.$anyError"
        >Submit</BaseButton
      >
      <p v-if="$v.$anyError" class="errorMessage">
        Please fill out the required field(s).
      </p>
    </form>
  </div>
</template>

<script>
// import Multiselect from 'vue-multiselect'
import Datepicker from 'vuejs-datepicker'
import { mapActions } from 'vuex'
import NProgress from 'nprogress'
import { required } from 'vuelidate/lib/validators'

export default {
  components: {
    Datepicker
    // Multiselect
  },
  data() {
    const times = []
    for (let i = 1; i <= 24; i++) {
      times.push(i + ':00')
    }
    return {
      times,
      categories: this.$store.state.categories,
      event: this.createFreshEventObject()
    }
  },
  validations: {
    event: {
      category: { required },
      title: { required },
      description: { required },
      location: { required },
      date: { required },
      time: { required }
    }
  },
  methods: {
    newEvent() {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        NProgress.start()
        this.createEvent(this.event)
          .then(() => {
            this.createFreshEventObject()
            this.$router.push({
              name: 'event-show',
              params: { id: this.event.id }
            })
          })
          .catch(() => {
            NProgress.done()
            console.log('There was a problem creating event')
          })
      }
    },
    createFreshEventObject() {
      const user = this.$store.state.user.user
      const id = Math.floor(Math.random() * 10000000)
      return {
        id: id,
        user: user,
        category: '',
        organizer: user,
        title: '',
        description: '',
        location: '',
        date: '',
        time: '',
        attendees: []
      }
    },
    ...mapActions('event', ['createEvent'])
  }
}
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style scoped>
/* @import '../../node_modules/vue-multiselect/dist/vue-multiselect.min.css'; */
.filed {
  margin-bottom: 24px;
}
.dateerror {
  border: 1px solid red !important;
}
</style>
