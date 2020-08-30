import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false
router.beforeEach((to, from, next) => {
  if(to.path === '/'){
  console.log('next',next)

    next({path:'/about'})
  }
});
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
