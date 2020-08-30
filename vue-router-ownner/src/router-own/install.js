import View from "../router-own/components/view";
import Link from "../router-own/components/link";
export let _Vue;
export default function install(Vue) {
  _Vue = Vue;
  Vue.mixin({
    beforeCreate() {
      if (this.$options.router) {
        this._routerRoot = this;
        this._router = this.$options.router;
        this._router.init(this); 
        Vue.util.defineReactive(this, "_route", this._router.history.current);
      } else {
        this._routerRoot = this.$parent && this.$parent._routerRoot||this;  
      }
    },
  });
  // 仅仅是为了更加方便
  Object.defineProperty(Vue.prototype, "$route", {
    // 每个实例都可以获取到$route属性
    get() {
      return this._routerRoot._route;
    },
  });
  Object.defineProperty(Vue.prototype, "$router", {
    // 每个实例都可以获取router实例
    get() {
      return this._routerRoot._router;
    },
  });
  Vue.component('RouterView',View)
  Vue.component('RouterLink', Link)

}
