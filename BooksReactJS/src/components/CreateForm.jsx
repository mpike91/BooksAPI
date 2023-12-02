import { useState } from "react";
import axios from "axios";

const BASE_URL = "https://localhost:7079/api/books";

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
        updateBooks((previousBooks) => [
          ...previousBooks,
          { ...newBook, id: response.data.id },
        ]);
        updateOneBook((prevBook) => ({ ...newBook, id: response.data.id }));
        setError(null);
        console.log(`Successful CREATE: ${BASE_URL}`);
      } catch (error) {
        console.log(error.message);
        setError("Network error");
        console.log(`Failed CREATE: ${BASE_URL}`);
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

export default CreateForm;
