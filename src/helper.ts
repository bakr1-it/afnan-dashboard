

export function vaildatedBeforeSend(payload:Record<string,any>[]){
    const newError:Record<string,string>={};
Object.entries(payload).forEach(([key,value])=>{
    if(!value)
newError[key]=`${key} is Requred`;
    
})
return newError;
}
export function converTimeToDate(date:Date){
    const now= new Date(date);
    return `${now.getFullYear()}/${now.getMonth() +1}/${now.getDate()}`;
    
}