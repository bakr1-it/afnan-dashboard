import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getStudentProgressById } from "../../services/subepaseServicese";

export interface StudentProgressData {
  level_id: string;
  progress: number;
  stars: number;
  is_completed: boolean;
  is_unlocked: boolean;
  updated_at: string;
  tours: {
    id: string;
    name: string;
    ar_name: string;
    order: number;
  };
}
const postionNode= [60,-60];
export default function LevelNode() {
  const { levelId } = useParams();
  const [dataLevel, setDataLevel] = useState<StudentProgressData[]>([]);

  useEffect(() => {
    getStudentProgressById(levelId ?? "")
      .then((data) => {
        
        setDataLevel(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [levelId]);
const getIndexPostion =  (num:number)=>{
  return postionNode[num % postionNode.length ];

}

  return (
    <div className="pt-4 pb-10  w-full flex flex-col items-center gap-2 overflow-x-hidden scroll-smooth">
      {dataLevel.map((item,idx) => {
const currentIndex=getIndexPostion(idx);
const nextIndex = getIndexPostion(idx+1);
const postionX = nextIndex- currentIndex ; 
const lastIndex = idx == dataLevel.length-1;
return (


  <div key={item.level_id} className="level-node" 
      style={{ transform: `translateX(${currentIndex}px)` }}>
          <div className="circle">
            <div className="circle-content text-center select-none">
              <h1>{item.tours?.ar_name || item.tours?.name}</h1>
              <p>{item.progress}%</p>
              <p>stars: {item.stars}</p>
              <p>{item.is_completed ? "مكتمل ": "غير مكتمل"}</p>
            </div>
          </div>

{!lastIndex && 
          <div className="line">
            <svg className="overflow-visible w-2 h-2">
              <path
                d={`m 0 0 l ${postionX} 260`}
                stroke="#0F766E"
                strokeWidth="4"
                strokeDasharray="6 6"
                strokeLinecap="round"
                />
            </svg>
          </div>
              }
        </div>
  )
    }
      )}
    </div>
  );
}