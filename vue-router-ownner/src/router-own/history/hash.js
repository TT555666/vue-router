import History from './base'

export default class HashHistory extends History{
    constructor(router){
        super(router)
        ensureSlash()
    }
    getCurrentLocation(){
        return getHash()
    }
    setupListener(){
        window.addEventListener('hashchange',()=>{
            this.transitionTo(getHash())
        })
    }
    push(location){
        window.location.hash = location
        // this.transitionTo(location)
    }
}
function ensureSlash(){
    if(window.location.hash){
        return
    }
    window.location.hash = '/'
}
function getHash(){
    return window.location.hash.slice(1)
}