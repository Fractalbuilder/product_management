import axios from 'axios'
import {jwtDecode} from 'jwt-decode'
import dayjs from 'dayjs'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom' 
import AuthContext from '../context/AuthContext'


const baseURL = 'http://127.0.0.1:1011'


const useAxios = () => {
    const {authTokens, setUser, setAuthTokens} = useContext(AuthContext)
    const navigate = useNavigate(); 

    const axiosInstance = axios.create({
        baseURL,
        headers: { Authorization: `Bearer ${authTokens?.access}` }
    });

    axiosInstance.interceptors.request.use(async req => {
        const user = jwtDecode(authTokens.access)
        const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

        if (!isExpired) return req

        try {
            const response = await axios.post(`${baseURL}/token/refresh/`, {
                refresh: authTokens.refresh
            });

            localStorage.setItem('authTokens', JSON.stringify(response.data))
            setAuthTokens(response.data)
            setUser(jwtDecode(response.data.access))

            req.headers.Authorization = `Bearer ${response.data.access}`
            return req
        } catch (error) {
            if (error.response && (error.response.status === 400 || error.response.status === 500)) {
                localStorage.removeItem('authTokens');
                setAuthTokens(null);
                setUser(null);
                navigate('/login');
            }
            
            return null;
        }
    });

    axiosInstance.interceptors.response.use(
        response => response, 
        error => {
            if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                localStorage.removeItem('authTokens');
                setAuthTokens(null);
                setUser(null);
                navigate('/login');
            }
            
            return null;
        }
    );

    return axiosInstance;
}

export default useAxios;
