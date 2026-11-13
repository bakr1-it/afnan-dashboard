import { useRouteError, Link } from "react-router-dom";
import { useLanguageContext } from "../../context/LanguageContext";

export default function ErrorPage() {
  const error = useRouteError() as any;
  const { t } = useLanguageContext();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
        <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
          !
        </div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">{t("somethingWentWrong")}</h2>
        <p className="text-gray-600 text-sm mb-6">
          {error?.statusText || error?.message || t("errorPageDescription")}
        </p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={() => window.location.reload()}
            className="btn btn-primary"
          >
            {t("reloadPage")}
          </button>
          <Link to="/dashboard" className="btn btn-secondary">
            {t("goToDashboard")}
          </Link>
        </div>
      </div>
    </div>
  );
}