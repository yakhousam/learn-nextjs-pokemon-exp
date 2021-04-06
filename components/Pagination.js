import { useRouter } from "next/router";

function Pagination() {
  const router = useRouter();
  const page = +router.query.page || 0;

  const handleOnclickNextPage = () => {
    router.push(`/?page=${page + 1}`, undefined, { shallow: true });
  };
  const handleOnclickPreviousPage = () => {
    router.push(page > 1 ? `/?page=${page - 1}` : "/", undefined, {
      shallow: true,
    });
  };
  // it is better to use links rather then button. best for SEO
  return (
    <div className="grid">
      <button
        className="card buttonText"
        onClick={handleOnclickPreviousPage}
        disabled={page === 0}
      >
        Prev
      </button>

      <button className="card buttonText" onClick={handleOnclickNextPage}>
        Next
      </button>
    </div>
  );
}
export default Pagination;
