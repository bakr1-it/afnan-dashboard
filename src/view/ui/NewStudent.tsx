import Input from "../components/Input";
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import React, { useEffect, useState } from 'react';
import { Country, City }  from 'country-state-city';
import ListSelect from "../components/ListSelect";
import AutoCompliate from "../components/AutoCompliate";
export default function NewStudent() {
   const [phone, setPhone] = useState('');
   const [country ,setCountry]= useState('');
   const [listCity,setListCity]=useState<string[]>([]);
   const [selectCity,setSelectCity]=useState('');
let countryIsoCode : Record<string,string>={};
Country.getAllCountries().forEach((c)=>{
   countryIsoCode[c.isoCode]=`${c.flag} ${c.name}`;
})

const handelChangecountry= (ev:React.ChangeEvent<HTMLSelectElement>)=>{
setCountry(ev.target.value);
const iso = ev.target.value;
 setListCity( City.getCitiesOfCountry(iso)?.map((c)=>c.name) || []);
} 
const handelChangeCity = (ev:React.SyntheticEvent, value :string | null)=>{
 setSelectCity(value || "")
}




   return (
    
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
              <ListSelect dataObj={countryIsoCode} label="Country" selectData={country} setSelectData={handelChangecountry}/>
            </div>
            <div className="form-group">
              <AutoCompliate disable={country==""} data={listCity} label="City" selectData={selectCity} setSelectData={handelChangeCity}/>
            </div>
            <div className="form-group">
              <ListSelect dataObj={countryIsoCode} label="Teacher" selectData={country} setSelectData={handelChangecountry}/>
            </div>
            <div className="form-group">
              <ListSelect dataObj={countryIsoCode} label="languages" selectData={country} setSelectData={handelChangecountry}/>
            </div>
            <div className="form-group">
                    <Input  typeInput="date" />
            

            </div>

        </form>
      
    
  )
}
