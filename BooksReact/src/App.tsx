import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const BASE_URL = "https://localhost:7079/api/books";

const App = () => {
  const [allBooks, setAllBooks] = useState([]);
  const [oneBook, setOneBook] = useState(null);

  // Display all books when clicked
  const displayAllBooks = () => {
    async function getAllBooks() {
      try {
        const response = await axios.get(BASE_URL);
        setAllBooks(response.data);
      } catch (error) {
        console.log("Error fetching books from API: ", error);
      }
    }
    getAllBooks();
  };

  useEffect(displayAllBooks, []);

  // Display one book when it is clicked
  const displayOneBookHandler = (event) => {
    const id = event.target.getAttribute("data-id");
    async function getOneBook() {
      try {
        const response = await axios.get(`${BASE_URL}/${id}`);
        setOneBook(response.data);
      } catch (error) {
        console.log("Error fetching one book from API: ", error);
      }
    }
    getOneBook();
  };

  return (
    <>
      <BoxLeft
        oneBook={oneBook}
        showBook={displayOneBookHandler}
        books={allBooks}
      />
      <BoxRight
        oneBook={oneBook}
        updateOneBook={setOneBook}
        updateBooks={setAllBooks}
      />
    </>
  );
};

const BoxLeft = ({ oneBook, showBook, books }) => {
  return (
    <div className="box box-left">
      <h1 className="title">Books</h1>
      <ShowBooks oneBook={oneBook} books={books} showBook={showBook} />
    </div>
  );
};

const BoxRight = ({ oneBook, updateOneBook, updateBooks }) => {
  const [view, setView] = useState(true);
  const [edit, setEdit] = useState(false);
  const [create, setCreate] = useState(false);

  return (
    <div className="box box-right">
      <div className="center-child buttons-container">
        <button
          className="buttons"
          onClick={() => {
            setView(true);
            setEdit(false);
            setCreate(false);
          }}
        >
          View
        </button>
        <button
          className="buttons"
          onClick={() => {
            setView(false);
            setEdit(true);
            setCreate(false);
          }}
        >
          Edit
        </button>
        <button
          className="buttons"
          onClick={() => {
            setView(false);
            setEdit(false);
            setCreate(true);
          }}
        >
          Add
        </button>
      </div>

      {!oneBook && (
        <>
          <h1 className="center-child">Click a Book to View</h1>
          <h1 className="center-child">{"<-----------------"}</h1>
        </>
      )}
      {view && oneBook && <ShowOneBook book={oneBook} />}
      {edit && oneBook && (
        <EditForm
          oneBook={oneBook}
          updateOneBook={updateOneBook}
          updateBooks={updateBooks}
        />
      )}
      {create && (
        <CreateForm updateOneBook={updateOneBook} updateBooks={updateBooks} />
      )}
    </div>
  );
};

const ShowBooks = ({ oneBook, books, showBook }) => {
  return (
    <ul>
      {books.map((book) => (
        <li
          key={book.id}
          className={`book-li ${oneBook?.id === book.id ? "bold" : ""}`}
          onClick={showBook}
          data-id={book.id}
        >
          {book.title}
        </li>
      ))}
    </ul>
  );
};

const ShowOneBook = ({ book }) => {
  return (
    <>
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
    </>
  );
};

const EditForm = ({ oneBook, updateOneBook, updateBooks }) => {
  const [title, setTitle] = useState(oneBook.title);
  const [author, setAuthor] = useState(oneBook.author);
  const [imageUrl, setImageUrl] = useState(oneBook.imageUrl);
  const [pageLength, setPageLength] = useState(oneBook.pageLength);
  const [error, setError] = useState(null);

  const editBook = (event) => {
    event.preventDefault();

    const book = {
      title,
      author,
      imageUrl,
      pageLength,
    };
    async function edit() {
      try {
        const response = await axios.put(`${BASE_URL}/${oneBook.id}`, book);
        console.log(response);
        console.log("Successful Put Request");

        updateBooks((previousBooks) =>
          previousBooks.map((prevBook) =>
            prevBook.id !== oneBook.id ? prevBook : { ...book, id: oneBook.id }
          )
        );
        setError(null);
      } catch (error) {
        console.log("Error editing new book: ", error);
        return setError(error.message);
      }
    }
    edit();
  };

  const deleteBook = (event) => {
    event.preventDefault();
    if (!title || !author || !imageUrl || !pageLength) {
      return setError("All fields must be filled!");
    }
    const book = {
      title,
      author,
      imageUrl,
      pageLength,
    };
    async function deleteBook() {
      try {
        const response = await axios.delete(`${BASE_URL}/${oneBook.id}`);
        console.log(response);
        console.log("Successful Delete Request");

        updateBooks((previousBooks) =>
          previousBooks.filter((prevBook) => prevBook.id !== oneBook.id)
        );
        updateOneBook(null);
        setError(null);
      } catch (error) {
        console.log("Error Deleting Book: ", error);
      }
    }
    deleteBook();
  };

  return (
    <>
      {error && <div className="error">All fields must be filled!</div>}
      <form className="center-child">
        <section>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
          />
        </section>
        <section>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Author"
          />
        </section>
        <section>
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="Image URL"
          />
        </section>
        <section>
          <input
            type="text"
            value={pageLength}
            onChange={(e) => setPageLength(e.target.value)}
            placeholder="Pages"
          />
        </section>
        <button className="buttons" onClick={editBook}>
          Edit Book
        </button>
        <button className="buttons" onClick={deleteBook}>
          Delete Book
        </button>
      </form>
    </>
  );
};

const CreateForm = ({ updateOneBook, updateBooks }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [pageLength, setPageLength] = useState("");
  const [error, setError] = useState(null);

  const createBook = (event) => {
    event.preventDefault();
    if (!title || !author || !imageUrl || !pageLength) {
      return setError("All fields must be filled!");
    }
    const newBook = {
      title,
      author,
      imageUrl,
      pageLength,
    };
    async function create() {
      try {
        const response = await axios.post(BASE_URL, newBook);
        console.log(response);
        updateBooks((previousBooks) => [
          ...previousBooks,
          { ...newBook, id: response.data.id },
        ]);
        updateOneBook((prevBook) => ({ ...newBook, id: response.data.id }));
        setError(null);
      } catch (error) {
        console.log("Error creating new book: ", error);
      }
    }
    create();
  };

  const dummyData = (event) => {
    event.preventDefault();
    setTitle("Cornelius Van Til: An Analysis of His Thought");
    setAuthor("John M. Frame");
    setImageUrl("https://m.media-amazon.com/images/I/517nne41JYL.jpg");
    setPageLength(480);
  };

  return (
    <>
      {error && <div className="error">All fields must be filled!</div>}
      <form className="center-child">
        <section>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
          />
        </section>
        <section>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Author"
          />
        </section>
        <section>
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="Image URL"
          />
        </section>
        <section>
          <input
            type="text"
            value={pageLength}
            onChange={(e) => setPageLength(e.target.value)}
            placeholder="Pages"
          />
        </section>
        <button className="buttons" onClick={createBook}>
          Add
        </button>
        <button className="buttons" onClick={dummyData}>
          Fill With Dummy Data
        </button>
      </form>
    </>
  );
};

export default App;
