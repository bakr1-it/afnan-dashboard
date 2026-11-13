import React, { useEffect, useMemo, useRef, useState, type SyntheticEvent } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import type { SelectChangeEvent } from "@mui/material/Select";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { City } from "country-state-city";
import Input from "../components/Input";
import ListSelect from "../components/ListSelect";
import AutoCompliate from "../components/AutoCompliate";
import MailFmail from "../components/MailFmail";
import Checked from "../components/Checked";
import IconLoad from "../components/IconLoad";
import AlertSuccess from "../components/AlertSuccess";
import { listCountryWithIso } from "../constants/country";
import { vaildatedBeforeSend } from "../../helper";
import { useAuth } from "../../context/AuthContext";
import { useAcademicLanguage } from "../../context/AcademicLnaguage";
import inserRow from "../../services/subepaseServicese";
import {useLanguageContext} from "../../context/LanguageContext";

interface alertTypeInfo {
  typeAlert: "success" | "error" | "warning" | "info";
  message: string;
  isShow: boolean;
}

export default function SignIn() {
  const {t}= useLanguageContext();
  const { profile } = useAuth();
  const navigate = useNavigate();
  const { academies, languagues, refreshTable } = useAcademicLanguage();

  useEffect(() => {
    refreshTable();
  }, []);

  const TypeAcademic = useMemo(() => {
    const academicMap: Record<string, string> = {};
    academies.forEach((academic) => {
      academicMap[academic.id] = academic.name;
    });
    return academicMap;
  }, [academies]);

  const languaguesType = useMemo(() => {
    const languageMap: Record<string, string> = {};
    languagues.forEach((lang) => {
      languageMap[lang.code] = lang.name;
    });
    return languageMap;
  }, [languagues]);

  const refName = useRef<HTMLInputElement>(null) as React.RefObject<HTMLInputElement>;
  const refEmail = useRef<HTMLInputElement>(null) as React.RefObject<HTMLInputElement>;
  const refPassword = useRef<HTMLInputElement>(null) as React.RefObject<HTMLInputElement>;
  const refChecked = useRef<HTMLInputElement>(null) as React.RefObject<HTMLInputElement>;
  const refIsNewMuslim = useRef<HTMLInputElement>(null) as React.RefObject<HTMLInputElement>;
  const refDate = useRef<HTMLInputElement>(null) as React.RefObject<HTMLInputElement>;

  const [value, setValue] = useState(0);
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [countryStudent, setCountryStudent] = useState("");
  const [selectAcademic, setSelectAcademic] = useState("");
  const [selectLang, setSelectLang] = useState("");
  const [listCity, setListCity] = useState<string[]>([]);
  const [selectCity, setSelectCity] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [showAlert, setShowAlert] = useState<alertTypeInfo>({
    typeAlert: "success",
    message: "",
    isShow: false,
  });

  const [errors, setErros] = useState<Record<string, string | boolean>>({});

  if (profile) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    setErros({});
  };

  const handelChangecountry = (ev: SelectChangeEvent) => {
    setCountry(ev.target.value);
  };

  const handelChangeCountryStudent = (ev: SelectChangeEvent) => {
    const iso = ev.target.value;
    setCountryStudent(iso);
    setSelectCity("");
    setListCity(City.getCitiesOfCountry(iso)?.map((c) => c.name) || []);
  };

  const handelChangeCity = (_ev: React.SyntheticEvent, val: string | null) => {
    setSelectCity(val || "");
  };

  const handelOnChangeAcademic = (ev: SelectChangeEvent) => {
    setSelectAcademic(ev.target.value);
  };

  const handelOnChangeLanguage = (ev: SelectChangeEvent) => {
    setSelectLang(ev.target.value);
  };

  async function handelOnSubmit(ev: SyntheticEvent<HTMLFormElement>) {
    ev.preventDefault();

    const basePayload = {
      name: refName.current.value,
      email: refEmail.current.value,
      password: refPassword.current.value,
    };

    let payload: Record<string, any> = basePayload;
    let tableName = "admin";

    if (value === 1) {
      tableName = "teachers";
      payload = {
        ...basePayload,
        country: country,
        language_code: selectLang,
        is_male: refChecked.current?.checked ?? false,
        academy_id: selectAcademic,
        phone: phone,
      };
    } else if (value === 2) {
      tableName = "users";
      payload = {
        ...basePayload,
        country: countryStudent,
        is_new_muslim: refIsNewMuslim.current?.checked ?? false,
        birth_date: refDate.current?.value ?? "",
        city: selectCity,
        is_male: refChecked.current?.checked ?? false,
      };
    }

    const newError: Record<string, string> = vaildatedBeforeSend(payload);

    if (value === 1 && phone.length <= 7) {
      newError["phone"] = "Invalid phone number";
    }

    setErros(newError);

    if (Object.keys(newError).length > 0) {
      return;
    }

    setIsLoading(true);

    try {
      await inserRow({
        tableName: tableName,
        payload: payload,
      });

      setShowAlert({
        typeAlert: "success",
        message: "Account created successfully! Redirecting to login...",
        isShow: true,
      });

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err: any) {
      setShowAlert({
        typeAlert: "error",
        message: err.message || "An unexpected error occurred",
        isShow: true,
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="auth-container">
      <div className="title-ui">
        <h1>Sign In</h1>
      </div>

      <div className="tabs my-2">
        <Tabs value={value} onChange={handleChange} aria-label="role tabs">
          <Tab label="Admin" />
          <Tab label="Teacher" />
          <Tab label="Student" />
        </Tabs>
      </div>

      <form
        action=""
        key={value}
        method="post"
        className={value === 0 ? "form-auth" : "form form-create-new-user"}
        onSubmit={handelOnSubmit}
      >
        <div className="form-group">
          <Input label="name" ref={refName} />
          <p className="error">{errors.name}</p>
        </div>

        <div className="form-group">
          <Input label="email" typeInput="email" ref={refEmail} />
          <p className="error">{errors.email}</p>
        </div>

        <div className="form-group">
          <Input label="password" typeInput="password" ref={refPassword} />
          <p className="error">{errors.password}</p>
        </div>

        {(value === 1 ) && (
          <>
            <div className="form-group">
              <ListSelect
                dataObj={TypeAcademic}
                label="Academic"
                selectData={selectAcademic}
                setSelectData={handelOnChangeAcademic}
              />
              <p className="error">{errors.academy_id}</p>
            </div>

            <div className="form-group">
              <ListSelect
                dataObj={languaguesType}
                label="languages"
                selectData={selectLang}
                setSelectData={handelOnChangeLanguage}
              />
              <p className="error">{errors.language_code}</p>
            </div>

            <div className="form-group">
              <PhoneInput
                className="input-phone"
                defaultCountry="eg"
                value={phone}
                onChange={(p) => setPhone(p)}
              />
              <p className="error">{value === 1 ? errors.phone : errors.phone_number}</p>
            </div>

            <div className="form-group">
              <ListSelect
                dataObj={listCountryWithIso}
                label="Country"
                selectData={country}
                setSelectData={handelChangecountry}
              />
              <p className="error">{errors.country}</p>
            </div>
          </>
        )}

        {value === 2 && (
          <>
            <div className="form-group">
              <ListSelect
                dataObj={listCountryWithIso}
                label="Country"
                selectData={countryStudent}
                setSelectData={handelChangeCountryStudent}
              />
              <p className="error">{errors.country}</p>
            </div>

            <div className="form-group">
              <AutoCompliate
                disable={countryStudent === ""}
                data={listCity}
                label="City"
                selectData={selectCity}
                setSelectData={handelChangeCity}
              />
              <p className="error">{errors.city}</p>
            </div>

            <div className="form-group">
              <Input ref={refDate} typeInput="date" />
              <p className="error">{errors.birth_date}</p>
            </div>
          </>
        )}

        {(value === 1 || value === 2) && (
          <div className="form-group">
            <MailFmail refChecked={refChecked} />
          </div>
        )}

        {value === 2 && (
          <div className="form-group">
            <Checked ref={refIsNewMuslim} label="Is New Muslim" />
          </div>
        )}

        <div className="button-submit flex justify-between items-center">
          <button className="btn btn-submite" disabled={isLoading}>
            {isLoading ? <IconLoad /> : "Sign In"}
          </button>
          <Link to="/login" className="text-sm text-secondary underline">
            Login
          </Link>
        </div>

        <AlertSuccess
          type={showAlert.typeAlert}
          message={showAlert.message}
          isShow={showAlert.isShow}
          onClose={() => setShowAlert((prev) => ({ ...prev, isShow: false }))}
        />
      </form>
    </div>
  );
}