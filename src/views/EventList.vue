<template>
  <div>
    <h1>Events Listing</h1>
    <event-card
      v-for="event in events"
      :key="event.id"
      :event="event"
    ></event-card>
    <!-- <BaseIcon /> -->
  </div>
</template>
<script>
import EventCard from "@/components/EventCard";
import EventService from "@/services/EventService";
export default {
  components: {
    EventCard,
  },
  data() {
    return {
      events: [],
    };
  },
  created() {
    EventService.getEvents()
      .then((response) => {
        console.log(response.data);
        this.events = response.data;
      })
      .catch((error) => {
        console.log("Axios Error in EventList: ", error.response);
      });
  },
};
</script>

<style></style>
