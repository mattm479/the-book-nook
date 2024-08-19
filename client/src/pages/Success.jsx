import {Box, Card} from "@radix-ui/themes";

function Success() {
    localStorage.setItem('cart', "");

    return (
        <Box width="400px" style={{ margin: "25px auto" }}>
            <Card size="3">
                <h1>Success!</h1>
                <p>Enjoy your new books!</p>
            </Card>
        </Box>
    );
}

export default Success;
