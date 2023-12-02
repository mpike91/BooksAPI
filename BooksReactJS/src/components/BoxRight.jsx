import ButtonsGroup from "./ButtonsGroup";
import ShowOneBook from "./ShowOneBook";
import EditForm from "./EditForm";
import CreateForm from "./CreateForm";

// Displays the right box with different views and forms: View, Edit, Add
const BoxRight = ({
  oneBook,
  showBook,
  updateOneBook,
  updateBooks,
  view,
  setView,
  edit,
  setEdit,
  create,
  setCreate,
}) => {
  return (
    <div className="box box-right">
      {/* Conditional rendering for BoxRight Header */}
      {!oneBook && (
        <h1 className="center-child">{"<- "}Click a Book to View</h1>
      )}
      {view && oneBook && <h1 className="center-child">View</h1>}
      {edit && oneBook && <h1 className="center-child">Edit</h1>}
      {create && <h1 className="center-child">Add</h1>}

      <ButtonsGroup
        showBook={showBook}
        setView={setView}
        setEdit={setEdit}
        setCreate={setCreate}
      />

      {/* Conditional rendering for BoxRight View/Edit/Create body*/}
      {view && oneBook && (
        <ShowOneBook
          book={oneBook}
          updateOneBook={updateOneBook}
          updateBooks={updateBooks}
        />
      )}
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

export default BoxRight;
