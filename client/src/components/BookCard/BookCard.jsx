import { Box, Card, Inset, Text } from "@radix-ui/themes";
import { useMutation } from '@apollo/client';
import { ADD_TO_CART } from '../../utils/mutations';
import auth from "../../utils/auth";
import {Link} from "react-router-dom";

function BookCard(bookData) {
    const profile = auth.getProfile();
    const [addToCart] = useMutation(ADD_TO_CART);

    const handleClick = () => {
        console.log(profile.data._id)
        console.log(bookData.bookData)
        addToCart({
            variables: {
                userId: profile.data._id,
                bookId: bookData.bookData.bookId,
                title: bookData.bookData.title,
                price: bookData.bookData.price,
                quantity: 1,
            },
        })
            .then((response) => {
                console.log(response);
            })
    }

    return (
        <Box width="400px">
            <Card size="3">
                <Inset clip="padding-box" side="top" pb="current">
                    <Link to="/book-details" state={bookData}><img
                        src={bookData.bookData.image}
                        alt="Book Cover Image"
                        style={{
                            display: 'block',
                            objectFit: 'cover',
                            width: '100%',
                            height: 140,
                            backgroundColor: 'var(--gray-5)',
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
                    <strong>Description:</strong> {bookData.bookData.description}
                </Text>
                <Text as="p" size="3">
                    <strong>In Stock Qty:</strong> {bookData.bookData.inventory}
                </Text>
                <Text as="p" size="3">
                    <strong>Price:</strong> ${bookData.bookData.price}
                </Text>
                <button className="Button" onClick={handleClick}>
                    Add to Cart
                </button>
            </Card>
        </Box>
    );
}

export default BookCard;