// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

//全局样式
import '@/styles/index.scss'

//权限控制
import './permission'

//vuex
import store from './store'

//全局组件
import { LoadingPlugin, Cell, Group, XInput, XButton } from 'vux'

Vue.config.productionTip = false

Vue.use(LoadingPlugin)

Vue.component('cell', Cell)
Vue.component('group', Group)
Vue.component('x-input', XInput)
Vue.component('x-button', XButton)

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

//移除移动端页面点击延迟
//const FastClick = require('fastclick')
//FastClick.attach(document.body)