import Auth from "../utils/auth.js";
import {useMutation, useQuery} from "@apollo/client";
import {ME} from "../utils/queries.js";
import {Box, Button, Card, Code, DataList} from "@radix-ui/themes";
import {useEffect, useState} from "react";

import './Profile.css';
import {CHANGE_EMAIL, CHANGE_PASSWORD, CHANGE_USERNAME} from "../utils/mutations.js";

function Profile() {
    const profile = Auth.getProfile();
    const { loading, data } = useQuery(ME, { variables: { _id: profile.data._id } });
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("********");
    const [changeUsername] = useMutation(CHANGE_USERNAME);
    const [changeEmail] = useMutation(CHANGE_EMAIL);
    const [changePassword] = useMutation(CHANGE_PASSWORD);

    useEffect(() => {
        if (!data) return;
        setUsername(data.me.username);
        setEmail(data.me.email);
    }, [data]);

    if (loading) return "Loading...";

    function toggleInput(field) {
        const element = document.getElementById(field);

        if (element.disabled) {
            element.removeAttribute("disabled");
            element.focus();
        }
        else element.setAttribute("disabled", "true");
    }

    async function handleSubmit(field) {
        const element = document.getElementById(field);

        switch (field) {
            case "username":
                await changeUsername({ variables: { userId: data.me._id, username: element.value } });
                break;
            case "email":
                await changeEmail({ variables: { userId: data.me._id, email: element.value } });
                break;
            case "password":
                await changePassword({ variables: { userId: data.me._id, password: element.value } });
                window.location.assign('/signOut');
                break;
            default:
                throw new Error(`Input with id ${field} does not exist`);
        }

        element.setAttribute("disabled", "true");
    }

    return (
        <Box width="500px" className="profile">
            <Card size="3">
                <DataList.Root>
                    <DataList.Item className="item">
                        <DataList.Label className="label">ID</DataList.Label>
                        <DataList.Value>
                            <Code variant="ghost">{data.me._id}</Code>
                        </DataList.Value>
                    </DataList.Item>
                    <DataList.Item className="item">
                        <DataList.Label className="label">Username</DataList.Label>
                        <DataList.Value>
                            <div className="change-form">
                                <input type="username" id="username" name="username" value={username}
                                       onChange={(event) => setUsername(event.target.value)} disabled/>
                                <Button id="save-username" onClick={() => handleSubmit("username")}>Save</Button>
                                <Button onClick={() => toggleInput("username")}>Change Username</Button>
                            </div>
                        </DataList.Value>
                    </DataList.Item>
                    <DataList.Item className="item">
                        <DataList.Label className="label">Email Address</DataList.Label>
                        <DataList.Value>
                            <div className="change-form">
                                <input type="email" id="email" name="email" value={email}
                                       onChange={(event) => setEmail(event.target.value)} disabled/>
                                <Button id="save-email" onClick={() => handleSubmit("email")}>Save</Button>
                                <Button onClick={() => toggleInput("email")}>Change Email</Button>
                            </div>
                        </DataList.Value>
                    </DataList.Item>
                    <DataList.Item className="item">
                        <DataList.Label className="label">Password</DataList.Label>
                        <DataList.Value>
                            <div className="change-form">
                                <input type="password" id="password" name="password" value={password}
                                       onChange={(event) => setPassword(event.target.value)} disabled/>
                                <Button id="save-password" onClick={() => handleSubmit("password")}>Save</Button>
                                <Button id="change-password-button" onClick={() => toggleInput("password")}>Change
                                    Password</Button>
                            </div>
                        </DataList.Value>
                    </DataList.Item>
                </DataList.Root>
            </Card>
        </Box>
    );
}

export default Profile;
