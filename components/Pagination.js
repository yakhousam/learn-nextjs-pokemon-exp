function Pagination({ prevPage, Prev, Next }) {
  console.log(prevPage,'page')
  return (
    <div className="grid">
      {(prevPage &&! isNaN(prevPage) &&prevPage!=="NaN")?(
        <button className="card buttonText" onClick={Prev}>
          Prev
        </button>
      ):null}
      <button className="card buttonText" onClick={Next}>
        Next
      </button>
    </div>
  );
}
export default Pagination;
