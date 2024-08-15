import {Box, Card, Inset, Text} from "@radix-ui/themes";

function BookCard(bookData) {
    return (
        <Box maxWidth="250px">
            <Card size="2">
                <Inset clip="padding-box" side="top" pb="current">
                    <img
                        src={bookData.image}
                        alt="Bold typography"
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
                    Title: {bookData.title}
                </Text>
                <Text as="p" size="3">
                    Authors: {bookData.authors.join(", ")}
                </Text>
                <Text as="p" size="3">
                    Description: {bookData.description}
                </Text>
                <Text as="p" size="2">
                    In Stock Qty: {bookData.quantity}
                    Price: ${bookData.price}
                </Text>
            </Card>
        </Box>
    );
}

export default BookCard;
