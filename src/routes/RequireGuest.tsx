import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface Props {
    children: React.ReactNode;
}

const RequireGuest = ({ children }: Props) => {
    const { session, loading } = useAuth();

    if (loading) return null; // ADD SPINNER LATER

    if (session) {
        return <Navigate to="/dashboard" replace />;
    }

    return children;
};

export default RequireGuest;