import { Navigate } from "react-router-dom";
import { useAuth } from "./auth";

export const ReqAuth = ({ children }) => {
    const auth = useAuth();

    if (!auth.username) {
        return <Navigate to="/" />;
    }
    return children;
};
