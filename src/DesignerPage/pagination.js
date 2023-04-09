import React from "react";
import "./pagination.css";

export default function Pagination({
  currentPage,
  onChangePage,
  totalPages,
  modulePerPage,
}) {
  return (
    <ul className="pagination pagination-wrapper">
      {currentPage > 1 && (
        <li className="page-item">
          <a
            className="page-link"
            href="#"
            onClick={() => onChangePage(currentPage - 1)}
          >
            {"<"}
          </a>
        </li>
      )}
      {[...new Array(totalPages / modulePerPage)].map((_, idx) => (
        <li key={idx} className="page-item">
          <a
            href="#"
            className="page-link"
            onClick={() => onChangePage(idx + 1)}
          >
            {idx + 1}
          </a>
        </li>
      ))}
      <li className="page-item">
        <a
          className="page-link"
          href="#"
          onClick={() => onChangePage(currentPage + 1)}
        >
          {">"}
        </a>
      </li>
    </ul>
  );
}
