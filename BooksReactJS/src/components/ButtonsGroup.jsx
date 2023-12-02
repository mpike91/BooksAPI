// Displays the View, Edit, and Add group of buttons in BoxRight
const ButtonsGroup = ({ showBook, setView, setEdit, setCreate }) => {
  return (
    <div className="center-child buttons-container">
      <button className="buttons" onClick={showBook}>
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
  );
};

export default ButtonsGroup;
