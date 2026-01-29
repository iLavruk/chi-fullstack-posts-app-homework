import { Navigate, Outlet } from 'react-router-dom';

import { ROUTE_PATHS } from '@/constants';

type GuestRouteProps = {
    isGuest: boolean;
};

const GuestRoute = ({ isGuest }: GuestRouteProps) => {
    if (!isGuest) {
        return <Navigate to={ROUTE_PATHS.HOME} replace />;
    }

    return <Outlet />;
};

export default GuestRoute;