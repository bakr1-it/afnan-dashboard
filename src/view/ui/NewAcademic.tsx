import Input from "../components/Input";


export default function NewAcademic() {
  
  return (
<>
 <div className="title-ui">
  <h1>Create New Academic</h1>
 </div>
       <form action="" method="post" className="form form-create-new-user">
                  <div className="form-group">
                     <Input label="name"/>
                  </div>
                  <div className="form-group">
                     <Input label="email" typeInput="email"/>
                  </div>
                  <div className="form-group">
                     <Input label="password" typeInput="password"/>
                  </div>
         
         
                  </form>

</>
  )
}
