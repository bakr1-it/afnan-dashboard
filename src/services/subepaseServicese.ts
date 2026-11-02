import { supabase } from "../supabaseClient"
interface paramType{
    tableName:string,
    payload : Record<string,any>,
}
export default async function inserRow({tableName , payload}:paramType){
const {error,data} = await supabase
.from(tableName)
.insert(payload)
.select()
.single();
if(error) throw error;
return {data};

}