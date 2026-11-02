import Alert from "@mui/material/Alert";
import { AnimatePresence, motion } from "motion/react"
import { useEffect } from "react";
interface TypePropsAlertSuccess{
    type:string,
    message:string,
    isShow:boolean,
    onClose:()=>void,

}

export default function AlertSuccess({type,message,isShow,onClose}:TypePropsAlertSuccess) {

useEffect(()=>{
if(!isShow) return;
const time= setTimeout(() => {
  onClose();
}, 5000);
return ()=>clearTimeout(time);
},[isShow])
  return (
       <AnimatePresence initial={false}>
        
                {isShow ? (
                    <motion.div
                     className="container-alert-success"
          initial={{ opacity: 0, x: "50%" }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: "50%" }}
          key="box"
        >

       

          <Alert variant="filled"  severity={type} className="">
         {message} 
      </Alert>

        </motion.div>
    ) : null}
            </AnimatePresence>
  )
}
