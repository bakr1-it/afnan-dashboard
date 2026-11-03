import { useRef, useState, type SyntheticEvent } from "react";
import { Link, replace, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import IconLoad from "../components/IconLoad";
import AlertSuccess from "../components/AlertSuccess";
import { vaildatedBeforeSend } from "../../helper";
import { useAuth } from "../../context/AuthContext";


export default function Login() {
  
  const refEmail = useRef<HTMLInputElement>(null) as React.RefObject<HTMLInputElement>;
  const refPassword = useRef<HTMLInputElement>(null) as React.RefObject<HTMLInputElement>;
const { signIn ,profile} = useAuth();

const navigate = useNavigate();
if(profile){
  navigate("/dashboard" ,{replace:true});
  return;

}
  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState({ typeAlert: "", message: "", isShow: false });
  const [errors, setErros] = useState<Record<string, string>>({
    email: "",
    password: "",
  });

  function handelOnSubmit(ev: SyntheticEvent<HTMLFormElement>) {
    ev.preventDefault();

    const payload = {
      email: refEmail.current.value,
      password: refPassword.current.value,
    };

    const newError = vaildatedBeforeSend(payload as any);
    setErros(newError);

    if (Object.keys(newError).length > 0) {
      return;
    }

    setIsLoading(true);
    signIn(payload.email, payload.password)
      .then(({ error }) => {
        if (error) {
          setShowAlert({ typeAlert: "error", message: error.message, isShow: true });
          return;
        }
        navigate("/academic");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <div className="auth-container">
      <div className="title-ui">
        <h1>Login</h1>
      </div>

      <form action="" method="post" className="form-auth" onSubmit={handelOnSubmit}>
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
            {isLoading ? <IconLoad /> : "Login"}
          </button>
          <Link to="/signin" className="text-sm text-secondary underline">
            Sign In
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
