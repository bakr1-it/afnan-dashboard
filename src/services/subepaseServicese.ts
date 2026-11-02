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
export async function getTable(tableName:string){
    const {error,data} = await supabase
    .from(tableName)
    .select("*")
    if(error) throw error;
    return data;
}
export async function getTableTeacher() {
  const { data, error } = await supabase
    .from("teachers")
    .select(`
      *,
      academies (
        name
      )
    `);

  if (error) {
    console.error("Error fetching teachers with academy:", error.message);
    throw error;
  }

  return data;
}

export async function getTeacherNameId() {
  const { data, error } = await supabase
    .from("teachers")
    .select("id, name");

  if (error) {
    console.error("Error fetching teachers list:", error.message);
    throw error;
  }

  return data;
}