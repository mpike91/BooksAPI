// Displays the left box with list of books
const BoxLeft = ({ oneBook, showBook, books }) => {
  return (
    <div className="box box-left">
      <h1 className="title">Books</h1>
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
    </div>
  );
};

export default BoxLeft;
