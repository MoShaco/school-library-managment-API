'use client';
import { useUser } from "../utils/UserContext";
import "./Navbar.css"

export default function Navbar() {
    const { user, setUser } = useUser();

    const handleLogout = (event) => {
        event.preventDefault();
        setUser(null);
    };

    
    
    return (
        <div className="navbar">
            <a href="/">Home</a>
            {user ? (
                <>
                    <a href="/users/profile">Profile</a>
                    <a href="/books/create">Create Book</a>
                    <a onClick={(event) => handleLogout(event)}>Logout</a>
                </>
            ) : (
                <>
                    <a href="/users/register">Register</a>
                    <a href="/users/login">Login</a>
                </>
            )}
        </div>
    );
}