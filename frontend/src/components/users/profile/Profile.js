'use client';
import { useUser } from "@/components/utils/UserContext";
import './Profile.css'

export default function Profile() {
    const { user } = useUser();

    if (!user) {
        return <div>Loading...</div>;
    }
    
    return (
        <div className="profile-container">
            <h1>Role: {user.role}</h1>
            <h2>Name: {user.fullname}</h2>
        </div>
    );
}