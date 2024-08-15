import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth.js';
import { SIGN_UP } from '../utils/mutations.js';

function SignUp(props) {
    const [formState, setFormState] = useState({ username: '', email: '', password: '' });
    const [signUp] = useMutation(SIGN_UP);

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        const mutationResponse = await signUp({
            variables: {
                username: formState.username,
                email: formState.email,
                password: formState.password
            },
        });
        const token = mutationResponse.data.signUp.token;
        Auth.login(token);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value,
        });
    };

    return (
        <div className="container my-1">
            <Link to="/signIn">← Go To SignIn</Link>

            <h2>Sign Up</h2>
            <form onSubmit={handleFormSubmit}>
                <div className="flex-row space-between my-2">
                    <label htmlFor="username">Username:</label>
                    <input
                        placeholder="Username"
                        name="username"
                        type="text"
                        id="username"
                        onChange={handleChange}
                    />
                </div>
                <div className="flex-row space-between my-2">
                    <label htmlFor="email">Email:</label>
                    <input
                        placeholder="youremail@test.com"
                        name="email"
                        type="email"
                        id="email"
                        onChange={handleChange}
                    />
                </div>
                <div className="flex-row space-between my-2">
                    <label htmlFor="pwd">Password:</label>
                    <input
                        placeholder="******"
                        name="password"
                        type="password"
                        id="pwd"
                        onChange={handleChange}
                    />
                </div>
                <div className="flex-row flex-end">
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    );
}

export default SignUp;
