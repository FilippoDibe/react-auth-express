import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const PrivatePage = ({ children }) => {
    const { isLoggedIn } = useAuth();

    if (!isLoggedIn) {
        return <Navigate to="/login" />;
    }

    return children;
};

export default PrivatePage;
