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
import SignOut from "./pages/SignOut.jsx";
import BookSearch from "./pages/BookSearch.jsx";
import Cart from "./components/cart.jsx"
import ContactForm from "./pages/ContactForm.jsx";
import Success from "./pages/Success.jsx";

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
                path: '/signOut',
                element: <SignOut />
            },
            {
                path: '/profile',
                element: <Profile />
            },
            {
                path: '/booksearch',
                element: <BookSearch />
            },
            {
                path: '/book-details',
                element: <BookDetails />
            },
            {
                path: '/admin',
                element: <Admin />
            },
            {
                path: '/cart',
                element: <Cart />
            },
            {
                path: '/contact',
                element: <ContactForm />
            },
            {
                path: '/success',
                element: <Success />
            }
        ]
    }
]);

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
