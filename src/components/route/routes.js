import { Navigate } from "react-router-dom";

export function PublicRoute({session, to = "/", children }) {
    return !session ? children : <Navigate to={to} replace />;
}

export function PrivateRoute({session, to = "/", children }) {
    return !!session ? children : <Navigate to={to} replace />;
}
