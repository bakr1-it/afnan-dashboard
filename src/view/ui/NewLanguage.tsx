import React from 'react'
import Input from '../components/Input'
import RadioButton from "../components/RadioButton";
export default function NewLanguage() {
  return (
<>
 <div className="title-ui">
  <h1>Create New Lnaguage</h1>
 </div>
       <form action="" method="post" className="form form-create-new-user">
                  <div className="form-group">
                     <Input label="name"/>
                  </div>
                  <div className="form-group">
                     <Input label="code" typeInput="text"/>
                  </div>
                  <div className="form-group">
                    <RadioButton label="Active" value='is_active'/>
                  </div>
                  </form>

</>
  )
}
