import React from 'react';
import css from '../Pagination/Pagination.module.css';

function Pagination({ currentPage, totalPages, onPageChange }) {
  const handlePreviousPage = () => {
    onPageChange(currentPage - 1);
  };

  const handleNextPage = () => {
    onPageChange(currentPage + 1);
  };

  const handlePageClick = page => {
    onPageChange(page);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(
          <button
            key={i}
            onClick={() => handlePageClick(i)}
            className={currentPage === i ? css.active : ''}
          >
            {i}
          </button>
        );
      }
    } else {
      pageNumbers.push(
        <button
          key={1}
          onClick={() => handlePageClick(1)}
          className={currentPage === 1 ? css.active : ''}
        >
          1
        </button>
      );

      if (currentPage > 2) {
        pageNumbers.push(<span key="ellipsis-start">...</span>);
      }
      let startPage = Math.max(2, currentPage - 2);
      let endPage = Math.min(totalPages - 1, currentPage + 2);

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(
          <button
            key={i}
            onClick={() => handlePageClick(i)}
            className={currentPage === i ? css.active : ''}
          >
            {i}
          </button>
        );
      }

      if (currentPage < totalPages - 1) {
        pageNumbers.push(<span key="ellipsis-end">...</span>);
      }
      pageNumbers.push(
        <button
          key={totalPages}
          onClick={() => handlePageClick(totalPages)}
          className={currentPage === totalPages ? css.active : ''}
        >
          {totalPages}
        </button>
      );
    }

    return pageNumbers;
  };

  return (
    <div className={css.pagination_container}>
      <div className={css.pagination_content}>
        {' '}
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          &lt;
        </button>
        {renderPageNumbers()}
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          &gt;
        </button>
      </div>
    </div>
  );
}

export default Pagination;
