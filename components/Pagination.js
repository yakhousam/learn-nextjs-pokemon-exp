function Pagination({ prevPage, Prev, Next }) {
  console.log(prevPage,'page')
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
