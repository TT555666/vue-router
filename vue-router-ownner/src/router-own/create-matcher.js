import createRouteMap from './create-route-map'
import { createRoute } from './history/utils'
export default function createMatcher(routes){
    let {pathList,pathMap}  = createRouteMap(routes)
    function addRoutes(routes){
        createRouteMap(routes,pathList,pathMap)
    }
    function match(location){
        let record = pathMap[location]
        if(record){
            return createRoute(record,{
                path:location
            })
        }
        return createRoute(null,{
            path:location
        })
    }

    return {
        addRoutes,
        match
    }
}