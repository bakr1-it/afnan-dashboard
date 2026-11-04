import { useRef, useState, type SyntheticEvent } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import IconLoad from "../components/IconLoad";
import AlertSuccess from "../components/AlertSuccess";
import { vaildatedBeforeSend } from "../../helper";
import { useAuth } from "../../context/AuthContext";
import { supabase } from "../../supabaseClient";
import inserRow from "../../services/subepaseServicese";

export default function SignIn() {
  const { profile } = useAuth();
  const navigate = useNavigate();

  if (profile) {
    return <Navigate to="/dashboard" replace />;
  }

  const refName = useRef<HTMLInputElement>(null) as React.RefObject<HTMLInputElement>;
  const refEmail = useRef<HTMLInputElement>(null) as React.RefObject<HTMLInputElement>;
  const refPassword = useRef<HTMLInputElement>(null) as React.RefObject<HTMLInputElement>;

  const [isLoading, setIsLoading] = useState(false);

interface alertTypeInfo{
typeAlert : "success"|"error"|"warning"|"info",
message:string, 
isShow:boolean,  
}
  const [showAlert, setShowAlert] = useState<alertTypeInfo>({ typeAlert: "success", message: "", isShow: false });
  
  
  const [errors, setErros] = useState<Record<string, string>>({
    name: "",
    email: "",
    password: "",
  });

  async function handelOnSubmit(ev: SyntheticEvent<HTMLFormElement>) {
    ev.preventDefault();

    const payload = {
      name: refName.current.value,
      email: refEmail.current.value,
      password: refPassword.current.value,
    };

    const newError = vaildatedBeforeSend(payload as any);
    setErros(newError);

    if (Object.keys(newError).length > 0) {
      return;
    }

    setIsLoading(true);

    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: payload.email,
        password: payload.password,
        options: {
          data: {
            name: payload.name,
            role: "admin",
          },
        },
      });

      if (authError) {
        setShowAlert({ typeAlert: "error", message: authError.message, isShow: true });
        return;
      }

      try {
        await inserRow({
          tableName: "admin",
          payload: {
            name: payload.name,
            email: payload.email,
            password: payload.password,
            ...(authData?.user?.id ? { id: authData.user.id } : {}),
          },
        });
      } catch (dbErr) {
        console.error("Database insert error:", dbErr);
      }

      setShowAlert({
        typeAlert: "success",
        message: "Admin account created successfully! Redirecting to login...",
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
        <h1>Sign In (Admin)</h1>
      </div>

      <form action="" method="post" className="form-auth" onSubmit={handelOnSubmit}>
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
