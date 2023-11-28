import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import "./App.css";
import getBooks from "./components/getBooks";

const urlAPI = "https://localhost:7079/api/books";

const App: React.FC = () => {
  const [books, setBooks] = useState([]);
  const [oneBook, setOneBook] = useState(null);

  // Show all books when "Books" is clicked
  const showAllBooks = () => {
    async function getAllBooks() {
      try {
        const response = await axios.get(`${urlAPI}`);
        setBooks(response.data);
      } catch (error) {
        console.log("Error fetching books from API: ", error);
      }
    }
    getAllBooks();
    console.log(books);
  };

  // Show one book when it is clicked
  const showOneBook: React.MouseEventHandler<HTMLLIElement> = (event) => {
    const id: string | null = event.currentTarget.getAttribute("data-id");

    async function getOneBook() {
      try {
        const response = await axios.get(`${urlAPI}/${id}`);
        console.log(response);

        setOneBook(response.data);
      } catch (error) {
        console.log("Error fetching one book from API: ", error);
      }
    }
    getOneBook();
    console.log(oneBook);
  };

  return (
    <>
      <div className="box box-left">
        <h1 className="title" onClick={showAllBooks}>
          Books
        </h1>
        <ShowBooks books={books} showOneBook={showOneBook} />
      </div>
      <div className="box box-right">
        {oneBook && <ShowOneBook book={oneBook} />}
      </div>
    </>
  );
};

interface ShowBooksProps {
  books: Array<{
    id: string;
    title: string;
    author: string;
    imageUrl: string;
    pageLength: number;
  }>;
  showOneBook: React.MouseEventHandler<HTMLLIElement>;
}

const ShowBooks: React.FC<ShowBooksProps> = ({ books, showOneBook }) => {
  return (
    <ul>
      {books.map((book) => (
        <li
          key={book.id}
          className="book-li"
          onClick={showOneBook}
          data-id={book.id}
        >
          {book.title}
        </li>
      ))}
    </ul>
  );
};

interface ShowOneBookProps {
  book[id]: object
}

const ShowOneBook: React.FC<ShowOneBookProps> = ({
}) => {
  return (
    <>
      <h1 className="title one-book">{title}</h1>;
    </>
  );
};

export default App;
