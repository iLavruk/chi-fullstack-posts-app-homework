import { Navigate, Outlet } from 'react-router-dom';

import { ROUTE_PATHS } from '@/constants';

type ProtectedRouteProps = {
    isAllowed: boolean;
};

const ProtectedRoute = ({ isAllowed }: ProtectedRouteProps) => {
    if (!isAllowed) {
        return <Navigate to={ROUTE_PATHS.LOGIN} replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;