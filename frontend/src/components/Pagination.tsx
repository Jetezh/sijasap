import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import Container from "./Container";
import { useMemo, useState, useCallback } from "react";

type PaginationProps = {
  totalItems: number;
  currentPage: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  siblingCount?: number; // how many pages to show around current
};

function Pagination({
  totalItems,
  currentPage,
  pageSize,
  onPageChange,
  siblingCount = 1,
}: PaginationProps) {
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

  const startIndex = (currentPage - 1) * pageSize + 1;
  const endIndex = Math.min(totalItems, currentPage * pageSize);

  const range = useMemo(() => {
    const pages: (number | "...")[] = [];
    const firstPage = 1;
    const lastPage = totalPages;
    const left = Math.max(firstPage, currentPage - siblingCount);
    const right = Math.min(lastPage, currentPage + siblingCount);

    if (left > firstPage) {
      pages.push(firstPage);
      if (left > firstPage + 1) pages.push("...");
    }

    for (let p = left; p <= right; p++) pages.push(p);

    if (right < lastPage) {
      if (right < lastPage - 1) pages.push("...");
      pages.push(lastPage);
    }

    return pages;
  }, [currentPage, siblingCount, totalPages]);

  const canPrev = currentPage > 1;
  const canNext = currentPage < totalPages;

  // local input for go-to-page (must be before any return)
  const [pageInput, setPageInput] = useState<string>("");
  const goToPage = useCallback(() => {
    const parsed = parseInt(pageInput, 10);
    if (Number.isNaN(parsed)) return;
    const target = Math.min(totalPages, Math.max(1, parsed));
    if (target !== currentPage) onPageChange(target);
  }, [pageInput, totalPages, currentPage, onPageChange]);

  if (totalItems === 0) return null;

  return (
    <Container>
      <div className="flex flex-1 justify-between sm:hidden">
        <button
          type="button"
          onClick={() => canPrev && onPageChange(currentPage - 1)}
          disabled={!canPrev}
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
        >
          Previous
        </button>
        <button
          type="button"
          onClick={() => canNext && onPageChange(currentPage + 1)}
          disabled={!canNext}
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
        >
          Next
        </button>
      </div>
      <div className="hidden sm:flex sm:relative sm:flex-1 sm:items-center sm:justify-start">
        <div>
          <p className="text-2xl text-gray-700">
            Showing <span className="font-medium">{startIndex}</span> to <span className="font-medium">{endIndex}</span> of{' '}
            <span className="font-medium">{totalItems}</span> results
          </p>
        </div>
        {/* Go to page (center, absolute) */}
        <div className="hidden sm:flex items-center gap-3 absolute left-1/2 -translate-x-1/2">
          <label className="text-xl text-gray-700">Go to page</label>
          <input
            value={pageInput}
            onChange={(e) => setPageInput(e.target.value.replace(/[^0-9]/g, ""))}
            onKeyDown={(e) => {
              if (e.key === "Enter") goToPage();
            }}
            placeholder={String(currentPage)}
            className="w-20 rounded-md inset-ring inset-ring-gray-300 px-3 py-2 text-xl"
            inputMode="numeric"
            aria-label="Go to page"
          />
          <button
            type="button"
            onClick={goToPage}
            className="px-4 py-2 rounded-md bg-(--primary-color) text-white text-xl hover:cursor-pointer hover:bg-(--green-button-hover) duration-300 "
          >
            Go
          </button>
        </div>
        <div className="ml-auto">
          <nav aria-label="Pagination" className="isolate inline-flex -space-x-px rounded-md shadow-xs">
            <button
              type="button"
              onClick={() => canPrev && onPageChange(currentPage - 1)}
              disabled={!canPrev}
              className="relative inline-flex items-center rounded-l-md px-4 py-4 text-gray-400 inset-ring inset-ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50"
            >
              <span className="sr-only">Previous</span>
              <FaChevronLeft aria-hidden="true" className="size-7" />
            </button>
            {range.map((item, idx) =>
              item === "..." ? (
                <span
                  key={`ellipsis-${idx}`}
                  className="relative inline-flex items-center px-6 py-4 text-2xl font-semibold text-gray-700 inset-ring inset-ring-gray-300 focus:outline-offset-0"
                >
                  ...
                </span>
              ) : (
                <button
                  key={`page-${item}`}
                  type="button"
                  onClick={() => onPageChange(item)}
                  aria-current={item === currentPage ? "page" : undefined}
                  className={
                    item === currentPage
                      ? "relative z-10 inline-flex items-center bg-(--primary-color) px-6 py-4 text-2xl font-semibold text-white focus:z-20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--primary-color)"
                      : "relative inline-flex items-center px-6 py-4 text-2xl font-semibold text-gray-900 inset-ring inset-ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                  }
                >
                  {item}
                </button>
              )
            )}
            <button
              type="button"
              onClick={() => canNext && onPageChange(currentPage + 1)}
              disabled={!canNext}
              className="relative inline-flex items-center rounded-r-md px-4 py-4 text-gray-400 inset-ring inset-ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50"
            >
              <span className="sr-only">Next</span>
              <FaChevronRight aria-hidden="true" className="size-7" />
            </button>
          </nav>
        </div>
      </div>
    </Container>
  );
}

export default Pagination;
