import { useState } from 'react';
import axios from 'axios';
import style from './Pages.module.css';
import useStorage from '../../hooks/useStorage';

const apiUrl = import.meta.env.VITE_AUTH_API_URL;


const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [error, setError] = useState(null);
    const [authToken, setAuthToken] = useStorage(null, 'authToken')

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value
        })
    }
    const handleSubmit = async (e) =>{
        e.preventDefault();
        try{
            const response = await axios.post(`${apiUrl}/register`, formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });           
            const token = response.data.token;
            setAuthToken(token);
            console.log('regitrazione avvenuta con sucesso:', response.data);
        }catch(error){
            console.error('errore durante la registrazione',error);
        }
    }


    return (
        <div className={style.registerContainer}>
        <h1>Register</h1>
        {error && <p className={style.error}>{error}</p>}
        <form onSubmit={handleSubmit} className={style.registerForm}>
            <div className={style.formGroup}>
                <label htmlFor="email">Email:</label>
                <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    value={formData.email} 
                    onChange={handleChange} 
                    required 
                />
            </div>
            <div className={style.formGroup}>
                <label htmlFor="name">Name:</label>
                <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    value={formData.name} 
                    onChange={handleChange} 
                    required 
                />
            </div>
            <div className={style.formGroup}>
                <label htmlFor="password">Password:</label>
                <input 
                    type="password" 
                    id="password" 
                    name="password" 
                    value={formData.password} 
                    onChange={handleChange} 
                    required 
                />
            </div>
            <button type="submit" className={style.submitButton}>Register</button>
        </form>
    </div>
);
};

export default Register;