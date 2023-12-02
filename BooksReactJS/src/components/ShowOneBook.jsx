import axios from "axios";
import { useState } from "react";

const BASE_URL = "https://localhost:7079/api/books";

// The "View" view of BoxRight. Shows selected book & includes Delete Button.
const ShowOneBook = ({ book, updateOneBook, updateBooks }) => {
  const [error, setError] = useState(null);

  const deleteBook = (event) => {
    event.preventDefault();

    // Axios delete request. Then updates list of books for BoxLeft, and sets selected book to null to clear BoxRight.
    async function deleteBook() {
      try {
        await axios.delete(`${BASE_URL}/${book.id}`);
        updateBooks((previousBooks) =>
          previousBooks.filter((prevBook) => prevBook.id !== book.id)
        );
        updateOneBook(null);
        setError(null);
        console.log(`Successful DELETE: ${BASE_URL}/${book.id}`);
      } catch (error) {
        setError("Network error");
        console.log(`Failed DELETE: ${BASE_URL}/${book.id}`);
      }
    }
    deleteBook();
  };

  return (
    <>
      <div className="error">{error}</div>
      <h1 className="title book-pretext">{book.title}</h1>
      <div className="center-child">
        <img className="image-book" src={book.imageUrl} />
      </div>
      <div className="center-child">
        <span className="book-subtext">
          <strong>Author:</strong> {book.author}
        </span>
        <span className="book-subtext">
          <strong>Pages:</strong> {book.pageLength}
        </span>
      </div>
      <div className="center-child">
        <button className="buttons" onClick={deleteBook}>
          Delete Book
        </button>
      </div>
    </>
  );
};

export default ShowOneBook;
