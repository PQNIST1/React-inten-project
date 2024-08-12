import React, {useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesRight, faAnglesLeft } from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation } from 'react-router-dom';



const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = [];
  const location = useLocation();

  useEffect(() => {
    const hash = location.hash; // Lấy hash từ URL
    const [ query] = hash.split('?'); // Tách phần section và phần query
    if (query) {
      const queryParams = new URLSearchParams(query); 
      const page = parseInt(queryParams.get('page'), 10) || 1;
      
        if (page !== currentPage) {
          onPageChange(page);
        }  

    }
  }, [location, currentPage, onPageChange]);
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <nav className="flex justify-end mr-36">
      <ul className="inline-flex -space-x-px">
        <li>
          <Link to={`#${location.hash.split('?')[0].substring(1)}?page=${currentPage - 1}`}>
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-2 ml-0 leading-tight text-gray-500 border border-gray-300 rounded-l-lg  hover:text-blue-700"
            >
              <FontAwesomeIcon icon={faAnglesLeft} />
            </button>
          </Link>
        </li>
        {pages.map((page) => (
          <li key={page}>
            <Link to={`#${location.hash.split('?')[0].substring(1)}?page=${page}`}>
              <button
                onClick={() => onPageChange(page)}
                className={`px-3 py-2 leading-tight ${page === currentPage ? 'text-blue-600  border border-gray-300' : 'text-gray-500  border border-gray-300  hover:text-orange-400'}`}
              >
                {page}
              </button>
            </Link>
          </li>
        ))}
        <li>
          <Link to={`#${location.hash.split('?')[0].substring(1)}?page=${currentPage + 1}`}>
            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-2 leading-tight text-gray-500 border border-gray-300 rounded-r-lg  hover:text-blue-700"
            >
              <FontAwesomeIcon icon={faAnglesRight} />
            </button>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
