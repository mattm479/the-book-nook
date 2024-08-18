import {useRef, useState} from 'react';
import { useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { SIGN_IN } from '../utils/mutations.js';
import Auth from '../utils/auth.js';
import {Box, Card} from "@radix-ui/themes";
import * as Form from "@radix-ui/react-form";

function SignIn(props) {
    const form = useRef();
    const [formState, setFormState] = useState({ username: '', password: '' });
    const [signIn, { error }] = useMutation(SIGN_IN);

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const mutationResponse = await signIn({
                variables: { username: formState.username, password: formState.password },
            });
            const token = mutationResponse.data.signIn.token;
            Auth.login(token);
        } catch (e) {
            console.log(e);
        }
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
                    <Link to="/signUp">← Go to SignUp</Link>
                    &nbsp;
                    <span style={{ textAlign: "center" }}><h2>Login</h2></span>
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
                        {error ? (
                            <div>
                                <p className="error-text">The provided credentials are incorrect</p>
                            </div>
                        ) : null}
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

export default SignIn;
