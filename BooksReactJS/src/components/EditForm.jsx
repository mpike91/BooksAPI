import { useState } from "react";
import axios from "axios";

const BASE_URL = "https://localhost:7079/api/books";

const EditForm = ({ oneBook, updateBooks }) => {
  const [title, setTitle] = useState(oneBook.title);
  const [author, setAuthor] = useState(oneBook.author);
  const [imageUrl, setImageUrl] = useState(oneBook.imageUrl);
  const [pageLength, setPageLength] = useState(oneBook.pageLength);
  const [error, setError] = useState(null);

  const editBook = (event) => {
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
    // Axios PUT request. Update books list to reflect changes in BoxLeft.
    async function edit() {
      try {
        await axios.put(`${BASE_URL}/${oneBook.id}`, book);
        updateBooks((previousBooks) =>
          previousBooks.map((prevBook) =>
            prevBook.id !== oneBook.id
              ? prevBook
              : { ...book, id: oneBook.id.toString() }
          )
        );
        setError(null);
        console.log(`Successful PUT: ${BASE_URL}/${oneBook.id}`);
      } catch (error) {
        setError("Network error");
        console.log(`Failed PUT: ${BASE_URL}/${oneBook.id}`, error);
      }
    }
    edit();
  };

  return (
    <>
      <div className="error">{error}</div>
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
          Submit Edit
        </button>
      </form>
    </>
  );
};

export default EditForm;
