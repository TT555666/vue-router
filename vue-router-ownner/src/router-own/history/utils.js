export function createRoute(record, location) { // {path:'/',matched:[record,record]}
    let res = [];
    if (record) { // 如果有记录 
        while(record){
            res.unshift(record); // 就将当前记录的父亲放到前面
            record = record.parent
        }
    }
    return {
        ...location,
        matched: res
    }
}