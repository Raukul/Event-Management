import { Navigate } from "react-router-dom";
import { useAuth } from "./authContext";

export function removeNullKeys(obj: any) {
  for (let key in obj) {
    if (obj[key] === null || obj[key] === undefined) {
      delete obj[key];
    } else if (typeof obj[key] === "object") {
      removeNullKeys(obj[key]);
      if (Object.keys(obj[key]).length === 0) {
        delete obj[key];
      }
    }
  }
  return obj;
}

const ProtectedRoute: React.FunctionComponent<any> = ({ children }) => {
  const { loading, user, setTrigger, trigger } = useAuth();
  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    setTrigger(!trigger);
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
