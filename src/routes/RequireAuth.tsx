import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface Props {
    children: React.ReactNode;
}

const RequireAuth = ({ children }: Props) => {
    const { session, loading } = useAuth();
    const location = useLocation();

    if (loading) return null; // ADD SPINNER LATER

    if (!session) {
        return <Navigate to="/" state={{ from: location }} replace />;
    }

    return children;
};

export default RequireAuth;