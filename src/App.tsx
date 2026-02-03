import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import type { MenuProps } from 'antd';

import { HomePage, LoginPage, NewPost, RegisterPage, StripePage, NotFoundPage } from '@/layouts';
import { GuestRoute, ProtectedRoute } from '@/routes';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { logout } from '@/store/slices/userSlice';
import { ROUTE_PATHS } from '@/constants';

const App = () => {
    const dispatch = useAppDispatch();
    const isAuthenticated = useAppSelector((state) => state.user.isAuthenticated);
    const location = useLocation();
    const navigate = useNavigate();

    const handleMenuClick: MenuProps['onClick'] = (event) => {
        if (event.key === 'logout') {
            dispatch(logout());
            navigate(ROUTE_PATHS.LOGIN);
        }
    };

    const menuItems: MenuProps['items'] = [
        {
            key: ROUTE_PATHS.ROOT,
            label: <Link to={ROUTE_PATHS.ROOT}>All posts</Link>,
        },
        ...(isAuthenticated
            ? [
                  {
                      key: ROUTE_PATHS.HOME,
                      label: <Link to={ROUTE_PATHS.HOME}>My posts</Link>,
                  },
                  {
                      key: ROUTE_PATHS.NEW_POST,
                      label: <Link to={ROUTE_PATHS.NEW_POST}>New post</Link>,
                  },
                  {
                      key: 'logout',
                      label: 'Logout',
                  },
              ]
            : [
                  {
                      key: ROUTE_PATHS.LOGIN,
                      label: <Link to={ROUTE_PATHS.LOGIN}>Login</Link>,
                  },
                  {
                      key: ROUTE_PATHS.REGISTER,
                      label: <Link to={ROUTE_PATHS.REGISTER}>Register</Link>,
                  },
              ]),
    ];

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Layout.Header style={{ display: 'flex', alignItems: 'center' }}>
                <Menu
                    mode="horizontal"
                    theme="dark"
                    selectedKeys={[location.pathname]}
                    items={menuItems}
                    onClick={handleMenuClick}
                    style={{ flex: 1 }}
                />
            </Layout.Header>
            <Layout.Content style={{ padding: '24px 0' }}>
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
            </Layout.Content>
        </Layout>
    );
}

export default App;
