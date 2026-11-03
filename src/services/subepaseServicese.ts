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

export async function getRowCount(tableName: string) {
  const { count, error } = await supabase
    .from(tableName)
    .select("*", { count: "exact", head: true });

  if (error) {
    console.error(`Error fetching count for ${tableName}:`, error.message);
    throw error;
  }

  return count ?? 0;
}
export async function getStudentsWithTeacherAndReel() {
  const { data, error } = await supabase
    .from("users")
    .select(`
      id,
      name,
      email,
      phone_number,
      is_male,
      teacher_id,
      country,
      language_code,
      is_new_muslim,
      birth_date,
      city,
      last_reels_id,
      created_at,
      teachers (
        id,
        name
      ),
      student_level_progress (
      level_id,
        progress,
        stars,
        is_completed,
        is_unlocked,
        tours (
    name,
    ar_name,
    order
  )
    ),
      reels (
        id,
        title
      )
    `);

  if (error) {
    console.error("Error fetching students data:", error.message);
    throw error;
  }

  return data;
}

export async function getTeacherStudentCounts() {
  const { data: teachers, error: tErr } = await supabase
    .from("teachers")
    .select("id, name");

  if (tErr) throw tErr;

  const { data: users, error: uErr } = await supabase
    .from("users")
    .select("teacher_id");

  if (uErr) throw uErr;

  const counts: Record<string, number> = {};
  users?.forEach((u) => {
    if (u.teacher_id) {
      counts[u.teacher_id] = (counts[u.teacher_id] || 0) + 1;
    }
  });

  return (teachers || []).map((t) => ({
    name: t.name,
    studentCount: counts[t.id] || 0,
  }));
}

