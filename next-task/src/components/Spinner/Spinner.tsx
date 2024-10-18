import './spinner.css';
function Spinner() {
  return (
    <div className="custom-spinner" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  );
}

export default Spinner;
