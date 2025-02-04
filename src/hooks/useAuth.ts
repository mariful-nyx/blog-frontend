// hooks/useAuth.ts
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAccessToken, setLoading, logout } from '@/redux/authSlice';
import { RootState } from '@/redux/store'
import useApi from '@/api/api';
import Cookies from 'js-cookie';
import { usePathname } from 'next/navigation';

const useAuth = () => {
  const api = useApi()
  const dispatch = useDispatch();
  const pathname = usePathname()
  const { isAuthenticated, loading } = useSelector((state: RootState) => state.auth);
  const refresh = Cookies.get('bpmRefreshToken')

  useEffect(() => {
    // Define the function you want to call periodically
    const periodicFunction = () => {
      
    };

    // Set the interval to call the function every 5 minutes (300,000 ms)
    const intervalId = setInterval(periodicFunction, 300000);

    // Cleanup the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const checkAuth = async () => {
      const token = Cookies.get('bpmAccessToken')
      if (!token) {
        dispatch(setLoading(false));
        return;
      }

      dispatch(setAccessToken(token));

      try {
        // Verify the token by making a request to a protected endpoint
        const response = await api.isAuthenticate(token)

        if (response.status === 200) {
          dispatch(setAccessToken(token)); // Set the access token in Redux
        } else {
          dispatch(logout());
        }
      } catch (error) {
        const response = await api.getAccessToken({refresh: refresh || ''})
        const data = await response.data
        
        if(response.status === 200) {
          dispatch(setAccessToken(data.access))
        }else{
          console.error('Token verification failed', error);
          dispatch(logout());
        }
        
      } finally {
        dispatch(setLoading(false));
      }
    };

    checkAuth();


   
  }, [dispatch, pathname]);

  return { isAuthenticated, loading };
};

export default useAuth;
