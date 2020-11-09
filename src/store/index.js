import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
    count: 0,
    login: {
        path: '/login',
        name: 'login',
        params: {
            token: 2
        }
    }
}
export default new Vuex.Store({
    state
})
