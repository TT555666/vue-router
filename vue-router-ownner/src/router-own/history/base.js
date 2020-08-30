import { createRoute } from "./utils";
export default class History {
  constructor(router) {
    this.router = router;
    this.current = createRoute(null, { path: "/" });
    this.cb = null;
  }
  transitionTo(location, onComplete) {
    // 跳转到这个路径
    let route = this.router.match(location);
    // if (location === this.current.path && route.matched.length === this.current.matched.length) {
    //     return
    // }
    if(this.router.beforeHooks){
      let queue = [].concat(this.router.beforeHooks);
      const iterator = (hook, next) => {
          hook(route,this.current,()=>{ // 分别对应用户 from，to，next参数
              next();
          });
      }
      runQueue(queue, iterator, () => { // 依次执行队列 ,执行完毕后更新路由
          this.updateRoute(route);
          onComplete && onComplete();
      });
    }
    this.updateRoute(route); // 更新路由即可
    onComplete && onComplete();
  
}
  updateRoute(route) {
    this.current = route;
    this.cb && this.cb(route);
  }
  listen(cb) {
    this.cb = cb;
  }

}

function runQueue(queue, iterator, cb) {
  function step(index) {
    if (index >= queue.length) {
      cb();
    } else {
      let hook = queue[index];
      iterator(hook, () => {
        step(index + 1);
      });
    }
  }
  step(0);
}
