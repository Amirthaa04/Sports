import React, { useState } from 'react';
import { useNavigate ,Link} from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('https://sports-kya6.onrender.com/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            const result = await response.json();

            if (response.status === 200) {
                setMessage(result.message);
                localStorage.setItem('username', username); 
                // Store the username in local storage
                console.log(username);
                navigate('/');
            } else {
                setMessage(result.message);
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage('An error occurred. Please try again later.');
        }
    };

    return (

        <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <div className="logo-container">
                    <img src="./images/logo.jpg" alt="Logo" width="90px" height="90px" />
                </div>
                <h2>Login</h2>
                {message && <div className=".message">{message}</div>}
                <div className='form-group'>
                <label>
                    Username:
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </label>
                </div>
                <div className='form-group'>
                <label>
                    Password:
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>
                </div>                
                <button type="submit">Login</button>
                <div className="extra-info">
             <p>Don't have an account? <Link to="/register">Create one here</Link></p>
            <p>By creating an account or logging in, you agree to Sportopia's <a href="#">Conditions of Use</a> and <a href="#">Privacy Policy</a>.</p>
            </div>
            </form>
        </div>
    );
};

export default Login;




