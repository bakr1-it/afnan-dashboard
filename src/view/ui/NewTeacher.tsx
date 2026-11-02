import MailFmail from "../components/MailFmail";
import ListSelect from "../components/ListSelect";
import { PhoneInput } from 'react-international-phone';
import Input from "../components/Input";
import 'react-international-phone/style.css';
import React, { useEffect, useState } from 'react';
import { listCountryWithIso } from "../constants/country";
export default function NewTeacher() {
    const [phone, setPhone] = useState('');
     const [country ,setCountry]= useState('');


 const handelChangecountry= (ev:React.ChangeEvent<HTMLSelectElement>)=>{
setCountry(ev.target.value);
}
  return (
     <>
     <div className="title-ui">
  <h1>Create New Teacher</h1>
 </div>
  <form action="" method="post" className="form form-create-new-user">
            <div className="form-group">
               <Input label="name"/>
            </div>
            <div className="form-group">
               <Input label="email" typeInput="email"/>
            </div>
            <div className="form-group">
               <Input label="password" typeInput="password" />
            </div>
            <div className="form-group">
                  <PhoneInput
                  className="input-phone"
                  defaultCountry="eg"
                  value={phone}
                  
                  onChange={(phone) => setPhone(phone)}
                  />
            </div>
            <div className="form-group">
              <ListSelect dataObj={listCountryWithIso} label="Country" selectData={country} setSelectData={handelChangecountry}/>
            </div>
            <div className="form-group">
              <ListSelect dataObj={listCountryWithIso} label="languages" selectData={country} setSelectData={handelChangecountry}/>
            </div>
            <div className="form-group">
              <ListSelect dataObj={listCountryWithIso} label="Academic" selectData={country} setSelectData={handelChangecountry}/>
            </div>
            <div className="form-group">
                 <MailFmail />
            </div>
            
            


        </form>
                  </>
      
  )
}
