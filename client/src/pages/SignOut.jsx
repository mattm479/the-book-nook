import Auth from "../utils/auth.js";

function SignOut() {
    // TODO: Save cart to user if exists
    return Auth.logout();
}

export default SignOut;
