import { Routes, Route } from 'react-router-dom';

import { HomePage, LoginPage, NewPost, RegisterPage, StripePage, NotFoundPage } from '@/layouts';
import { GuestRoute, ProtectedRoute } from '@/routes';
import { useAppSelector } from '@/store/hooks';
import { ROUTE_PATHS } from '@/constants';

const App = () => {
    const isAuthenticated = useAppSelector((state) => state.user.isAuthenticated);
    console.log('isAuthenticated:', isAuthenticated);

    return (
        <Routes>
            {/* Public */}
            <Route path={ROUTE_PATHS.ROOT} element={<StripePage />} />

            {/* Guest-only */}
            <Route element={<GuestRoute isGuest={!isAuthenticated} />}>
                <Route path={ROUTE_PATHS.LOGIN} element={<LoginPage />} />
                <Route path={ROUTE_PATHS.REGISTER} element={<RegisterPage />} />
            </Route>

            {/* Protected */}
            <Route element={<ProtectedRoute isAllowed={isAuthenticated} />}>
                <Route path={ROUTE_PATHS.HOME} element={<HomePage />} />
                <Route path={ROUTE_PATHS.NEW_POST} element={<NewPost />} />
            </Route>

            { /* Fallback */}
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
}

export default App;