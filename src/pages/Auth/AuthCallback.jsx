import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import LoadingSpinner from '../../components/LoadingSpinner';

export default function AuthCallback() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { updateUser } = useAuth();

    useEffect(() => {
        const token = searchParams.get('token');
        const provider = searchParams.get('provider');

        if (token) {
            // Store the token
            localStorage.setItem('token', token);

            // Fetch user data with this token
            fetch('http://localhost:5000/api/auth/me', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    if (data.success) {
                        localStorage.setItem('castup_user', JSON.stringify(data.user));
                        updateUser(data.user);
                        navigate('/dashboard');
                    }
                })
                .catch(error => {
                    console.error('Auth callback error:', error);
                    navigate('/login?error=auth_failed');
                });
        } else {
            navigate('/login?error=no_token');
        }
    }, [searchParams, navigate, updateUser]);

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
                <LoadingSpinner size="lg" />
                <p className="mt-4 text-gray-400">Completing authentication...</p>
            </div>
        </div>
    );
}
