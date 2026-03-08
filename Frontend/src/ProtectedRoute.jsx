import { Navigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

export default function ProtectedRoute({ children }) {
  const [cookies] = useCookies(['token']);

  // If no token, redirect to login
  if (!cookies.token) {
    return <Navigate to="/login" replace />;
  }

  // If token exists, render the component
  return children;
}
