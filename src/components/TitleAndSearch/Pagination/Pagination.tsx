// Pagination.tsx
import React from 'react';
import styles from './Pagination.module.css';
import ArrowLeft from '../../../assets/arrow left.svg';
import ArrowLeftLeft from '../../../assets/arrow left-left.svg';
import ArrowRight from '../../../assets/arrow right.svg';
import ArrowRightRight from '../../../assets/arrow right-right.svg';

type PaginationProps = {
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
  onItemsPerPageChange: (items: number) => void;
  onPageChange: (page: number) => void;
  itemsPerPageOptions: number[];
};

const Pagination: React.FC<PaginationProps> = ({
  itemsPerPage,
  totalPages,
  currentPage,
  onItemsPerPageChange,
  onPageChange,
  itemsPerPageOptions,
}) => (
  <div className={styles.pagination}>
    <select
      onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
      value={itemsPerPage}
      className={styles.pageSelect}
    >
      {itemsPerPageOptions.map(option => (
        <option key={option} value={option}>{option}</option>
      ))}
    </select>
    <p>Page {currentPage} of {totalPages}</p>
    <button onClick={() => onPageChange(1)} disabled={currentPage === 1}>
      <img src={ArrowLeftLeft} alt="First page" />
    </button>
    <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
      <img src={ArrowLeft} alt="Previous page" />
    </button>
    <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
      <img src={ArrowRight} alt="Next page" />
    </button>
    <button onClick={() => onPageChange(totalPages)} disabled={currentPage === totalPages}>
      <img src={ArrowRightRight} alt="Last page" />
    </button>
  </div>
);

export default Pagination;
