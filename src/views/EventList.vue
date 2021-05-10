<template>
  <div>
    <h1>Events for {{ user.user.name }}</h1>
    <event-card
      v-for="event in event.events"
      :key="event.id"
      :event="event"
    ></event-card>
    <!-- <BaseIcon /> -->
    <template v-if="page != 1">
      <router-link
        :to="{ name: 'event-list', query: { page: page - 1 } }"
        rel="prev"
        >Previous</router-link
      > </template
    >|
    <template v-if="event.totalEvents > page * 3">
      <router-link
        :to="{ name: 'event-list', query: { page: page + 1 } }"
        rel="next"
        >Next</router-link
      >
    </template>
  </div>
</template>
<script>
import EventCard from '@/components/EventCard'
import { mapState } from 'vuex'
import store from '@/store/store'

function getPageEvents(routeTo, next) {
  let currentPage = parseInt(routeTo.query.page) || 1
  store
    .dispatch('event/fetchEvents', {
      page: currentPage
    })
    .then(() => {
      routeTo.params.page = currentPage
      next()
    })
}
export default {
  props: {
    page: {
      type: Number,
      required: true
    }
  },
  components: {
    EventCard
  },
  beforeRouteEnter(routeTo, routeFrom, next) {
    getPageEvents(routeTo, next)
  },
  beforeRouteUpdate(routeTo, routeFrom, next) {
    getPageEvents(routeTo, next)
  },
  computed: {
    ...mapState(['event', 'user'])
  }
}
</script>

<style></style>
