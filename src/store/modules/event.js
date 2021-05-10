import EventService from "@/services/EventService"

export const namespaced = true
export const state = {
    events: [],
    totalEvents: null,
    event:{},
    perPage: 3
  }
  export const mutations = {
    ADD_EVENT(state, event){
      state.events.push(event)
    },
    SET_EVENTS(state, response){
      state.events = response.events
      state.totalEvents = response.totalEvents
    },
    SET_EVENT(state, event){
      state.event = event
    }
  }
  export const actions = {
    createEvent({commit, dispatch}, event){
      return EventService.postEvent(event).then(()=>{
        commit('ADD_EVENT', event)
        const notification = {
          type: 'success',
          message: 'Your event has been created!'
        }
        dispatch('notification/add', notification, {root:true})
      }).catch(error =>{
        const notification = {
          type: 'error',
          message: 'There was an error in creating event: '+error.message
        }
        dispatch('notification/add', notification, {root:true})
        throw error
      })
      
    },
    fetchEvents({commit, dispatch, state},{page}){
      return EventService.getEvents(state.perPage, page)
      .then((response) => {
        console.log(response.data);
        commit('SET_EVENTS',{events: response.data, totalEvents: response.headers['x-total-count'] })
      })
      .catch((error) => {
        const notification = {
          type: 'error',
          message: 'There was an error in fetching events: '+error.message
        }
        dispatch('notification/add', notification, {root:true})
      });
    },
    fetchEvent({commit, getters}, id){
      var event = getters.getEventById(id)
      if(event){
        commit('SET_EVENT', event)
        return event
      }else{
        return EventService.getEvent(id)
        .then((response) => {
          console.log(response.data);
          commit('SET_EVENT', response.data)
          return response.data
        })
        
      }
    }
  }
  export const getters = {
    getEventById: state=> id =>{
      return state.events.find(event => event.id === id)
    }
  }