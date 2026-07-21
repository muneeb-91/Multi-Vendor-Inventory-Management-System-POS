import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PublicRoute = ({ children }) => {
    const { user, isAuthenticated } = useSelector(
        (state) => state.auth
    );
    if (isAuthenticated) {
        if(user.role === "admin"){
            return <Navigate to="/admin" replace />
        }
        if(user.role === "vendor"){
            return <Navigate to="/vendor" replace />
        }
        return <Navigate to="/manager" replace />
    }
    return children;
}

export default PublicRoute