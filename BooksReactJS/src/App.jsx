import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

import BoxLeft from "./components/BoxLeft";
import BoxRight from "./components/BoxRight";

const BASE_URL = "https://localhost:7079/api/books";

const App = () => {
  const [allBooks, setAllBooks] = useState([]);
  const [oneBook, setOneBook] = useState(null);
  const [view, setView] = useState(true);
  const [edit, setEdit] = useState(false);
  const [create, setCreate] = useState(false);

  // Display all books upon initial load
  // GET: https://localhost:7079/api/books
  const displayAllBooks = () => {
    async function getAllBooks() {
      try {
        const response = await axios.get(BASE_URL);
        setAllBooks(response.data);
        console.log(`Successful GET: ${BASE_URL}`);
      } catch (error) {
        console.log(`Failed GET: ${BASE_URL}`, error);
      }
    }
    getAllBooks();
  };

  useEffect(displayAllBooks, []);

  // Display one book when it is clicked
  // GET: https://localhost:7079/api/books/{id}
  const displayOneBookHandler = (event) => {
    const id = event.target.getAttribute("data-id") ?? oneBook.id;
    async function getOneBook() {
      try {
        const response = await axios.get(`${BASE_URL}/${id}`);
        setOneBook(response.data);
        setView(true);
        setEdit(false);
        setCreate(false);
        console.log(`Successful GET: ${BASE_URL}/${id}`);
        console.log(response.data);
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
        showBook={displayOneBookHandler}
        updateOneBook={setOneBook}
        updateBooks={setAllBooks}
        view={view}
        setView={setView}
        edit={edit}
        setEdit={setEdit}
        create={create}
        setCreate={setCreate}
      />
    </>
  );
};

export default App;
