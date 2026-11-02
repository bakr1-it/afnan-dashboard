
import Input from "../components/Input";
import { useRef, useState, type SyntheticEvent } from "react";
import inserRow from "../../services/subepaseServicese";
import  IconLoad from "../components/IconLoad";
import AlertSuccess from "../components/AlertSuccess";


export default function NewAcademic() {
  const refName= useRef<HTMLInputElement>(null) as React.RefObject<HTMLInputElement>;
  const refEmail=  useRef<HTMLInputElement>(null) as React.RefObject<HTMLInputElement>;
  const refPassword=  useRef<HTMLInputElement>(null) as React.RefObject<HTMLInputElement>;
  const [isLoading,setIsLoading]= useState(false);
  const [showAlert,setShowAlert]= useState({typeAlert:"",message:"",isShow:false});
  const [errors,setErros] = useState(
   {email:"", name:"",password:''}
  );
  

   function handelOnSubmit(ev :SyntheticEvent<HTMLFormElement> ){
   ev.preventDefault();
const payload= {
   name:refName.current.value,
   email:refEmail.current.value,
   password:refPassword.current.value,
}
const newError :Record<string,any>={};;
if(!payload.name) newError["name"]="Name is Required";
if(!payload.email) newError["email"]="email is Required";
if(!payload.password) newError["password"]="password is Required";
setErros(newError);

if(Object.keys(newError).length >0){
   return;
}

setIsLoading(true);

inserRow({tableName:"academies",payload:payload})
.then((data)=>{
      setShowAlert({typeAlert:"success",  message: 'Academic '+''+data.data.name + 'created has been success' , isShow:true});  
      refEmail.current.value="";
      refName.current.value="";
      refPassword.current.value="";

}).catch((error)=>{
      setShowAlert({typeAlert:"error",message:error.message , isShow:true});
}).finally(()=>{
   setIsLoading(false);
})


  }
  return (
<>
 <div className="title-ui">
  <h1>Create New Academic</h1>
 </div>
       <form action="" method="post" className="form form-create-new-user" onSubmit={handelOnSubmit}>
                  <div className="form-group">
                     <Input label="name" ref={refName}/>
                     <p className="error">{errors.name}</p>
                  </div>
                  <div className="form-group">
                     <Input label="email" typeInput="email" ref={refEmail}/>
                     <p className="error">{errors.email}</p>
                  </div>
                  <div className="form-group">
                     <Input label="password" typeInput="password" ref={refPassword}/>
                     <p className="error">{errors.password}</p>
                  </div>
                  <div className="button-submit">

                 
                  <button className="btn btn-submite" disabled={isLoading} > {isLoading? <IconLoad />  :"create"}</button>
                  </div>

                 
         <AlertSuccess type={showAlert.typeAlert} message={showAlert.message} isShow={showAlert.isShow} onClose={()=> setShowAlert((prev)=>({...prev , isShow:false}))}/>
         
                  </form>

</>
  )
}
