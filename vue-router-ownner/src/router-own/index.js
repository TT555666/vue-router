import install from "./install";
import createMatcher from "./create-matcher";
import HashHistory from "./history/hash";

export default class VueRouter {
  constructor(options) {
    this.matcher = createMatcher(options.routes || []);
    this.history = new HashHistory(this);
    this.beforeHooks = [];
  }
  init(app) {
    const history = this.history;
    history.listen((route) => {
      // 需要更新_route属性
      app._route = route;
    });
    const setupHashListener = () => {
      history.setupListener();
    };
    history.transitionTo(history.getCurrentLocation(), setupHashListener);
  }
  match(location) {
    return this.matcher.match(location);
  }
  push(location, onComplete) {
    this.history.push(location);
  }
  beforeEach(fn) {
    // 将fn注册到队列中
    this.beforeHooks.push(fn);
  }
}

VueRouter.install = install;
