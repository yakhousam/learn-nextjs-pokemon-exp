function Pagination({ prevPage, Prev, Next }) {
  return (
    <div className="grid">
      {prevPage && (
        <button className="card buttonText" onClick={Prev}>
          Prev
        </button>
      )}
      <button className="card buttonText" onClick={Next}>
        Next
      </button>
    </div>
  );
}
export default Pagination;
