import { Box, Card, Inset, Text } from "@radix-ui/themes";
import { useMutation } from '@apollo/client';
import { ADD_TO_CART } from '../utils/mutations.js';
import Auth from "../utils/auth.js";
import {Link, useLocation} from "react-router-dom";
import cart from "./cart.jsx";

function BookCard(bookData) {
    const profile = (Auth.loggedIn()) ? Auth.getProfile() : {};
    const [addToCart] = useMutation(ADD_TO_CART);

    const handleClick = async () => {
        if (profile.data === undefined) {
            alert("You must be logged in to add items to your cart.");
        } else {
            const cartItem = {
                userId: profile.data._id,
                bookId: bookData.bookData.bookId,
                title: bookData.bookData.title,
                price: Math.ceil(bookData.bookData.price),
                quantity: 1
            };

            await addToCart({ variables: cartItem });

            const cart = (localStorage.getItem('cart')) ? JSON.parse(localStorage.getItem('cart')) : [];
            cart.push(cartItem);
            localStorage.setItem('cart', JSON.stringify(cart));
        }
    }
    const location = useLocation();
    const truncateDescription = (description) => {
        const words = description.split(' ');
        return words.length > 30 ? words.slice(0, 30).join(' ') + '...' : description;
    };

    return (
        <Box width = {location.pathname === "/book-details" ? '100%' : "400px"}>
            <Card size="3">
                <Inset clip="padding-box" side="top" pb="current">
                    <Link to="/book-details" state={bookData}><img
                        src={bookData.bookData.image}
                        alt="Book Cover Image"
                        style={{
                            display: 'block',
                            objectFit: 'cover',
                            width: '100%',
                            height: location.pathname === "/book-details" ? "50dvh" : 140,
                            backgroundColor: 'var(--gray-5)'
                        }}
                    /></Link>
                </Inset>
                <Text as="p" size="3">
                    <strong>Title:</strong> <Link to="/book-details" state={bookData}>{bookData.bookData.title}</Link>
                </Text>
                <Text as="p" size="3">
                     <strong>Authors:</strong> {bookData.bookData.authors.join(", ")}
                </Text>
                <Text as="p" size="3">
                    <strong>Description:</strong> {location.pathname === "/book-details" ? 
                    bookData.bookData.description : truncateDescription(bookData.bookData.description)}
                </Text>
                <Text as="p" size="3">
                    <strong>In Stock Qty:</strong> {bookData.bookData.inventory}
                </Text>
                <Text as="p" size="3">
                    <strong>Price:</strong> ${Math.ceil(bookData.bookData.price)}
                </Text>
                <button className="Button" onClick={handleClick}>
                    Add to Cart
                </button>
            </Card>
        </Box>
    );
}

export default BookCard;