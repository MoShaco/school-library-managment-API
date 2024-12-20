'use client';
import { useState } from "react";
import { useUser } from "../utils/UserContext";

export default function Login() {
    const { setUser } = useUser();

    const [formData, setFormData] = useState({});

    function handleChange(event) {
        const { name, value } = event.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
    };

    function handleLogin(event) {
        event.preventDefault();
        // Handle form submission

        fetch('http://localhost:8000/auth/users/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            setUser(data.data);
        })
        .catch(error => console.log(error));
    }

    return (
        <div className='register-form'>
            <form onSubmit={handleLogin} autoComplete="off">
                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) => {handleChange(e)}}
                    required
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={(e) => {handleChange(e)}}
                    required
                />
                <button type='submit'>Submit</button>
            </form>
        </div>
    );
}