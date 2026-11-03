

export function vaildatedBeforeSend(payload:Record<string,any>[]){
    const newError:Record<string,string>={};
Object.entries(payload).forEach(([key,value])=>{
const empty = value === undefined || value === null || (typeof value === "string" && value.trim() === "");
    if(empty)
newError[key]=`${key} is Requred`;
    
})
return newError;
}
export function converTimeToDate(date:Date){
    if(!date) return;
    const now= new Date(date);
    return `${now.getFullYear()}/${now.getMonth() +1}/${now.getDate()}`;
    
}