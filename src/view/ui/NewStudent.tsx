import Input from "../components/Input";
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import React, { useEffect, useState } from 'react';
import {  City }  from 'country-state-city';
import ListSelect from "../components/ListSelect";
import AutoCompliate from "../components/AutoCompliate";
import MailFmail from "../components/MailFmail";
import RadioButton from "../components/RadioButton";
import { listCountryWithIso } from "../constants/country";
export default function NewStudent() {
   const [phone, setPhone] = useState('');
   const [country ,setCountry]= useState('');
   const [listCity,setListCity]=useState<string[]>([]);
   const [selectCity,setSelectCity]=useState('');


const handelChangecountry= (ev:React.ChangeEvent<HTMLSelectElement>)=>{
setCountry(ev.target.value);
const iso = ev.target.value;
 setListCity( City.getCitiesOfCountry(iso)?.map((c)=>c.name) || []);
} 
const handelChangeCity = (ev:React.SyntheticEvent, value :string | null)=>{
 setSelectCity(value || "")
}




   return (
      <>
         <div className="title-ui">
  <h1>Create New Student</h1>
 </div>
        <form action="" method="post" className="form form-create-new-user">
            <div className="form-group">
               <Input label="name"/>
            </div>
            <div className="form-group">
               <Input label="email" typeInput="email"/>
            </div>
            <div className="form-group">
               <Input label="Phone Number" />
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
              <AutoCompliate disable={country==""} data={listCity} label="City" selectData={selectCity} setSelectData={handelChangeCity}/>
            </div>
            <div className="form-group">
              <ListSelect dataObj={listCountryWithIso} label="Teacher" selectData={country} setSelectData={handelChangecountry}/>
            </div>
            <div className="form-group">
              <ListSelect dataObj={listCountryWithIso} label="languages" selectData={country} setSelectData={handelChangecountry}/>
            </div>
            <div className="form-group">
                    <Input  typeInput="date" />
            </div>
            <div className="form-group">
                 <MailFmail />
            </div>
            <div className="form-group">
                 <RadioButton label="Is New Muslim" value="is_new_muslim" />
            </div>
            


        </form>
      </>
      
    
  )
}
