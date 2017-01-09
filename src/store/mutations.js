import Vue from 'vue'
import * as types from './mutation-types'

export default {
  [types.CHANGE_LANGUAGE] (state, { lang }){
    Vue.config.lang = state.lang = lang
  },

	[types.SHOW_POPUP_LOADING](state, action) {
		state.content = action
	},
	[types.HIDE_POPUP_LOADING](state, action) {
		state.content = ''
	}
}
