import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { jwtDecode, InvalidTokenError } from "jwt-decode";

import { useNavigate } from 'react-router-dom';
 
const Dashboard = () => {
    const [username, setUsername] = useState('');
    const [token, setToken] = useState('');
    const [expire, setExpire] = useState('');
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
 
    const Logout = async () => {
        try {
            await axios.delete('http://localhost:5000/api/logout');
            navigate("/login");
        } catch (error) {
            console.log(error);
        }
    }

    
 
    const refreshToken = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/token');
            setToken(response.data.accessToken);
            const decoded = jwtDecode(response.data.accessToken);
            setUsername(decoded.username);
            setExpire(decoded.exp);
        } catch (error) {
            if (error.response) {
                navigate("/");
            }
        }
    }
 
    const axiosJWT = axios.create();
 
    axiosJWT.interceptors.request.use(async (config) => {
        const currentDate = new Date();
        if (expire * 1000 < currentDate.getTime()) {
            const response = await axios.get('http://localhost:5000/api/token');
            config.headers.Authorization = `Bearer ${response.data.accessToken}`;
            setToken(response.data.accessToken);
            const decoded = jwtDecode(response.data.accessToken);
            setUsername(decoded.name);
            setExpire(decoded.exp);
        }
        return config;
    }, (error) => {
        return Promise.reject(error);
    });
 
    const getUsers = async () => {
        const response = await axiosJWT.get('http://localhost:5000/api/users', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        setUsers(response.data);
    }

    useEffect(() => {
        refreshToken();
        getUsers();
    }, []);
 
    return (
        <div className="container mt-5">
            <h1>Welcome Back: {username}</h1>
            <table className="table is-striped is-fullwidth">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Name</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={user.id}>
                            <td>{index + 1}</td>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                        </tr>
                    ))}
 
                </tbody>
            </table>
            <button onClick={Logout}>
                                    Log Out
                                </button>
        </div>
    )
}
 
export default Dashboard