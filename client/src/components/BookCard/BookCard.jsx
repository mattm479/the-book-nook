import {Box, Card, Inset, Text} from "@radix-ui/themes";

function BookCard(bookData) {
    return (
        <Box maxWidth="400px">
            <Card size="2">
                <Inset clip="padding-box" side="top" pb="current">
                    <img
                        src={bookData.bookData.image}
                        alt="Book Cover Image"
                        style={{
                            display: 'block',
                            objectFit: 'cover',
                            width: '100%',
                            height: 140,
                            backgroundColor: 'var(--gray-5)',
                        }}
                    />
                </Inset>
                <Text as="p" size="3">
                    <strong>Title:</strong> {bookData.bookData.title}
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
            </Card>
        </Box>
    );
}

export default BookCard;
