import Vue from 'vue'
// import Router from 'vue-router'
import Router from '../router-own'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
Vue.use(Router);// 使用Vue-Router插件
 // 创建Vue-router实例，将实例注入到main.js中
  const routes= [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: About,
      children: [
        {
          path: 'a', component: {
            render(h) {return <h1>about A</h1>}
          }
        },
        {
          path: 'b', component: {
            render(h) {return <h1>about B</h1>}
          }
        }
      ]
    }
  ]
export default new Router({
  routes
})

