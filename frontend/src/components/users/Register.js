'use client';

import { useState } from 'react';

export default function Register() {
    const [formData, setFormData] = useState({});

    function handleChange(event) {
        const { name, value } = event.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
    }

    function handleRegister(event) {
        event.preventDefault();
        // Handle form submission
        fetch('/app/auth/users/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
        .catch(error => console.log(error));
    }

    return (
        <div className='register-form'>
            <form onSubmit={handleRegister} autoComplete="off">
                <input
                    name="firstName"
                    type="text"
                    placeholder="First name"
                    value={formData.firstName}
                    onChange={(e) => {handleChange(e)}}
                    required
                />
                <input
                    name="lastName"
                    type="text"
                    placeholder="Last name"
                    value={formData.lastName}
                    onChange={(e) => {handleChange(e)}}
                    required
                />
                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) => {handleChange(e)}}
                    required
                />
                <input
                    name="username"
                    type="text"
                    placeholder="Username"
                    value={formData.username}
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
                <input
                    name="confirmation"
                    type="password"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={(e) => {handleChange(e)}}
                    required
                />
                <button type='submit'>Submit</button>
            </form>
        </div>
    );
}