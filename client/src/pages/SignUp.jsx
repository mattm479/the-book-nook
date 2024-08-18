import {useRef, useState} from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth.js';
import { SIGN_UP } from '../utils/mutations.js';
import * as Form from "@radix-ui/react-form";
import {Box, Card} from "@radix-ui/themes";
import '../styles/sign-up.css';

function SignUp(props) {
    const form = useRef();
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
        <Box style={{ width: "500px", margin: "25px auto" }}>
            <Card size="3">
                <div className="container my-1">
                    <Link to="/signIn">← Go To SignIn</Link>
                    &nbsp;
                    <span style={{ textAlign: "center" }}><h2>Sign Up</h2></span>
                    &nbsp;
                    <Form.Root className="FormRoot" ref={form} onSubmit={handleFormSubmit}>
                        <Form.Field className="FormField" name="username">
                            <div>
                                <Form.Label className="FormLabel">Username</Form.Label>
                                <Form.Message className="FormMessage" match="valueMissing">
                                    Please enter your Username
                                </Form.Message>
                                <Form.Message className="FormMessage" match="typeMismatch">
                                    Please provide a valid Username
                                </Form.Message>
                            </div>
                            <Form.Control asChild>
                                <input
                                    name="username"
                                    type="text"
                                    id="username"
                                    required
                                    onChange={handleChange}
                                />
                            </Form.Control>
                        </Form.Field>
                        <Form.Field className="FormField" name="email">
                            <div>
                                <Form.Label className="FormLabel">Email</Form.Label>
                                <Form.Message className="FormMessage" match="valueMissing">
                                    Please enter your email
                                </Form.Message>
                                <Form.Message className="FormMessage" match="typeMismatch">
                                    Please provide a valid email
                                </Form.Message>
                            </div>
                            <Form.Control asChild>
                                <input
                                    name="email"
                                    type="email"
                                    id="email"
                                    required
                                    onChange={handleChange}
                                />
                            </Form.Control>
                        </Form.Field>
                        <Form.Field className="FormField" name="password">
                            <div>
                                <Form.Label className="FormLabel">Password</Form.Label>
                                <Form.Message className="FormMessage" match="valueMissing">
                                    Please enter your password
                                </Form.Message>
                            </div>
                            <Form.Control asChild>
                                <input
                                    name="password"
                                    type="password"
                                    id="password"
                                    required
                                    onChange={handleChange}
                                />
                            </Form.Control>
                        </Form.Field>
                        <Form.Submit asChild>
                            <div className="flex-row flex-end">
                                <button type="submit" className="Button" style={{ marginTop: "10px" }}>Submit</button>
                            </div>
                        </Form.Submit>
                    </Form.Root>
                </div>
            </Card>
        </Box>
    );
}

export default SignUp;
