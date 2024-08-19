import BookCard from "../components/BookCard.jsx";
import {useLocation} from "react-router-dom";

function BookDetails() {
    const { state } = useLocation();
    return (
        <BookCard bookData={state.bookData} />
    );
}

export default BookDetails;
