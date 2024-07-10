import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesRight ,faAnglesLeft } from '@fortawesome/free-solid-svg-icons';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = [];

  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <nav className="flex justify-end mr-36">
      <ul className="inline-flex -space-x-px">
        <li>
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-2 ml-0 leading-tight text-gray-500 border border-gray-300 rounded-l-lg  hover:text-blue-700"
          >
            <FontAwesomeIcon icon={faAnglesLeft} />
          </button>
        </li>
        {pages.map((page) => (
          <li key={page}>
            <button
              onClick={() => onPageChange(page)}
              className={`px-3 py-2 leading-tight ${page === currentPage ? 'text-blue-600  border border-gray-300' : 'text-gray-500  border border-gray-300  hover:text-orange-400'}`}
            >
              {page}
            </button>
          </li>
        ))}
        <li>
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-2 leading-tight text-gray-500 border border-gray-300 rounded-r-lg  hover:text-blue-700"
          >
            <FontAwesomeIcon icon={faAnglesRight} />
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
