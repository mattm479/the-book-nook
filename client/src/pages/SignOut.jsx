import Auth from "../utils/auth.js";
import '../styles/sign-up.css';

function SignOut() {
    // TODO: Save cart to user if exists
    return Auth.logout();
}

export default SignOut;
