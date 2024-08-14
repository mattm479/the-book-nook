import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import '@radix-ui/themes/styles.css';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Home from "./pages/Home.jsx";
import SignIn from "./pages/SignIn.jsx";
import Signup from "./pages/SignUp.jsx";
import Profile from "./pages/Profile.jsx";
import BookDetails from "./pages/BookDetails.jsx";
import Admin from "./pages/Admin.jsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: '/signIn',
                element: <SignIn />
            },
            {
                path: '/signUp',
                element: <Signup />
            },
            {
                path: '/profile',
                element: <Profile />
            },
            {
                path: '/book/:bookId',
                element: <BookDetails />
            },
            {
                path: '/admin',
                element: <Admin />
            }
        ]
    }
]);

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
