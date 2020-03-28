import Vue from "vue";
import Vuex from "vuex";
import { $resource } from "./resource";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    profile: {},
    pins: []
  },
  mutations: {
    setProfile(state, profile) {
      state.profile = profile;
    },
    setPins(state, pins) {
      state.pins = pins;
    },
    addPin(state, pin) {
      state.pins.push(pin);
    },
    removePin(state, pin) {
      // Breaks here
      let i = state.pins.findIndex(p => p._id == pin._id);
      if (i == -1) {
        return;
      }
      state.pins.splice(i, 1);
    }
  },
  actions: {
    async getProfile({ commit }) {
      let profile = await $resource.get("api/profile");
      commit("setProfile", profile);
    },

    async updateProfile({ commit }, update) {
      let profile = await $resource.put("api/profile", update);
      commit("setProfile", profile);
    },

    async getPins({ commit }) {
      let pins = await $resource.get("api/pins");
      commit("setPins", pins);
    },
    async createPin({ commit }, pinData) {
      let pin = await $resource.post("api/pins", pinData);
      pin.creator = pinData.creator;
      commit("addPin", pin);
    },
    async deletePin({ commit }, pin) {
      let pinToDelete = await $resource.delete("api/pins/" + pin._id);
      commit("removePin", pinToDelete);
    }
  },
  modules: {}
});
