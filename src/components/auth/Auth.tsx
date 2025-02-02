import React, { useEffect } from 'react'
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../../context/store'

// Components
import Header from '../../components/header/Header'

const Auth: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();

    let isLogin = useSelector((state: RootState) => state.auth.token)

    useEffect(() => {
        if (isLogin && location.pathname === '/') {
            navigate('/admin', { replace: true });
        }
    }, [isLogin, location, navigate]);

    if (!isLogin) {
        return <Navigate replace to="/sign-in" />;
    }

    return (
        <>
            <Header />
            <Outlet />
        </>
    )
}

export default Auth